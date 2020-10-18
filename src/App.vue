<template>
  <div id="app">
        <div id="nav">
            <router-link to="/step1">Step 1</router-link> |
            <router-link to="/step2" v-bind:class="{ inactive: $store.state.currentStep < 2 }">Step 2</router-link> |
            <router-link to="/step3" v-bind:class="{ inactive: $store.state.currentStep < 3 }">Step 3</router-link>
            <!-- <router-link to="/home">Home</router-link> |
            <router-link to="/about">About</router-link> -->
        </div>
        <router-view />
    </div>
</template>

<script src="./App.ts"></script>

<style lang="sass">

#app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50


#nav
    padding: 30px
    .inactive
        pointer-events: none
        opacity: 0.6
    a
        font-weight: bold
        color: #2c3e50

        &.router-link-exact-active
            color: #42b983

</style>
