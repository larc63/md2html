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
    constructor() {
        this.parsingList = false;
        this.parsingList = false;
    }

    getOpeningTag(e) {
        if (e instanceof BoldElement) {
            return ' <b>';
        } else if (e instanceof ItalicElement) {
            return ' <i>';
        } else if (e instanceof HeadingElement) {
            return `<h${e.getLevel()}>`;
        } else if (e instanceof ImageElement) {
            return `<img alt="${e.getAlt()}" src="${e.getSrc()}" />`;
        } else if (e instanceof LinkElement) {
            return ` <a href="${e.getHref()}">${e.getInnerText()}`;
        } else if (e instanceof ListElement) {
            this.parsingList = true;
            return '<li>';
        } else if (e instanceof Element) {
            if (this.parsingList === true) {
                return '';
            } else if (e.getText()) {
                return '';
            } else {
                return '<div>';
            }
        }
    }

    getClosingTag(e) {
        if (e instanceof BoldElement) {
            return '</b> ';
        } else if (e instanceof ItalicElement) {
            return '</i> ';
        } else if (e instanceof HeadingElement) {
            return `</h${e.getLevel()}>`;
        } else if (e instanceof ImageElement) {
            return '';
        } else if (e instanceof LinkElement) {
            return '</a> ';
        } else if (e instanceof ListElement) {
            this.parsingList = false;
            return '</li>';
        } else if (e instanceof Element) {
            if (this.parsingList === true) {
                return '';
            } else if (e.getText()) {
                return ''
            } else {
                return '</div>';
            }
        }
    }

    containsList(e) {
        const c = e?.getChildren();
        if (typeof c !== 'undefined') {
            for (let i = 0; i < c.length; i++) {
                const d = c[i];
                if(d instanceof ListElement){
                    return true;
                }
            }
        }
        return false;
    }

    getHTMLInner(e) {
        // get the opening tag for the e element
        let retVal = '';

        if (this.containsList(e)) {
            
        }
        
        retVal += this.getOpeningTag(e);

        retVal += e.getText() || '';

        const c = e.getChildren();
        c.forEach(child => {
            retVal += this.getHTMLInner(child);
        });

        // get the closing tag for the e element
        retVal += this.getClosingTag(e);
        return retVal;
    }

    getHTML(e) {
        let retVal = this.getHTMLInner(e);
        retVal = retVal.replaceAll('</li><li>', '|||');
        retVal = retVal.replaceAll('</li>', '</li></ul>');
        retVal = retVal.replaceAll('<li>', '<ul><li>');
        retVal = retVal.replaceAll('|||', '</li><li>');
        return retVal;
    }
}

exports.HTMLWriter = HTMLWriter;