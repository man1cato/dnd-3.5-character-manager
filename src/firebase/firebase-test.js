const firebase = require('firebase');

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

let config;

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
    config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    };
} else {
    config = {
        apiKey: process.env.TEST_FIREBASE_API_KEY,
        authDomain: process.env.TEST_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.TEST_FIREBASE_DATABASE_URL,
        projectId: process.env.TEST_FIREBASE_PROJECT_ID,
        storageBucket: process.env.TEST_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.TEST_FIREBASE_MESSAGING_SENDER_ID
    };
}



firebase.initializeApp(config);

const database = firebase.database();

module.exports = {database};