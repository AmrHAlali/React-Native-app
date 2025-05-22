import { Client, Account, Avatars, Databases } from 'react-native-appwrite';

export const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('682b3c01003499998c93')
    .setPlatform('com.amr.book');

    export const account = new Account(client);
    export const avatars = new Avatars(client);
    export const databases = new Databases(client);
    