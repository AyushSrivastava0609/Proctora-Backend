const pageContentProvider = require("../provider/pageContent.provider");
const { successData } = require("../services/helper");

const getPageContent = (req, res, next) => {
    const { query } = req;
    const { slug_url } = query
    return pageContentProvider
        .getPageContents({ slug_url })
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch(next);
};

const addPageContent = (req, res, next) => {
    const {
        body: { page_name, slug_url, page_content, meta_title, meta_desc, meta_keywords },
    } = req;

    return pageContentProvider
        .addPageContent({ payload: { page_name, slug_url, page_content, meta_title, meta_desc, meta_keywords } })
        .then(() => {
            return res.status(200).send(successData("Page content addedd successfully"));
        })
        .catch(next);
};

module.exports = {
    getPageContent,
    addPageContent
};
