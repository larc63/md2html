const { MarkDownReader } = require("../src/reader");

describe("read", function () {
    let r;
    it("contains spec with an expectation", function () {
        expect(MarkDownReader).toBeDefined;
    });
    beforeEach(() => {
        r = new MarkDownReader();
    });
    it("read a one liner", function () {
        r.parseText('hello there');
        const e = r.getElementRoot();
    })
});
