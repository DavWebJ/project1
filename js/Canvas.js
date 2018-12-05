Canvas = {
    initCanvas: function() {
        canvas = document.getElementById('Canvas'); // on récupère le canvas dans le html
        ctx = canvas.getContext("2d"); // on le met en 2d pour pouvoir intéragir avec
        toggle = 0;// clic souris = 0 de base
        ctx.beginPath();// on appel la fonction dessiner le chemin (path)
    },
        initDessin: function() {// on ecoute si la souris est sur le canvas et bouge
        if (toggle === 1) {// si on est sur le canvas on ajoute eventListener 
            canvas.addEventListener("mousemove", Canvas.dessiner);
        } else {
            canvas.removeEventListener("mousemove", Canvas.dessiner);// sinon on retire le eventListener
        }    
    },
    initSwitch: function() {
        canvas.addEventListener("click", function(e) {// au click de la souris
            if (toggle === 0) {
                ctx.moveTo(e.layerX, e.layerY);  // on dessine              
                toggle = 1;
            } else if (toggle === 1) {// si on reclick le dessin stop
                toggle = 0;
            }
        Canvas.initDessin();// on appelle la fonction qui écoute le canvas
        
        });

    },
    dessiner: function(e) {
        ctx.lineTo(e.layerX, e.layerY);// on fait le chemin
        ctx.stroke(); // on montre le dessin ou chemin effectuer
    },
    
    effacerSignature: function() {// fonction qui efface le canvas avec clearRect()
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       
    }

    

};