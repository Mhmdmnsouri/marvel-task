<template>
    <button
        class="border px-4 py-2 border-light rounded-sm gap-2 flex items-center justify-center  text-sm text-light cursor-pointer hover:"
        @click="onClick">
        <span v-if="icon">
            <Icon :icon="icon" />
        </span>
        <span>{{ label }}</span>
    </button>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

defineProps({
    label: String,
    icon: String,
});

const onClick = () => {
    console.log("SecondaryBtn Clicked");
};
</script>
