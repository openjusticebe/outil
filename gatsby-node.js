const fs = require("fs-extra")
const path = require("path")
//exports.onPostBuild = () => {
//  console.log("Copying locales")
//  fs.copySync(
//    path.join(__dirname, "/src/locales"),
//    path.join(__dirname, "/public/locales")
//  )
//}

exports.onCreatePage = async({ page, actions }) => {
    const { createPage } = actions;

    if (page.path.match(/^\/admin/)) {
        page.matchPath = "/admin/*";

        createPage(page);
    }
}
