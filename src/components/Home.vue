<script setup>
import Filter from './Filter.vue';
import { ref, onMounted, watch } from 'vue';
import AddForm from './AddForm.vue';
import { getItems } from '@/service';
import List from './List.vue';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useDisplay } from 'vuetify'

const data = ref([])
const isLoading = ref(true)
const selectedFilter = ref('all')
const refreshFlag = ref(false)
const { snackbar, snackbarText, snackbarColor, snackbarIcon } = useSnackbar()
const { mobile } = useDisplay()

onMounted(async () => {
    await fetchData()
})

watch(refreshFlag, async () => {
    await fetchData()
})

const fetchData = async () => {
    isLoading.value = true
    data.value = await getItems()
    isLoading.value = false
}

const handleFilterUpdate = (newFilter) => {
    selectedFilter.value = newFilter;
}

</script>

<template>
    <div class="body-wrapper">
        <div class="bookmark-container">
            <Filter :selectedFilter="selectedFilter" @update:filter="handleFilterUpdate" />
            <List :data="data" :isLoading="isLoading" :selectedFilter="selectedFilter"
                v-model:refreshFlag="refreshFlag" />
        </div>
        <div class="form-container">
            <v-expansion-panels class="accordion" theme="dark" v-if="mobile" >
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <v-icon start>
                            mdi-plus-circle
                        </v-icon>Add Boomark</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <AddForm v-model:refreshFlag="refreshFlag" />
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <AddForm v-else v-model:refreshFlag="refreshFlag" />
        </div>
    </div>
    <v-snackbar v-model="snackbar" :timeout="5000" location="top right" :color="snackbarColor" class="snackbar">
        <v-icon :icon="snackbarIcon" size="large"></v-icon> {{ snackbarText }}
    </v-snackbar>
</template>

<style lang="postcss" scoped>
@media (min-width: 1024px) {
    .body-wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    .bookmark-container {
        display: flex;
        flex-direction: column;
        -webkit-box-align: start;
        align-items: start;
        padding: 20px;
        grid-column: span 2 / span 2;
    }

    .form-container {
        grid-column: span 1 / span 1;

    }
}

@media (max-width: 1024px) {
    .body-wrapper {
        padding: 0 20px;
        display: flex;
        flex-direction: column;
    }

    .form-container {
        order: 1;
    }

    .bookmark-container {
        order: 2;
    }

    .accordion {
        margin-bottom: 30px;
    }

    ::v-deep(.v-expansion-panel-text__wrapper) {
        padding: 0 !important;
    }
}
</style>
