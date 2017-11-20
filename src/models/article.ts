import { ArticlePicture } from './article-picture';

export class Article {

    pictures: ArticlePicture[];
    principale: string;

    icon: string;

    ownerName: string;
    ownerAvatar: string;

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
        } else if (marketplaces && marketplaces.find(mk => mk.status && mk.status.name === 'Sold')) {
            this.icon = 'logo-euro';
        } else if (marketplaces && marketplaces.find(mk => mk.status && (mk.status.name === 'ToDo' || mk.status.name === 'ToUpdate' || mk.status.name === 'Remove'))) {
            this.icon = 'time';
        } else if (marketplaces && marketplaces.find(mk => mk.status && mk.status.name === 'Online')) {
            this.icon = 'cloud-done';
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