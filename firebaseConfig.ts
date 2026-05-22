import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDMYT2OU61xZ9EInDWeG4uBFHmOreDZ2Hs",
  authDomain: "farmer-marketplace-eabd0.firebaseapp.com",
  projectId: "farmer-marketplace-eabd0",
  storageBucket: "farmer-marketplace-eabd0.firebasestorage.app",
  messagingSenderId: "604973002941",
  appId: "1:604973002941:web:6e1d3e0d264ef4198787d4",
  measurementId: "G-9K8EX2HDYH"
};

export const app = initializeApp(firebaseConfig);