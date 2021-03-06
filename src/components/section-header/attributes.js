/**
 * Section Header Attributes
 *
 * Merged into block attributes via helper function
 * in ../utilities.js
 *
 * !!!!!
 * N.B. Don't forget to update these in the composer package too.
 */
export default {
	sectionHeaderShow: {
		type: "boolean",
		default: false
	},
	sectionHeaderStyle: {
		type: "string",
		default: "normal"
	},
	sectionEyebrow: {
		type: "string",
		source: "html",
		selector: ".section-eyebrow"
	},
	sectionTitle: {
		type: "string",
		source: "html",
		selector: ".section-title"
	},
	sectionSubtitle: {
		type: "string",
		source: "html",
		selector: ".section-subtitle"
	},
	sectionCtaShow: {
		type: "boolean",
		default: false
	},
	sectionCtaText: {
		type: "string",
		source: "html",
		selector: ".section-cta-link"
	},
	sectionCtaLink: {
		type: "string",
		source: "attribute",
		attribute: "href",
		selector: ".section-cta-link"
	}
};
