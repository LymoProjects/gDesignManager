<script setup>
import {NAvatar, NButton, NDivider, NInput, NList, NListItem, NSpace, NText} from "naive-ui";
import {useLogStore} from "../../../stores/log.js";
import {ref} from "vue";

const logStore = useLogStore()

const userImgSqlServerUrl = "http://localhost:9191"

let userName = ref("")
let siteName = ref("")

let ifShowList = ref(false)

const handleSelectUserNameBtn = async () => {
    if (userName.value === "") {
        return
    }

    ifShowList.value = true

    await logStore.getLogListFromServerByName(userName.value)
}

const handleSelectSiteNameBtn = async () => {
    if (siteName.value === "") {
        return
    }

    ifShowList.value = true

    await logStore.getLogListFromServerBySite(siteName.value)
}
</script>

<template>
    <NSpace size="large" justify="center">
        <NInput size="large" placeholder="请输入用户姓名" round v-model:value="userName"/>
        <NButton size="large" type="primary" round ghost @click="handleSelectUserNameBtn">查询</NButton>
        <NDivider vertical/>
        <NInput size="large" placeholder="请输入监控地点" round v-model:value="siteName"/>
        <NButton size="large" type="primary" round ghost @click="handleSelectSiteNameBtn">查询</NButton>
    </NSpace>
    <NDivider/>
    <NList hoverable :show-divider="false" v-if="ifShowList" size="large">
        <NListItem v-for="(log, index) in logStore.logList" :key="index" hoverable :show-divider="false">
            <template #prefix>
                <NAvatar size="large" :src="userImgSqlServerUrl + log['imagesrc']"
                         fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" bordered/>
            </template>

            <template #default>
                <NSpace size="large" justify="start">
                    <NButton size="large" text>
                        <NText strong>
                            {{
                                log["name"]
                            }}
                        </NText>
                        <NText strong :depth="3">
                            {{
                                "(手机号: " + log["phone"] + ")"
                            }}
                        </NText>
                    </NButton>
                    <NButton size="large" text>
                        <NText strong>
                            {{
                                log["site"]
                            }}
                        </NText>
                    </NButton>
                </NSpace>
            </template>

            <template #suffix>
                <NButton size="large" text>
                    <NText strong>
                        {{
                            log["time"]
                        }}
                    </NText>
                </NButton>
            </template>
        </NListItem>
    </NList>
</template>