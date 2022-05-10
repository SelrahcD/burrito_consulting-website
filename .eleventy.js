const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {  // Set custom directories for input, output, includes, and data

    eleventyConfig.setUseGitIgnore(false);

    eleventyConfig.addWatchTarget("./_tmp/style.css");

    eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });

    eleventyConfig.addShortcode("version", function () {
        return String(Date.now());
    });

    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
        if (
            process.env.ELEVENTY_PRODUCTION &&
            outputPath &&
            outputPath.endsWith(".html")
        ) {
            return htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });
        }

        return content;
    });

    return {
        dir:
            {
                input: "src",
                includes: "_includes",
                data: "_data",
                output: "_site"
            }
    };
};