<script setup>
import {NButton, NSpace, NInput, NDivider, useMessage} from "naive-ui";
import {ref} from "vue";
import {CommitUserImage, GetUserImgPath} from "../../../../../wailsjs/go/main/App.js";

const userSqlServerUrl = "http://localhost:9190"
const identifyServerUrl = "http://localhost:9193"
const imgSelectBtnDefault = "点击选择照片"

const userName = ref("")
const userPhone = ref("")
const userImage = ref(imgSelectBtnDefault)

const msg = useMessage()

// input D:/xxx/xxx/xxx.png
// output xxx.png
const getFileNameFromPath = (filePath) => {
    const index = filePath.lastIndexOf("\\")

    return filePath.substring(index + 1)
}

const makeObjFromUserInfo = () => {
    let idBinPath = "/features/" + getFileNameFromPath(userImage.value)
    idBinPath = idBinPath.replace(".jpg", ".bin")

    return {
        name : userName.value,
        phone : userPhone.value,
        id : idBinPath,
        imagesrc : "/images/" + getFileNameFromPath(userImage.value)
    }
}

const resetUserInfo = () => {
    userName.value = ""
    userPhone.value = ""
    userImage.value = imgSelectBtnDefault
}

const handleSelectFileBtn = async () => {
    const imgPath = await GetUserImgPath()

    if (imgPath === "") {
        msg.error("未能成功选择图片!")
    } else {
        msg.success("成功选择图片!")

        userImage.value = imgPath
    }
}

const commitUserInfo = async () => {
    if (userName.value === "") {
        msg.warning("用户姓名不得为空!")

        return
    }

    if (userImage.value === imgSelectBtnDefault) {
        msg.warning("用户照片不得为空!")

        return
    }

    try {
        msg.info("正在上传用户照片!")

        const isOk = await CommitUserImage(userImage.value, getFileNameFromPath(userImage.value))

        if (isOk === "success") {
            msg.success("上传照片成功!")
        } else {
            msg.error("上传照片失败, 原因是: " + isOk)

            return
        }

        msg.info("正在上传用户信息!")

        const userSqlRes = await fetch(userSqlServerUrl, {
            method : "POST",
            headers : {
                "operation" : "insert"
            },
            body : JSON.stringify(makeObjFromUserInfo())
        })

        if (userSqlRes.headers.get("result") === "success") {
            msg.success("用户信息上传成功!")

            let imgName = getFileNameFromPath(userImage.value)
            imgName = imgName.substring(0, imgName.lastIndexOf("."))

            await fetch(identifyServerUrl, {
                method: "POST",
                headers: {
                    "operation": "identify",
                    "img": imgName
                }
            })

            resetUserInfo()
        } else {
            const errorReason = userSqlRes.headers.get("reason")

            msg.error("上传失败, 原因是: " + errorReason)
        }
    } catch (e) {
        alert(e)
    }
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
                <NButton size="large" dashed type="warning" @click="handleSelectFileBtn">
                    {{userImage}}
                </NButton>
            </NSpace>
            <NSpace size="large">
                <NButton size="large" type="warning" secondary @click="resetUserInfo">
                    重置
                </NButton>
                <NButton size="large" type="success" secondary @click="commitUserInfo">
                    提交
                </NButton>
            </NSpace>
        </NSpace>
    </NSpace>
</template>