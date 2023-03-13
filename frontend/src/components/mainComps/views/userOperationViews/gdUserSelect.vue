<script setup>
import {NButton, NSpace, NInput, NList, NListItem, NDivider, NText, NAvatar} from "naive-ui";
import {useUserStore} from "../../../../stores/user";
import {ref} from "vue";

const userStore = useUserStore()

const userServer = "http://localhost:9190"
let userName = ref("")
let ifShowList = ref(false)

const handleInsertBtn = async () => {
    if (userName.value === "") {
        return
    }

    ifShowList.value = true

    await userStore.getUserListFromServer(userName.value)
}

const handleDeleteBtn = async (name) => {
    await fetch(userServer, {
        method : "POST",
        headers : {
            "operation" : "delete",
            "name" : name
        }
    })

    await userStore.getUserListFromServer(userName.value)
}

</script>

<template>
    <NSpace size="large" justify="center">
        <NInput size="large" placeholder="请输入用户姓名" round v-model:value="userName"/>
        <NButton size="large" type="primary" round ghost @click="handleInsertBtn">查询</NButton>
    </NSpace>

    <NDivider />

    <NList hoverable :show-divider="false" v-if="ifShowList" size="large">
        <NListItem v-for="(user, index) in userStore.userList" :key="index" hoverable :show-divider="false">
            <template #prefix>
                <NAvatar size="large" :src="userServer + user['imagesrc']" fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" bordered/>
            </template>

            <template #suffix>
                <NButton size="large" type="error" secondary round @click="handleDeleteBtn(user['name'])">
                    删除用户
                </NButton>
            </template>

            <template #default>
                <NSpace size="large" justify="start">
                    <NButton size="large" text>
                        <NText strong>
                            {{
                                user["name"]
                            }}
                        </NText>
                        <NText strong :depth="3">
                            {{
                                "(手机号: " + user["phone"] + ")"
                            }}
                        </NText>
                    </NButton>
                </NSpace>
            </template>
        </NListItem>
    </NList>
</template>