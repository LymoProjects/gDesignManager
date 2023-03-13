<script setup>
import {RouterLink} from "vue-router";
import {h, ref} from "vue";
import {NSpace, NButton, NMenu} from "naive-ui";

function getMenuItemVNode(routeTo, btnContent) {
    return () => h(
        RouterLink,
        {
            to: routeTo,
        },
        {
            default: () => h(
                NSpace,
                {
                    size: "large",
                    justify: "center"
                },
                {
                    default: () => h(
                        NButton,
                        {
                            text: true,
                            size: "large",
                            strong: true
                        },
                        {
                            default: () => btnContent
                        }
                    )
                }
            )
        }
    )
}

function getNormalMenuItemVNode(btnContent) {
    return () => h(
        NSpace,
        {
            size: "large",
            justify: "center"
        },
        {
            default: () => h(
                NButton,
                {
                    text: true,
                    size: "large",
                    strong: true
                },
                {
                    default: () => btnContent
                }
            )
        }
    )
}

const activeKey = ref("welcomeKey")

const menuOptions = [
    {
        label : getMenuItemVNode("/", "首页"),
        key : "welcomeKey"
    },
    {
        label : getMenuItemVNode("/weather", "天气"),
        key : "weatherKey"
    },
    {
        label : getMenuItemVNode("/logOperation", "监控记录"),
        key : "logOperationKey"
    },
    {
        label : getMenuItemVNode("/identify", "用户鉴别"),
        key : "identifyKey"
    },
    {
        label : getNormalMenuItemVNode("用户管理"),
        key : "userOperationKey",
        children : [
            {
                label : getMenuItemVNode("/userInsert", "用户添加"),
                key : "userInsertKey"
            },
            {
                label : getMenuItemVNode("/userSelect", "用户查询"),
                key : "userSelectKey"
            }
        ]
    }
]
</script>

<template>
    <NMenu :options="menuOptions" v-model:value="activeKey"></NMenu>
</template>