import { createDecorator, Vue } from 'vue-class-component'
import io from 'socket.io-client';


// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebaseApp from 'firebase/app';

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { computed, defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { State } from './store';
// import component from '*.vue';

import Card from "@/components/Card/Card.vue";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6rpojdB5jcb0-48nO6qCFOmJ1Om_qadk",
    authDomain: "scrumpoker-22.firebaseapp.com",
    databaseURL: "https://scrumpoker-22.firebaseio.com/",
    // storageBucket: "bucket.appspot.com"
};

// Initialize Firebase
firebaseApp.initializeApp(firebaseConfig);

// function Getter (getterType: string) {
//     return createDecorator((options, key) => {
//       if (!options.computed) options.computed = {}
//       options.computed[key] = function () {
//         return this.$store.getters[getterType]
//       }
//     })
// }

export default defineComponent({
    name: 'App',
    components: {
        Card
    },
    setup(props: any) {
        const store = useStore<State>();
        const database = firebaseApp.database();

        database.ref('/cards').once('value', cards => {
            console.log(cards.val());
            store.commit('setCards', cards.val());
        });

        const state = reactive({
            name: store.state.name,
            socket: io(process.env.VUE_APP_api_url)
        });

        const changeName = () => {
            store.commit('changeName', 'TTTTT');
        }

        const asd = (card: any) => {
            console.log(card);
        }
        return { state, changeName, storeState: store.state, asd }
    },

    // created() {

    //     this.state
    //     this.$store.commit('setSocket', this.socket);


    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             this.$store.commit('setUser', user.providerData);
    //         }
    //         this.$store.commit('setUser', null);
    //     });
    // }
})
