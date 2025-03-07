<template>
    <nuxt-link :to="route"
        class="group rounded-xl border flex flex-col justify-between border-gray p-md hover:shadow-[0_0px_20px_rgba(255,255,255,0.2)] h-full hover:border-light transition-all">
        <div class="relative w-full h-full mb-3">
            <div v-if="!imageLoaded" class="absolute inset-0 flex items-center justify-center">
                <Icon icon="svg-spinners:6-dots-scale-middle" class="text-[50px] text-light" />
            </div>
            <img :src="image" :alt="name" loading="lazy" @load="handleImageLoad"
                :class="{ invisible: !imageLoaded, 'rounded-md': true, 'w-full': true, 'h-full': true }" />
        </div>
        <div class="flex items-center">
            <h4 class="text-md text-white">{{ name }}</h4>
            <span
                class="ml-1 text-white opacity-0 transform -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <Icon icon="hugeicons:arrow-right-02" width="24" height="24" />
            </span>
        </div>
    </nuxt-link>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue/dist/iconify.js'

const props = defineProps({
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
})

const imageLoaded = ref(false)

const handleImageLoad = () => {
    imageLoaded.value = true
}
</script>