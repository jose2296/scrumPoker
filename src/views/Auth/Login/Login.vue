<template>
    <form class="login" @submit="login">
        <h1>Login</h1>
        <div class="field">
            <label for="email">Email</label>
            <input id="email" type="text" v-model="state.email" />
        </div>
        <div class="field">
            <label for="password">Password</label>
            <input id="password" type="password" v-model="state.password" />
        </div>

        <button type="submit">Login</button>
    </form>
</template>

<script lang="ts">
import firebase from 'firebase/app';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    name: 'Login',
    setup() {
        const state = reactive({
            email: '',
            password: ''
        });

        const login = (e: Event) => {
            e.preventDefault();
            firebase.auth().signInWithEmailAndPassword(state.email, state.password)
                .then(response => {
                    console.log(response);
                })
                .catch(function(error: Error) {
                    console.log('Error in login');
                    console.error(error);
                });
        };

        return {
            state,
            login
        }
    }
})
</script>

<style lang="sass">

</style>
