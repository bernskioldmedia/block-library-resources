/**
 * External Dependencies
 */
import classnames from "classnames";

/**
 * WordPress Dependencies
 */
const { RichText } = wp.blockEditor;

/**
 * Handle the saving of the section header.
 *
 * @param attributes
 * @returns {null|*}
 * @constructor
 */
export default function SectionHeaderSave( { attributes } ) {

	/**
	 * If the section header is hidden (by default it is),
	 * then just don't show it.
	 */
	if ( ! attributes.sectionHeaderShow ) {
		return null;
	}

	const classes = classnames( "section-header", {
		[`is-style-${attributes.sectionHeaderStyle}`]: attributes.sectionHeaderStyle
	} );

	/**
	 * Check if the header style is "small"
	 *
	 * @type {boolean}
	 */
	const isSmall = ( "small" === attributes.sectionHeaderStyle );

	return (

		<header className={classes}>
			<div className="section-header-content">
				{attributes.sectionEyebrow && ! isSmall && (
					<RichText.Content
						tagName="p"
						className="section-eyebrow"
						value={attributes.sectionEyebrow}
					/>
				)}

				{attributes.sectionTitle && (
					<RichText.Content
						tagName="h2"
						className="section-title"
						value={attributes.sectionTitle}
					/>
				)}

				{attributes.sectionSubtitle && ! isSmall && (
					<RichText.Content
						tagName="p"
						className="section-subtitle"
						value={attributes.sectionSubtitle}
					/>
				)}
			</div>

			{attributes.sectionCtaShow && (
				<p className="section-cta">
					<a className="section-cta-link text-button" href={attributes.sectionCtaLink}>{attributes.sectionCtaText}</a>
				</p>
			)}

		</header>

	);

}
