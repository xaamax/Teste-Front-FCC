<template>
    <router-view />
    <Loading v-if="isLoading" />
</template>

<script>
import { mapState } from "vuex";
import Loading from "./components/Loading.vue";

export default {
    components: { Loading },
    computed: mapState(["isLoading"]),
}
</script>