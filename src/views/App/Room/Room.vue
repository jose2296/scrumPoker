<template>
    <div class="room-container" v-if="!!state.room">
        <div class="room-name">
            <span>
                {{ state.room.name }}
            </span>
            <span class="status">[{{ state.room.status }}]</span>
        </div>

        <div class="main">
            <div class="user-votes">
                <h3>Vote results: </h3>
                <div class="votes">
                    <template v-for="(user, index) in state.room.users" v-bind:key="index">
                        <div class="vote" v-if="state.room.userVotes && state.room.userVotes[user.id]">
                            <div class="user-name">{{ user.name }}</div>
                            <div class="card-wrapper">
                                <card
                                    :data="{ label: state.room.userVotes[user.id], points: state.room.userVotes[user.id], type: 'type-2' }"
                                    :type="user.deckSelection"
                                    :disabled="true"
                                    :flipped="cardsFlipped"
                                />
                            </div>
                        </div>
                    </template>

                </div>
                <div v-if="!state.room.userVotes" class="no-votes">
                    <template  v-if="state.room.status === 'ready-to-vote'">
                        Waiting for admin to start vote.
                    </template>
                    <template  v-if="state.room.status === 'voting'">
                        No votes yet.
                    </template>
                </div>
            </div>

            <div class="user-list">
                <div class="users">
                    <h3>Users list: </h3>
                    <div class="user" v-for="(user, index) in state.room.users" v-bind:key="index">
                        <!-- TODO: Add card type from user -->
                        <div class="mini-card-wrapper">
                            <card :isMini="true" :type="user.deckSelection"/>
                        </div>
                        <div class="user-name">{{ user.name }}</div>
                        <div v-if="user.id === state.room.adminUser" class="is-admin">
                            <img :src="require('@/assets/crown.svg')" alt="admin">
                        </div>
                        <div class="vote-status" v-if="state.room.status === 'voting'">
                            {{ !(state.room.userVotes && state.room.userVotes[user.id]) ?
                                'Voting...' : 'Voted'
                            }}
                        </div>
                        <div class="vote-status" v-if="state.room.status === 'voted'">Voted</div>
                    </div>
                </div>

                <div v-if="state.wsUser.uid === state.room.adminUser" class="admin-options">

                    <template  v-if="state.room.status === 'ready-to-vote'">
                        <button @click="handleVoteButton(true)">Start voting</button>
                    </template>

                    <template  v-if="state.room.status === 'voting'" >
                        <button @click="handleVoteButton(false)">Finish vote</button>
                    </template>

                    <template  v-if="state.room.status === 'voted'" >
                        <button v-if="state.room.adminUser === state.wsUser.uid" @click="handleNewVote()">Start new vote</button>
                        <button v-if="state.room.adminUser === state.wsUser.uid" @click="handleClearVote()">Clear vote</button>
                    </template>
                </div>
            </div>
        </div>

        <div class="user-cards" v-bind:class="{ 'disabled': state.room.status === 'ready-to-vote' || state.room.status === 'voted' }">
            <div class="card-wrapper" v-for="(card, index) in state.cards" v-bind:key="index">
                <card :data="card" :type="state.deckSelection" :disabled="!!state.waitingUsers" @card-click="vote" :flipped="false" :noFlip="true"/>
            </div>
        </div>
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
    name: 'Room',
    components: {
        Card
    },
    setup() {
        const store = useStore<State>();
        const router = useRouter();
        const state = reactive({
            room: null,
            wsUser: store.state.user,
            waitingUsers: false,
            cards: store.state.cards,
            deckSelection: 'type-1'
        });
        const cardsFlipped = ref(true);
        const socket = store.state.socket;
        const roomId = router.currentRoute.value.params.roomId;

        if (roomId && socket) {

            socket.emit('get-room', roomId);
            socket.on('send-room', (data: any) => {
                state.room = data;
            });


            socket.on('voting-started', (roomInfo: any) => {
                state.room = roomInfo;
                cardsFlipped.value = true;
                state.waitingUsers = false;
            });

            socket.on('voting-ended', (roomInfo: any) => {
                cardsFlipped.value = false;
                state.room = roomInfo;
            });

            socket.on('voting-cleared', (roomInfo: any) => {
                state.room = roomInfo;
                cardsFlipped.value = false;
            });

            socket.on('votes', function(data: any) {
                state.room = data;
            });

            firebase.database().ref(`users/${state.wsUser.uid}/deckSelection`).on('value', _deck => {
                const deck = _deck.val();
                if (deck) {
                    state.deckSelection = deck;
                }
            });

            const handleVoteButton = (start: boolean) => {
                if (start) {
                    socket.emit('start-voting', roomId);
                    return;
                }
                socket.emit('end-voting', roomId);
            };

            const vote = (card: any) => {
                state.waitingUsers = true;
                socket.emit('vote', card.points);
            };

            const handleNewVote = () => {
                state.waitingUsers = false;
                socket.emit('start-voting', roomId);
            };

            const handleClearVote = () => {
                state.waitingUsers = false;
                socket.emit('clear-voting', roomId);
            };

            onUnmounted(() => {
                socket.emit('leave-room', { roomId });
                firebase.database().ref(`users/${state.wsUser.uid}/deckSelection`).off();
            })

            return {
                state,
                cardsFlipped,
                handleVoteButton,
                vote,
                handleNewVote,
                handleClearVote
            }
        }

        // IF NO ROOM PROVIDEN
        console.error('No roomId providen');
        router.push({ name: 'Rooms'});

        return {
            state,
            cardsFlipped
        }
    }
})
</script>

<style src="./Room.sass" lang="sass"></style>
