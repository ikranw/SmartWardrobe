<script>
  import ClothesPicker from "./lib/ClothesPicker.svelte";

  import { tops } from "./data";

  function test() {
    tops[0].inWardrobe = false;
  }

  let isOutfitsDisplayed = $state(true)
  let isWeatherDisplayed = $state(false)
  function toggleOutfits() {
    isOutfitsDisplayed = true
    isWeatherDisplayed = false
  }

  function toggleWeather(){
    isOutfitsDisplayed = false
    isWeatherDisplayed = true

    getWeather()
  }

  let currTemp = $state(0)
  let maxTemp = $state(0)
  let minTemp = $state(0)
  function getWeather(){
    let request = "http://api.weatherapi.com/v1/forecast.json?key=b853acd0326a4155bde181823251710&q=Cincinnati&days=1&aqi=no&alerts=no"

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
        currTemp = responseData.current.temp_f
        maxTemp = responseData.forecast.forecastday[0].day.maxtemp_f
        minTemp = responseData.forecast.forecastday[0].day.mintemp_f
      });
  }
</script>

<main>
  <div class="full-page">
    <div>
      <button onclick={toggleOutfits}>Saved Outfits</button>
      <button onclick={toggleWeather}>Weather</button>
      <div hidden={!isOutfitsDisplayed}>
        <h1>Saved Outfits</h1>
      </div>
      <div hidden={!isWeatherDisplayed}>
        <h1>Weather</h1>
        <div>
<a class="weatherwidget-io" href="https://forecast7.com/en/39d10n84d51/cincinnati/?unit=us" data-label_1="CINCINNATI" data-label_2="WEATHER" data-mode="Current" data-theme="original" >CINCINNATI WEATHER</a>
<script>
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
</script>
        </div>
        <p>Today has a high of {maxTemp} and a low of {minTemp}. Consider bringing a jacket for the morning.</p>
      </div>
    </div>
    <div class="main-view">
      <ClothesPicker type="tops" />

      <ClothesPicker type="bottoms" />

      <ClothesPicker type="shoes" />

      <button onclick={test}>Select Outfit</button>
    </div>
    <div class="testing">Testing</div>
  </div>
</main>

<style>
  @import "./app.css";
</style>
