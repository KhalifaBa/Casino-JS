//1. Déposer de l'argent

// Appel de la methode prompt pour récuper l'entrée de l'utilisateur
const prompt = require("prompt-sync")();
const Deposer = () => {
    while(true){
    // Type : String
    const montantDeposer = prompt("Entrer un montant à déposer : ");
    // Type : Int
    const nombreMontantDeposer = parseFloat(montantDeposer);

    if(isNaN(nombreMontantDeposer)|| nombreMontantDeposer <= 0){
        console.log("Nombre invalide, essayer encore");
    }
    else{
        return nombreMontantDeposer;
    }
    }
};

//2. Déterminer le nombre de ligne sur lesquelles parier
const GetNombreDeLignes = () => {
    while(true){
        // Type : String
        const lignes = prompt("Entrer le nombre de ligne sur lesquelles parier de (1-3) : ");
        // Type : Int
        const nombreDeLignes = parseFloat(lignes);
    
        if(isNaN(nombreDeLignes)|| nombreDeLignes <= 0 || nombreDeLignes > 3){
            console.log("Nombre de lignes invalide, essayer encore");
        }
        else{
            return nombreDeLignes;
        }
        }
}

//3. Collecter l'argent
const GetParie = (budget,ligne) => {
    while(true){
        // Type : String
        const parie = prompt("Entrer le montant à parier : ");
        // Type : Int
        const nombreParier = parseFloat(parie);
        // Le parie ne doit pas dépasser le budget diviser par les lignes
        if(isNaN(nombreParier)|| nombreParier <= 0 || nombreParier > (budget / ligne)){
            console.log("Nombre parier n'est pas valide, essayer encore");
        }
        else{
            return nombreParier;
        }
        }
}

// Objet contenant un jeu d'essai
const LIGNE = 3;
const COLONNES =3;
const SYMBOLS_NB = {
    "Cerise" : 2,
    "Cannard" : 4,
    "Bombe" : 6,
    "Fleur" : 8,
}
const SYMBOLS_VALEUR = {
    "Cerise" : 5,
    "Cannard" : 4,
    "Bombe" : 3,
    "Fleur" : 2,
}






//4. Tourner la machine
const tourner = () =>{
    const symbols = [];
    for(const [symbol,count] of Object.entries(SYMBOLS_NB)){
        for(let i = 0; i< count; i++){
             symbols.push(symbol);   
        }
            
    }
    const reel = [[],[],[]];
    for(let i = 0; i< COLONNES; i++){
        // Copie les valeurs de symbols
        const reelSymbols = [...symbols];
        for(let j = 0; j< LIGNE;j++){
            const randIndex = Math.floor(Math.random()* reelSymbols.length)
            const selectedSymbol = reelSymbols[randIndex]
            reel[i].push(selectedSymbol)
            reelSymbols.splice(randIndex,1) 
        }
    }
    //les valeurs ne sont pas sous forme de colonnes

    return reel;
}



//5. Vérifier si l'utilisateur a gagné
const transposer = (reel) => {
    const ligne = [];
    for(let i = 0; i< LIGNE;i++){
        ligne.push([]);
        for(let j = 0; j< COLONNES;j++){
            ligne[i].push(reel[j][i])
        }
    }
    return ligne
}

//6. Donner la somme gagné à l'utilisateur
const GetMontantGagne = (lignes,parie,ligne) =>{
    let montant = 0;
    for(let laLigne =0; laLigne<ligne;laLigne++){
        const symbols = lignes[laLigne]
        let tousSimilaire = true;
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                tousSimilaire = false
                break;
            }
        }
        if(tousSimilaire){
            montant += parie * SYMBOLS_VALEUR[symbols[0]]
        }
    }
    return montant
}



//7. Tourner encore
const jeu = () => {
    let budget = Deposer();
    while(true){
        console.log("Votre budget est de : "+budget+"€ ")
        const nbLignes = GetNombreDeLignes();
        const parie = GetParie(budget,nbLignes)
        budget -= parie * nbLignes
        const reel = tourner()
        const ligne = transposer(reel)
        console.log(ligne)
        const montant = GetMontantGagne(ligne,parie,nbLignes);
        budget += montant;
        console.log("Tu as gagné : " + montant.toString() +"€ ")
        if(budget<=0){
            console.log("Perdu. Vous n'avez plus d'argent")
            break
        }
        const jouerEncore = prompt("Veut tu jouer encore ? (O/n)? ")
        if(jouerEncore != "O") break;
    
    }
}

jeu()