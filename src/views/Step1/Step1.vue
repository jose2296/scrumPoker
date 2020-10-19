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
    </div>
</template>

<script src="./Step1.ts"></script>

<style lang="sass" scoped>
.cards
    display: none
</style>
