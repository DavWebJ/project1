class MapObj{

	constructor(){

	this.divMap = $("#Carte");// la div avec la carte leaflet dedans
	this.mapbox = "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"; // carte mapbox
	this.latRouen = 49.44250558644192;// position rouen latitude
	this.lngRouen  = 1.098266338219107;// position rouen longitude
	this.tokenMap = "pk.eyJ1IjoiZGF2ZXNwYXJvdyIsImEiOiJjam5rNzh6MmsxMTBoM3JyN3AzbGIyb3lhIn0._guVbZ7k5r8Bre8rUMO7FQ";// la cle token pour mapbox
	this.id  = "mapbox.streets";// la vue choisi pour la map (plusieur possible)
	this.attrib = 'Map data &copy;<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';// la petite pub pour MapBox
	this.Zoom = 20;
	this.carte;
	this.tile;

	
	
	
	}

	InitMap(){// initialise la carte avec tous ces parametres

		$("h1").animate({top:"50px",opacity:1},1500);
		
		this.carte = new L.map('Carte').setView([this.latRouen,this.lngRouen],12);
		this.tile = new L.tileLayer(this.mapbox, {
		attribution: this.attribb, 
		maxZoom: this.Zoom, 
		id: this.id, 
		accessToken:this.tokenMap,
		});




		this.tile.addTo(this.carte);



	}

}


class Infos{// toutes les infos necessaires de l'API deceaux

	constructor(){

	this.latitude = null;
	this.longitude = null;
	this.idStation = null;
	this.listeStation = null;
	this.stationsDispo = null;
	this.infosStation = "https://api.jcdecaux.com/vls/v1/stations?contract=Rouen&apiKey=297c7acc588dee590dfc9af66d6d5e174886990c"; // url de l'api pour requette ajax
	this.nom = $(".nom");
	this.adresse = $(".adresse");
	this.veloDispo = $(".dispo");
	this.etats = $(".stats");
	this.markerCarte;
	this.monIcon;
	this.Marker;
	this.reserver;
	this.nombreVelo;


	}



	addMarker(){// on ajoute les marqueurs grace aux infos de l'API

		this.markerCarte = maCarte.carte;

		$.getJSON(this.infosStation,function(data){// ici on fait une requette ajax en jquery pour recuperer le JSON
			
			var listeInfos=[];

			for (var i = 0; i < data.length; i++){// avec la reponse ajax on fais une boucle pour récuperer toutes les données des stations de velos

				
				var markerPosition = [data[i].position.lat,data[i].position.lng];// infos sur les positions lat et lng stations à rouen

				this.veloDispo = data[i].available_bikes;// données sur les vélos dispo
				this.nom = data[i].name;// le nom des stations
				this.adresse = data[i].address;// l'adresse des stations
				

				


				if(this.veloDispo == 0){// on change la couleurs des icones markeur en fonction des velodispo on crée de nouvelles instance 

				this.monIcon = new L.icon({
    						iconUrl: "icon/rouge.png",// rouge
							iconSize:     [50, 50], 
    						iconAnchor:   [22, 94], 
					});
						
				}else if(this.veloDispo > 10){
				
				this.monIcon = new L.icon({
    						iconUrl: "icon/bleu.png",// bleu
							iconSize:     [50, 50], 
    						iconAnchor:   [22, 94], 
					});

				}else if(this.veloDispo < 10){
				
				this.monIcon = new L.icon({
    						iconUrl: "icon/vert.png",// vert
							iconSize:     [50, 50], 
    						iconAnchor:   [22, 94], 
					});

				}
				
				this.markerCarte = maCarte.carte;
					
				this.Marker = new L.marker(markerPosition,{icon: this.monIcon}).addTo(this.markerCarte).bindPopup("<b>"+"Station : "+this.nom+"</b>");// place les markeur sur la carte et on met une popup avec le nom de chaque sation

				listeInfos.push(data);// on pousse toutes les infos dans la liste array

				this.Marker.addEventListener('click',mesInfos.cliqueMarker)// on ajoute un Listener sur les markers qu'on vient de placer
				this.Marker.infos = data[i];
						

					
					
				
			}		


		});

	}




	cliqueMarker(clique,nomStation,adresseStation,etatsStation){// fonction sur chaque marker au clique

		this.Marker = clique.target;
		
		
		nomStation = this.Marker.infos.name;
		adresseStation = this.Marker.infos.address;
		etatsStation = this.Marker.infos.status;
		this.nombreVelo = this.Marker.infos.available_bikes;
		panneauReservations.AfficherPanneauInfos();// on affiche les details 

		panneauReservations.divCanvas.hide();
		mesInfos.nom.html("").append("nom de la station: "+nomStation).css({background:"white"});// le nom de la station du markeur selectioner
		
		mesInfos.adresse.html("").append("adresse de la station: "+adresseStation).css({background:"white"});// idem pour l'adresse
		

		$("#velo").val(this.nombreVelo);// on marque ces infos dans des inputs Hidden pour pouvoir les récuperer plus tard 
		$("#adr").val(adresseStation);//idem
		
		

		if($("#reservationNom").val() == "" || $("#reservationPrenom").val() == ""){// on verifie si il y a un nom et un prenom sauvegarder

			var username = localStorage.getItem("userName");
			var userLastName = localStorage.getItem("UserLastname");
			$("#reservationNom").val(username);
			$("#reservationPrenom").val(userLastName);
			


		}
		

		
		
		if(adresseStation == sessionStorage.getItem(".adresse")){// si l'adresse de la station est le meme que l'adresse sauvegarder en local...

			var currvelo = sessionStorage.getItem(".dispo") -1;// on enléve un velo 
			//console.log(currvelo);
			if(currvelo < 1){

				mesInfos.veloDispo.html("").append("désoler nous n'avons plus de vélo disponible à cette station").css({background:"crimson"});

			}else{

				mesInfos.veloDispo.html("").append("vélo encore disponible: "+currvelo).css({background:"chartreuse"});

			}
			

			panneauReservations.btnReservation.hide();
			//panneauReservations.divReserver.show();


		}else{

			if(this.nombreVelo == 0 ){

				mesInfos.veloDispo.html("").append("désoler nous n'avons plus de vélo disponible à cette station").css({background:"crimson"});
				panneauReservations.btnReservation.hide();

			}else{

				
				mesInfos.veloDispo.html("").append("vélo encore disponible: "+this.nombreVelo).css({background:"chartreuse"});


				if(mesInfos.etatsStation === "CLOSED"){

					mesInfos.etats.html("").append("Cette station est fermer, veuillez en choisir une autre svp !").css({background: "crimson"});
					panneauReservations.btnReservation.hide();
				}else{

					mesInfos.etats.html("").append("Cette station est ouverte ").css({background: "chartreuse"});
				}

			}
		}
	}
}

		


		

		

		
		




	



	

