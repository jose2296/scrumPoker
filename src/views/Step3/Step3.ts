import { Vue } from 'vue-property-decorator';

interface Card {
    points: number;
    label: string;
}

export default Vue.extend({
    data: (): { room: any; socket: any; wsUser: any; isVoting: boolean; cards: Card[] } => ({
        room: null,
        socket: null,
        wsUser: null,
        isVoting: false,
        cards: [
            {
                label: '1',
                points: 1
            },
            {
                label: '2',
                points: 2
            },
            {
                label: '3',
                points: 3
            }
        ]
    }),
    created: function() {
        if (this.$store.state.currentStep < 3) {
            this.$router.replace({ name: 'Step2' });
            return;
        }
        this.socket = this.$store.state.socket;
        this.wsUser = this.$store.state.wsUser;
        this.connectWebSocket();

    },
    methods: {
        connectWebSocket: function() {
            const self = this;

            self.socket.emit('get-room', self.$store.state.currentRoom);
            // self.socket.emit('get-users-in-room', self.$store.state.currentRoom);

            // // Obtain rooms
            // self.socket.on('send-users-in-room', (users: any[]) => {
            //     console.log(users);
            //     self.users = users;
            //     // self.$store.commit('setCurrentRoom', users);
            // });

            // Obtain rooms
            self.socket.on('send-room', (roomInfo: any) => {
                self.room = roomInfo;
                // self.$store.commit('setCurrentRoom', users);
            });


            self.socket.on('voting-stated', (roomInfo: any) => {
                self.room = roomInfo;

                console.log('voting-stated');
                this.isVoting = true;
            });

            self.socket.on('voting-ended', (roomInfo: any) => {
                self.room = roomInfo;

                console.log('voting-ended', roomInfo);
                this.isVoting = false;
            });
        },
        handleVoteButton: function() {
            console.log(this.room.isVoting);
            if (!this.room.isVoting) {
                this.socket.emit('start-voting', this.room.name);
                return;
            }
            this.socket.emit('end-voting', this.room.name);
        },
        vote: function(points: number) {
            console.log(points);
            this.socket.emit('vote', points);
        }
    }
})
