/**
 * Internal Dependencies
 */
import applyWithColors from "../../utilities/colors";

/**
 * WordPress Dependencies
 */
const { compose }  = wp.compose;
const { __ }       = wp.i18n;
const {
		  PanelBody,
		  ToggleControl,
		  BaseControl,
		  Button,
		  ButtonGroup
	  }            = wp.components;
const { Fragment } = wp.element;

/**
 * The section appearance options allows the user
 * to control the general section appearance.
 */
function SectionAppearance( { attributes, setAttributes } ) {

	return (
		<Fragment>
			<PanelBody
				title={__( "Size & Spacing" )}
				initialOpen={false}
			>

				<BaseControl
					label={__( "Section Content Width" )}
					help={__( "Control the width of the content area in the section." )}
				>
					<ButtonGroup>
						<Button
							isDefault={attributes.sectionContentWidth !== "narrow"}
							isPrimary={attributes.sectionContentWidth === "narrow"}
							onClick={() => setAttributes( {
								sectionContentWidth: "narrow"
							} )}
						>
							{__( "Narrow" )}
						</Button>
						<Button
							isDefault={attributes.sectionContentWidth !== "wide"}
							isPrimary={attributes.sectionContentWidth === "wide"}
							onClick={() => setAttributes( {
								sectionContentWidth: "wide"
							} )}
						>
							{__( "Wide" )}
						</Button>
						<Button
							isDefault={attributes.sectionContentWidth !== "page-width"}
							isPrimary={attributes.sectionContentWidth === "page-width"}
							onClick={() => setAttributes( {
								sectionContentWidth: "page-width"
							} )}
						>
							{__( "Page" )}
						</Button>
						<Button
							isDefault={attributes.sectionContentWidth !== "fullwidth"}
							isPrimary={attributes.sectionContentWidth === "fullwidth"}
							onClick={() => setAttributes( {
								sectionContentWidth: "fullwidth"
							} )}
						>
							{__( "Fullwidth" )}
						</Button>
					</ButtonGroup>
				</BaseControl>

				<BaseControl
					label={__( "Section Spacing" )}
				>
					<ButtonGroup>
						<Button
							isDefault={attributes.sectionVerticalSpacing !== "no"}
							isPrimary={attributes.sectionVerticalSpacing === "no"}
							onClick={() => setAttributes( {
								sectionVerticalSpacing: "no"
							} )}
						>
							{__( "None" )}
						</Button>
						<Button
							isDefault={attributes.sectionVerticalSpacing !== "small"}
							isPrimary={attributes.sectionVerticalSpacing === "small"}
							onClick={() => setAttributes( {
								sectionVerticalSpacing: "small"
							} )}
						>
							{__( "Small" )}
						</Button>
						<Button
							isDefault={attributes.sectionVerticalSpacing !== "normal"}
							isPrimary={attributes.sectionVerticalSpacing === "normal"}
							onClick={() => setAttributes( {
								sectionVerticalSpacing: "normal"
							} )}
						>
							{__( "Normal" )}
						</Button>
						<Button
							isDefault={attributes.sectionVerticalSpacing !== "large"}
							isPrimary={attributes.sectionVerticalSpacing === "large"}
							onClick={() => setAttributes( {
								sectionVerticalSpacing: "large"
							} )}
						>
							{__( "Large" )}
						</Button>
					</ButtonGroup>
				</BaseControl>

				<ToggleControl
					label={__( "Show at Full Height Always" )}
					checked={attributes.isSectionFullHeight}
					onChange={( value ) => setAttributes( { isSectionFullHeight: value } )}
				/>

			</PanelBody>

		</Fragment>
	);

}

export default compose( [
	applyWithColors
] )( SectionAppearance );
