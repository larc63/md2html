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
        expect(r).toEqual('<div><div><p>hello there</p></div></div>');
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
        expect(r).toEqual('<div><img alt="image alt" src="somewhere.com/image.jpg" /><p>Image text here</p></div>');
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
        expect(r).toEqual('<div><div><p>this is one line</p></div><img alt="image alt" src="somewhere.com/image.jpg" /><p>Image text here</p></div>');
    });
    it('link and paragraph', () => {
        // undefined(Element)
        const root = new Element();
        root.setAsRoot();
        // 🔲(LinkElement)
        // 🔲🔲(ImageElement)
        // 🔲🔲(Element)

        const le = new LinkElement('link text','http://www.lavacahacemu.com');
        root.addChild(le);

        const ie = new ImageElement('image alt', 'somewhere.com/image.jpg');
        le.addChild(ie);

        const child4 = new Element();
        child4.setText('text here');
        le.addChild(child4);

        const r = w.getHTML(root);
        expect(r).toEqual('<div><a href="http://www.lavacahacemu.com">link text<img alt="image alt" src="somewhere.com/image.jpg" /><p>text here</p></a></div>');
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
    // it('one bullet', () => {
    //     // undefined(Element)
    //     const root = new Element();
    //     root.setAsRoot();
    //     // 🔲(ListElement)
    //     // 🔲🔲hello there(Element)

    //     const le = new ListElement();
    //     root.addChild(le);

    //     const child4 = new Element();
    //     child4.setText('This is a bullet');
    //     le.addChild(child4);

    //     const r = w.getHTML(root);
    //     expect(r).toEqual('<div><h4>this is heading 4</h4></div>');
    // });
});