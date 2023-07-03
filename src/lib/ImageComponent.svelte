<script>
  export let img;
  export let subtitle;
  export let data;

  
  let dateTime;
  let showSubtitles = false;

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


</script>

<div
  class='container'
  on:click={() => (showSubtitles = !showSubtitles)}
  on:keypress={() => (showSubtitles = !showSubtitles)}
>
<div class="center-image-container">
  <img class="center-image" src={img} alt={subtitle} />
</div>

  {#if showSubtitles}
    <p class="subs">{subtitle}</p>
  {/if}
</div>

{#if showSubtitles}
<p class='topRight'>Image: {data.imageIndex} / {data.imageLength}</p>
  {#if data.language === true}
  <p class='topLeft'>Texte: {data.textIndex + 1} / {data.texteLength}</p>
  {:else}
  <p class='topLeft'>Text: {data.textIndex + 1} / {data.textLength}</p>
  {/if}
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
}

.center-image-container {
  overflow: hidden; 
}

.center-image {
  width: 60%;
  height: auto;
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
  @media (min-width:1400px) {
    .center-image {
  width: 100%;
    }
    .subs {
      bottom:4vh;
    }
  }
  @media (max-width: 600px) {
    .center-image {
      height: 90vw;
      width: 200vh;
      transform: rotate(90deg);
    }
    .subs {
      max-width:92.5vw;
      font-size:1.25rem;
      bottom:3rem;
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
