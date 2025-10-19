<script>
  import { bottoms, shoes, tops } from "../data";

  const { type = "" } = $props();

  let t = tops;
  let b = bottoms;
  let s = shoes;

  let art;
  if (type.charAt(0) == "t") {
    art = t;
  } else if (type.charAt(0) == "b") {
    art = b;
  } else {
    art = s;
  }

  let index = $state(0);
  let image = $derived(art[index]?.img);
  let desc = $derived(art[index]?.description);
  let isInWardrobe = $derived(art[index]?.inWardrobe);

  function left() {
    if (type == "tops") {
      if (index == 0) {
        index = tops.length - 1;
      } else {
        index--;
      }
    } else if (type == "bottoms") {
      if (index == 0) {
        index = bottoms.length - 1;
      } else {
        index--;
      }
    } else {
        if (index == 0) {
        index = shoes.length - 1;
      } else {
        index--;
      }
    }
  }

  function right() {
    if (type == "tops") {
      if (index == tops.length - 1) {
        index = 0;
      } else {
        index++;
      }
    } else if (type == "bottoms") {
      if (index == bottoms.length - 1) {
        index = 0;
      } else {
        index++;
      }
    } else {
        if (index == shoes.length - 1) {
        index = 0;
      } else {
        index++;
      }
    }
  }
</script>

<div>
  <div class="top-picker">
    <div class="top-view">
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button onclick={left}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
          />
        </svg>
      </button>

      <div class="top-img">
        <img src={image} alt="" class="item-img" />
      </div>

      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button onclick={right}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </button>
    </div>

    <div class="top-description">
      <p style="font-size: 20px; font-weight: bold">{desc}</p>
      {#if !isInWardrobe}
        <p class="out-of-wardrobe">Out of Wardrobe</p>
      <!-- {:else}
        <p class="wardrobe">In Wardrobe</p> -->
      {/if}
    </div>
  </div>
</div>
