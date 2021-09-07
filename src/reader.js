const {
    Element,
    ImageElement,
    HeadingElement
} = require('./element');
const IMAGE_PATTERN = /!\[(.*)\]\("(.*)"\)/;
const DEBUG_READER = false;
class MarkDownReader {
    constructor() {
        this.root = new Element();
    }
    parseText(t) {
        let lines = t.split('\n');
        let root = this.root;
        for (let l of lines) {
            const m = l.match(IMAGE_PATTERN);
            if (m && m.length > 0) {
                if (DEBUG_READER) {
                    console.log(`adding an image: ${l}`);
                }
                const alt = m[1];
                const src = m[2];
                root.addChild(new ImageElement(alt, src));
            } else if (l.startsWith('####')) {
                l = l.substring(5);
                if (DEBUG_READER) {
                    console.log(`adding h4: ${l}`);
                }
                root.addChild(new HeadingElement(l, 4));
            } else if (l.startsWith('###')) {
                l = l.substring(4);
                if (DEBUG_READER) {
                    console.log(`adding h3: ${l}`);
                }
                root.addChild(new HeadingElement(l, 3));
            } else if (l.startsWith('##')) {
                l = l.substring(3);
                if (DEBUG_READER) {
                    console.log(`adding h2: ${l}`);
                }
                root.addChild(new HeadingElement(l, 2));
            } else if (l.startsWith('#')) {
                l = l.substring(2);
                if (DEBUG_READER) {
                    console.log(`adding h1: ${l}`);
                }
                root.addChild(new HeadingElement(l, 1));
            } else {
                if (DEBUG_READER) {
                    console.log(`adding plain text: ${l}`);
                }
                root.addChild(new Element(l));
            }
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