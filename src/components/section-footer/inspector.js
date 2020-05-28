/**
 * WordPress Dependencies
 */
const { __ }       = wp.i18n;
const { Fragment } = wp.element;
const {
		  PanelBody,
		  BaseControl,
		  SelectControl,
		  ToggleControl
	  }            = wp.components;

export default function SectionFooterInspector( { attributes, setAttributes } ) {

	return (
		<Fragment>

			<PanelBody
				title={__( "Section Footer", "bm-component-section-footer" )}
				initialOpen={false}
			>
				<ToggleControl
					label={__( "Show Section Footer", "bm-component-section-footer" )}
					checked={attributes.sectionFooterShow}
					onChange={( value ) => setAttributes( { sectionFooterShow: value } )}
				/>

				{attributes.sectionFooterShow && (
					<Fragment>
						<SelectControl
							label={__( "Alignment", "bm-component-section-footer" )}
							value={attributes.sectionFooterAlignment}
							onChange={( value ) => setAttributes( {
								sectionFooterAlignment: value
							} )}
							options={[
								{
									label: __( "Left", "bm-component-section-footer" ),
									value: "left"
								},
								{
									label: __( "Center", "bm-component-section-footer" ),
									value: "center"
								},
								{
									label: __( "Right", "bm-component-section-footer" ),
									value: "right"
								}
							]}
						/>
						<BaseControl>
							<ToggleControl
								label={__( "Show Call to Action Button", "bm-component-section-footer" )}
								checked={attributes.sectionFooterCtaShow}
								onChange={( value ) => setAttributes( { sectionFooterCtaShow: value } )}
							/>
						</BaseControl>
					</Fragment>
				)}

			</PanelBody>

		</Fragment>
	);

}
