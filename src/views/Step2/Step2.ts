import { Vue } from 'vue-property-decorator';

interface Room {
    name: string;
    users: string[];
}

export default Vue.extend({
    data: (): { socket: any } => ({
        socket: null
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
                self.$store.commit('setRooms', rooms);
            });
        },
        joinRoom: function(roomId: any) {
            const self = this;
            this.socket.emit('join-room', {
                userName: self.$store.state.userName,
                roomId
            });
            self.$store.commit('setCurrentRoom', roomId);
            this.$store.commit('nextStep', 3);
            this.$router.push({ name: 'Step3' });
        },
        createRoom: function() {
            console.log('TODO: Create room');

        },
        getUsersInRoom: (users: any) => {
            if (users) {
                return Object.keys(users).length;
            }
            return 0;
        }
    }
})
