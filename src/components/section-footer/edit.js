/**
 * External Dependencies
 */
import classnames from "classnames";

/**
 * WordPress Dependencies
 */
const { RichText, URLInput } = wp.blockEditor;
const { Popover }            = wp.components;

/**
 * Section Footer Edit
 *
 * @param attributes
 * @param setAttributes
 * @param isSelected
 * @returns {null|*}
 * @constructor
 */
export default function SectionFooterEdit( { attributes, setAttributes, isSelected } ) {

	if ( ! attributes.sectionFooterShow ) {
		return null;
	}

	const classes = classnames( "section-footer", {
		[`is-${attributes.sectionFooterAlignment}-aligned`]: attributes.sectionFooterAlignment
	} );

	return (
		<footer className={classes}>
			<div className="section-footer-content">
				<RichText
					tagName="p"
					className="section-footer-text"
					placeholder="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."
					value={attributes.sectionFooterText}
					onChange={( value ) => setAttributes( {
						sectionFooterText: value
					} )}
				/>

				{attributes.sectionFooterCtaShow && (
					<div className="section-footer-cta">
						<RichText
							tagName="span"
							className="section-footer-cta-button button"
							placeholder="Lorem ipsum dolor"
							multiline={false}
							allowedFormats={[]}
							value={attributes.sectionFooterCtaText}
							onChange={( value ) => setAttributes( {
								sectionFooterCtaText: value
							} )}
						/>
						{isSelected && attributes.sectionFooterCtaShow && (
							<Popover position="bottom center" focusOnMount={false}>
								<URLInput
									autoFocus={false}
									value={attributes.sectionFooterCtaLink}
									onChange={( value ) => setAttributes( { sectionFooterCtaLink: value } )}
								/>
							</Popover>
						)}
					</div>
				)}

			</div>
		</footer>
	);

}
