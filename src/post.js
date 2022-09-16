class Post
 {
    constructor(title, date, thumb, hero, tags, description, linkInBio){
        this.title = title;
        this.date = date;
        this.thumb = thumb;
        this.hero = hero;
        this.tags = tags;
        this.description = description;
        this.linkInBio = linkInBio;
    }
    getTitle() {
        return this.title;
    }
    getDate() {
        return this.date;
    }
    getThumb() {
        return this.thumb;
    }
    getHero(){
        return this.hero;
    }
    getDescription(){
        return this.description;
    }
    getTags() {
        return this.tags;
    }
    getLinkInBio() {
        return this.linkInBio;
    }
}
exports.Post = Post;