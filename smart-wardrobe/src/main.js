import { mount } from 'svelte'
import './app.css'
// @ts-ignore
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app

export function selectOutfit(){
  alert("Outfit Dispensed")
  
}

let API=import.meta.env.WEATHER_API

export function requestWeather(){

  let r;
  let request = "https://weather.googleapis.com/v1/currentConditions:lookup?key=" + import.meta.env.WEATHER_API + "&location.latitude=39.1031&location.longitude=-84.5120&unitsSystem=IMPERIAL"

    fetch(request, {
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        r = responseData
      });

      return r;
}

