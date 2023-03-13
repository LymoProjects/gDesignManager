<script setup>
import {NCard, NSpace, NButton, NText, NInput} from "naive-ui";
import {ref} from "vue";
import {usePasswordStore} from "../../stores/password";

const passwordStore = usePasswordStore()

const ifShowInput = ref(true)
const inputPwd = ref("admin")

const toLogin = () => {
    if (passwordStore.pwd !== passwordStore.truePwd) {
        if (inputPwd.value === passwordStore.truePwd) {
            ifShowInput.value = false

            passwordStore.pwd = passwordStore.truePwd
        }
    }
}

</script>

<template>
    <NCard size="large" hoverable :bordered="false" embedded>
        <template #header>
            <NSpace justify="center">
                <NInput placeholder="输入管理员密码" v-model:value="inputPwd" v-if="ifShowInput" type="password">

                </NInput>

                <NButton size="large" type="success" text @click="toLogin">
                    <NText strong v-if="passwordStore.pwd === passwordStore.truePwd" :depth="3">
                        已登录
                    </NText>
                    <NText strong v-else>
                        未登录
                    </NText>
                </NButton>
            </NSpace>
        </template>
    </NCard>
</template>