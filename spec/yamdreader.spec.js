const fs = require('fs');
const {
    YaMdReader
} = require("../src/yamdreader");



const header = `title: "Abejita"
date: 2011/2/1 8:0:0
tags:
- musica
- insectos
cover_image: DSC02060-original.webp
cover_image_small: DSC02060-500px.webp
`;

describe('Integration', () => {
    describe("read", function () {
        let r;
        let contents;
        beforeAll(() => {
            contents = fs.readFileSync('spec/testData01/test.md', 'utf-8');
        });
        beforeEach(() => {
            r = new YaMdReader();
        });
        it("contains spec with an expectation", function () {
            expect(YaMdReader).toBeDefined;
        });
        it('split contents', () => {
            r.parse(contents);
            const ref = header.split('\n');
            const res = r.header.split('\n');
            expect(res[0]).toEqual(ref[0]);
            expect(res[1]).toEqual(ref[1]);
            expect(res[2]).toEqual(ref[2]);
            expect(res[3]).toEqual(ref[3]);
            expect(res[4]).toEqual(ref[4]);
            expect(res[5]).toEqual(ref[5]);
            expect(res[6]).toEqual(ref[6]);
            expect(res[7]).toEqual(ref[7]);
            expect(r.body.length).toEqual(861);
        });
    });
});
describe('YAMDReader', () => {
    describe("read", function () {
        let r;
        beforeEach(() => {
            r = new YaMdReader();
        });
        it("contains spec with an expectation", function () {
            expect(YaMdReader).toBeDefined;
        });
        it('full example', () => {

            r.header = header;
            const post = r.parseHeader();

            expect(post.title).toEqual('"Abejita"');
            expect(post.date).toEqual('2011/2/1 8:0:0');
            expect(post.thumb).toEqual('DSC02060-500px.webp');
            expect(post.hero).toEqual('DSC02060-original.webp');
            expect(post.tags).toEqual(['musica', 'insectos']);

        });
    });
});