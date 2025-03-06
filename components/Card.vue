<template>
    <nuxt-link :to="route"
        class="group rounded-xl border border-gray p-md hover:shadow-[0_0px_20px_rgba(255,255,255,0.2)] hover:border-light transition-all">
        <img class="rounded-md mb-3" :src="image" :alt="name" />
        <div class="flex items-center">
            <h4 class="text-md text-white">
                {{ name }}
            </h4>
            <span
                class="ml-1 text-white opacity-0 transform -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <Icon icon="hugeicons:arrow-right-02" width="24" height="24" />
            </span>
        </div>
    </nuxt-link>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

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
