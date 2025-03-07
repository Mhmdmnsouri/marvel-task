<template>
    <div class="min-h-screen flex flex-col items-center relative">
        <FullScreenLoader v-if="pending" />

        <div v-else-if="error" class="p-4 text-red-500">
            {{ error.message || "Failed to fetch character details!" }}
        </div>

        <template v-else>
            <section class="bg-gradient-to-r from-[#2C2E30] to-[#0E0E0E] w-full flex justify-center">
                <div class="container w-[calc(100%-16px)] mx-4 sm:mx-0">
                    <Logo />
                    <div class="w-full flex items-start pb-4 pt-8 sm:pt-12">
                        <div v-if="character"
                            class="text-white flex flex-col sm:flex-row gap-12 items-start sm:items-center pb-4 relative">
                            <img :src="characterImage" :alt="character.name" loading="lazy"
                                class="rounded-md w-[240px] h-[240px] object-cover z-10" />
                            <div class="flex flex-col gap-4">
                                <img src="@/assets/images/red-rey.webp" loading="lazy"
                                    class="absolute -left-40 top-40 sm:left-0 sm:-top-35" alt="red-ray" />
                                <h1 class="text-2xl font-bold mb-2 z-10">{{ character.name }}</h1>
                                <p class="text-gray-300 text-[12px] sm:text-sm z-10">
                                    {{ character.description || "No description available!" }}
                                </p>
                                <div class="flex gap-3 z-10">
                                    <buttonSecondary v-for="(btn, index) in character.urls" :key="index"
                                        :label="btn.type" :url="btn.url" icon="mynaui:external-link" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="w-full bg-dark flex flex-col items-center py-10 min-h-[calc(100vh-384px)]">
                <div v-if="!comicsLimited.length && !seriesLimited.length" class="p-4 text-white text-center">
                    No comics or series available at this time :(
                </div>
                <div v-else class="flex flex-col gap-12">
                    <div class="container w-[calc(100%-32px)] mx-4 sm:mx-0" v-if="comicsLimited.length">
                        <h4 class="text-white mb-4 text-lg">Comics</h4>
                        <div class="grid md:grid-cols-4 gap-6">
                            <Card v-for="comic in comicsLimited" :key="comic.resourceURI" :image="comicPlaceholder"
                                :name="comic.name" :route="comic.resourceURI" />
                        </div>
                    </div>
                    <div class="container w-[calc(100%-32px)] mx-4 sm:mx-0" v-if="seriesLimited.length">
                        <h4 class="text-white mb-4 text-lg">Series</h4>
                        <div class="grid md:grid-cols-4 gap-6">
                            <Card v-for="seriesItem in seriesLimited" :key="seriesItem.resourceURI"
                                :image="seriesPlaceholder" :name="seriesItem.name" :route="seriesItem.resourceURI" />
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </div>
</template>

<script setup>
import { useRoute, useHead } from '#imports'
import comicPlaceholder from '~/assets/images/comic-placeholder.webp'
import seriesPlaceholder from '~/assets/images/series-placeholder.webp'

const route = useRoute();

const { data, pending, error } = useAsyncData('character', () =>
    $fetch(`/api/character/${route.params.id}`)
)

const character = computed(() => data.value?.data?.results?.[0] || null);

useHead({
    title: computed(() =>
        character.value?.name ? `${character.value.name} - Marvel` : 'Character Details | Marvel'
    ),
    meta: [
        {
            name: 'description',
            content: computed(() =>
                character.value?.description || 'Details about the Marvel character.'
            )
        }
    ]
})

const comicsLimited = computed(() => {
    return character.value?.comics?.items?.slice(0, 8) || []
});

const seriesLimited = computed(() => {
    return character.value?.series?.items?.slice(0, 8) || []
});

const characterImage = computed(() => {
    if (!character.value) return ''
    const { thumbnail } = character.value
    return `${thumbnail.path}.${thumbnail.extension}`
});
</script>