import { Vue } from 'vue-property-decorator';

export default Vue.extend({
    data: (): { userName: string; socket: any } => ({
        userName: '',
        socket: null
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
                    self.socket.on('me', (user: any) => {
                        this.$store.commit('setWsUserId', user.id);
                    });
                }
                this.$store.commit('setWsUser', this.userName);
                this.$store.commit('nextStep', 2);
                this.$router.push({ name: 'Step2' });
            }
        }
    }
})
