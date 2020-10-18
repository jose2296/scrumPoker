import { Vue } from 'vue-property-decorator';
import io from 'socket.io-client';

export default Vue.extend({
    data: (): { socket: any } => ({
        socket: null
    }),
    created: function() {
        console.log(process.env);

        this.socket = io(process.env.VUE_APP_api_url);

        this.$store.commit('setSocket', this.socket)
    },
    methods: {
    }
})
