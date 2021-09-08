const { ImageElement, HeadingElement, ListElement } = require("../src/element");
const { MarkDownReader } = require("../src/reader");

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
        const e = root.getChildren()[0];
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

        const pt = children[0];
        expect(pt.getText()).toEqual('this is one line');

        const image = children[1];
        expect(image).toBeInstanceOf(ImageElement);
        expect(image.getAlt()).toEqual(alt);
        expect(image.getSrc()).toEqual(src);
    });
    it("read a h1", function () {
        r.parseText('# hello there');
        const root = r.getRootElement();
        const e = root.getChildren()[0];
        expect(e.getText()).toEqual('hello there');
        expect(e.getLevel()).toEqual(1);
    });
    it("read a h2", function () {
        r.parseText('## hello there');
        const root = r.getRootElement();
        const e = root.getChildren()[0];
        expect(e).toBeInstanceOf(HeadingElement);
        expect(e.getText()).toEqual('hello there');
        expect(e.getLevel()).toEqual(2);
    });
    it("read a h3", function () {
        r.parseText('### hello there');
        const root = r.getRootElement();
        const e = root.getChildren()[0];
        expect(e).toBeInstanceOf(HeadingElement);
        expect(e.getText()).toEqual('hello there');
        expect(e.getLevel()).toEqual(3);
    });
    it("read a h4", function () {
        r.parseText('#### hello there');
        const root = r.getRootElement();
        const e = root.getChildren()[0];
        expect(e).toBeInstanceOf(HeadingElement);
        expect(e.getText()).toEqual('hello there');
        expect(e.getLevel()).toEqual(4);
    });
    it("read a bullet", function () {
        r.parseText('* hello there');
        const root = r.getRootElement();
        const e = root.getChildren()[0];
        expect(e).toBeInstanceOf(ListElement);
        expect(e.getText()).toEqual('hello there');
    });
});
