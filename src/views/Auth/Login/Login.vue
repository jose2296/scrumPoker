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

        <div class="error" v-if="state.error">
            {{ state.error}}
        </div>
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
            password: '',
            error: ''
        });

        const login = (e: Event) => {
            e.preventDefault();
            firebase.auth().signInWithEmailAndPassword(state.email, state.password)
                .then(response => {
                    state.error = response.user && !response.user.emailVerified ? 'Email not verified yet.' : '';
                })
                .catch(function(error: Error) {
                    console.error('Error in login', error);
                    state.error = 'Error in login.'
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
.error
    color: var(--color10)
</style>
