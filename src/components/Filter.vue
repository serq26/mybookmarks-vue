<script setup>

const props = defineProps({
    selectedFilter: {
        type: String,
        required: true,
    },
});
const emit = defineEmits();

const filterSelected = (data) => {
    emit('update:filter', data);
}
</script>

<template>
    <div class="filter">
        <span class="filter-text">Filter: </span>
        <v-btn-toggle class="toggle" v-bind:model-value="selectedFilter" @update:model-value="filterSelected" divided
            color="#008000">
            <v-btn value="all">
                <v-icon start>
                    mdi-format-align-justify
                </v-icon>
                <span>All</span>
            </v-btn>
            <v-btn value="website_twitter">
                <v-icon start>
                    mdi-twitter
                </v-icon>
                <span>X</span>
            </v-btn>
            <v-btn value="website_linkedin">
                <v-icon start>
                    mdi-linkedin
                </v-icon>
                <span>Linkedin</span>
            </v-btn>
            <v-btn value="website_youtube">
                <v-icon start>
                    mdi-youtube
                </v-icon>
                <span>Youtube</span>
            </v-btn>
            <v-btn value="website_medium">
                <v-icon start>
                    mdi-size-m
                </v-icon>
                <span>Medium</span>
            </v-btn>
            <v-btn value="website_other">
                <v-icon start>
                    mdi-google-chrome
                </v-icon>
                <span>Other</span>
            </v-btn>
        </v-btn-toggle>
    </div>
</template>

<style scoped>
.filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.filter-text {
    color: white;
    font-weight: bold;
    margin-right: 20px;
}

.toggle button {
    background: #111111;
    color: white;
    text-transform: none;
    border-inline-end-color: white;
}

@media (max-width: 768px) {
    .filter {
        display: block;
    }

    .toggle {
        overflow: scroll;
    }
}
</style>
