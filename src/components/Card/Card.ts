import { defineComponent, reactive, ref, watch } from 'vue';

export default defineComponent({
    name: 'card',
    props: [
        'data',
        'disabled',
        'flipped'
    ],
    setup(props, { emit }) {
        const state = reactive({
            flipped: props.flipped,
            disabled: props.disabled,
            data: props.data
        });

        const cardClick = () => {
            state.flipped = !state.flipped;
            emit('card-click', props.data);
        };

        return {
            state,
            cardClick
        }
    }
})
