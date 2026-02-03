<template>
    <router-view v-slot="{ Component, route }">
        <keep-alive include="warranty">
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>

<script setup>
</script>
