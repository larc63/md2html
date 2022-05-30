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
});