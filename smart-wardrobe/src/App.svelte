<script>
  import { bottoms, shoes, tops } from "./data";
  import ClothesPicker from "./lib/ClothesPicker.svelte";

  let outfits = [
    "outfit-1.jpg",
    "outfit-2.jpg",
    "outfit-3.jpg",
    "outfit-4.jpg",
  ];

  let topPicker;
  let bottomPicker;
  let shoesPicker;

  function selectOutfit() {
    const topIndex = topPicker.getSelectedIndex();
    const bottomIndex = bottomPicker.getSelectedIndex();
    const shoesIndex = shoesPicker.getSelectedIndex();

    tops[topIndex].inWardrobe = false;
    bottoms[bottomIndex].inWardrobe = false;
    shoes[shoesIndex].inWardrobe = false;

    alert(
      `Removed:\nTop - ${tops[topIndex].description}\nBottom - ${bottoms[bottomIndex].description}\nShoes- ${shoes[shoesIndex].description}`
    );

    topPicker.resetIndex()
    bottomPicker.resetIndex()
    shoesPicker.resetIndex()
  }

  function laundry() {
    for (const item of tops) {
      item.inWardrobe = true;
    }
    for (const item of bottoms) {
      item.inWardrobe = true;
    }
    for (const item of shoes) {
      item.inWardrobe = true;
    }

    alert("All clothes have been returned to the wardrobe.");

    topPicker.resetIndex()
    bottomPicker.resetIndex()
    shoesPicker.resetIndex()
  }

  let isOpen = $state(false);
  function stimulate() {
    isOpen = true;
  }
  function reset() {
    isOpen = false;
  }

  let isOutfitsDisplayed = $state(true);
  let isWeatherDisplayed = $state(false);
  function toggleOutfits() {
    isOutfitsDisplayed = true;
    isWeatherDisplayed = false;
  }

  function toggleWeather() {
    isOutfitsDisplayed = false;
    isWeatherDisplayed = true;

    getWeather();
  }

  function addOutfit() {
    alert("Add new outfit");
  }

  function selectSavedOutfit() {
    alert("Select saved outfit.");
  }

  let currTemp = $state(0);
  let maxTemp = $state(0);
  let minTemp = $state(0);
  let feelsLike = $state(0);
  let rain = $state(false);

  let icon = $state("");
  let condition = $state("");

  async function getWeather() {
    const res = await fetch(`/.netlify/functions/weather`);
    let responseData = await res.json();
    console.log(responseData.forecast.forecastDays[0].maxTemperature.degrees);
    console.log(responseData.currentConditions);

    icon = responseData.currentConditions.weatherCondition.iconBaseUri + ".svg";
    maxTemp = Math.floor(
      // responseData.currentConditionsHistory.maxTemperature.degrees
      responseData.forecast.forecastDays[0].maxTemperature.degrees
    );
    minTemp = Math.floor(
      responseData.forecast.forecastDays[0].minTemperature.degrees
    );
    condition =
      responseData.currentConditions.weatherCondition.description.text;
    currTemp = Math.round(responseData.currentConditions.temperature.degrees);
    feelsLike = Math.round(
      responseData.currentConditions.feelsLikeTemperature.degrees
    );
  }
</script>

<main>
  <div class="full-page">
    <div class="side-view">
      <div style="text-align: center; padding-top: 20px">
        <button onclick={toggleOutfits} class="main-button"
          >Saved Outfits</button
        >
        <button onclick={toggleWeather} class="main-button">Weather</button>
      </div>
      <div hidden={!isOutfitsDisplayed}>
        <h1>Your Saved Outfits</h1>

        <div class="saved-outfits">
          {#each outfits as outfit}
            <div class="outfit">
              <!-- svelte-ignore a11y_missing_attribute -->
              <button class="arrow-button" onclick={selectSavedOutfit}
                ><img
                  src="/outfits/{outfit}"
                  style="max-height: 200px"
                /></button
              >
            </div>
          {/each}
          <div class="outfit">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="add-outfit" onclick={addOutfit}
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="dimgrey"
                class="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                />
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                />
              </svg></button
            >
          </div>
        </div>
      </div>
      <div hidden={!isWeatherDisplayed}>
        <h1>Your Daily Weather Forecast</h1>
        <div>
          <div class="weather-widget">
            <div class="loc">
              <h3>Cincinnati</h3>
              <h1>{currTemp}&degF</h1>
              <h4>Feels Like: {feelsLike}&degF</h4>
            </div>

            <div class="con">
              <h3>{condition}</h3>
              <img src={icon} style="padding-top: 25px" />
            </div>
          </div>
        </div>
        <div style="margin: 0 auto; width: 500px; padding-top: 20px">
          <p class="weather-text">
            Today has a high of {maxTemp}&degF and a low of {minTemp}&degF.
            Consider bringing a jacket for the morning.
          </p>
          {#if rain}
            <p class="weather-text">
              There is a chance of rain today. Consider bringing an umbrella or
              rain jacket.
            </p>
          {/if}
        </div>
      </div>
    </div>
    <div class="main-view">
      <div style="display: inline-block"></div>
      <ClothesPicker bind:this={topPicker} type="tops" />
      <ClothesPicker bind:this={bottomPicker} type="bottoms" />
      <ClothesPicker bind:this={shoesPicker} type="shoes" />

      <button onclick={selectOutfit} class="main-button" style="margin-top: 20px; margin-bottom: 20px">Select Outfit</button>
    </div>

  <div class="testing">
    <div class="Header">
      <h1>Smart Wardrobe</h1>
      <h2>Testing UI</h2>
      <div class="info">
        <button
        class="testing-button"
        style="margin-top: 20px"
          onclick={() =>
            alert(
              "The smart wardrobe has touchscreens on each side and center of it. Select your choices. Once selected, the bottom drawer will automatically update and give you your selected outfit.\n\nYou can also select a pre-made outfit from the Saved Outfits section."
            )}
        >
          Information
        </button>
      </div>
      <div class="interactTest">
        {#if !isOpen}
          <img src="/closed_wardrobe.png" alt="Closed wardrobe" />

          <div class="stimulate">
            <button onclick={stimulate} class="testing-button">Stimulate</button>
          </div>
        {:else}
          <img src="/open-wardrobe.png" alt="Open wardrobe" />
          <p>The wardrobe is now open. This week:</p>
          <div>
            <p>8 clothing needs laundry</p>
            <p>4 preset saved outfits worn</p>
            <p>3 new outfits design worn</p>
          </div>
          <button onclick={reset} class="testing-button">Close Wardrobe</button><br>
        {/if}
        <button onclick={laundry} class="testing-button">Laundry</button>
      </div>
    </div>
  </div>
  </div>
</main>

<style>
  @import "./app.css";
</style>
