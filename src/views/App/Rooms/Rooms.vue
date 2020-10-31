<template>
    <div class="rooms">
        <h4>List of rooms</h4>
        <hr style="width: 100%">
        <div class="room" v-for="(room, key) in state.rooms" v-bind:key="key">
            <div class="name">
                {{ room.name }} ({{ getUsersInRoom(room.users) }}) ➡ [{{ room.status }}]
            </div>
            <button @click="joinRoom(room.id)">Join</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onUnmounted } from 'vue';
import firebase, { User } from 'firebase/app';
import { useStore } from 'vuex';
import { State } from '@/store';
import io from 'socket.io-client';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Rooms',
    setup() {
        const store = useStore<State>();
        const router = useRouter();
        const state = reactive({
            rooms: []
        });
        const socket = store.state.socket;

        if (socket) {
            // Get rooms
            socket.emit('get-rooms');

            // Obtain rooms
            socket.on('send-rooms', (rooms: []) => {
                console.log(rooms);
                state.rooms = rooms;
                // store.commit('setRooms', rooms);
            });

            socket.on('room-joined', (room: any) => {
                console.log(room);
                router.push(`/app/${room.id}`)
            });

            const getUsersInRoom = (users: any) => {
                if (users) {
                    return Object.keys(users).length;
                }
                return 0;
            };

            const joinRoom = (roomId: any) => {
                // TODO: refactor users in firebase
                socket.emit('join-room', {
                    userId: store.state.user.uid,
                    roomId
                });
            };

            onUnmounted(() => {
                socket.off('send-rooms');
                socket.off('room-joined');
            })

            return {
                state,
                getUsersInRoom,
                joinRoom
            }
        }
    }
})
</script>

<style lang="sass">
.rooms
    width: 500px
    display: flex
    flex-direction: column
    align-items: center
    margin: auto
    h4
        padding-bottom: 5px
    .room
        display: flex
        width: 100%
        justify-content: space-between
        padding-bottom: 15px
        &::first-child
            padding-top: 10px
        .name
            padding-right: 30px
</style>
