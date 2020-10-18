import { Vue } from 'vue-property-decorator';
import io from 'socket.io-client';


// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6rpojdB5jcb0-48nO6qCFOmJ1Om_qadk",
    authDomain: "scrumpoker-22.firebaseapp.com",
    databaseURL: "https://scrumpoker-22.firebaseio.com/",
    // storageBucket: "bucket.appspot.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default Vue.extend({
    data: (): { socket: any } => ({
        socket: null
    }),
    created: function() {
        this.socket = io(process.env.VUE_APP_api_url);

        this.$store.commit('setSocket', this.socket)
    }
})
