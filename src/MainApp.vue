<template>
    <div v-if="state.loading" class="loading">
        Loading...
    </div>

    <router-view />
</template>

<script src="./MainApp.ts"></script>

<style lang="sass" scoped>
.loading
    left: 0
    top: 0
    position: absolute
    display: flex
    width: 100vw
    height: 100vh
    background: #fff
    justify-content: center
    align-items: center
    font-size: 50px
</style>
