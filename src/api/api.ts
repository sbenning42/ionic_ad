const devBaseApi = 'http://laravelback.app';
const preprodBaseApi = 'http://preprod.myauthenticdesign.fr';
const prodBaseApi = 'http://api.authenticdesign.fr';

const dev = 0;
const preprod = 1;
const prod = 2; 
const basesApi = [devBaseApi, preprodBaseApi, prodBaseApi];

export const mode = preprod;
export const baseApi = basesApi[mode];
export const basePicturesApi = `${baseApi}/public/storage/`;
export const baseLogoApi = `${baseApi}/public/storage/images/logos/marketplaces/`;

export const loginApi = `${baseApi}/api/login`;
export const logoutApi = `${baseApi}/api/logout`;

export const stockApi = `${baseApi}/api/private-products`;
export const sharedApi = `${baseApi}/api/shared-gallery`;

export const annexeApi = `${baseApi}/api/annexes`;

export const channelsApi = `${baseApi}/api/me/marketplaces/contracted`;
export const channelsPublishApi = `${baseApi}/api/mypush`;
