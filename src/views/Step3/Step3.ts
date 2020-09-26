import { Component, Vue } from 'vue-property-decorator';
import io from 'socket.io-client';

@Component({
    data: () => ({
        users: []
    }),
    created: function() {
        if (this.$store.state.currentStep < 3) {
            this.$router.replace({ name: 'Step2' });
            return;
        }
        this.socket = this.$store.state.socket;
        this.connectWebSocket();

    },
    methods: {
        connectWebSocket: function() {
            const self = this;

            self.socket.emit('get-users-in-room', self.$store.state.currentRoom);

            // Obtain rooms
            self.socket.on('send-users-in-room', (users) => {
                console.log(users);
                self.users = users;
                // self.$store.commit('setCurrentRoom', users);
            });
        },
    }
})
export default class Step3 extends Vue {}
