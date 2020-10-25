<template>
    <form class="register" @submit="register">
        <h2>Register</h2>
        <div class="field">
            <label for="email">name</label>
            <input id="name" type="text" v-model="state.name" />
        </div>
        <div class="field">
            <label for="email">Email</label>
            <input id="email" type="text" v-model="state.email" />
        </div>
        <div class="field">
            <label for="password">Password</label>
            <input id="password" type="password" v-model="state.password" />
        </div>

        <button type="submit">Register</button>
    </form>
</template>


<script lang="ts">
import firebase from 'firebase/app';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    name: 'Register',
    setup() {
        const state = reactive({
            email: '',
            password: '',
            name: ''
        });

        const register = (e: Event) => {
            e.preventDefault();
            firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
            .then(response => {
                    const user = firebase.auth().currentUser;
                    if (user) {
                        const userId = user.uid;
                        user.updateProfile({ displayName: state.name });
                        firebase.database().ref(`/users/${userId}`).set({
                            id: userId,
                            name: state.name
                        });
                    }
                    console.log('Register successfully');
                })
                .catch(function(error) {
                    console.error('Error register user');
                    console.error(error);
                });
        };

        return {
            state,
            register
        }
    }
})
</script>


<style lang="sass">

</style>
