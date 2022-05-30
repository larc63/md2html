const { 
    BoldElement,
    Element,
    HeadingElement,
    ImageElement,
    LinkElement,
    ItalicElement,
    ListElement
 } = require("./element");

class HTMLWriter {
    constructor() {}

    getOpeningTag(e) {
        if(e instanceof BoldElement){
            return '<b>';
        } else if (e instanceof ImageElement){
            return `<img alt="${e.getAlt()}" src="${e.getSrc()}" />`;
        } else if (e instanceof Element){
            if(e.getText()){
                return '<p>'
            } else {
                return '<div>';
            }
        }
    }

    getClosingTag(e) {
        if(e instanceof BoldElement){
            return '</b>';
        } else if (e instanceof ImageElement){
            return '';
        } else if (e instanceof Element){
            if(e.getText()){
                return '</p>'
            } else {
                return '</div>';
            }
        }
    }

    getHTML(e) {
        // get the opening tag for the e element
        let retVal = this.getOpeningTag(e);

        retVal += e.getText() || '';
        
        const c = e.getChildren();
        c.forEach(child => {
            retVal += this.getHTML(child);
        });
        
        // get the closing tag for the e element
        retVal += this.getClosingTag(e);
        return retVal;
    }
    // getHTML(root) {
    //     let retVal = [];
    //     root.getChildren().forEach(e => {
    //         if(e instanceof BoldElement){
    //             retVal.push(`<b>${e.getText()}</b>`);
    //         } else if (e instanceof Element){
    //             retVal.push(`<div>${e.getText()}</div>`);
    //         }
    //     });
    //     return retVal.join('\n');
    // }
}

exports.HTMLWriter = HTMLWriter;