console.log("Working");

const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=9a01708947300e64b560668a7c6a2039";


let btn = document.querySelector(".search-btn");
let weatherIcon = document.querySelector(".weather-icon");

btn.addEventListener("click",async () =>{
    let city = document.querySelector("input").value;
    console.log(city);

    let res = await checkWeather(city);
    
    if(res.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display ="none";
    }else{
        let weatherInfo = res.data;
    console.log(weatherInfo);


    let h2 = document.querySelector(".city");
    h2.innerText = weatherInfo.name;

    let temp = document.querySelector(".temp");
    temp.innerText = Math.round(weatherInfo.main.temp - 273) + "°c";

    let humidity = document.querySelector(".humidity");
    humidity.innerText = weatherInfo.main.humidity + "%";

    let wind = document.querySelector(".wind");
    wind.innerText = weatherInfo.wind.speed + "km/h";
    
    let type = weatherInfo.weather[0].main;
    console.log(type);

    await updateIcon(type);

    let box = document.querySelector(".weather");
    box.style.display = "block";

    document.querySelector(".error").style.display = "none";
    }

    

});

 async function updateIcon(type){
     if(type == "Clouds"){
          weatherIcon.scroll("images/clouds.png");
     }
     else if (type == "Rain"){
         weatherIcon.src ="images/rain.png"
     }
     else if (type == "Clear"){
         weatherIcon.src ="images/clear.png";
     }
     else if (type == "Drizzle"){
         weatherIcon.src ="images/drizzle.png";
     }
     else if (type == "Mist"){
         weatherIcon.src ="images/mist.png";
     }
     else if (type == "Snow"){
         weatherIcon.src ="images/snow.png";
     }
 }

async function checkWeather(city){
    try {
        let res = await axios.get(url +city + apiKey);
        return res;
    }catch(e){
        return e.response;
    }
}