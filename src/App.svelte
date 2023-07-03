<script>
  import { onMount } from "svelte";

  import ImageComponent from "./lib/ImageComponent.svelte";
  
  import text from "./lib/text";
  import texte from "./lib/texte";
  import images from "./lib/images";
  
  let data;
  let imageIndex = 0;
  let textIndex = 0;
  let showPiece = false;
  let isFrench = false;
  let currentText;


 $: data = {
    language: isFrench,
    imageLength: images.length,
    imageIndex: imageIndex,
    textLength: text.length,
    texteLength: texte.length,
    textIndex: textIndex,
  }

  function startPiece() {
    showPiece = true;
    const imageInterval = setInterval(() => {
      imageIndex = (imageIndex + 1) % images.length; // This will cycle through the images
    }, 883); // Change every 3 seconds

    if (isFrench === true) {
      currentText = texte
    } else {
      currentText = text
    }

    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % currentText.length; // This will cycle through the texts
    }, 4000); // Change every 3 seconds

    return () => {
      clearInterval(imageInterval); // Clear interval when component unmounts
      clearInterval(textInterval); // Clear interval when component unmounts
    };
  };
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
  <h1>{isFrench ? 'Le regard numérique' : 'The Digital Gaze'}</h1>
  <h2>{isFrench ?  'Réimaginer la verdure à l\'époque de la conscience écologique' : 'Reimagining Verdancy in the Age of Ecological Consciousness'}</h2>

    <p>
      {isFrench ?
        'Cette œuvre a été créée en juin 2023 lors d\'une résidence à l\'Arboretum de Folly Tree; une archive culturelle d\'arbres dédiée à la narration environnementale. Une caméra a capturé une image de la végétation toutes les 5 minutes. Deux nuances de vert ont été extraites de ces images pour créer la collection suivante. À tout moment, vous pouvez cliquer sur l\'image pour en révéler les détails.' :
        'This artwork was created in June 2023 while in residency at Folly Tree Arboretum, a cultural archive of trees dedicated to environmental storytelling. A camera captured an image of foliage every 5 minutes. Two shades of greens were extracted from these images to create the following collection. At any moment, you can click on the image to reveal its details.'}
    </p>
    <p style="text-align:right;">- Vincent Charlebois</p>
    <button 
    class='btnbtm'
    on:click={startPiece}>
      {isFrench ? 'Commencer' : 'Start'}
    </button>
</div>
{:else}
<ImageComponent img={images[imageIndex]} subtitle={currentText[textIndex]} {data} />
{/if}

<style>
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