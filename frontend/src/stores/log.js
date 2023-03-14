import {defineStore} from "pinia";
import {ref} from "vue";

export const useLogStore = defineStore("log", () => {
    const logList = ref([])

    const getLogListFromServerByName = async (userName) => {
        try {
            const sqlData = await fetch("http://localhost:9190", {
                method : "POST",
                headers : {
                    "operation" : "getlogbyname",
                    "name" : userName
                }
            })

            if (sqlData.headers.get("result") === "success") {
                let sqlDataObj = await sqlData.json()

                if (sqlDataObj["userList"][0] !== undefined) {
                    logList.value = sqlDataObj["userList"]
                }
            }
        } catch (e) {
            alert(e)
        }
    }

    const getLogListFromServerBySite = async (siteName) => {
        try {
            const sqlData = await fetch("http://localhost:9190", {
                method : "POST",
                headers : {
                    "operation" : "getlogbysite",
                    "name" : siteName
                }
            })

            if (sqlData.headers.get("result") === "success") {
                let sqlDataObj = await sqlData.json()

                if (sqlDataObj["userList"][0] !== undefined) {
                    logList.value = sqlDataObj["userList"]
                }
            }
        } catch (e) {
            alert(e)
        }
    }

    return {
        logList,
        getLogListFromServerByName
    }
})