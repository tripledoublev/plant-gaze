<script>
  import { onMount } from "svelte";

  import ImageComponent from "./lib/ImageComponent.svelte";
  
  import text from "./lib/text";
  import texte from "./lib/texte";
  import images from "./lib/images";
  import archive from "./lib/archive";
  
  let data;
  let imageIndex = 0;
  let textIndex = 0;
  let showPiece = false;
  let isFrench = false;
  let currentText;
  let currentImage;
  let archivalMode = false;
  let imageInterval;


  // new function to handle image clicks
  function handleImageClick(eventDetail) {
    // if eventDetail is 1 (i.e., third click), toggle archival mode
    if (eventDetail == 1) {
      archivalMode = true;
      console.log(archivalMode);
    } else {
      archivalMode = false;
    }	
  }

  // reactive statement to switch images source based on archival mode
  $: {
    if (archivalMode) {
      currentImage = archive;
    } else {
      currentImage = images;
    }
  }
  $: {
    if (isFrench) {
      currentText = texte;
    } else {
      currentText = text;
    }
  }

 $: data = {
    language: isFrench,
    imageLength: currentImage.length,
    imageIndex: imageIndex,
    textLength: currentText.length,
    textIndex: textIndex,
  }

   // Reactive statement to handle image interval
   $: {
    clearInterval(imageInterval);
    if (showPiece) {
      imageInterval = setInterval(() => {
        imageIndex = (imageIndex + 1) % currentImage.length;
      }, archivalMode ? 80 : 883);
    }
  }

  function startPiece() {
    showPiece = true;

    if (isFrench === true) {
      currentText = texte
    } else {
      currentText = text
    }

    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % currentText.length; // This will cycle through the texts
    }, 5000);

    return () => {
      clearInterval(imageInterval); // Clear interval when component unmounts
      clearInterval(textInterval); // Clear interval when component unmounts
    };
  };
  // Method to change the title
  const changeTitle = () => {
    document.title = isFrench ? 'Le regard phyto-numérique' : 'The Plant Gaze';
  }
  
  // Change title on mount
  onMount(changeTitle);
  
  // Change title reactively when isFrench changes
  $: changeTitle(), isFrench;
  

</script>
<!-- Language Switcher Button -->


{#if !showPiece}
<div>
  <button
  class='topbtn' 
  on:click={() => (isFrench = !isFrench)}
  >
    {isFrench ? 'Switch to English' : 'Passer au Français'}
  </button>
  <h1>{isFrench ? 'Le regard phyto-numérique' : 'The Plant Gaze'}</h1>
  <h2>{isFrench ?  'Réimaginer la verdure à l\'époque de la conscience écologique' : 'Reimagining Verdancy in the Age of Ecological Consciousness'}</h2>

    <p>
      {isFrench ?
        'Cette œuvre a été créée en juin 2023 lors d\'une résidence à l\'Arboretum de Folly Tree; une archive culturelle d\'arbres dédiée à la narration environnementale. Une caméra a capturé une image de la végétation toutes les 5 minutes. Deux nuances de vert ont été extraites de ces images pour créer la collection suivante. À tout moment, vous pouvez cliquer sur l\'image pour en révéler les détails.' :
        'This artwork was created in June 2023 while in residency at Folly Tree Arboretum, a cultural archive of trees dedicated to environmental storytelling. A camera captured an image of foliage every 5 minutes. Two shades of greens were extracted from these images to create the following collection. At any moment, you can click on the image to reveal its details.'}
    </p>
    <p style="text-align:right;">- <a href="{isFrench ? 'https://vincent.charlebois.info/fr' : 'https://vincent.charlebois.info/en'}">Vincent Charlebois</a></p>
    <button 
    class='btnbtm'
    on:click={startPiece}>
      {isFrench ? 'Commencer' : 'Start'}
    </button>
</div>
{:else}
<ImageComponent img={currentImage[imageIndex]} subtitle={currentText[textIndex]} {data} on:imageClicked={(e) => handleImageClick(e.detail)}/>
{/if}

<style>

  a {
    text-decoration: underline;
    color:white;
    font-weight: bolder;
  }
  div p,
  div h1,
  div h2{
    padding:0.25rem;
    text-align: left;
  }
  p { 
    width:auto;
    max-width:72ch;
  }
  .topbtn {
    margin-bottom:3rem;
  }
  .btnbtm {
    margin-top:3rem;
  }
</style>