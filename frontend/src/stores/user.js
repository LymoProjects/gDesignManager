import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore("user", () => {
    const userList = ref([])

    const getUserListFromServer = async (userName) => {
        try {
            const sqlData = await fetch("http://localhost:9190", {
                method : "POST",
                headers : {
                    "operation" : "select",
                    "name" : userName
                }
            })

            if (sqlData.headers.get("result") === "success") {
                let sqlDataObj = await sqlData.json()

                if (sqlDataObj["userList"][0] !== undefined) {
                    userList.value = sqlDataObj["userList"]
                }
            }
        } catch (e) {
            alert(e)
        }
    }

    return {
        userList,
        getUserListFromServer
    }
})