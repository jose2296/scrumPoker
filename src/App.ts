import io from 'socket.io-client';
import { Vue } from 'vue-property-decorator';

export default Vue.extend({
    data: (): { socket: any } => ({
        socket: null
    }),
    created: function() {
        this.socket = io('ws://localhost:8888');

        this.$store.commit('setSocket', this.socket)
    },
    methods: {
    }
})
