import { ArticlePicture } from './article-picture';
import { User } from './user';

export class Article {

    baseProduct: any;

    pictures: ArticlePicture[];
    principale: string;

    feChannels: any[];
    mkChannels: any[];

    icon: string;

    owner: User;
    ownerName: string;
    ownerAvatar: string;
    ownerTel: string;

    category: string;
    style: string;
    period: string;
    condition: string;
    designer: string;
    brand: string;
    material: string;
    color: string;

    alreadyAnnexed: boolean;
    alreadySold: boolean;

    static clone(product): Article {
        const article = new Article(
            product.id,
            product.user_id,
            product.name,
            product.description,
            product.price,
            product.size_width,
            product.size_height,
            product.size_depth,
            product.weight,
            product.category_id,
            product.style_id,
            product.periods_id,
            product.condition_id,
            product.designer_id,
            product.brand_id,
            product.material_id,
            product.color_id,
        );
        article.baseProduct = product;
        article.annexe(product);
        article.computeChannels(product);
        article.attach(product['pictures']);
        article.computeOwner(product['user']);
        article.computeIcon(product['state'], product['marketplaces']);
        return article;
    }

    static cloneFromAnnexe(product, annexe): Article {
        const article = new Article(
            product.id,
            product.user_id,
            product.name,
            product.description,
            product.price,
            product.size_width,
            product.size_height,
            product.size_depth,
            product.weight,
            product.category_id,
            product.style_id,
            product.periods_id,
            product.condition_id,
            product.designer_id,
            product.brand_id,
            product.material_id,
            product.color_id,
        );
        article.baseProduct = product;
        article.annexeFromAnnexe(annexe);
        article.computeChannels(product);
        article.attach(product['pictures']);
        article.computeOwner(product['user']);
        article.computeIcon(product['state'], product['marketplaces']);
        return article;
    }

    constructor(
        public id: string = '',
        public user_id: string = '',
        public name: string = '',
        public description: string = '',
        public price: string = '',
        public size_width: string = '',
        public size_height: string = '',
        public size_depth: string = '',
        public weight: string = '',
        public category_id: string = '',
        public style_id: string = '',
        public periods_id: string = '',
        public condition_id: string = '',
        public designer_id: string = '',
        public brand_id: string = '',
        public material_id: string = '',
        public color_id: string = '',
    ) {
        this.pictures = [];
        this.principale = undefined;
    }

    annexe(product) {
        this.category = product['category'] ? product['category'].name : '';
        this.style = product['style'] ? product['style'].name : '';
        this.period = product['periods'] ? product['periods'].name : '';
        this.condition = product['condition'] ? product['condition'].name : '';
        this.designer = product['designer'] ? product['designer'].name : '';
        this.brand = product['brand'] ? product['brand'].name : '';
        this.material = product['material'] ? product['material'].name : '';
        this.color = product['color'] ? product['color'].name : '';
    }

    annexeFromAnnexe(annexe: any) {

        const category = annexe['categories'] ? annexe['categories'].find(categoryFind => +categoryFind.id === +this.category_id) : undefined;
        const style = annexe['styles'] ? annexe['styles'].find(styleFind => +styleFind.id === +this.style_id) : undefined;
        const period = annexe['periods'] ? annexe['periods'].find(periodFind => +periodFind.id === +this.periods_id) : undefined;
        const condition = annexe['conditions'] ? annexe['conditions'].find(conditionFind => +conditionFind.id === +this.condition_id) : undefined;
        const designer = annexe['designers'] ? annexe['designers'].find(designerFind => +designerFind.id === +this.designer_id) : undefined;
        const brand = annexe['brands'] ? annexe['brands'].find(brandFind => +brandFind.id === +this.brand_id) : undefined;
        const material = annexe['materials'] ? annexe['materials'].find(materialFind => +materialFind.id === +this.material_id) : undefined;
        const color = annexe['colors'] ? annexe['colors'].find(colorFind => +colorFind.id === +this.color_id) : undefined;

        this.category = category ? category.name : '';
        this.style = style ? style.name : '';
        this.period = period ? period.name : '';
        this.condition = condition ? condition.name : '';
        this.designer = designer ? designer.name : '';
        this.brand = brand ? brand.name : '';
        this.material = material ? material.name : '';
        this.color = color ? color.name : '';

        this.alreadyAnnexed = true;
    }

    attach(pictures: ArticlePicture[]) {
        this.pictures = pictures;
        if (this.principale = this.principalPicture()) {
            this.pictures = pictures.filter(picture => picture.url_img !== this.principale);
        } 
    }

    detach() {
        this.pictures = [];
        this.principale = undefined;
    }

    computeChannels(product: any) {
        this.mkChannels = [];
        this.feChannels = [];
        if (!product['marketplaces']) { return ; }
        (this.mkChannels = product['marketplaces'].filter(ch => ch.type === 1 || ch.type === 3))
            .forEach(mk => {
                mk.statusName = mk['status'] ? mk['status'].name : undefined;
                this.alreadySold = this.alreadySold ? true : mk['status'] && mk['status'].name === 'Sold';
            });
        (this.feChannels = product['marketplaces'].filter(ch => ch.type === 2))
            .forEach(fe => {
                fe.statusName = fe['status'] ? fe['status'].name : undefined;
                this.alreadySold = this.alreadySold ? true : fe['status'] && fe['status'].name === 'Sold';
            });
    }

    computeOwner(user) {
        if (!user) { return ; }
        this.ownerName = user.name;
        this.ownerTel = user.phone;
        this.ownerAvatar = user['picture'] ? user['picture'].public_path : undefined;
        this.owner = User.clone(user);
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
                pending = sold || pending ? pending : (marketplace.status.name === 'To Do') ||
                    (marketplace.status.name === 'To Update') ||
                    (marketplace.status.name === 'Remove');
                online = sold || pending || online ? online : marketplace.status.name === 'Online';
            });
            this.icon = sold ? 'logo-euro' :
                pending ? 'time' :
                online ? 'cloud-done' :
                'pause';
            console.log('ICON ' + this.icon);
        } else {
            this.icon = 'pause';
        }
    }

    principalPicture(): string {
        if (!this.pictures || this.pictures.length < 1) { return undefined; }
        const principalPicture = this.pictures.find(picture => picture.principal ? true : false);
        return principalPicture ? principalPicture.url_img : this.pictures[0].url_img;
    }
}