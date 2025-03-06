<template>
    <div class="search-bar bg-dark rounded-md p-4 flex gap-4 w-full mb-4">
        <input type="text" placeholder="Search for characters..."
            class="bg-muted p-2 w-full rounded-sm placeholder-white text-white text-sm focus:ring-0 focus:outline-1 focus:outline-[#666]" />
        <buttonPrimary label="Search" icon="solar:magnifer-linear" :hideLabelOnMobile="true" />
    </div>
</template>

<script setup></script>
