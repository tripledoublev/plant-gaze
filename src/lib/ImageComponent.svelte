<script>
  import { createEventDispatcher } from "svelte";
  
  export let img;
  export let subtitle;
  export let data;

  const dispatch = createEventDispatcher();

  let dateTime;
  let subtitleCount = 0;
  let archiveMode;

  function extractDateTime(filename) {
    const dateRegex = /\d{8}/; 
    const timeRegex = /\d{6}(?=\.\w+$)/; 

    const dateMatch = filename.match(dateRegex);
    const timeMatch = filename.match(timeRegex);
  
    if (dateMatch && timeMatch) {
        const dateString = dateMatch[0];
        const timeString = timeMatch[0];
        const date = `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6, 8)}`;
        const time = `${timeString.slice(0, 2)}:${timeString.slice(2, 4)}:${timeString.slice(4, 6)}`;
        return { date, time };
    } 

    return null;
  }

  // Reactive statement to automatically extract date and time whenever img changes
  $: dateTime = img ? extractDateTime(img) : null;

  function handleClick() {
    subtitleCount = (subtitleCount + 1) % 4; // This will cycle the state through 0, 1, 2
    if (subtitleCount === 2 || subtitleCount === 3) {
      dispatch("imageClicked", 1);
    } else {
      dispatch("imageClicked", 0);
    }
  }

</script>

<div
  class='container'
  on:click={handleClick}
  on:keypress={handleClick}
>
<div class="center-image-container">
  <img class={subtitleCount === 2 || subtitleCount === 0 ? 'full-image' : 'center-image'} src={img} alt={subtitle} />
</div>

{#if subtitleCount === 1 || subtitleCount === 2}
<p class={subtitleCount === 2 ? 'specialSubs' : 'subs'}>{subtitle}</p>
{/if}
</div>

{#if subtitleCount !== 0}
<p class='topRight'>Image: {data.imageIndex} / {data.imageLength}</p>
  <p class='topLeft'>Text: {data.textIndex + 1} / {data.textLength}</p>
  {#if dateTime}
  <p class="bottomLeft">Date: {dateTime.date}</p>
  <p class="bottomRight">{data.language === true ? 'Heure:' : 'Time:'} {dateTime.time}</p>
{/if}
{/if}

<style>
 .container {
  display: grid; 
  place-items: center; 
  height: 100%; 
  width: 100%; 
  text-align: center;
  overflow: hidden;
}

.center-image-container {
  overflow: hidden; 
}

.center-image {
  width: 60%;
  height: auto;
}

.full-image {
  width:100vw;
  height: 100vh;
}
  .subs {
    position: absolute;
    width: 90%;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    font-family:Arial, 'Times New Roman', serif;
    bottom:5vh;
  }
  .specialSubs {
    position: absolute;
    width: 90%;
    text-align: center;
    font-size: 4.5rem;
    font-weight: bolder;
    font-family:Arial, 'Times New Roman', serif;
    color: red;
    -webkit-text-stroke: 2px black;
    left:5%;
  }

  @media (min-width:1400px) {
    .center-image {
  width: 100%;
    }
    .subs {
      bottom:2vh;
    }
    .specialSubs {
      font-size:6rem;
    }
  }
  @media (max-width: 600px) {
    .center-image {
      height: 90vw;
      width: 200vh;
      transform: rotate(90deg);
    }
    .full-image {
      width:100%;
    }
    .subs {
      max-width:92.5vw;
      font-size:1.25rem;
      bottom:3rem;
    }
    .specialSubs {
      font-size:2rem;
    }
  }
  .topLeft,
  .topRight,
  .bottomLeft,
  .bottomRight {
    margin: 0;
    position: absolute;
    font-size: 1rem;
    font-weight: bold;
  }
  .topLeft {
    top: 10px;
    left: 10px;
  }
  .topRight {
    top: 10px;
    right: 10px;
  }
  .bottomLeft {
    bottom: 10px;
    left: 10px;
  }
  .bottomRight {
    bottom: 10px;
    right: 10px;
  }
</style>
