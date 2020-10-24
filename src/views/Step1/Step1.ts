import { Vue } from 'vue-property-decorator';
import card from '../../components/Card/Card.vue';
import * as firebase from "firebase/app";

export default Vue.extend({
    components: {
        card
    },
    data: (): { userName: string; socket: any; email: string; password: string; showLogin: boolean } => ({
        userName: '',
        socket: null,
        email: '',
        password: '',
        showLogin: true
    }),
    created: function() {
        this.userName = this.$store.state.userName;
        this.socket = this.$store.state.socket;

        if (this.$store.state.user) {

        }
    },
    methods: {
        logout: function() {
            firebase.auth().signOut();
        },
        register: function(e: Event) {
            e.preventDefault();
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
                console.error(error);
            });
        },
        login: function(e: Event) {
            e.preventDefault();
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
                console.error(error);

              });
        },
        setUserName: function() {
            this.$store.commit('setUserName', this.userName);
            if (!this.userName) {
                this.$store.commit('nextStep', 1);
            }
        },
        nextStep: function() {
            const self = this;
            if (this.userName) {
                if (this.$store.state.wsUser.userName) {
                    this.socket.emit('update-user', this.userName);
                } else {
                    self.socket.emit('new-user', this.userName);
                    self.socket.on('me', (user: any) => {
                        this.$store.commit('setWsUser', user);
                    });
                }
                // this.$store.commit('setWsUser', this.userName);
                this.$store.commit('nextStep', 2);
                this.$router.push({ name: 'Step2' });
            }
        }
    }
})
