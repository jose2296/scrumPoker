<template>
    <div class="nav">
        <router-link to="/">Login</router-link> |
        <router-link to="/register">Register</router-link>
    </div>
    <router-view />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    name: 'Auth',
    setup() {
        const state = reactive({
        });

        return {
            state
        }
    }
})
</script>

<style lang="sass">

</style>
