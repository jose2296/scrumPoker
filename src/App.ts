import { Component, Vue } from 'vue-property-decorator';
import io from 'socket.io-client';

@Component({
    data: () => ({
    }),
    created: function() {
        this.socket = io('ws://localhost:8888');

        this.$store.commit('setSocket', this.socket)
    },
    methods: {
    }
})
export default class Step2 extends Vue {}
