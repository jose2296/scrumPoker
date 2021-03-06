<template>
    <div class="layout">
        <header class="header">
            <div class="logo">ScrumPoker</div>

            <dropdown :options="state.options" @option-clicked="dropdownOptionClicked">
                <div class="avatar-container">
                    <div class="name">
                        {{ state.userName }}
                    </div>
                    <div class="avatar">
                        <img :src="require('@/assets/avatar.jpg')" alt="avatar">
                    </div>
                </div>
            </dropdown>
        </header>
        <div class="app">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import firebase from 'firebase/app';
import { mapGetters, useStore } from 'vuex';
import { State } from '@/store';
import io from 'socket.io-client';
import Dropdown from "@/components/Dropdown/Dropdown.vue";
import { useRouter } from 'vue-router';

enum AvatarOptions {
    profile = 'Profile',
    rooms = 'Rooms',
    logout = 'Logout'
}

export default defineComponent({
    name: 'App',
    components: {
        Dropdown
    },
    setup() {
        const store = useStore<State>();
        const router = useRouter();
        const state = reactive({
            userName: computed(() => store.state.user.displayName),
            options: [
                AvatarOptions.profile,
                AvatarOptions.rooms,
                AvatarOptions.logout,
            ] // TODO: Add enums for this options
        });

        const logout = () => {
            firebase.auth().signOut()
                .then(response => {
                    console.log(response);
                })
                .catch(function(error: Error) {
                    console.error(error);
                });
        };

        const socket = io(process.env.VUE_APP_api_url);
        const database = firebase.database();

        socket.emit('new-user', store.state.user.uid);
        database.ref('/cards').once('value', cards => {
            console.log(cards.val());
            store.commit('setCards', cards.val());
        });

        store.commit('setSocket', socket);

        const dropdownOptionClicked = (optionSelected: string) => {
            if (optionSelected === AvatarOptions.profile) {
                router.push({ name: 'Profile' });
                return;
            }

            if (optionSelected === AvatarOptions.rooms) {
                router.push({ name: 'Rooms' });
                return;
            }

            if (optionSelected === AvatarOptions.logout) {
                logout();
                return;
            }
        };

        return {
            state,
            dropdownOptionClicked
        }
    }
})
</script>

<style lang="sass">
.layout
    display: flex
    flex-direction: column
    width: 100vw
    height: 100vh
    .header
        display: flex
        justify-content: space-between
        align-items: center
        height: 60px
        background-color: #191A21
        padding: 0 20px
        .avatar-container
            display: flex
            align-items: center
            cursor: pointer
            .name
                padding-right: 20px
            .avatar
                border-radius: 50%
                width: 40px
                height: 40px
                overflow: hidden
                img
                    width: 100%
    .app
        flex-grow: 1
        display: flex
</style>
