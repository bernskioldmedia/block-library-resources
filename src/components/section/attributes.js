/**
 * !!!!!
 * N.B. Don't forget to make any changes here to the composer PHP library too.
 */
export default {
	backgroundColor: {
		type: "string"
	},
	customBackgroundColor: {
		type: "string"
	},
	backgroundImageUrl: {
		type: "string"
	},
	backgroundImageFocalPoint: {
		type: "object",
		default: {
			x: 0.5,
			y: 0.5
		}
	},
	backgroundImageDimensions: {
		type: "object",
		default: {
			width: 0,
			height: 0
		}
	},
	isSectionFullHeight: {
		type: "boolean",
		default: false
	},
	sectionContentWidth: {
		type: "string",
		default: "full"
	},
	sectionSpacing: {
		type: "string",
		default: "normal"
	}
};
