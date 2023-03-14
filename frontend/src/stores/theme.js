import {defineStore} from "pinia";
import {ref} from "vue";

export const useThemeStore = defineStore("theme", () => {
    const lightMode = ref(true)

    const changeMode = () => {
        lightMode.value = !lightMode.value
    }

    return {
        lightMode,
        changeMode
    }
})