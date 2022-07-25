class Post
 {
    constructor(title, date, thumb, hero, tags, description){
        this.title = title;
        this.date = date;
        this.thumb = thumb;
        this.hero = hero;
        this.tags = tags;
        this.description = description;
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
}
exports.Post = Post;