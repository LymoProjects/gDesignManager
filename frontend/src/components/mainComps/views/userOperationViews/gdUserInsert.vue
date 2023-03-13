<script setup>
import {NButton, NSpace, NInput, NText, NDivider, useMessage} from "naive-ui";
import {ref} from "vue";

const userSqlServerUrl = "http://localhost:9190"

const userName = ref("")
const userPhone = ref("")
const userImage = ref("")

const msg = useMessage()

const makeObjFromUserInfo = () => {
    return {
        name : userName.value,
        phone : userPhone.value,
        id : "?",
        imagesrc : "/images/" + document.getElementById("fileInput").files[0].name
    }
}

const resetUserInfo = () => {
    userName.value = ""
    userPhone.value = ""
    userImage.value = ""
}

const commitImage = async () => {
    try {

    } catch (e) {
        alert(e)
    }
}

const commitUserInfo = async () => {
    if (userName.value === "") {
        msg.warning("用户姓名不得为空!")

        return
    }

    if (userImage.value === "") {
        msg.warning("用户照片不得为空!")

        return
    }

    try {
        // todo get user image id from idServer.

        const userSqlRes = await fetch(userSqlServerUrl, {
            method : "POST",
            headers : {
                "operation" : "insert"
            },
            body : JSON.stringify(makeObjFromUserInfo())
        })

        if (userSqlRes.headers.get("result") === "success") {
            msg.success("添加用户成功!")
        } else {
            const errorReason = userSqlRes.headers.get("reason")

            msg.error("添加用户失败, 原因是: " + errorReason)
        }
    } catch (e) {
        alert(e)
    }

    await commitImage()

    resetUserInfo()
}
</script>

<template>
    <NDivider />

    <NSpace size="large" justify="center">
        <NSpace vertical justify="center" size="large">
            <NSpace size="large">
                <NButton size="large" type="info" quaternary>
                    姓名:
                </NButton>
                <NInput size="large" placeholder="请输入用户姓名" v-model:value="userName"/>
            </NSpace>
            <NSpace size="large">
                <NButton size="large" type="info" quaternary>
                    手机:
                </NButton>
                <NInput size="large" placeholder="请输入用户联系方式" v-model:value="userPhone"/>
            </NSpace>
            <NSpace size="large">
                <NButton size="large" type="info" quaternary>
                    照片:
                </NButton>
                <NInput :input-props="{type : 'file', id : 'fileInput'}" size="large" placeholder="" :bordered="false" v-model:value="userImage"/>
            </NSpace>
            <NSpace size="large">
                <NButton size="large" type="warning" secondary @click="resetUserInfo">
                    重置
                </NButton>
                <NButton size="large" type="success" secondary @click="commitUserInfo">
                    提交
                </NButton>
                <NButton @click="commitImage">Test</NButton>
            </NSpace>
        </NSpace>
    </NSpace>
</template>