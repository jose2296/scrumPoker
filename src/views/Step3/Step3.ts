import { Vue } from 'vue-property-decorator';
import card from '../../components/Card/Card.vue';

interface Card {
    points: number;
    label: string;
}

export default Vue.extend({
    components: {
        card
    },
    data: (): { room: any; socket: any; wsUser: any; cards: Card[]; waitingUsers: boolean; voteStatus: string; userVotes: any } => ({
        room: null,
        socket: null,
        wsUser: null,
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
        ],
        waitingUsers: false,
        voteStatus: 'ready-to-vote',
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


            self.socket.on('voting-started', (roomInfo: any) => {
                self.room = roomInfo;
                this.waitingUsers = false;
                this.voteStatus = 'voting';
            });

            self.socket.on('voting-ended', (roomInfo: any) => {
                self.room = roomInfo;
                this.voteStatus = 'voted';
            });

            self.socket.on('votes', function(data: any) {
                self.userVotes = data;
            });
        },
        handleVoteButton: function(start: boolean) {
            if (start) {
                this.voteStatus = 'voting';
                this.socket.emit('start-voting', this.room.name);
                return;
            }
            this.voteStatus = 'ended';
            this.socket.emit('end-voting', this.room.name);
        },
        vote: function(card: Card) {
            this.waitingUsers = true;
            this.socket.emit('vote', card.points);
        },
        handleNewVote: function () {
            this.waitingUsers = false;
            this.voteStatus = 'voting';
            this.socket.emit('start-voting', this.room.name);
        }
    }
})
