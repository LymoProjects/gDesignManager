<script setup>
import {NButton, NSpace, NCard, NText, NList, NListItem} from "naive-ui";
import {useWeatherStore} from "../../../stores/weather.js";

const weather = useWeatherStore()
</script>

<template>
    <NSpace vertical>
        <NCard size="large" embedded hoverable>
            <template #header>
                <NText :strong="true" :depth="3">
                    {{
                        weather.baseInfo["city"] +
                        " (更新时间 " + weather.baseInfo["reporttime"] + ")"
                    }}
                </NText>
            </template>

            <template #header-extra>
                <NButton size="large" tertiary round type="success" @click="weather.getWeather()">
                    刷新
                </NButton>
            </template>

            <NList hoverable :show-divider="false">
                <NListItem v-for="(day, index) in weather.baseInfo['casts']" :key="day" hoverable :show-divider="false">
                    <template #prefix>
                        <NButton text size="large">
                            <NText>
                                {{
                                    day["date"] +
                                    " 周" + day["week"]
                                }}
                            </NText>
                        </NButton>
                    </template>

                    <template #suffix v-if="index === 0">
                        <NButton text size="large">
                            <NText strong>
                                {{"今天"}}
                            </NText>
                        </NButton>
                    </template>

                    {{
                        "☀: " + day["daytemp"] + "°C " + day["dayweather"] +
                        ", 🌙: " + day["nighttemp"] + "°C " + day["nightweather"]
                    }}
                </NListItem>
            </NList>
        </NCard>
    </NSpace>
</template>