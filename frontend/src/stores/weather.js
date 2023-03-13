import {defineStore} from "pinia";
import {ref} from "vue";

export const useWeatherStore = defineStore("Weather", () => {
    const baseInfo = ref({})

    const getWeather = async () => {
        try {
            const url = "https://restapi.amap.com/v3/weather/weatherInfo?key=e86622cdc5ec62146620ed050679f8e4&city=130108&extensions=all"

            const weatherData = await fetch(url)
            const weatherObj = await weatherData.json()

            baseInfo.value = weatherObj["forecasts"][0]
        } catch (e) {
            alert(e)
        }
    }

    getWeather()

    return {
        baseInfo,
        getWeather
    }
})