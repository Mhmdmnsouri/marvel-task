<template>
    <div class="min-h-screen flex flex-col items-center">
        <!-- Header Section -->
        <section class="bg-gradient-to-r from-[#2C2E30] to-[#0E0E0E] w-full flex justify-center">
            <div class="container mx-4 sm:mx-0">
                <Logo />
                <SearchBar />
            </div>
        </section>

        <!-- Characters Section -->
        <section class="bg-dark w-full flex flex-col items-center min-h-screen pb-6 pt-8 sm:pt-14">
            <div v-if="loading" class="mt-6 text-white">
                <Icon icon="svg-spinners:3-dots-scale" class="text-[60px] text-light" />
            </div>
            <div v-else-if="characters.length" class="grid md:grid-cols-4 gap-6 container mx-4 sm:mx-0">
                <Card v-for="character in characters" :key="character.id" :image="getCharacterImage(character)"
                    :name="character?.name" :route="`/character/${character.id}`" />
            </div>
            <div v-else class="flex flex-col items-center justify-center mt-6 gap-5">
                <Icon icon="solar:sad-square-linear" class="text-[60px] text-red" />
                <p class=" text-red text-lg md:text-xl text-center">Oops! Something went wrong while fetching Marvel
                    characters.</p>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';

const characters = ref([]);
const loading = ref(true);

// Fetch characters
const fetchCharacters = async () => {
    try {
        const data = await $fetch(`/api/characters`);
        characters.value = data?.data?.results || [];
    } catch (error) {
        console.error("Error:", error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchCharacters();
});

const getCharacterImage = (character) => `${character?.thumbnail?.path}.${character?.thumbnail?.extension}`;

</script>
