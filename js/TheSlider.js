class SliderObj { // start class

	constructor(){// constructeur
		this.carousel = document.querySelector('.carousel-container');
		this.cells = this.carousel.querySelectorAll('.carousel__cell');
		this.cellCount = 6; // nombre d'image total
		this.selectedIndex = 0;// index à 0 pour le départ du slider 
		this.cellWidth = this.carousel.offsetWidth;
		this.cellHeight = this.carousel.offsetHeight;
		this.isHorizontal = true;// on met le slider horizontalement
		this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX'; // selon l' orientation du slider
		this.theta = 360 / this.cellCount; // la circonférence du slider / le nombre de face(6)
		this.cellSize = this.isHorizontal ? this.cellWidth : this.cellHeight;
		this.radius = Math.round( ( this.cellSize / 2) / Math.tan( Math.PI / this.cellCount ) ); // formule pour calculer les angles et les tangentes
		this.paused = false; // la pause est enlever au départ
		this.time;
		this.prevButton = document.querySelector('.prev');
		this.nextButton = document.querySelector('.next');
		this.playButton = document.querySelector(".play");
		this.pauseButton = document.querySelector('.pause');
		

	}



RotateSlider() {
	
	

	slider.ChangeSlider();// on appelle la fonction qui gére les image à cacher ou à rendre visible
    
    var angle = this.theta * this.selectedIndex * -1; // calcul l'angle actuelle * l'image actuelle - 1 car pour tourner dans le bon sens
    this.carousel.style.transform = 'translateZ(' + -this.radius + 'px) ' + this.rotateFn + '(' + angle + 'deg)';// transform translate du slider et des image sur l'axe z
    this.selectedIndex++;
    

}



initControlSlider(){// fonction pour controler le slider avec les touches play,pause,suivant,precedant

	this.playButton.addEventListener("click", function(){
		
		
		slider.PlayAuto();// appelle la fonction play

	});

	this.pauseButton.addEventListener("click", function(){


    	
    	slider.Pause();// appelle la fonction pause
    	

    });

    this.nextButton.addEventListener("click",function(){

    	
    	slider.NextImage();// appelle la fonction next

    });


    this.prevButton.addEventListener("click",function(){

    	
  		slider.prevImage();// appelle la fonction prev

    });

   window.addEventListener("keydown", function (e) {// fonction ajouter un EventListener pour les touche fleche du clavier gauche et droite
  if (e.defaultPrevented) {
    return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
  }

  switch (e.key) {
  	case "ArrowLeft":// appuie sur la fleche gauche du clavier
  		slider.prevImage();
  		//console.log("gauche");
  		break;
  	case "ArrowRight":// appui sur la fleche droite du clavier
  	//console.log("droite");
  		slider.NextImage();
  		break;
  	default:
  		return;
  		
  }

  e.preventDefault();
},true);


}


NextImage(){
 this.paused = true;
 clearInterval(this.time);// on met en pause le temps
	this.selectedIndex+1;// on incremente l'image de +1
  	slider.RotateSlider();// on tourne le slider 


}

prevImage(){
	this.pause = true;
	clearInterval(this.time);// on met en pause le temps
	slider.ChangeSlider();
    var angle = this.theta * this.selectedIndex * -1;
    this.carousel.style.transform = 'translateZ(' + -this.radius + 'px) ' + this.rotateFn + '(' + angle + 'deg)';
	this.selectedIndex --;// on decremente l'image de -1
  	//slider.RotateSlider();

}

PlayAuto(){
	this.paused = !this.paused; // on enléve la pause
	this.time = setInterval(function(){// on appelle la fonction de rotation toutes les ...

    	slider.RotateSlider();

    },5000);// 5000 millisecondes = 5 secondes
	

}

Pause(){

	this.paused = true;
	clearInterval(this.time);// on met le temps en pause


}



// ajoute les texte et overlay sur les images
addCaption (){

$(".carousel__cell").append("<figure><figcaption><p></p></figcaption></figure>");
$("figure").css({height:"400px",position:'relative'});
$("figcaption").css({height:"400px",background:"rgba(0,0,0,0.4)",position:'relative'});
$("#one p").append(document.createTextNode("Bonjour et bienvenue sur Cy'Clic."));
$("#two p").append(document.createTextNode("Suivez les instructions pour réserver votre vélo."));
$("#three p").append(document.createTextNode("Pour commencer cliquez sur un point de la carte ci-dessous, un panneau s'ouvrira alors sur le côté droit de la carte avec les informations concernant la station."));
$("#four p").append(document.createTextNode("sur ce panneau vous verrez toutes les infos sur la station selectioné, le nombre de vélo disponible,l'adresse. Vous pouvez alors cliquez sur le bouton reserver."));
$("#five p").append(document.createTextNode("Remplisser le formulaire et signez dans le cadre blanc , vous aurez alors 20 min pour récupérer votre vélo. Au delà du temps imparti votre réservation sera annulez."));
$("#six p").append(document.createTextNode("Attention !! une seule réservation par session et par nom est autoriser. Cy'Clic vous souhaite une bonne journée."));

}


ChangeSlider(){


  	for ( var i=0; i < this.cells.length; i++ ) {// une boucle pour toutes les faces du slider
    	var cell = this.cells[i];
    	if ( i < this.cellCount ) {
      // image visible
      cell.style.opacity = 1;
      var cellAngle = this.theta * i;
      cell.style.transform = this.rotateFn + '(' + cellAngle + 'deg) translateZ(' + this.radius + 'px)';
    	} else {
      	// image cacher
      	cell.style.opacity = 0;
      	cell.style.transform = 'none';
    	}
  	}


}

}// end class




