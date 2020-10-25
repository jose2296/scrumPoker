import firebaseApp from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { State } from './store';

const firebaseConfig = {
    apiKey: process.env.VUE_APP_firebase_api_key,
    authDomain: process.env.VUE_APP_firebase_auth_domain,
    databaseURL: process.env.VUE_APP_firebase_database_url
};

// Initialize Firebase
firebaseApp.initializeApp(firebaseConfig);

export default defineComponent({
    name: 'App',
    components: {
    },
    setup() {
        const store = useStore<State>();
        const router = useRouter();

        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('User-logged');
                store.commit('setUser', user);
                router.push({ name: 'Rooms'});
                return;
            }
            console.log('User-no-logged');
            store.commit('setUser', null);
            router.push({ name: 'Login'});
        });


        return {
            state: store.state
        }
    }
});
