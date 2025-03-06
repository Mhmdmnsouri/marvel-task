<template>
    <button
        class="bg-red rounded-sm gap-2 flex items-center justify-center p-2 text-sm text-white cursor-pointer hover:bg-dark-red transition-colors"
        @click="onClick">
        <span :class="{ 'px-1 sm:px-0': hideLabelOnMobile }" v-if="icon">
            <Icon :icon="icon" />
        </span>

        <span :class="{ 'hidden sm:inline': hideLabelOnMobile }">{{ label }}</span>
    </button>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

defineProps({
    label: String,
    icon: String,
    hideLabelOnMobile: {
        type: Boolean,
        default: false,
    },
});

const onClick = () => {
    console.log("PrimaryBtn Clicked");
};
</script>
