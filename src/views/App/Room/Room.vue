<template>
    <div class="step3" v-if="!!state.room">

        <hr>
        <h3>ME: {{ state.wsUser.uid }} | {{ state.wsUser.displayName }}</h3>
        <hr>
        <h1>Status: {{ state.room.status }}</h1>


        <h1>Room: {{ state.room.name }}</h1>
        <!-- <p>Admin: {{ state.room.adminUser}} | {{ state.room.users[state.room.adminUser].name }}</p> -->
        <h4>Users:</h4>
        <div
            class="user"
            v-for="(user, index) in state.room.users"
            v-bind:key="index"
        >
            {{ user.name }} {{ user.id === state.room.adminUser ? '(Admin)' : '' }}
        </div>


        <!-- VOTING -->
        <div v-if="state.room.status === 'voting'" class="wait-user">
            <div class="voting-container">
                <card v-for="(card, index) in state.cards" :data="card" :disabled="!!state.waitingUsers" v-bind:key="index" @card-click="vote" />
            </div>

            <div v-if="state.waitingUsers" class="wait-user">
                <p>Waiting other users to finish votation...</p>
            </div>

            <div
                class="user"
                v-for="(user, index) in state.room.users"
                v-bind:key="index"
            >
                {{ user.name }} {{ user.id === state.room.adminUser ? '(Admin)' : '' }} -> {{
                    state.room.userVotes ? (state.room.userVotes[user.id] ? 'Voted' : 'Pending to vote') : 'Pending to vote'
                }}
            </div>

            <div v-if="state.room.adminUser === state.wsUser.uid" class="admin-options">
                <button @click="handleVoteButton(false)">Finish votation</button>
            </div>
        </div>

        <!-- VOTED -->
        <div v-if="state.room.status === 'voted'" class="wait-user">
            <h3>Vote results: </h3>
            <div
                class="user"
                v-for="(user, index) in state.room.users"
                v-bind:key="index"
            >
                {{ user.name }} {{ user.id === state.room.adminUser ? '(Admin)' : '' }} {{
                    state.room.userVotes[user.id] ? '-> ' + state.room.userVotes[user.id] : ''
                }}
            </div>

            <button v-if="state.room.adminUser === state.wsUser.uid" @click="handleNewVote()">Start new vote</button>
        </div>

        <div v-if="state.room.status === 'ready-to-vote' && state.room.adminUser === state.wsUser.uid" class="wait-user">

            <div class="admin-options">
                <button @click="handleVoteButton(true)">Start voting</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
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
            cards: store.state.cards
        });
        const socket = store.state.socket;
        const roomId = router.currentRoute.value.params.roomId;

        if (roomId && socket) {

            socket.emit('get-room', roomId);
            socket.on('send-room', (data: any) => {
                console.log(data);
                state.room = data;
            });


            socket.on('voting-started', (roomInfo: any) => {
                state.room = roomInfo;
                state.waitingUsers = false;
            });

            socket.on('voting-ended', (roomInfo: any) => {
                state.room = roomInfo;
            });

            socket.on('votes', function(data: any) {
                state.room = data;
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

            return {
                state,
                handleVoteButton,
                vote,
                handleNewVote
            }
        }

        // IF NO ROOM PROVIDEN
        console.error('No roomId providen');
        router.push({ name: 'Rooms'});

        return {
            state
        }
    }
})
</script>

<style lang="sass">
.room
    max-width: 500px
    display: flex
    flex-direction: column
    align-items: center
    margin: auto
    .room
        display: flex
        width: 100%
        justify-content: space-between
        padding-bottom: 15px
        .name
            padding-right: 30px
        button
            padding: 5px 30px
.voting-container
    display: flex
    flex-wrap: wrap
    justify-content: center
    margin: 50px 0 100px 0
</style>
