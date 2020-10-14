class Post {

    constructor(title) {
        this.title = title;
        this.date = new Date();
    }

    toString() {
        return JSON.stringify({
            title: this.title,
            date: this.date.toJSON()
        });
    } //возвращает объект в JSON формате 
}