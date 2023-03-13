<script setup>
import {NCard, NSpace, NButton, NGradientText} from "naive-ui";

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
    </NCard>
</template>