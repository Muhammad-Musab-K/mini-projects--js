function weather() {
    let input = document.getElementById("input_weather")
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=5fc2c0971a228dee4ea4e9a47e6adfa5`)
        .then(res => {
            console.log(res)
            let weather_of = document.getElementById("weather_of")
            let humi = document.getElementById("humi")
            let icon = document.getElementById("icon")
            let heading = document.getElementById("heading")
            let max_Temp = document.getElementById("max-Temp")
            let min_Temp = document.getElementById("min-Temp")
            let sunrise = document.getElementById("sunrise")
            let sunset = document.getElementById("sunset")
            let feels_like = document.getElementById("feels_like")
            let descrip= document.getElementById("descrip")
            weather_of.innerHTML = "Weather of " + input.value
            let dataIcon = res.data.weather[0].icon
            icon.src = `http://openweathermap.org/img/wn/${dataIcon}.png`
             icon.className ="icon_image" 
            humi.innerHTML = "Humidity" + "<br>" + res.data.main.humidity + " %"
            max_Temp.innerHTML = "Max Temp" + "<br>" + res.data.main.temp_max + " C"
            min_Temp.innerHTML = "Min Temp" + "<br>" + res.data.main.temp_min + " C"
            sunrise.innerHTML = "Sunsrise" + "<br>" + res.data.sys.sunrise
            sunset.innerHTML = "Sunset" + "<br>" + res.data.sys.sunset
            feels_like.innerHTML = "Feels like" + "<br>" + res.data.main.feels_like
            descrip.innerHTML = res.data.weather[0].main
            heading.innerHTML = res.data.main.temp + " C"
            input.value = ''


        })
}