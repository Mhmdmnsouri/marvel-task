<template>
    <button
        class="border px-4 py-2 border-light rounded-sm gap-2 flex items-end justify-center text-sm text-light cursor-pointer hover:bg-light/10 transition-colors"
        @click="onClick">
        <span v-if="icon">
            <Icon :icon="icon" class="text-[18px]" />
        </span>
        <span>{{ label }}</span>
    </button>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

const props = defineProps({
    label: String,
    icon: String,
    url: String,
});

const onClick = () => {
    if (props.url) {
        window.open(props.url, '_blank');
    } else {
        console.log("No URL provided for this button.");
    }
};
</script>
