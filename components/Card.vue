<template>
    <nuxt-link :to="route" class="rounded-xl border border-gray p-md">
        <img class="rounded-md mb-3" :src="image" :alt="name" />
        <h4 class="text-md text-white">{{ name }}</h4>
    </nuxt-link>
</template>

<script setup>
defineProps({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true
    }
});
</script>
