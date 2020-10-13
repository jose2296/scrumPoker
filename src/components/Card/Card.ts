import { Vue } from 'vue-property-decorator';

export default Vue.extend({
    name: 'Card',
    props: [
        'data',
        'disabled'
    ],
    data: () => ({
        flipped: true
    }),
    methods: {
        cardClick: function() {
            this.flipped = false;
            this.$emit('cardClick', this.data);
        }
    }
})
