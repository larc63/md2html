const {MarkDownReader} = require('./mdreader');
const {YaMdReader} = require('./yamdreader');
const {HTMLWriter} = require('./writer');

const TITLE_KEY = '%%TITLE%%';
const BODY_KEY = '%%BODY%%';

const mreader = new MarkDownReader();
const yreader = new YaMdReader();
const htmlWriter = new HTMLWriter();

const applyTemplate = (p, m, t) => {
    t = t.replace(TITLE_KEY, `<title>${p.getTitle()}</title>`);
    t = t.replace(BODY_KEY, `${htmlWriter.getHTML(m)}`);

    return t;
}

exports.getHTML = (mdContent, template) => {
    // console.log(`Contents \n\n ${mdContent}`);

    yreader.setData(mdContent);
    const postData = yreader.parseHeader();

    // console.log(JSON.stringify(postData));
    const mdTree = mreader.parseText(yreader.body);
    mreader.printTree();

    return applyTemplate(postData, mreader.getRootElement(), template);
}