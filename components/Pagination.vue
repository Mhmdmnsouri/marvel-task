<template>
    <div class="pagination flex items-center gap-0.5 sm:gap-1 mt-4">
        <button @click="changePage(1)" :disabled="isFirstPage" :class="buttonClass(isFirstPage)"
            class="p-1 text-white rounded-full">
            <Icon icon="hugeicons:arrow-left-double" class="text-lg sm:text-xl" />
        </button>

        <button @click="changePage(currentPage - 1)" :disabled="isFirstPage" :class="buttonClass(isFirstPage)"
            class="p-1 text-white rounded-full">
            <Icon icon="hugeicons:arrow-left-01" class="text-lg sm:text-xl" />
        </button>

        <template v-for="(page, index) in pages" :key="index">
            <button v-if="page !== '...'" @click="changePage(page)" :class="[
                'p-1 px-3 rounded-full transition-colors',
                currentPage === page
                    ? 'bg-red text-white'
                    : 'text-white hover:bg-gray-600 transition-colors cursor-pointer'
            ]">
                {{ page }}
            </button>
            <span v-else class="p-2 text-gray-400">...</span>
        </template>

        <button @click="changePage(currentPage + 1)" :disabled="isLastPage" :class="buttonClass(isLastPage)"
            class="p-1 text-white rounded-full">
            <Icon icon="hugeicons:arrow-right-01" class="text-lg sm:text-xl" />
        </button>

        <button @click="changePage(totalPages)" :disabled="isLastPage" :class="buttonClass(isLastPage)"
            class="p-1 text-white rounded-full">
            <Icon icon="hugeicons:arrow-right-double" class="text-lg sm:text-xl" />
        </button>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['update:page']);
const changePage = (page) => {
    if (page < 1) page = 1;
    if (page > props.totalPages) page = props.totalPages;
    emit('update:page', page);
};

const isFirstPage = computed(() => props.currentPage === 1);
const isLastPage = computed(() => props.currentPage === props.totalPages);

const pages = computed(() => {
    const { currentPage, totalPages } = props;
    const maxPagesToShow = 5;
    const pageList = [];

    if (totalPages <= maxPagesToShow) {
        for (let i = 1; i <= totalPages; i++) {
            pageList.push(i);
        }
        return pageList;
    }

    if (currentPage <= 3) {
        pageList.push(1, 2, 3, 4, 5, '...', totalPages);
        return pageList;
    }

    if (currentPage >= totalPages - 2) {
        pageList.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        return pageList;
    }

    pageList.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    return pageList;
});

const buttonClass = (isDisabled) =>
    isDisabled ? 'opacity-50' : 'hover:bg-gray-600 transition-colors cursor-pointer';
</script>