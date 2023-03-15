<script setup>
import {darkTheme, lightTheme, NConfigProvider, NGrid, NGridItem, NMessageProvider, NScrollbar, NSpace} from "naive-ui";
import {RouterView} from "vue-router";

import GdMenu from "./components/sideComps/gdMenu.vue";
import GdTool from "./components/sideComps/gdTool.vue";
import GdHeader from "./components/mainComps/gdHeader.vue";

import {usePasswordStore} from "./stores/password";
import {useThemeStore} from "./stores/theme.js";
import {computed, ref} from "vue";

const passwordStore = usePasswordStore()
const themeStore = useThemeStore()

const getThemeMode = computed(() => {
    return themeStore.lightMode ? lightTheme : darkTheme
})
</script>

<template>
    <NConfigProvider :theme="getThemeMode">
        <NMessageProvider>
            <NGrid x-gap="12" :cols="4" item-responsive>
                <NGridItem span="1">
                    <NSpace vertical>
                        <GdTool/>
                        <GdMenu/>
                    </NSpace>
                </NGridItem>

                <NGridItem span="3">
                    <NSpace vertical>
                        <GdHeader/>
                        <NScrollbar trigger="none" style="max-height : 600px">
                            <RouterView v-if="passwordStore.pwd === passwordStore.truePwd"></RouterView>
                        </NScrollbar>
                    </NSpace>
                </NGridItem>
            </NGrid>
        </NMessageProvider>
    </NConfigProvider>
</template>