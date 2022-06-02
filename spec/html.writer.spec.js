const {
    BoldElement,
    Element,
    HeadingElement,
    ImageElement,
    LinkElement,
    ItalicElement,
    ListElement
} = require('../src/element');

const {
    HTMLWriter
} = require('../src/writer');

describe('writer', () => {
    const w = new HTMLWriter();
    it('paragraph', () => {
        // undefined(Element)
        // 🔲(Element)
        // 🔲🔲hello there(Element)
        const root = new Element();
        root.setAsRoot();

        const child = new Element();
        root.addChild(child);

        const child2 = new Element();
        child2.setText('hello there');
        child.addChild(child2);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><div>hello there</div></div>');
    });
    it('image', () => {
        // undefined(Element)
        // 🔲(ImageElement)
        // 🔲🔲(Element)
        const root = new Element();
        root.setAsRoot();

        const child = new ImageElement('image alt', 'somewhere.com/image.jpg');
        root.addChild(child);

        const child2 = new Element();
        child2.setText('Image text here');
        child.addChild(child2);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><img alt="image alt" src="somewhere.com/image.jpg" />Image text here</div>');
    });
    it('image and paragraph', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        // 🔲(Element)
        // 🔲🔲this is one line(Element)
        // 🔲(ImageElement)
        // 🔲🔲(Element)

        const child = new Element();
        root.addChild(child);
        const child2 = new Element();
        child2.setText('this is one line');
        child.addChild(child2);

        const child3 = new ImageElement('image alt', 'somewhere.com/image.jpg');
        root.addChild(child3);
        const child4 = new Element();
        child4.setText('Image text here');
        child3.addChild(child4);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><div>this is one line</div><img alt="image alt" src="somewhere.com/image.jpg" />Image text here</div>');
    });
    it('link and paragraph', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        // 🔲(LinkElement)
        // 🔲🔲(ImageElement)
        // 🔲🔲(Element)

        const le = new LinkElement('link text', 'http://www.lavacahacemu.com');
        root.addChild(le);

        const ie = new ImageElement('image alt', 'somewhere.com/image.jpg');
        le.addChild(ie);

        const child4 = new Element();
        child4.setText('text here');
        le.addChild(child4);

        const r = w.getHTML(root);
        expect(r).toEqual('<div> <a href="http://www.lavacahacemu.com">link text<img alt="image alt" src="somewhere.com/image.jpg" />text here</a> </div>');
    });
    it('h1', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        // 🔲this is heading 1(HeadingElement)

        const he = new HeadingElement('this is heading 1', 1);
        root.addChild(he);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><h1>this is heading 1</h1></div>');
    });
    it('h2', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        // 🔲this is heading 2(HeadingElement)

        const he = new HeadingElement('this is heading 2', 2);
        root.addChild(he);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><h2>this is heading 2</h2></div>');
    });
    it('h3', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        // 🔲this is heading 3(HeadingElement)

        const he = new HeadingElement('this is heading 3', 3);
        root.addChild(he);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><h3>this is heading 3</h3></div>');
    });
    it('h4', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        // 🔲this is heading 4(HeadingElement)

        const he = new HeadingElement('this is heading 4', 4);
        root.addChild(he);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><h4>this is heading 4</h4></div>');
    });
    it('one bullet', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        // 🔲(ListElement)
        // 🔲🔲hello there(Element)

        const le = new ListElement();
        root.addChild(le);

        const child = new Element();
        child.setText('This is a bullet');
        le.addChild(child);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><ul><li>This is a bullet</li></ul></div>');
    });
    it('two bullets', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        // 🔲(ListElement)
        // 🔲🔲hello there(Element)

        const le = new ListElement();
        root.addChild(le);

        const child = new Element();
        child.setText('This is a bullet');
        le.addChild(child);

        const le2 = new ListElement();
        root.addChild(le2);

        const child2 = new Element();
        child2.setText('This is another bullet');
        le2.addChild(child2);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><ul><li>This is a bullet</li><li>This is another bullet</li></ul></div>');
    });
    it('bullet with bold text', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        // 🔲(ListElement)
        // 🔲🔲hello(Element)
        // 🔲🔲there(BoldElement)

        const le = new ListElement();
        root.addChild(le);

        const child = new Element();
        child.setText('hello');
        le.addChild(child);

        const b = new BoldElement();
        b.setText('there');
        le.addChild(b);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><ul><li>hello <b>there</b> </li></ul></div>');
    });
    it('bullet with bold text at the beginning', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        // 🔲(ListElement)
        // 🔲🔲hello(BoldElement)
        // 🔲🔲there(Element)

        const le = new ListElement();
        root.addChild(le);

        const child = new BoldElement();
        child.setText('hello');
        le.addChild(child);

        const b = new Element();
        b.setText('there');
        le.addChild(b);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><ul><li> <b>hello</b> there</li></ul></div>');
    });
    it('bullet with 2 bold text element', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        // 🔲(ListElement)
        // 🔲🔲hello(Element)
        // 🔲🔲there(BoldElement)
        // 🔲🔲-- GENERAL(Element)
        // 🔲🔲Kenobi(BoldElement)
        // 🔲🔲!!!(Element)

        const le = new ListElement();
        root.addChild(le);

        const child = new Element();
        child.setText('hello');
        le.addChild(child);

        const b = new BoldElement();
        b.setText('there');
        le.addChild(b);

        const c = new Element();
        c.setText('-- GENERAL');
        le.addChild(c);

        const b2 = new BoldElement();
        b2.setText('Kenobi');
        le.addChild(b2);

        const c2 = new Element();
        c2.setText('!!!');
        le.addChild(c2);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><ul><li>hello <b>there</b> -- GENERAL <b>Kenobi</b> !!!</li></ul></div>');
    });
    it('paragraph with bold text at the beginning', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        // 🔲(ListElement)
        // 🔲🔲hello(BoldElement)
        // 🔲🔲there(Element)

        const le = new Element();
        root.addChild(le);

        const child = new BoldElement();
        child.setText('hello');
        le.addChild(child);

        const b = new Element();
        b.setText('there');
        le.addChild(b);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><div> <b>hello</b> there</div></div>');
    });
    it('bullet with italic text', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        // 🔲(ListElement)
        // 🔲🔲hello(Element)
        // 🔲🔲there(ItalicElement)

        const le = new ListElement();
        root.addChild(le);

        const child = new Element();
        child.setText('hello');
        le.addChild(child);

        const b = new ItalicElement();
        b.setText('there');
        le.addChild(b);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><ul><li>hello <i>there</i> </li></ul></div>');
    });
    it('bullet with bold and italic text', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        (ListElement)
        // 🔲🔲hello(Element)
        // 🔲🔲there(ItalicElement)
        // 🔲🔲this is(Element)
        // 🔲🔲bold(BoldElement)

        const le = new ListElement();
        root.addChild(le);

        const child = new Element();
        child.setText('hello');
        le.addChild(child);

        const i = new ItalicElement();
        i.setText('there');
        le.addChild(i);

        const child2 = new Element();
        child2.setText('this is');
        le.addChild(child2);

        const b = new BoldElement();
        b.setText('bold');
        le.addChild(b);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><ul><li>hello <i>there</i> this is <b>bold</b> </li></ul></div>');
    });
});