import { Component, Vue } from 'vue-property-decorator';
import io from 'socket.io-client';

@Component({
    data: () => ({
        userName: ''
    }),
    created: function() {
        this.userName = this.$store.state.userName;
        this.socket = this.$store.state.socket;
    },
    methods: {
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
                }
                this.$store.commit('setWsUser', this.userName);
                this.$store.commit('nextStep', 2);
                this.$router.push({ name: 'Step2' });
            }
        }
    }
})
export default class Step2 extends Vue {}
