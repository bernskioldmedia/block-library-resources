/**
 * External Dependencies
 */
import classnames from "classnames";
import { focalPointToBgPos, getBackgroundClass, isColorLight } from "../../utilities/utilities";

/**
 * Handle the saving action of the section.
 */
export default function SectionSave( { attributes, className, children } ) {

	const backgroundClass = getBackgroundClass( attributes );

	const classes = classnames( "section", {
		[`section-${className}`]: className,
		[backgroundClass]: backgroundClass,
		"has-background-image bg-cover": attributes.backgroundImageUrl,
		"is-full-height": true === attributes.isSectionFullHeight,
		"has-carousel": true === attributes.displayAsCarousel,
		"has-header": true === attributes.sectionHeaderShow,
		"has-footer": true === attributes.sectionFooterShow,
		[`has-${attributes.sectionContentWidth}-content`]: attributes.sectionContentWidth,
		[`has-${attributes.sectionSpacing}-vspacing`]: attributes.sectionSpacing,
		"has-dark-background": attributes.customBackgroundColor && ! isColorLight( attributes.customBackgroundColor )
	} );

	let styles = {};

	if ( attributes.backgroundImageUrl ) {
		styles.backgroundImage    = `url('${attributes.backgroundImageUrl}')`;
		styles.backgroundPosition = focalPointToBgPos( attributes.backgroundImageFocalPoint );
	}

	if ( attributes.customBackgroundColor ) {
		styles.backgroundColor = attributes.customBackgroundColor;
	}

	return (
		<section className={classes} style={styles} id={attributes.anchor}>
			{children}
		</section>
	);

}
