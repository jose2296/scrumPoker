import { defineComponent, reactive, ref, watch } from 'vue';

export default defineComponent({
    name: 'card',
    props: {
        data: Object,
        type: {
            type: String,
            default: 'type-1'
        },
        disabled: Boolean,
        flipped: Boolean,
        noFlip: {
            type: Boolean,
            default: false
        },
        isMini: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const state = reactive({
            flipped: props.flipped,
            disabled: props.disabled,
            data: props.data
        });

        const cardClick = () => {
            if (!props.noFlip) {
                state.flipped = !state.flipped;
            }
            emit('card-click', props.data);
        };

        watch(() => props.flipped, (value) => {
            state.flipped = value;
        });

        return {
            state,
            cardClick
        }
    }
})
