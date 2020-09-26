import { Component, Vue } from 'vue-property-decorator';
import io from 'socket.io-client';

interface Room {
    name: string;
    users: string[];
}
@Component({
    data: () => ({
    }),
    created: function() {
        if (this.$store.state.wsUser.room) {
            this.$store.commit('nextStep', 3);
            this.$router.push({ name: 'Step3' });
            return;
        }
        if (this.$store.state.currentStep < 2) {
            this.$router.replace({ name: 'Step1' });
            return;
        }


        this.socket = this.$store.state.socket;
        this.connectWebSocket();
    },
    methods: {
        connectWebSocket: function() {
            const self = this;

            // Get rooms
            self.socket.emit('get-rooms');

            // Obtain rooms
            self.socket.on('send-rooms', (rooms: Room[]) => {
                console.log(rooms);

                self.$store.commit('setRooms', rooms);
            });
        },
        joinRoom: function(roomName) {
            const self = this;
            this.socket.emit('join-room', {
                userName: self.$store.state.userName,
                roomName
            });
            self.$store.commit('setCurrentRoom', roomName);
            this.$store.commit('nextStep', 3);
            this.$router.push({ name: 'Step3' });
        },
        createRoom: function() {
            console.log('TODO: Create room');

        }
    }
})
export default class Step2 extends Vue {}
