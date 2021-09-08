const {
    Element,
    HeadingElement,
    ImageElement,
    ListElement
} = require('./element');
const IMAGE_PATTERN = /!\[(.*)\]\("(.*)"\)/;
const BOLD_PATTERN = /\*\*(.*)\*\*/;
const ITALIC_PATTERN = /\*(.*)\*/;
const DEBUG_READER = false;
class MarkDownReader {
    constructor() {
        this.root = new Element();
    }
    parseText(t) {
        let lines = t.split('\n');
        let root = this.root;
        let e;
        for (let l of lines) {
            const imageMatcher = l.match(IMAGE_PATTERN);
            if (imageMatcher && imageMatcher.length > 0) {
                if (DEBUG_READER) {
                    console.log(`adding an image: ${l}`);
                }
                const alt = imageMatcher[1];
                const src = imageMatcher[2];
                e = new ImageElement(alt, src);
            } else if (l.startsWith('* ')) {
                l = l.substring(2);
                if (DEBUG_READER) {
                    console.log(`adding bullet: ${l}`);
                }
                e = new ListElement(l);
            } else if (l.startsWith('####')) {
                l = l.substring(5);
                if (DEBUG_READER) {
                    console.log(`adding h4: ${l}`);
                }
                e = new HeadingElement(l, 4);
            } else if (l.startsWith('###')) {
                l = l.substring(4);
                if (DEBUG_READER) {
                    console.log(`adding h3: ${l}`);
                }
                e = new HeadingElement(l, 3);
            } else if (l.startsWith('##')) {
                l = l.substring(3);
                if (DEBUG_READER) {
                    console.log(`adding h2: ${l}`);
                }
                e = new HeadingElement(l, 2);
            } else if (l.startsWith('#')) {
                l = l.substring(2);
                if (DEBUG_READER) {
                    console.log(`adding h1: ${l}`);
                }
                e = new HeadingElement(l, 1);
            } else {
                if (DEBUG_READER) {
                    console.log(`adding plain text: ${l}`);
                }
                e = new Element(l);
            }
            // add the identified child(ren)
            root.addChild(e);
        }
    }
    getStructure() {
        return root;
    }
    getRootElement() {
        return this.root;
    }
};
exports.MarkDownReader = MarkDownReader;