<template>
    <div class="step1">
        <h1>Type your name</h1>
        <h1>UserName: {{ $store.state.userName }}</h1>
        <input type="text" v-on:keyup="setUserName" v-model="userName" />
        <button @click="nextStep()" :disabled="!userName.length">Continue</button>

        <div class="cards">
            <card :data="{ label: '1', points: 1 }" :type="'type-1'" />
            <card :data="{ label: '2', points: 2 }" :type="'type-2'" />
            <card :data="{ label: '3', points: 3 }" :type="'type-3'" />
        </div>

        <form v-if="showLogin" class="register" @submit="register">
            <h2>Register</h2>
            <div class="field">
                <label for="email">Email</label>
                <input id="email" type="text" v-model="email" />
            </div>
            <div class="field">
                <label for="password">Password</label>
                <input id="password" type="password" v-model="password" />
            </div>

            <button type="submit">Register</button>
        </form>

        <form v-if="showLogin" class="login" @submit="login">
            <h2>Login</h2>
            <div class="field">
                <label for="email">Email</label>
                <input id="email" type="text" v-model="email" />
            </div>
            <div class="field">
                <label for="password">Password</label>
                <input id="password" type="password" v-model="password" />
            </div>

            <button type="submit">Register</button>
        </form>

        <button @click="logout">Logout</button>
    </div>
</template>

<script src="./Step1.ts"></script>

<style lang="sass" scoped>
.cards
    display: none

.register, .login
    padding: 100px 0
    width: 300px
    display: flex
    flex-direction: column
    margin: auto
    .field
        display: flex
        padding-bottom: 20px
        label
            width: 100px
            text-align: left

</style>
