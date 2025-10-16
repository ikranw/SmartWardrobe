<script>
import ClothesPicker from "./lib/ClothesPicker.svelte";

import { selectOutfit } from "./main";

import { bottoms, tops } from "./data";

console.log(tops)
console.log(bottoms)


</script>

<main>
  <div class="full-page">
    <div class="main-view">

      <ClothesPicker type="tops"/>

      <ClothesPicker type="bottoms" />

      <button onclick={selectOutfit}>Select Outfit</button>
    </div>
    <div class="testing">Testing</div>
  </div>
</main>

<style>
  @import './app.css';
</style>
