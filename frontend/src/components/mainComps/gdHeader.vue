<script setup>
import {NCard, NSpace, NButton, NGradientText, NSwitch, NText} from "naive-ui";
import {useThemeStore} from "../../stores/theme.js";
import {WindowSetBackgroundColour} from "../../../wailsjs/runtime/runtime.js";

const themeStore = useThemeStore()

const setWindowTheme = async () => {
    themeStore.changeMode()

    if (themeStore.lightMode) {
        WindowSetBackgroundColour(255, 255, 255, 255)
    } else {
        WindowSetBackgroundColour(24, 24, 28, 255)
    }
}
</script>

<template>
    <NCard :bordered="false" size="huge">
        <template #header>
            <NSpace justify="center">
                <NButton type="success" size="large" text>
                    <NGradientText type="success" size="32">毕设数据管理系统</NGradientText>
                </NButton>
            </NSpace>
        </template>
        <template #header-extra>
            <NSpace size="large" justify="center">
                <NText strong :depth="3">暗</NText>
                <NSwitch :round="false" size="large" v-model:value="themeStore.lightMode" :on-update:value="setWindowTheme"/>
                <NText strong :depth="3">亮</NText>
            </NSpace>
        </template>
    </NCard>
</template>