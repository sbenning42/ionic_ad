export class ArticlePicture {
    constructor(
        public id: string = '',
        public article_id: string = '',
        public url_img: string = '',
        public principal: string = ''
    ) { }

    url(base: string): string {
        return `${base}/${this.url_img}`;
    }
}