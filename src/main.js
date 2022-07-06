const {MarkDownReader} = require('./mdreader');
const {YaMdReader} = require('./yamdreader');
const {HTMLWriter} = require('./writer');

const HEADER_KEY = '%%HEADER%%';
const TITLE_KEY = '%%TITLE%%';
const BODY_KEY = '%%BODY%%';
const HERO_KEY = '%%HERO%%';

const mreader = new MarkDownReader();
const yreader = new YaMdReader();
const htmlWriter = new HTMLWriter();

const applyTemplate = (p, m, t) => {
    t = t.replace(HEADER_KEY, `<title>${p.getTitle()}</title>`);
    t = t.replace(TITLE_KEY, `${p.getTitle()}`);
    t = t.replace(BODY_KEY, `${htmlWriter.getHTML(m)}`);
    t = t.replace(HERO_KEY, `<img src="${p.getHero()}">`);

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