<script setup>
import { computed, ref } from 'vue';
import { deleteItemById } from '@/service';
import Dialog from './Dialog.vue';
import { showSnackbar } from '@/hooks/useSnackbar';

const { data, isLoading, selectedFilter, refreshFlag } = defineProps({
  data: Array,
  selectedFilter: String,
  isLoading: Boolean,
  refreshFlag: Boolean
});
const deleteTargetId = ref(null)
const dialog = ref(false)

const emit = defineEmits(['update:refreshFlag'])

const filteredData = computed(() => {
    if (!data) return [];

    if (selectedFilter === 'all') {
        return data;
    }
    return data.filter(bookmark => bookmark.website === selectedFilter);
});

const findIcon = (website) => {
    switch (website) {
        case 'website_twitter':
            return 'mdi-twitter'
        case 'website_youtube':
            return 'mdi-youtube'
        case 'website_linkedin':
            return 'mdi-linkedin'
        case 'website_medium':
            return 'mdi-size-m'
        case 'website_other':
            return 'mdi-google-chrome'
        default:
            return 'mdi-google-chrome'
    }
}

const gotoWebsite = (url) => {
    window.open(url, "_blank");
}

const handleDelete = async (id) => {
    deleteTargetId.value = id
    dialog.value = true
}

const handleConfirmDelete = async () => {
    if (!deleteTargetId.value) return

    const response = await deleteItemById(deleteTargetId.value)
    if (response) {
        showSnackbar.success("Bookmark deleted.")
        emit('update:refreshFlag', !refreshFlag)
    } else {
        showSnackbar.error("Bookmark was not deleted!")
    }

    dialog.value = false
    deleteTargetId.value = null
}

</script>

<template>
    <div v-if="isLoading" style="width: 100%;margin: 20px 0;">
        <v-skeleton-loader v-for="index in 3" :key="index" :elevation="9" color="#111" type="card"></v-skeleton-loader>
    </div>

    <ul v-else class="bookmark-list">
        <v-alert v-if="filteredData?.length === 0" icon="mdi-information-outline"
            text="There are no bookmarks in this category." type="info" variant="tonal" class="alert"></v-alert>
        <li v-for="bookmark in filteredData" :key="bookmark.id">
            <v-card class="bookmark-item" variant="outlined">
                <a :href="bookmark.link" target="_blank" rel="noopener noreferrer">
                    <v-card-title class="bookmark-title-wrapper">
                        {{ bookmark.title }}
                        <div>
                            <v-icon :icon="findIcon(bookmark.website)" class="title-icon" />
                        </div>
                    </v-card-title>
                </a>
                <v-card-text>{{ bookmark.description }}</v-card-text>
                <v-card-actions style="display: flex;justify-content: flex-end;">
                    <v-btn @click="handleDelete(bookmark.id)" variant="outlined" color="red"
                        prepend-icon="mdi-trash-can-outline" style="text-transform: none;"><template v-slot:prepend>
                            <v-icon></v-icon>
                        </template> Delete</v-btn>
                    <v-btn @click="gotoWebsite(bookmark.link)" variant="outlined" color="teal"
                        append-icon="mdi-arrow-right" style="text-transform: none;">Go to
                        Website <template v-slot:append>
                            <v-icon></v-icon>
                        </template></v-btn>
                </v-card-actions>
            </v-card>
        </li>
    </ul>
    <Dialog v-model:dialog="dialog" :dialogTitle="'Delete Bookmark'"
        :dialogText="'Are you sure you want to delete this item?'" :confirmButtonText="'Delete'"
        @confirm="handleConfirmDelete" />
</template>

<style lang="postcss" scoped>
@media (min-width: 1024px) {

    .bookmark-list {
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;
    }

    .bookmark-item {
        margin: 16px 0;
        border: none;
        background: #111;
        border-radius: 6px;
        padding: 1rem;

        &:hover {
            background: #2e3534;

            .title-icon {
                transform: scale(1.2);
                color: #45d5d5;
            }
        }
    }

    .bookmark-title-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        color: white
    }

    .title-icon {
        transition: all .3s ease-in-out;

        &:hover {
            transform: scale(1.2);
            color: #45d5d5;
        }
    }

    .alert {
        margin-top: 20px;
    }
}
</style>
