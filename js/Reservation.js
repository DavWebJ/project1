class AsideReservation{

	constructor(){

		this.panneauInfos = $("aside");
		this.divReserver = $("#reservationConfirmer");
		this.btnReservation = $("#reserver");
		this.btnConfirmer = $("#confirmer");
		this.divCanvas = $("#reservation");
		this.divMap = $("#Carte");
		this.emptyForm = $(".emptyForm");
		this.emptyCanvas = $(".emptycanvas");
		this.nameAlreadyUsed = $(".alreadyUse");
		this.input = $("input");
		this.secondes;
		this.minutes;
		this.secondesRestantes;
		this.timer;




	}

	CacherPanneauInfos(){ // cache les infosStation et reservation
		



		this.panneauInfos.hide();
		this.divCanvas.hide();
		this.divReserver.hide();
		this.btnReservation.hide();
		this.emptyForm.hide();
		this.emptyCanvas.hide();
		this.nameAlreadyUsed.hide();

	}


	AfficherPanneauInfos(){// montre le panneau infos pour reserver 
		
		


		this.panneauInfos.show("slow").css({padding:"0",background:"url(img/background2.jpg) no-repeat",backgroundSize:"cover"});// aside
		this.divMap.animate({left:"0"},"slow");// pousse la carte pour afficher aside
		this.btnReservation.show();
			

		this.btnReservation.on("click",function(){ // au click du bouton reserver on créer une reservation

			
			Canvas.effacerSignature();// efface la signature du canvas
			Canvas.initCanvas();
			panneauReservations.CreateReservation();

		});
	}

		

	

	CreateReservation(){// initialise le formulaire de reservation

		this.panneauInfos.fadeOut("slow");
		this.divCanvas.show().animate({top:"0"},1000);
		
		
		panneauReservations.InitData();


	}


	InitData(){// verification du formulaire et du canvas

		var  canvas = document.getElementById('Canvas');
		var canvasVide = document.getElementById('clone');// le clone vide du canvas  pour comparer si le canvas est == à l'orginal
		

		this.btnConfirmer.on("click",function(){// au click du bouton confirmer

			
        	
			if($.trim($("#reservationPrenom").val()) == ""){ // on verifie que le formulaire n'est pas vide


				// si le formulaire pas remplie on alerte l'utilisateur qu'il faut remplir le formulaire et signer
				
				
				return panneauReservations.emptyForm.show("slow").css({top:"-300px",position:"relative",color:"white",textAlign:'center'}).fadeOut(2000);
				


			}else if($.trim($("#reservationNom").val()) == ""){

				return panneauReservations.emptyForm.show("slow").css({top:"-300px",position:"relative",color:"white",textAlign:'center'}).fadeOut(2000);


			}else if(canvas.toDataURL() == canvasVide.toDataURL()){// si l'utilisateur n'as pas signer on alerte qu'il faut signer

				
				return panneauReservations.emptyCanvas.show("slow").css({top:"-300px",position:"relative",color:"white",textAlign:'center'}).fadeOut(2000);


			}else if($("#reservationNom").val() == localStorage.getItem("userName") && sessionStorage.getItem("remainSecondes") > 0){  // si ce nom existe déjà et qu' il y a une reservation

					
					return panneauReservations.nameAlreadyUsed.show().css({top:"-300px",position:"relative",color:"white",textAlign:'center'}).fadeOut(3000);// on informe l'utilisateur qu'une reservation est en cours
				
					
				
					
			}else{// sinon on peut reserver et on sauvegarde les données

					
					
					panneauReservations.InitTimer();

				
			}


			


		});
		

		

	}




	SaveData(resaPrenom,resaNom){// sauvegarde des données
		
		
			var velo = $("#velo").val();// prend la valeur du nombre de vélo dispo
			var adrStation = $("#adr").val();//prend la valeur de l'adresse
			resaPrenom = $('#reservationPrenom').val();// prend la valeur de prenom
			resaNom = $('#reservationNom').val();// prend la valeur de nom
			localStorage.setItem("userName",resaNom);// on sauvegarde le nom
			localStorage.setItem("UserLastname",resaPrenom);// le prenom
			sessionStorage.setItem(".dispo", velo);// le nombre de velo
			sessionStorage.setItem(".adresse",adrStation);// et l'adresse de la station
			
			panneauReservations.AfficheInfosReservation();// on affiche la div reservation
			clearInterval(panneauReservations.timer);//on stop le timer au cas ou il serais dèjà en cours
			//panneauReservations.InitTimer();// on initialise le timer (descompte du temps 20min)
			
		
		

	}



	GetInfosUser(username,UserLastname,AdrStation,velo){// récupère les données utilisateur


		username = localStorage.getItem("userName"); // récupère nom et prénom dans la liste
		
		UserLastname = localStorage.getItem("UserLastname");
		AdrStation = sessionStorage.getItem(".adresse"); // récupère l'adresse de la station réserver
		
		
		


		
		return username+" "+UserLastname+"."+"  Votre vélo vous attend à l' adresse :  "+AdrStation; // on convertit en chaine de caractere les infos utiles



	}





	InitTimer(){// méthode timer
		
		
		this.minutes = Math.floor(this.secondes / 60); // on converti les secondes en minutes
		this.secondesRestantes = this.secondes % 60; // on calcul les secondes restantes avant fin
		var remainTime = sessionStorage.getItem("remainSecondes")

		if(remainTime > 1 && $("#reservationNom").val() == localStorage.getItem("userName")){ // si il reste du temps sur ce nom utiliser

			this.secondes = remainTime; // on calcule le temps restant

		}else{
			panneauReservations.SaveData(); // on sauve les données et on met le timer a 20 minutes

			this.secondes = 1200
		}
		// 1200 secondes = 20 minutes
		this.timer = setInterval(function(){// fonction descompte de temps

				"use strict";

			panneauReservations.StartCountDown();// on démare le descompte ici en appelant la fonction StartCountDown
		
		},1000);// toutes les milliSecondes comme un UpDate()

			

			
			

		
		

	}

	StartCountDown(){// demare le descompte

		"use strict";
		
		this.minutes = Math.floor(this.secondes / 60); // on converti les secondes en minutes
		this.secondesRestantes = this.secondes % 60; // on cherche le nombre de secondes restantes avant la fin du descomptes
		

		panneauReservations.AfficheTimer();// on affiche le temps

		if(this.secondes > 0){// si il reste des secondes on déduit une secondes chaque millisecondes

			this.secondes = this.secondes - 1;
			sessionStorage.setItem("remainSecondes", this.secondes);


		}else{ // sinon 

			
			clearInterval(this.timer);// on stop le timer
			$(".timerClock").text("Votre réservation à expirer.Cliquer de nouveau sur un point de la carte ");
			panneauReservations.divReserver.fadeOut(7000);
			setTimeout(panneauReservations.Reset, 4000);// on reset les données ici
			
		}


			
	}


	FormatClock(secondes,minutes){// méthode pour formater les secondes et minutes pour ajouter un 0 devant quand secondes et minutes en dessous de 10


		var newMinutes = minutes;
		var newSecondes = secondes;

		if(minutes < 10 ){

			newMinutes = "0"+minutes;

		}

		if(secondes < 10){

			newSecondes = "0"+secondes;
		}


		return newMinutes +" minutes et "+newSecondes+" secondes.";



	}

	AfficheTimer(){// affiche le timer
	
		var time = this.FormatClock(this.secondesRestantes,this.minutes); // affiche le temps
		$(".timerClock").text("Votre réservation sera active pendant "+time);

	}



	AfficheInfosReservation(ID){// affiche la réservation

		ID = this.GetInfosUser(this.username,this.UserLastname); // affiche le nom et prenom de l'utilisateur qui a reserver
		this.divReserver.show("slow");
		$("#reservationConfirmer p").text(" Votre réservation est active au nom de :  "+ID);
		this.btnConfirmer,this.divCanvas.fadeOut("slow");
		this.divReserver.fadeIn(5000);
		this.panneauInfos.fadeOut("slow");
		this.btnReservation.hide();

		


	}

	Reset(){// on remet à 0 les données et on rafraichit la page automatiquement

		sessionStorage.removeItem(".dispo");// on supprime la sauvegarde du nombre de velo
		sessionStorage.removeItem(".adresse");// on supprime la sauvegarde de l'adresse
		$("#reservationConfirmer p").html("");
		window.location.reload();
		Canvas.effacerSignature();// efface la signature du canvas
		

	}




	ResetCanvas(){// init le canvas

		Canvas.initCanvas();
		Canvas.initSwitch();
		


	}





}







	









