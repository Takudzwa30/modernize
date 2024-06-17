import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAnDJJC3MQXMnu_DQv_CURxexmlFkiL3Fs",
  authDomain: "modernize-eb7ad.firebaseapp.com",
  databaseURL: "https://modernize-eb7ad-default-rtdb.firebaseio.com",
  projectId: "modernize-eb7ad",
  storageBucket: "modernize-eb7ad.appspot.com",
  messagingSenderId: "1019700971910",
  appId: "1:1019700971910:web:249cc04986b8d74a30c407",
  measurementId: "G-MV9WDFPW5J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
