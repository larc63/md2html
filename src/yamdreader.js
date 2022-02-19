"use strict"

const {
    Post
} = require('../src/post');
class YaMdReader {
    constructor() {
        this.header;
        this.body;
    }

    parse() {}
    parseHeader() {
        let parseTags = false;
        let title, date, thumb, hero, tags = [];
        this.header.split('\n').forEach(line => {
            line = line.trim();
            console.log(line)
            if (line.startsWith('title:')) {
                parseTags = false;
                title = line.substring(6).trim();
                console.log(`title=${title}`);
            } else if (line.startsWith('date:')) {
                parseTags = false;
                date = line.substring(5).trim();
                console.log(`date=${date}`);
            } else if (line.startsWith('cover_image_small:')) {
                parseTags = false;
                thumb = line.substring('cover_image_small:'.length).trim();
                console.log(`thumb=${thumb}`);
            } else if (line.startsWith('cover_image:')) {
                parseTags = false;
                hero = line.substring('cover_image:'.length).trim();
                console.log(`hero=${hero}`);
            } else if (line.startsWith('tags:')) {
                parseTags = true;
            } else if (line.startsWith('-')) {
                tags.push(line.substring(2).trim());
                console.log(`tags=${tags}`);
            } else {
                parseTags = false;
            }
        });



        return new Post(title, date, thumb, hero, tags);
    }
}
exports.YaMdReader = YaMdReader;