import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    name: 'card',
    props: [
        'data',
        'disabled'
    ],
    setup(props, { emit }) {
        const flipped = ref(true);
        const state = reactive({
            flipped,
            disabled: props.disabled,
            data: props.data
        })

        const cardClick = () => {
            state.flipped = !state.flipped;
            emit('card-click', props.data);
        }
        return {
            state,
            cardClick
        }
    }
})
