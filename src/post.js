class Post
 {
    constructor(title, date, thumb, hero, tags){
        this.title = title;
        this.date = date;
        this.thumb = thumb;
        this.hero = hero;
        this.tags = tags;
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
    getTags() {
        return this.tags;
    }
}
exports.Post = Post;