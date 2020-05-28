/**
 * External Dependencies
 */
import classnames from "classnames";

/**
 * WordPress Dependencies
 */
const { RichText } = wp.blockEditor;

/**
 * Section Footer Save
 *
 * @param attributes
 * @returns {null|*}
 * @constructor
 */
export default function SectionFooterSave( { attributes } ) {


	/**
	 * If the section header is hidden (by default it is),
	 * then just don't show it.
	 */
	if ( ! attributes.sectionFooterShow ) {
		return null;
	}

	const classes = classnames( "section-footer", {
		[`is-${attributes.sectionFooterAlignment}-aligned`]: attributes.sectionFooterAlignment
	} );

	return (
		<footer className={classes}>
			<div className="section-footer-content">
				{attributes.sectionFooterText && (
					<RichText.Content
						tagName="p"
						className="section-footer-text"
						value={attributes.sectionFooterText}
					/>
				)}

				{attributes.sectionFooterCtaShow && (
					<div className="section-footer-cta">
						<a className="section-footer-cta-button button" href={attributes.sectionFooterCtaLink}>
							{attributes.sectionFooterCtaText}
						</a>
					</div>
				)}

			</div>
		</footer>
	);

}
