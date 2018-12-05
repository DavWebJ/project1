$(function () {//   quand l'apps s'ouvre on appelle les fonction start et iniclass

InitClass();
CalculeTempsRestant();
StartFunction();





});


function InitClass(){// fonction qui instantie les Objets ou class 
maCarte = new MapObj();
mesInfos = new Infos();
slider = new SliderObj();
panneauReservations = new AsideReservation();

}


function StartFunction(){// fonction qui apelle les autres fonctions necessaire au démarage de l'apps


maCarte.InitMap();
mesInfos.addMarker();
slider.PlayAuto();
slider.addCaption();
slider.initControlSlider();
panneauReservations.ResetCanvas();



}



function CalculeTempsRestant(){

	var globalTime = 1200;
	var elapsedTime = sessionStorage.getItem("remainSecondes");
	var remainTime = globalTime - elapsedTime;

	if(remainTime !== globalTime){

		panneauReservations.InitTimer();
		panneauReservations.panneauInfos.hide();
		panneauReservations.divCanvas.hide();
		panneauReservations.AfficheInfosReservation();
		panneauReservations.emptyForm.hide();
		panneauReservations.emptyCanvas.hide();
		panneauReservations.nameAlreadyUsed.hide();
		console.log(remainTime);

	}else{

		panneauReservations.CacherPanneauInfos();

	}

	




}