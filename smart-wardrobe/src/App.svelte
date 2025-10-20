<script>
  import { tops } from "./data";
  import ClothesPicker from "./lib/ClothesPicker.svelte";


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
  let isWeatherDisplayed = $state(false)
  function toggleOutfits() {
    isOutfitsDisplayed = true;
    isWeatherDisplayed = false;
  }

  function toggleWeather() {
    isOutfitsDisplayed = false;
    isWeatherDisplayed = true;

    getWeather();
  }

  let currTemp = $state(0);
  let maxTemp = $state(0);
  let minTemp = $state(0);
  let rain = $state(false);

  let icon = $state("");
  let condition = $state("");

  async function getWeather() {
    const res = await fetch(`/.netlify/functions/weather`);
    let responseData = await res.json();

    icon = responseData.weatherCondition.iconBaseUri + ".svg";
    console.log(responseData.currentConditionsHistory.maxTemperature.degrees);
    maxTemp = Math.floor(
      responseData.currentConditionsHistory.maxTemperature.degrees
    );
    minTemp = Math.floor(
      responseData.currentConditionsHistory.minTemperature.degrees
    );
    condition = responseData.weatherCondition.description.text;
    currTemp = Math.round(responseData.temperature.degrees);
  }

  async function testWeather() {
    const res = await fetch(`/.netlify/functions/weather`);
    let weather = await res.json();
    console.log(weather);
  }
</script>

<main>
  <div class="full-page">
    <div class="side-view">
      <button onclick={toggleOutfits} class="main-button">Saved Outfits</button>
      <button onclick={toggleWeather}>Weather</button>
      <div hidden={!isOutfitsDisplayed}>
        <h1>Saved Outfits</h1>
      </div>
      <div hidden={!isWeatherDisplayed}>
        <h1>Weather</h1>
        <div class="weather-widget">
          <div class="loc">
            <h3>Cincinnati</h3>
            <h1>{currTemp}&degF</h1>
          </div>

          <div class="con">
            <h3>{condition}</h3>
            <img src={icon} />
          </div>
        </div>
        <p>
          Today has a high of {maxTemp} and a low of {minTemp}. Consider
          bringing a jacket for the morning.
        </p>
        {#if rain}
          <p>
            There is a chance of rain today. Consider bringing an umbrella or
            rain jacket.
          </p>
        {/if}
      </div>
    </div>
    <div class="main-view">
      <div style="display: inline-block">
      <ClothesPicker type="tops" />

      <ClothesPicker type="bottoms" />

      <ClothesPicker type="shoes" />

      <button onclick={test} class="main-button">Select Outfit</button>
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
