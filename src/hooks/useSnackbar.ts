import { ref } from 'vue'

const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('')
const snackbarIcon = ref('')

export const showSnackbar = {
  success(message) {
    snackbarText.value = message
    snackbarColor.value = 'green'
    snackbarIcon.value = 'mdi-check-circle'
    snackbar.value = true
  },
  error(message) {
    snackbarText.value = message
    snackbarColor.value = 'red'
    snackbarIcon.value = 'mdi-close-circle'
    snackbar.value = true
  }
}

export function useSnackbar() {
  return {
    snackbar,
    snackbarText,
    snackbarColor,
    snackbarIcon
  }
}
