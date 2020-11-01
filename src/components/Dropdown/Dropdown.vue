<template>
  <div class="dropdown-container" v-bind:class="{ 'opened': state.opened }" @click="toggleMenu()">
        <slot></slot>
        <div v-if="state.opened" class="menu">
            <div class="option" v-for="(option, index) in options" v-bind:key="index" @click="clickOption(option)">
                {{ option }}
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    name: 'dropdown',
    props: [
        'options'
    ],
    setup(props, { emit }) {
        const state = reactive({
            opened: false
        });

        const toggleMenu = () => {
            state.opened = !state.opened;
        };

        const clickOption = (option: string) => {
            emit('option-clicked', option)
        };

        return {
            state,
            toggleMenu,
            clickOption
        }
    }
})
</script>

<style scoped lang="sass">
.dropdown-container
    position: relative
    .menu
        position: absolute
        right: 0
        border-top-right-radius: 5px
        border-top-left-radius: 5px
        border-bottom-right-radius: 10px
        border-bottom-left-radius: 10px
        overflow: hidden
        .option
            background-color: var(--color3)
            padding: 10px 20px 10px
            color: var(--color4)
            cursor: pointer
            transition: 0.5s
            text-align: right
            &:not(:last-child)
                border-bottom: 1px solid var(--color4)
            &:hover
                background-color: #e8e8e7
</style>
