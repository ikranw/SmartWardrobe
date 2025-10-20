<script>
import ClothesPicker from "./lib/ClothesPicker.svelte";

import { selectOutfit } from "./main";

import { bottoms, tops, shoes } from "./data";

console.log(tops)
console.log(bottoms)
console.log(shoes)


</script>

<main>
  <div class="full-page">
    <div class="main-view">
      <div class="wardrobe-container">
        <ClothesPicker type="tops"/>
        <ClothesPicker type="bottoms" />
        <ClothesPicker type="shoes" />
      </div>


    </div>
    <div class="testing">Testing</div>
  </div>
</main>

<style>
  @import './app.css';
</style>
