// const fs = require('fs');
const {
    YaMdReader
} = require("../src/yamdreader");


// xdescribe('Integration', () => {
//     describe("read", function () {
//         let r;
//         let contents;
//         // before(() => {
//         //     contents = fs.readFileSync('./test.md', 'utf-8');
//         // });
//         beforeEach(() => {
//             r = new YaMdReader();
//         });
//         it("contains spec with an expectation", function () {
//             expect(YaMdReader).toBeDefined;
//         });
//     });
// });
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
            const header = `title: "Abejita"
            date: 2011/2/1 8:0:0
            tags:
            - musica
            - insectos
            cover_image: DSC02060-original.webp
            cover_image_small: DSC02060-500px.webp`;

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