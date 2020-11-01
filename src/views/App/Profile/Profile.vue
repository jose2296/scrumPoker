<template>
    <div class="profile-container">
        <h2>Profile details: </h2>

        <template v-if="!state.loading">
            <div class="form" @submit="updateUser">
                <div class="field">
                    <label for="email">Email</label>
                    <input id="email" type="email" v-model="state.email">
                </div>
                <div class="field">
                    <label for="name">Name</label>
                    <input id="name" type="text" v-model="state.name">
                </div>
                <button type="submit" @click="updateUser" :disabled="!state.email || !state.name">Update user</button>
            </div>

            <hr>

            <div class="deck-selector">
                <div class="current-selection">
                    <h3>Current card design:</h3>
                    <div class="cards">
                        <div class="card-wrapper">
                            <card :type="state.currentDeck" :data="{ label: 0, points: 1 }" :disabled="true" :flipped="false"/>
                        </div>
                        <div class="card-wrapper">
                            <card :type="state.currentDeck" :data="{ label: 0, points: 1 }" :disabled="true" :flipped="true"/>
                        </div>
                    </div>
                </div>

                <hr>

                <div class="decks-availables">
                    <h3>Cards design available:</h3>

                    <div class="deck-list">
                        <div class="card-wrapper" v-for="(deck, index) in state.decks" v-bind:key="index" >
                            <card :type="deck" :data="{ label: index, points: 1 }"/>
                            <button @click="selectDeck(deck)" :disabled="deck === state.currentDeck">{{ deck !== state.currentDeck ? 'Select' : 'Selected' }}</button>
                        </div>
                    </div>
                </div>
            </div>

        </template>
        <template v-else>
            <div class="loading-container">
                LOADING...
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, reactive, ref } from 'vue';
import firebase, { User } from 'firebase/app';
import { useStore } from 'vuex';
import { State } from '@/store';
import io from 'socket.io-client';
import { useRouter } from 'vue-router';
import Card from "@/components/Card/Card.vue";

export default defineComponent({
    name: 'Profile',
    components: {
        Card
    },
    setup() {
        const store = useStore<State>();
        const router = useRouter();
        const user = firebase.auth().currentUser;
        const userId = user ? user.uid : '';
        const socket = store.state.socket;
        const state = reactive({
            email: user ? user.email as string : '',
            name: user ? user.displayName : '',
            currentDeck: 'type-1',
            decks: ['type-1', 'type-2', 'type-3', 'type-4', 'type-5', 'type-6', 'type-7', 'type-8'],
            loading: true
        });

        // FUNCTIONS
        firebase.database().ref(`users/${userId}/deckSelection`).on('value', _deck => {
            const deck = _deck.val();
            if (deck) {
                state.currentDeck = deck;
            }
            state.loading = false;
        });

        const selectDeck = (deck: any) => {
            if (deck !== state.currentDeck) {
                firebase.database().ref(`users/${userId}/deckSelection`).set(deck);
            }
        };

        const updateUser = () => {
            if (user && state.email && state.name) {
                user.updateEmail(state.email).then(res => {
                    console.log(res);
                }).catch(error => {
                    console.error(error);
                });

                user.updateProfile({
                    displayName: state.name
                }).then(response => {
                    store.commit('setUser', user);
                }).catch(error => {
                    console.error(error);
                })
            }
        };

        onUnmounted(() => {
            firebase.database().ref(`users/${userId}/deckSelection`).off();
        })
;

        return {
            state,
            updateUser,
            selectDeck
        }
    }
})
</script>

<style src="./Profile.sass" lang="sass"></style>
