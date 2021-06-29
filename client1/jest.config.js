module.exports = {
	watchPlugins: [
		"jest-watch-typeahead/filename",
		"jest-watch-typeahead/testname",
	],
	moduleNameMapper: {
		".+\\.(css|styl|less|sass|scss|png|jpg|gif|ttf|woff|woff2)$":
			"identity-obj-proxy",
	},
};
