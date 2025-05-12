<script setup>
import { showSnackbar } from '@/hooks/useSnackbar'
import { addItem } from '@/service'
import { computed, reactive, ref } from 'vue'

const props = defineProps({
    refreshFlag: Boolean
})

const emit = defineEmits(['update:refreshFlag'])

const refreshModel = computed({
    get: () => props.refreshFlag,
    set: (value) => emit('update:refreshFlag', value)
})

const formRef = ref(null)
const formIsValid = ref(false)
const form = reactive({
    title: '',
    description: '',
    link: '',
    website: ''
})

const websites = ['Youtube', 'X', 'Medium', 'Linkedin', 'Other']

const requiredField = (fieldName) => {
    return (v) => !!v || `${fieldName} is required`
}

const validUrl = (fieldName) => {
    return (v) =>
        !v || /^https?:\/\/\S+$/.test(v) || `${fieldName} is not valid`
}

const submitForm = async () => {
    const { valid } = await formRef.value.validate()

    if (valid) {
        const { title, description, link, website } = form;
        const response = await addItem(title, description, link, website)
        if (response.id) {
            showSnackbar.success("Bookmark added.")
            formRef.value.reset()
            refreshModel.value = !refreshModel.value
        } else {
            showSnackbar.error("Bookmark was not added!")
        }
    } else {
        console.log('There is error in form.')
    }
}

const resetForm = () => {
    formRef.value.reset()
}
</script>

<template>
    <v-container class="py-5">
        <v-card class="pa-5" style="background-color: #111111;color: white;">
            <div class="d-flex align-center justify-space-between">
                <v-card-title><v-icon start>
                        mdi-plus-circle
                    </v-icon>Add BookMark</v-card-title>
                <v-btn icon="mdi-trash-can-outline" size="x-small" color="red" variant="tonal"
                    @click="resetForm"></v-btn>
            </div>
            <span style="color: darkgray;margin-left: 16px;">Fill in the form below to create an bookmark</span>
            <v-card-text>
                <v-form ref="formRef" v-model="formIsValid" validate-on="submit" @submit.prevent="submitForm">
                    <v-text-field variant="outlined" v-model="form.title" label="Title"
                        :rules="[requiredField('Title')]"></v-text-field>

                    <v-textarea rows="3" variant="outlined" v-model="form.description" label="Description"
                        :rules="[requiredField('Description')]"></v-textarea>

                    <v-text-field variant="outlined" v-model="form.link" label="Link" type="url"
                        :rules="[requiredField('Link'), validUrl('Link')]"></v-text-field>

                    <v-select variant="outlined" v-model="form.website" :items="websites" label="Website"
                        :rules="[requiredField('Website')]"></v-select>

                    <v-btn type="submit" color="green" prepend-icon="mdi-bookmark-plus" variant="tonal" block>
                        Add
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>