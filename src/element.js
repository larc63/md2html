class Element {
    constructor(t){
        this.isRoot = false;
        this.text = t?.trim();
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

class LinkElement extends Element{
    constructor(text, href){
        super('');
        this.innertext = text;
        this.href = href;
    }
    getInnerText(){
        return this.innertext;
    }
    getHref(){
        return this.href;
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

class ListElement extends Element {
    constructor(t) {
        super(t);
    }
}

class BoldElement extends Element {
    constructor(t) {
        super(t);
    }
}

class ItalicElement extends Element {
    constructor(t) {
        super(t);
    }
}

exports.Element = Element;
exports.HeadingElement = HeadingElement;
exports.LinkElement = LinkElement;
exports.ImageElement = ImageElement;
exports.ListElement = ListElement;
exports.BoldElement = BoldElement;
exports.ItalicElement = ItalicElement;