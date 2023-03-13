import {defineStore} from "pinia";
import {ref} from "vue";

export const usePasswordStore = defineStore("password", () => {
    const pwd = ref("")
    const truePwd = "admin"

    return {
        pwd,
        truePwd
    }
})