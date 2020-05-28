/**
 * WordPress Dependencies
 */
const { __ }       = wp.i18n;
const { Fragment } = wp.element;
const {
		  PanelBody,
		  PanelRow,
		  BaseControl,
		  SelectControl,
		  ToggleControl
	  }            = wp.components;

/**
 * A custom component that is loaded in other inspectors
 * and provides the options to set the section header
 * attributes and options.
 */
export default function SectionHeaderInspector( { attributes, setAttributes } ) {

	return (
		<PanelBody
			title={__( "Section Header" )}
			initialOpen={false}
		>
			<PanelRow>
				<BaseControl>
					<ToggleControl
						label={__( "Show Section Header" )}
						checked={attributes.sectionHeaderShow}
						onChange={( value ) => setAttributes( { sectionHeaderShow: value } )}
					/>
				</BaseControl>
			</PanelRow>

			{attributes.sectionHeaderShow && (
				<Fragment>
					<BaseControl>
						<SelectControl
							label={__( "Style" )}
							value={attributes.sectionHeaderStyle}
							onChange={( value ) => setAttributes( {
								sectionHeaderStyle: value
							} )}
							options={[
								{
									label: __( "Centered" ),
									value: "normal"
								},
								{
									label: __( "Small" ),
									value: "small"
								},
								{
									label: __( "Left" ),
									value: "left"
								}
							]}
						/>
					</BaseControl>
					<BaseControl>
						<ToggleControl
							label={__( "Show Call to Action Link" )}
							checked={attributes.sectionCtaShow}
							onChange={( value ) => setAttributes( { sectionCtaShow: value } )}
						/>
					</BaseControl>
				</Fragment>
			)}

		</PanelBody>
	);


}
