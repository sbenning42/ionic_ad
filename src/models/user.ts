export class User {

    avatar: string;

    static clone(userApi: any): User {
        const user = new User(
            userApi.id, userApi.email,
            userApi.password, userApi.name,
            userApi.first_name, userApi.last_name,
            userApi.phone
        );
        user.attach(userApi['picture']);
        return user;
    }

    constructor(
        public id: string = '',
        public email: string = '',
        public password: string = '',
        public name: string = '',
        public first_name: string = '',
        public last_name: string = '',
        public phone: string = ''
    ) { }

    attach(picture) {
        this.avatar = picture;
    }
}