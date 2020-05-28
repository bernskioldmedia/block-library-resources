/**
 * Internal Dependencies
 */
import sectionHeaderAttributes from "../components/section-header/attributes";
import sectionFooterAttributes from "../components/section-footer/attributes";
import sectionAttributes from "../components/section/attributes";

/**
 * WordPress Dependencies
 */
const { getColorClassName } = wp.blockEditor;

/**
 * Convert a focal point object to a background
 * position string.
 *
 * @param focalPoint
 * @returns {string}
 */
export function focalPointToBgPos( focalPoint ) {
	return `${focalPoint.x * 100}% ${focalPoint.y * 100}%`;
}

/**
 * Merges the provided block attributes with the
 * attributes for a section.
 *
 * @param blockAttributes
 * @returns {object}
 */
export function mergeSectionAttributes( blockAttributes ) {
	return { ...sectionAttributes, ...sectionHeaderAttributes, ...sectionFooterAttributes, ...blockAttributes };
}

/**
 * Get the URL from a media object.
 *
 * @param media
 * @param size
 * @returns {*}
 */
export function getMediaUrl( media, size = "large" ) {
	if ( media.sizes && media.sizes[size] && media.sizes[size].url ) {
		return media.sizes[size].url;
	} else {
		return media.url;
	}
}

/**
 * Get Media Dimensions
 *
 * @param media
 * @param size
 * @returns {{width: *, height: *}}
 */
export function getMediaDimensions( media, size = "large" ) {

	let width  = 0,
		height = 0;

	if ( media.sizes && media.sizes[size] && media.sizes[size].width ) {
		width = media.sizes[size].width;
	} else {
		width = media.width;
	}

	if ( media.sizes && media.sizes[size] && media.sizes[size].height ) {
		height = media.sizes[size].height;
	} else {
		height = media.height;
	}

	return {
		height: height,
		width: width
	};

}

/**
 * Check if image is dark.
 *
 * @param imageSrc
 * @param callback
 */
export function isImageDark( imageSrc, callback ) {

	const fuzzy       = 0.1;
	let img           = document.createElement( "img" );
	img.src           = imageSrc;
	img.style.display = "none";
	document.body.appendChild( img );

	img.onload = function() {
		// create canvas
		let canvas    = document.createElement( "canvas" );
		canvas.width  = this.width;
		canvas.height = this.height;

		let ctx = canvas.getContext( "2d" );
		ctx.drawImage( this, 0, 0 );

		const imageData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
		const data      = imageData.data;
		let r, g, b, max_rgb;
		let light       = 0,
			dark        = 0;

		for ( let x = 0, len = data.length; x < len; x += 4 ) {
			r = data[x];
			g = data[x + 1];
			b = data[x + 2];

			max_rgb = Math.max( Math.max( r, g ), b );
			if ( max_rgb < 128 ) {
				dark++;
			} else {
				light++;
			}
		}

		let dl_diff = ( ( light - dark ) / ( this.width * this.height ) );
		if ( dl_diff + fuzzy < 0 ) {
			callback( true );
		} else {
			callback( false );
		}
	};
}

/**
 * Check if a color is considered light or dark.
 *
 * @param color
 * @returns {boolean}
 */
export function isColorLight( color ) {

	// Variables for red, green, blue values
	let r, g, b, hsp;

	// Check the format of the color, HEX or RGB?
	if ( color.match( /^rgb/ ) ) {

		// If HEX --> store the red, green, blue values in separate variables
		color = color.match( /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/ );

		r = color[1];
		g = color[2];
		b = color[3];
	} else {

		// If RGB --> Convert it to HEX: http://gist.github.com/983661
		color = +( "0x" + color.slice( 1 ).replace(
			color.length < 5 && /./g, "$&$&" ) );

		r = color >> 16;
		g = color >> 8 & 255;
		b = color & 255;
	}

	// HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
	hsp = Math.sqrt(
		0.299 * ( r * r ) +
		0.587 * ( g * g ) +
		0.114 * ( b * b )
	);

	// Using the HSP value, determine whether the color is light or dark
	if ( hsp > 127.5 ) {
		return true;
	} else {

		return false;
	}
}

/**
 * Convert a string to a URL slug.
 *
 * @param str
 * @returns {string}
 */
export function convertToSlug( str ) {

	if ( ! str || str === "" ) {
		return str;
	}

	str = str.replace( /^\s+|\s+$/g, "" ); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
	const to   = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
	for ( let i = 0, l = from.length; i < l; i++ ) {
		str = str.replace( new RegExp( from.charAt( i ), "g" ), to.charAt( i ) );
	}

	str = str.replace( /[^a-z0-9 -]/g, "" ) // remove invalid chars
			 .replace( /\s+/g, "-" ) // collapse whitespace and replace by -
			 .replace( /-+/g, "-" ); // collapse dashes

	return str;
}

/**
 * Get Background Class
 * @param attributes
 * @returns {null|*}
 */
export function getBackgroundClass( attributes ) {

	const { backgroundColor } = attributes;

	if ( backgroundColor ) {
		return getColorClassName( "background-color", backgroundColor );
	} else {
		return null;
	}
}
