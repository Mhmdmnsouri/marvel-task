<template>
    <div class="min-h-screen flex flex-col items-center">
        <section class="bg-gradient-to-r from-[#2C2E30] to-[#0E0E0E] w-full flex justify-center">
            <div class="container w-[calc(100%-32px)] mx-4 sm:mx-0">
                <Logo />
                <SearchBar @search="handleSearch" />
            </div>
        </section>

        <section class="bg-dark w-full flex flex-col items-center min-h-[calc(100vh-146px)] py-10 sm:pt-14">
            <div v-if="loading" class="mt-6 text-white">
                <Icon icon="svg-spinners:3-dots-scale" class="text-[60px] text-light" />
            </div>
            <div v-else-if="characters.length"
                class="grid md:grid-cols-4 gap-6 container w-[calc(100%-32px)] mx-4 sm:mx-0">
                <Card v-for="character in characters" :key="character.id" :image="getCharacterImage(character)"
                    :name="character.name" :route="`/character/${character.id}`" />
            </div>
            <div v-else class="flex flex-col items-center justify-center mt-6 gap-5">
                <Icon icon="solar:sad-square-linear" class="text-[60px] text-red" />
                <p class="text-red text-lg md:text-xl text-center">
                    {{ message }}
                </p>
            </div>
        </section>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

const characters = ref([]);
const loading = ref(true);
const message = ref("");

// Function to fetch characters. If a search query is provided
const fetchCharacters = async (query = '') => {
    loading.value = true;
    message.value = "";
    try {
        const endpoint = query
            ? `/api/characters/search?q=${encodeURIComponent(query)}`
            : `/api/characters`;
        const data = await $fetch(endpoint);
        characters.value = data?.data?.results || [];

        if (query && characters.value.length === 0) {
            message.value = "Oops! No character found!";
        }
    } catch (error) {
        console.error("Error fetching characters:", error);
        message.value = "Oops! Something went wrong while fetching Marvel characters.";
        characters.value = [];
    } finally {
        loading.value = false;
    }
};

// Function to build the character image URL.
const getCharacterImage = (character) =>
    `${character.thumbnail.path}.${character.thumbnail.extension}`;

const handleSearch = (query) => {
    fetchCharacters(query);
};

onMounted(() => {
    fetchCharacters();
});

</script>