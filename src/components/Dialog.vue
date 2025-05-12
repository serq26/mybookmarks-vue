<script setup>
import { computed } from 'vue'

const props = defineProps({
    dialog: Boolean,
    dialogTitle: String,
    dialogText: String,
    confirmButtonText: String
})

const emit = defineEmits(['update:dialog', 'confirm'])

const dialogModel = computed({
    get: () => props.dialog,
    set: (value) => emit('update:dialog', value)
})

const closeDialog = () => {
    dialogModel.value = false
}

function confirmDelete() {
    emit('confirm')
    dialogModel.value = false
}

</script>

<template>
    <v-dialog v-model="dialogModel" max-width="400" theme="dark">
        <v-card :text="dialogText" :title="dialogTitle">
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn @click="closeDialog">
                    Cancel
                </v-btn>
                <v-btn @click="confirmDelete">
                    {{ confirmButtonText }}
                </v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>