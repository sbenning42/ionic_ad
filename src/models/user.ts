export class User {
    constructor(
        public id: string = '',
        public email: string = '',
        public password: string = '',
        public username: string = '',
        public first_name: string = '',
        public last_name: string = '',
        public phone: string = ''
    ) { }
}