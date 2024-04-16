const {
    BoldElement,
    Element,
    HeadingElement,
    ImageElement,
    LinkElement,
    ItalicElement,
    ListElement
} = require('./element');
const IMAGE_PATTERN = /!\[(.*)\]\((.*)\)/;
const LINK_PATTERN = /\[(.*)\]\((.*)\)/;
const DEBUG_READER = false;
class MarkDownReader {
    constructor() {
        this.root = new Element();
        this.root.setAsRoot();
        this.description;
    }

    parseTextInner(e) {
        let i = 0;
        let t = e.getText().replaceAll('**', '~b');
        e.setText('');
        t = t.replaceAll('*', '~i');
        if (DEBUG_READER) {
            console.log(`${t}\n`);
        }
        do {
            if (DEBUG_READER) {
                console.log(`${i} - ${t}`);
            }
            let startB = t.indexOf('~b');
            let startI = t.indexOf('~i');
            let s;
            if (startB === -1 && startI === -1) { // no more tags left
                if (DEBUG_READER) {
                    console.log('A');
                }
                e.addChild(new Element(t));
                break;
            } else if (startB === 0 || startI === 0) { // tags are at the beginning
                // consume the token
                if (DEBUG_READER) {
                    console.log('B');
                }
                t = t.substring(2);
                if (startB === 0) {
                    s = t.substring(0, t.indexOf('~b'));
                    e.addChild(new BoldElement(s));
                } else {
                    s = t.substring(0, t.indexOf('~i'));
                    e.addChild(new ItalicElement(s));
                }
                t = t.substring(s.length + 2);
            } else { // plain text at the beginning
                if (DEBUG_READER) {
                    console.log('C');
                }
                startB = startB === -1 ? 9999 : startB;
                startI = startI === -1 ? 9999 : startI;
                if (startB < startI) {
                    s = t.substring(0, startB);
                } else {
                    s = t.substring(0, startI);
                }
                e.addChild(new Element(s));
                t = t.substring(s.length);
            }
            i++;
        } while (t.length > 0);
    }

    parseText(t) {
        let lines = t.split('\n');
        let e;
        for (let l of lines) {
            const imageMatcher = l.match(IMAGE_PATTERN);
            const linkMatcher = l.match(LINK_PATTERN);
            if (imageMatcher && imageMatcher.length > 0 && l.startsWith('![')) {
                if (DEBUG_READER) {
                    console.log(`adding an image: ${l}`);
                }
                const alt = imageMatcher[1];
                const src = imageMatcher[2];
                e = new ImageElement(alt, src);
            } else if (linkMatcher && linkMatcher.length > 0) {
                if (DEBUG_READER) {
                    console.log(`adding a link: ${l}`);
                }
                const text = linkMatcher[1];
                const href = linkMatcher[2];
                const imgMatch = text.match(IMAGE_PATTERN);
                if (imgMatch && imgMatch.length > 0) {
                    if (DEBUG_READER) {
                        console.log(`adding an image: ${text}`);
                    }
                    e = new LinkElement('', href);
                    const alt = imgMatch[1];
                    const src = imgMatch[2];
                    const f = new ImageElement(alt, src);
                    e.addChild(f);
                } else {
                    if (DEBUG_READER) {
                        console.log(`adding a link with text: ${text}`);
                    }
                    e = new LinkElement(text, href);
                }
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
            if (!(e instanceof HeadingElement)) {
                this.parseTextInner(e);
            }
            this.root.addChild(e);
            if (DEBUG_READER) {
                this.printTree();
            }
        }
    }
    getStructure() {
        return root;
    }
    getRootElement() {
        return this.root;
    }
    print(pre, e){
        console.log(`${pre}${e.getText()}(${e.constructor.name})`);
        e.getChildren().forEach(element => {
            this.print(`${pre}🔲`, element);
        });
    }
    printTree() {
        let pre = '';
        this.print(pre, this.root);
    }
};
exports.MarkDownReader = MarkDownReader;