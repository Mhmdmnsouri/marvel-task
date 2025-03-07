<template>
    <div class="min-h-screen flex flex-col items-center">
        <section class="bg-gradient-to-r from-[#2C2E30] to-[#0E0E0E] w-full flex justify-center">
            <div class="container w-[calc(100%-32px)] mx-4 sm:mx-0 relative">
                <Logo />
                <SearchBar @search="handleSearch" />
                <img src="@/assets/images/red-rey.webp" class="absolute hidden sm:flex -left-15 -top-25"
                    alt="red-ray" />
            </div>
        </section>

        <section
            class="bg-dark w-full flex flex-col items-center min-h-[calc(100vh-146px)] py-10 sm:pt-14 relative z-10">
            <div v-if="loading" class="mt-6 text-white">
                <Icon icon="svg-spinners:3-dots-scale" class="text-[60px] text-light" />
            </div>
            <div v-else-if="characters.length"
                class="grid md:grid-cols-4 gap-6 container w-[calc(100%-32px)] mx-4 sm:mx-0 mb-8">
                <Card v-for="character in characters" :key="character.id" :image="getCharacterImage(character)"
                    :name="character.name" :route="`/character/${character.id}`" />
            </div>
            <div v-else class="flex flex-col items-center justify-center mt-6 gap-5">
                <Icon icon="solar:sad-square-linear" class="text-[60px] text-red" />
                <p class="text-red text-lg md:text-xl text-center">
                    {{ message }}
                </p>
            </div>

            <Pagination v-if="!loading && totalPages > 1" :currentPage="currentPage" :totalPages="totalPages"
                @update:page="updatePage" />
        </section>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

const characters = ref([]);
const loading = ref(true);
const message = ref("");

const currentPage = ref(1);
const totalPages = ref(1);
const lastQuery = ref('');

// Function to fetch characters. If a search query is provided
const fetchCharacters = async (query = '', page = 1) => {
    loading.value = true;
    message.value = "";
    const limit = 20;
    const offset = (page - 1) * limit;
    try {
        const endpoint = query
            ? `/api/characters/search?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`
            : `/api/characters?limit=${limit}&offset=${offset}`;
        const data = await $fetch(endpoint);
        characters.value = data?.data?.results || [];
        const totalResults = data?.data?.total || 0;
        totalPages.value = Math.ceil(totalResults / limit);
        console.log("Requesting:", endpoint);
        if (query && characters.value.length === 0) {
            message.value = "Oops! No character found!";
        }
    } catch (error) {
        console.error("Error fetching characters:", error);
        message.value = "Oops! Something went wrong while fetching Marvel characters.";
        characters.value = [];
    } finally {
        loading.value = false;
        window.scrollTo(0, 0);
    }
};

// Function to build the character image URL.
const getCharacterImage = (character) =>
    `${character.thumbnail.path}.${character.thumbnail.extension}`;

const handleSearch = (query) => {
    lastQuery.value = query;
    currentPage.value = 1;
    fetchCharacters(query, 1);
};

const updatePage = (page) => {
    currentPage.value = page;
    fetchCharacters(lastQuery.value, page);
};

onMounted(() => {
    fetchCharacters();
});

</script>