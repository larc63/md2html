"use strict"

const {
    Post
} = require('../src/post');
class YaMdReader {
    constructor() {
        this.header;
        this.body;
        this.social;
    }

    setData(contents) {
        const c = contents.split('---\n');
        this.header = c[1];
        this.body = c[2];
        this.social = c.length>2? c[3] : undefined;
        this.social = this.social?.trim();
    }
    parseHeader() {
        let parseTags = false;
        let title, date, thumb, hero, description, linkinbio = false, tags = [];
        this.header.split('\n').forEach(line => {
            line = line.trim();
            // console.log(line)
            if (line.startsWith('title:')) {
                parseTags = false;
                title = line.substring(6).trim().replaceAll('"', '');
                // console.log(`title=${title}`);
            } else if (line.startsWith('date:')) {
                parseTags = false;
                date = line.substring(5).trim();
                // console.log(`date=${date}`);
            } else if (line.startsWith('description:') || line.startsWith('Description:')) {
                parseTags = false;
                line = line.toLowerCase();
                description = line.substring('description:'.length).trim();
                // console.log(`thumb=${thumb}`);
            } else if (line.startsWith('linkinbio:')) {
                parseTags = false;
                if(line.substring('linkinbio:'.length).trim() === 'true'){
                    linkinbio = true;
                }
                console.log(`linkinbio=${linkinbio}`);
            } else if (line.startsWith('cover_image_small:')) {
                parseTags = false;
                thumb = line.substring('cover_image_small:'.length).trim();
                // console.log(`thumb=${thumb}`);
            } else if (line.startsWith('cover_image:')) {
                parseTags = false;
                hero = line.substring('cover_image:'.length).trim();
                // console.log(`hero=${hero}`);
            } else if (line.startsWith('tags:')) {
                parseTags = true;
            } else if (line.startsWith('-')) {
                tags.push(line.substring(2).trim());
                // console.log(`tags=${tags}`);
            } else {
                parseTags = false;
            }
        });
        return new Post(title, date, thumb, hero, tags, description, linkinbio);
    }
}
exports.YaMdReader = YaMdReader;