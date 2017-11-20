import { ArticlePicture } from './article-picture';

export class Article {

    pictures: ArticlePicture[];
    principale: string;

    icon: string;

    ownerName: string;
    ownerAvatar: string;

    static clone(product): Article {
        const article = new Article(
            product.id,
            product.user_id,
            product.name,
            product.description,
            product.price
        );
        article.attach(product['pictures']);
        article.owner(product['user']);
        article.computeIcon(product['state'], product['marketplaces']);
        return article;
    }

    constructor(
        public id: string = '',
        public user_id: string = '',
        public name: string = '',
        public description: string = '',
        public price: string = ''
    ) {
        this.pictures = [];
        this.principale = undefined;
    }

    attach(pictures: ArticlePicture[]) {
        this.pictures = pictures;
        this.principale = this.principalPicture(); 
    }

    detach() {
        this.pictures = [];
        this.principale = undefined;
    }

    owner(user) {
        if (!user) { return ; }
        this.ownerName = user.name;
        this.ownerAvatar = user['picture'] ? user['picture'].public_path : undefined;
    }

    computeIcon(state, marketplaces) {
        if (state && state.name === 'undefined') {
            this.icon = 'construct';
            return ;
        }
        let sold = false;
        let pending = false;
        let online = false;
        if (marketplaces) {
            marketplaces.forEach(marketplace => {
                if (!marketplace.status) { return ; }
                sold = sold ? sold : marketplace.status.name === 'Sold';
                pending = sold || pending ? pending : (marketplace.status.name === 'ToDo') ||
                    (marketplace.status.name === 'ToUpdate') ||
                    (marketplace.status.name === 'Remove');
                online = sold || pending || online ? online : marketplace.status.name === 'Online';
            });
            this.icon = sold ? 'logo-euro' :
                pending ? 'time' :
                online ? 'cloud-done' :
                'alarm';
            console.log('ICON ' + this.icon);
        } else {
            this.icon = 'alarm';
        }
    }

    principalPicture(): string {
        if (!this.pictures || this.pictures.length < 1) { return undefined; }
        const principalPicture = this.pictures.find(picture => picture.principal ? true : false);
        return principalPicture ? principalPicture.url_img : this.pictures[0].url_img;
    }
}