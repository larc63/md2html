const {
    BoldElement,
    Element,
    HeadingElement,
    ImageElement,
    LinkElement,
    ItalicElement,
    ListElement
} = require("../src/element");
const {
    MarkDownReader
} = require("../src/mdreader");

describe("read", function () {
    let r;
    beforeEach(() => {
        r = new MarkDownReader();
    });
    it("contains spec with an expectation", function () {
        expect(MarkDownReader).toBeDefined;
    });

    it("read a one liner", function () {
        r.parseText('hello there');
        const root = r.getRootElement();
        const e = root.getChildren()[0].getChildren()[0];
        expect(e.getText()).toEqual('hello there');
    });
    it("read a single image", function () {
        const alt = 'some descriptive text';
        const src = 'path/to/image.png';
        r.parseText(`![${alt}]("${src}")`);
        const root = r.getRootElement();
        const e = root.getChildren()[0];
        expect(e).toBeInstanceOf(ImageElement);
        expect(e.getAlt()).toEqual(alt);
        expect(e.getSrc()).toEqual(src);
    });
    it("read a single image", function () {
        const alt = 'some descriptive text';
        const src = 'path/to/image.png';
        r.parseText(`this is one line\n![${alt}]("${src}")`);
        const root = r.getRootElement();
        const children = root.getChildren();
        expect(children.length).toEqual(2);

        const pt = children[0].getChildren()[0];
        expect(pt.getText()).toEqual('this is one line');

        const image = children[1];
        expect(image).toBeInstanceOf(ImageElement);
        expect(image.getAlt()).toEqual(alt);
        expect(image.getSrc()).toEqual(src);
    });
    it("read a single link with an image", function () {
        const href = 'path/to/image.png';
        const alt = 'some descriptive text';
        const src = 'path/to/image.png';
        const img = `![${alt}]("${src}")`;

        r.parseText(`[${img}](${href})`);
        const root = r.getRootElement();
        const children = root.getChildren();
        expect(children.length).toEqual(1);

        const link = children[0];
        expect(link).toBeInstanceOf(LinkElement);
        expect(link.getInnerText()).toEqual('');
        expect(link.getHref()).toEqual(href);

        const image = link.getChildren()[0];
        expect(image).toBeInstanceOf(ImageElement);
        expect(image.getAlt()).toEqual(alt);
        expect(image.getSrc()).toEqual(src);
    });
    it("read a single link", function () {
        const text = 'some descriptive text';
        const href = 'path/to/image.png';

        r.parseText(`[${text}](${href})`);
        const root = r.getRootElement();
        const children = root.getChildren();
        expect(children.length).toEqual(1);

        const link = children[0];
        expect(link).toBeInstanceOf(LinkElement);
        expect(link.getInnerText()).toEqual(text);
        expect(link.getHref()).toEqual(href);
    });
    it("read a h1", function () {
        r.parseText('# hello there');
        const root = r.getRootElement();
        const e = root.getChildren()[0];
        expect(e.getChildren()[0].getText()).toEqual('hello there');
        expect(e.getLevel()).toEqual(1);
    });
    it("read a h2", function () {
        r.parseText('## hello there');
        const root = r.getRootElement();
        const e = root.getChildren()[0];
        expect(e).toBeInstanceOf(HeadingElement);
        expect(e.getChildren()[0].getText()).toEqual('hello there');
        expect(e.getLevel()).toEqual(2);
    });
    it("read a h3", function () {
        r.parseText('### hello there');
        const root = r.getRootElement();
        const e = root.getChildren()[0];
        expect(e).toBeInstanceOf(HeadingElement);
        expect(e.getChildren()[0].getText()).toEqual('hello there');
        expect(e.getLevel()).toEqual(3);
    });
    it("read a h4", function () {
        r.parseText('#### hello there');
        const root = r.getRootElement();
        const e = root.getChildren()[0];
        expect(e).toBeInstanceOf(HeadingElement);
        expect(e.getChildren()[0].getText()).toEqual('hello there');
        expect(e.getLevel()).toEqual(4);
    });
    it("read a bullet", function () {
        r.parseText('* hello there');
        const root = r.getRootElement();
        const e = root.getChildren()[0];
        expect(e).toBeInstanceOf(ListElement);
        expect(e.getChildren()[0].getText()).toEqual('hello there');
    });
    it("read 2 bullets", function () {
        r.parseText('* hello there\n* General Kenobi!');
        const root = r.getRootElement();
        const e = root.getChildren()[0];
        expect(e).toBeInstanceOf(ListElement);
        expect(e.getChildren()[0].getText()).toEqual('hello there');
        const f = root.getChildren()[1];
        expect(f).toBeInstanceOf(ListElement);
        expect(f.getChildren()[0].getText()).toEqual('General Kenobi!');
    });
    it("a bullet with bold text", function () {
        r.parseText('* hello **there**');
        const root = r.getRootElement();
        const list = root.getChildren()[0];
        expect(list).toBeInstanceOf(ListElement);
        expect(list.getChildren()[0].getText()).toEqual('hello');
        const c = list.getChildren()[1];
        expect(c).toBeInstanceOf(BoldElement);
        expect(c.getText()).toEqual('there');
        expect(root.getChildren().length).toEqual(1);
        expect(list.getChildren().length).toEqual(2);
    });
    it("a bullet with bold text at the beginning", function () {
        r.parseText('* **hello** there');
        const root = r.getRootElement();
        const e = root.getChildren()[0];
        expect(e).toBeInstanceOf(ListElement);
        expect(e.getText()).toEqual('');

        let c = e.getChildren()[0];
        expect(c).toBeInstanceOf(BoldElement);
        expect(c.getText()).toEqual('hello');

        c = e.getChildren()[1];
        expect(c).toBeInstanceOf(Element);
        expect(c.getText()).toEqual('there');

        expect(e.getChildren().length).toEqual(2);
    });
    it("a paragraph with bold text at the beginning", function () {
        r.parseText('**hello** there');
        const root = r.getRootElement();
        const e = root.getChildren()[0];
        expect(e).toBeInstanceOf(Element);
        expect(e.getText()).toEqual('');

        let c = e.getChildren()[0];
        expect(c).toBeInstanceOf(BoldElement);
        expect(c.getText()).toEqual('hello');

        c = e.getChildren()[1];
        expect(c).toBeInstanceOf(Element);
        expect(c.getText()).toEqual('there');

        expect(e.getChildren().length).toEqual(2);
    });

    it("a bullet with 2 bold sections text", function () {
        r.parseText('* hello **there** -- GENERAL **Kenobi**!!!');
        const root = r.getRootElement();
        let p = root.getChildren()[0];
        expect(p).toBeInstanceOf(ListElement);
        expect(p.getText()).toEqual('');
        let e = p.getChildren()[0];
        expect(e).toBeInstanceOf(Element);
        expect(e.getText()).toEqual('hello');
        e = p.getChildren()[1];
        expect(e).toBeInstanceOf(BoldElement);
        expect(e.getText()).toEqual('there');
        e = p.getChildren()[2];
        expect(e).toBeInstanceOf(Element);
        expect(e.getText()).toEqual('-- GENERAL');
        e = p.getChildren()[3];
        expect(e).toBeInstanceOf(BoldElement);
        expect(e.getText()).toEqual('Kenobi');
        e = p.getChildren()[4];
        expect(e).toBeInstanceOf(Element);
        expect(e.getText()).toEqual('!!!');
        expect(p.getChildren().length).toEqual(5);
    });
    it("a bullet with italic text", function () {
        r.parseText('* hello *there*');
        const root = r.getRootElement();
        let list = root.getChildren()[0];
        expect(list).toBeInstanceOf(ListElement);
        expect(list.getText()).toEqual('');

        let e = list.getChildren()[0];
        expect(e).toBeInstanceOf(Element);
        expect(e.getText()).toEqual('hello');

        e = list.getChildren()[1];
        expect(e).toBeInstanceOf(ItalicElement);
        expect(e.getText()).toEqual('there');
        expect(root.getChildren().length).toEqual(1);
    });
    it("a bullet with italic and bold text", function () {
        r.parseText('* hello *there* this is **bold**');
        const root = r.getRootElement();
        let list = root.getChildren()[0];
        expect(list).toBeInstanceOf(ListElement);
        expect(list.getText()).toEqual('');
        let e = list.getChildren()[0];
        expect(e).toBeInstanceOf(Element);
        expect(e.getText()).toEqual('hello');
        e = list.getChildren()[1];
        expect(e).toBeInstanceOf(ItalicElement);
        expect(e.getText()).toEqual('there');
        e = list.getChildren()[2];
        expect(e).toBeInstanceOf(Element);
        expect(e.getText()).toEqual('this is');
        e = list.getChildren()[3];
        expect(e).toBeInstanceOf(Element);
        expect(e.getText()).toEqual('bold');
        expect(root.getChildren().length).toEqual(1);
    });
});