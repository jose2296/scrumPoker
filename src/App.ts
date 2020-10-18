import { Vue } from 'vue-property-decorator';
import io from 'socket.io-client';

export default Vue.extend({
    data: (): { socket: any } => ({
        socket: null
    }),
    created: function() {
        this.socket = io('https://scrumpoker-app.herokuapp.com/');

        this.$store.commit('setSocket', this.socket)
    },
    methods: {
    }
})
