/**
 * WordPress dependencies
 */
const { withColors }         = wp.blockEditor;
const { withFallbackStyles } = wp.components;

/**
 * Adding fallback background color styles.
 */
export const applyWithFallbackStyles = withFallbackStyles( ( node, ownProps ) => {

	const { backgroundColor }  = ownProps;
	const backgroundColorValue = backgroundColor && backgroundColor.color;

	return {
		fallbackBackgroundColor: backgroundColorValue || "white",
	};
} );

/**
 * Generate block colors.
 */
const applyWithColors = withColors( "backgroundColor" );

export default applyWithColors;
