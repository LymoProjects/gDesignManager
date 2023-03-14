<script setup>
import {NButton, NSpace, NDivider, NList, NListItem, NAvatar, NText} from "naive-ui";
import {useLogStore} from "../../../stores/log.js";
import {ref} from "vue";

const logStore = useLogStore()

const userServer = "http://localhost:9190"

let userName = ref("")
let siteName = ref("")

let ifShowList = ref(false)
</script>

<template>
    <NButton size="large">Click Me Log</NButton>
    <NDivider />
    <NList hoverable :show-divider="false" v-if="ifShowList" size="large">
        <NListItem v-for="(log, index) in logStore.logList" :key="index" hoverable :show-divider="false">
            <template #prefix>
                <NAvatar size="large" :src="userServer + log['imagesrc']" fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" bordered/>
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