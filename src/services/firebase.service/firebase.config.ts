import firebaseConfig from './firebase.config.json';

export function getFirebaseConfig() {
    return {
        ...firebaseConfig,
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY!,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID!,
        appId: process.env.REACT_APP_FIREBASE_APP_ID!,
    };
}
