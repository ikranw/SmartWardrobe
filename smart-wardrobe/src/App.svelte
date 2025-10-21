<script>
  import ClothesPicker from "./lib/ClothesPicker.svelte";
  import { bottoms, tops, shoes } from "./data";


  function test() {
    tops[0].inWardrobe = false;
  }

  let isOpen = $state(false);
  function stimulate() {
    isOpen = true;
  }
  function reset() {
    isOpen = false;
  }

  let isOutfitsDisplayed = $state(true)
  let isWeatherDisplayed = $state(true)
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

    <div class="Weather-Area">
      <!-- <button onclick={toggleOutfits}>Saved Outfits</button> -->
      <!-- <button onclick={toggleWeather}>Weather</button> -->
      <div>
        <h1>Weather</h1>
        {getWeather()}
        <div>
          <a class="weatherwidget-io" href="https://forecast7.com/en/39d10n84d51/cincinnati/?unit=us" data-label_1="CINCINNATI" data-label_2="WEATHER" data-mode="Current" data-theme="original" >CINCINNATI WEATHER</a>
          <script>
            !function(d,s,id){
              var js,fjs=d.getElementsByTagName(s)[0];
              if(!d.getElementById(id)){js=d.createElement(s);
              js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';
              fjs.parentNode.insertBefore(js,fjs);}}
              (document,'script','weatherwidget-io-js');
          </script>
        </div>
        <h2>Current weather is {currTemp}° Farhenheit </h2>
        <h3>Today, expect a high {maxTemp}° and a low of {minTemp}°. Consider bringing a jacket.</h3>
      </div>
    </div>


    <div class="main-view">
      <div class="wardrobe-container">
        <ClothesPicker type="tops" />

        <ClothesPicker type="bottoms" />

        <ClothesPicker type="shoes" />

        <button  onclick={test} class="outfitbuttons">Select Outfit</button>
        <div hidden={!isOutfitsDisplayed}>
          <button onclick={toggleOutfits} class="buttons">View Saved Outfits</button>
        </div>
      </div>
      
    </div>

    <div class="testing">
      <div class="Header">
        <h1>Testing UI</h1>
        <div class ="info">
          <button style="margin-left: 200px;" onclick= {() => alert("The smart wardrobe has touchscreens on each side and center of it. Select your choices. Once selected, the bottom drawer will automatically update and give you your selected outfit.")} > 
            Information </button>
        </div>
      <div class = "interactTest">
        {#if !isOpen}
        <img src="/closed_wardrobe.png" alt="Closed wardrobe" />

        <div class = "stimulate">
          <button onclick={stimulate}>Stimulate</button>
        </div>
        {:else}
          <img src="/open-wardrobe.png" alt="Open wardrobe" />
          <p>The wardrobe is now open. This week:</p>
          <div>
            <p>8 clothing needs laundry</p>
            <p>4 preset saved outfits worn</p>
            <p>3 new outfits design worn</p>
          </div>
          <button onclick={reset}>Close Wardrobe</button>
        {/if}
      </div>
    </div>
  </div>
</main>

<style>
  @import "./app.css";
</style>