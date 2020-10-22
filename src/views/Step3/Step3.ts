import { Vue } from 'vue-property-decorator';
import card from '../../components/Card/Card.vue';

interface Card {
    points: number;
    label: string;
    type: 'type-1' | 'type-2' | 'type-3';
}

export default Vue.extend({
    components: {
        card
    },
    data: (): { room: any; socket: any; wsUser: any; cards: Card[]; waitingUsers: boolean; userVotes: any } => ({
        room: null,
        socket: null,
        wsUser: null,
        cards: [],
        waitingUsers: false,
        userVotes: {}
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

            self.socket.emit('get-room', self.$store.state.currentRoom.id);
            // self.socket.emit('get-users-in-room', self.$store.state.currentRoom);

            // // Obtain rooms
            // self.socket.on('send-users-in-room', (users: any[]) => {
            //     console.log(users);
            //     self.users = users;
            //     // self.$store.commit('setCurrentRoom', users);
            // });

            // Obtain rooms
            self.socket.on('send-room', (roomInfo: any, cards: Card[]) => {
                console.log(roomInfo, cards);

                self.room = roomInfo;
                self.cards = cards;
                // self.$store.commit('setCurrentRoom', users);
            });


            self.socket.on('voting-started', (roomInfo: any) => {
                self.room = roomInfo;
                this.waitingUsers = false;
            });

            self.socket.on('voting-ended', (roomInfo: any) => {
                self.room = roomInfo;
            });

            self.socket.on('votes', function(data: any) {
                self.userVotes = data;
            });
        },
        handleVoteButton: function(start: boolean) {
            if (start) {
                this.socket.emit('start-voting', this.room.id);
                return;
            }
            this.socket.emit('end-voting', this.room.id);
        },
        vote: function(card: Card) {
            this.waitingUsers = true;
            this.socket.emit('vote', card.points);
        },
        handleNewVote: function () {
            this.waitingUsers = false;
            this.socket.emit('start-voting', this.room.id);
        }
    }
})
