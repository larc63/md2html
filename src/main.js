const {MarkDownReader} = require('./mdreader');
const {YaMdReader} = require('./yamdreader');
const {HTMLWriter} = require('./writer');


const mreader = new MarkDownReader();
const yreader = new YaMdReader();

exports.getHTML = (mdContent, template) => {
    console.log(`Contents \n\n ${mdContent}`);
    const mdTree = mreader.parseText(mdContent);
    mreader.printTree();
}