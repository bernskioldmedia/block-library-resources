/**
 * External Dependencies
 */
import classnames from "classnames";
import { focalPointToBgPos, getMediaDimensions, getMediaUrl, isColorLight } from "../../utilities/utilities";
/**
 * Internal Dependencies
 */
import applyWithColors, { applyWithFallbackStyles } from "./colors";

/**
 * WordPress Dependencies
 */
const { __ }       = wp.i18n;
const { Fragment } = wp.element;
const { compose }  = wp.compose;
const {
		  PanelColorSettings,
		  MediaUpload,
		  MediaUploadCheck,
		  BlockControls
	  }            = wp.blockEditor;
const {
		  Panel,
		  PanelBody,
		  PanelRow,
		  Dropdown,
		  Toolbar,
		  FocalPointPicker,
		  ButtonGroup,
		  IconButton,
		  Button
	  }            = wp.components;

/**
 * We allow only images for the background image selector.
 *
 * @type {string[]}
 */
const ALLOWED_MEDIA_TYPES = [ "image" ];

/**
 * Edit section experience.
 * A custom component that we wrap "section" blocks around
 * to provide them with selection markup and options.
 */
function SectionEdit( { attributes, className, backgroundColor, setBackgroundColor, children, setAttributes } ) {

	const panelColorSettings = [
		{
			value: backgroundColor.color,
			onChange: setBackgroundColor,
			label: __( "Background Color", "bm-component-section" )
		}
	];

	/**
	 * Handler for the media selection.
	 *
	 * @param media
	 */
	const onSelectMedia = ( media ) => {

		setAttributes( {
			backgroundImageUrl: getMediaUrl( media, "large" ),
			backgroundImageDimensions: getMediaDimensions( media, "large" )
		} );

	};

	/**
	 * Render the select/edit media controls.
	 *
	 * @param params
	 * @returns {*}
	 */
	const renderMediaControls = ( params ) => {

		const { open } = params;

		if ( attributes.backgroundImageUrl ) {
			return (
				<PanelRow>
					<ButtonGroup>

						<Button
							onClick={open}
							isDefault
						>
							{__( "Change Media", "bm-component-section" )}
						</Button>
						<Button
							onClick={() => {
								setAttributes( {
									backgroundImageUrl: "",
									backgroundImageFocalPoint: {
										x: 0.5,
										y: 0.5
									},
									backgroundImageDimensions: {
										height: 0,
										width: 0
									}
								} );
							}}
							isDefault
						>
							{__( "Remove Media", "bm-component-section" )}
						</Button>
					</ButtonGroup>
				</PanelRow>
			);
		} else {
			return (
				<PanelRow>
					<Button
						onClick={open}
						isDefault
					>
						{__( "Select/Upload", "bm-component-section" )}
					</Button>
				</PanelRow>
			);
		}
	};

	/**
	 * Render Toolbar Content
	 * @returns {*}
	 */
	const renderToolbarContent = () => {

		return (
			<Panel>
				<PanelColorSettings
					title={__( "Background Color", "bm-component-section" )}
					colorSettings={panelColorSettings}
					initialOpen={true}
				/>
				<PanelBody
					title={__( "Background Image", "bm-component-section" )}
					initialOpen={!! attributes.backgroundImageUrl}
					icon={attributes.backgroundImageUrl ? "format-image":""}
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectMedia}
							multiple={false}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							render={renderMediaControls}
						/>
					</MediaUploadCheck>
				</PanelBody>
				{attributes.backgroundImageUrl && (
					<PanelBody
						title={__( "Select Focal Point", "bm-component-section" )}
						initialOpen={false}
						icon="visibility"
					>
						<FocalPointPicker
							url={attributes.backgroundImageUrl}
							dimensions={attributes.backgroundImageDimensions}
							value={attributes.backgroundImageFocalPoint}
							onChange={( value ) => setAttributes( { backgroundImageFocalPoint: value } )}
						/>
					</PanelBody>
				)}
			</Panel>
		);

	};

	/**
	 * Render Toolbar
	 * @returns {*}
	 */
	const renderToolbar = () => {

		return (
			<BlockControls>
				<Toolbar>
					<Dropdown
						className="components-toolbar__control"
						position="bottom center"
						renderToggle={( { isOpen, onToggle } ) => (
							<IconButton
								label={__( "Section Background", "bm-component-section" )}
								className={classnames( "components-toolbar__control", {
									"is-active": isOpen
								} )}
								icon="art"
								onClick={onToggle}
								aria-expanded={isOpen}
							/>
						)}
						renderContent={renderToolbarContent}
					/>
				</Toolbar>
			</BlockControls>
		);
	};

	/**
	 * Get the image styles and apply to the main
	 * section, conditional on us having a figure.
	 */
	const getStyles = () => {

		let styles = {};

		if ( attributes.backgroundImageUrl ) {
			styles.backgroundImage    = `url('${attributes.backgroundImageUrl}')`;
			styles.backgroundPosition = focalPointToBgPos( attributes.backgroundImageFocalPoint );
		}

		if ( backgroundColor && undefined === backgroundColor.class && backgroundColor.color ) {
			styles.backgroundColor = backgroundColor.color;
		}

		return styles;
	};

	const classes = classnames( "section", {
		[`section-${className}`]: className,
		[backgroundColor.class]: backgroundColor && backgroundColor.class,
		"has-background-image bg-cover": attributes.backgroundImageUrl,
		"is-full-height": true === attributes.isSectionFullHeight,
		"has-carousel": true === attributes.displayAsCarousel,
		"has-header": true === attributes.sectionHeaderShow,
		"has-footer": true === attributes.sectionFooterShow,
		[`has-${attributes.sectionContentWidth}-content`]: attributes.sectionContentWidth,
		[`has-${attributes.sectionSpacing}-vspacing`]: attributes.sectionVerticalSpacing,
		"has-dark-background": backgroundColor.color && ! isColorLight( backgroundColor.color )
	} );

	return (
		<Fragment>

			{renderToolbar()}

			<section className={classes} style={getStyles()} id={attributes.anchor}>
				{children}
			</section>

		</Fragment>
	);

}

/**
 * Add the color and fallback styles support.
 */
export default compose( [
	applyWithColors,
	applyWithFallbackStyles
] )( SectionEdit );
