<script setup>
    import {NSpace, NGrid, NGridItem, NScrollbar, NMessageProvider} from "naive-ui";
    import {RouterView} from "vue-router";

    import GdMenu from "./components/sideComps/gdMenu.vue";
    import GdTool from "./components/sideComps/gdTool.vue";
    import GdHeader from "./components/mainComps/gdHeader.vue";

    import {usePasswordStore} from "./stores/password";

    const passwordStore = usePasswordStore()
</script>

<template>
    <NMessageProvider>
        <NGrid x-gap="12" :cols="4" item-responsive>
            <NGridItem span="1">
                <NSpace vertical>
                    <GdTool />
                    <GdMenu />
                </NSpace>
            </NGridItem>

            <NGridItem span="3">
                <NSpace vertical>
                    <GdHeader />
                    <NScrollbar trigger="none" style="max-height: 800px">
                        <RouterView v-if="passwordStore.pwd === passwordStore.truePwd"></RouterView>
                    </NScrollbar>
                </NSpace>
            </NGridItem>
        </NGrid>
    </NMessageProvider>
</template>