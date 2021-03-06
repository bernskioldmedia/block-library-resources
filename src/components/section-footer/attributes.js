export default {
	sectionFooterShow: {
		type: "boolean",
		default: false,
	},
	sectionFooterAlignment: {
		type: "string",
		default: "center",
	},
	sectionFooterText: {
		type: "string",
		source: "html",
		selector: ".section-footer-text",
	},
	sectionFooterCtaShow: {
		type: "boolean",
		default: false,
	},
	sectionFooterCtaText: {
		type: "string",
		source: "html",
		selector: ".section-footer-cta-button",
	},
	sectionFooterCtaLink: {
		type: "string",
		source: "attribute",
		attribute: "href",
		selector: ".section-footer-cta-button",
	},
};
