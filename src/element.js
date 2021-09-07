class Element {
    constructor(t){
        this.isRoot = false;
        this.text = t;
        this.children = [];
    }
    setAsRoot(){
        this.isRoot = true;
    }
    setText(t){
        this.text = t;
    }
    getText(){
        return this.text;
    }
    addChild(e){
        this.children.push(e);
    }
    getChildren(){
        return this.children;
    }
}

class ImageElement extends Element{
    constructor(alt, src){
        super('');
        this.alt = alt;
        this.src = src;
    }
    getAlt(){
        return this.alt;
    }
    getSrc(){
        return this.src;
    }
}

class HeadingElement extends Element {
    constructor(t, level) {
        super(t);
        this.level = level;
    }
    getLevel() {
        return this.level;
    }
}

exports.Element = Element;
exports.ImageElement = ImageElement;
exports.HeadingElement = HeadingElement;