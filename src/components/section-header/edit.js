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
 * A standardized component for the edit screens
 * providing an editing experience for the section header.
 *
 * @param attributes
 * @param setAttributes
 * @param isSelected
 * @returns {null|*}
 * @constructor
 */
export default function SectionHeaderEdit( { attributes, setAttributes, isSelected } ) {

	/**
	 * Check if the header style is "small"
	 *
	 * @type {boolean}
	 */
	const isSmall = "small" === attributes.sectionHeaderStyle;

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

	return (
		<header className={classes}>
			<div className="section-header-content">

				{! isSmall && (
					<RichText
						tagName="p"
						className="section-eyebrow"
						placeholder="Consectetuer adipiscing"
						multiline={false}
						allowedFormats={[]}
						withoutInteractiveFormatting={true}
						value={attributes.sectionEyebrow}
						onChange={( value ) => setAttributes( {
							sectionEyebrow: value
						} )}
					/>
				)}

				<RichText
					tagName="h2"
					className="section-title"
					placeholder="Lorem ipsum dolor sit"
					multiline={false}
					allowedFormats={[]}
					withoutInteractiveFormatting={true}
					value={attributes.sectionTitle}
					onChange={( value ) => setAttributes( {
						sectionTitle: value
					} )}
				/>

				{! isSmall && (
					<RichText
						tagName="p"
						className="section-subtitle"
						placeholder="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."
						multiline={false}
						value={attributes.sectionSubtitle}
						onChange={( value ) => setAttributes( {
							sectionSubtitle: value
						} )}
					/>
				)}

			</div>
			{attributes.sectionCtaShow && (
				<p className="section-cta">
					<RichText
						tagName="span"
						className="section-cta-link text-button"
						placeholder="More"
						multiline={false}
						allowedFormats={[]}
						value={attributes.sectionCtaText}
						onChange={( value ) => setAttributes( {
							sectionCtaText: value
						} )}
					/>
					{isSelected && attributes.sectionCtaShow && (
						<Popover position="bottom center" focusOnMount={false}>
							<URLInput
								autoFocus={false}
								value={attributes.sectionCtaLink}
								onChange={( value ) => setAttributes( { sectionCtaLink: value } )}
							/>
						</Popover>
					)}
				</p>
			)}
		</header>
	);

}
