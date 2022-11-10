//1. Creo una variabile del bottone per recuperarlo dall'html
const btnPlay = document.getElementById("btn-play");
//29. creo laa variabile per contenere la select  e recuperarla dall'html
const selezionaLivello = document.querySelector("[name=select-level']");
//27. creo una variabile let della bomba 
let bomba;


//2. attivo il bottone un event listner
btnPlay.addEventListener("click", function() {

    //29. recupero il livello dalla select 
    const livello = selezionaLivello.value;

    //31. genero la lista della bomba in base ai livelli
    bomba = generaBombeLista( +livello );


    //3. creo la funzione a cui darò l'attributo in un sucessivo momento
    //30. applico la variabile livello alla funzione
    generaGriglia( +livello );

});

//4. creo la funzione a cui ho dato il nome precedentemente
/**
 * 
 * @param {number} nCelle 
 */
function generaGriglia(nCelle){
    //5. creo la variabile del contenitore padre
    const gridContainer = document.querySelector(".grid-container");

    //32. applico una classe per non generare griglie infinite 
    gridContainer.classList.add("d-none");

    //33. aggiungo uno spazio vuoto all'htm = per sovrascrivere lo spazio originale ad ogni ricarica
    gridContainer.innerHTML = "";

    //6. creo un ciclo per ricreare le celle 
    for ( let i = 0; i < nCelle; i++){
        //7. creo l'elemento che poi sarà inserito all'interno dell'html
        const cella = document.createElement("div");

        //8. scrivo un calcolo per determinare la realizzazione di quante colonne per riga
        const colonneRighe = Math.sqrt(nCelle);
        
        //9.assegno all'elemento creato gli stili e le classi
        cella.classList.add("grid-cell");
        cella.style.width = 100 / colonneRighe + "%";

        //34. aggiungo un dataset alla cella per avere un riscontro positivo con la condizione delle bombe
        cella.dataset.numCellaSingola = i + 1;

        //10. aggiungo un'azione alla cella creata, in questo caso un click 
        cella.addEventListener("click", onCellaClick); //in questa maniera sto dicendo che quando l'utente clicca laa cella, essa dovrà leggere 
        //il codice della funzione che le ho indicato all'interno

        //11.Aggiungo un append al container padre
        gridContainer.append(cella);
    }
    //33. rimuovo la classe dalla griglia una volta che è stata generata per non avere un effetto scaglionato
    gridContainer.classList.remove( cella );
}

//12. scrivo la funzione che dovrà essere esguita quando l'utente clicca sulla cella
/**
 * @this {HTMLElement}
 */
function onCellaClick(){
    //13.Aggiungo l'azione del css
    this.classList.toggle("active");

    //22. associo un numero alla cella 
    const numCellaSingola = +this.dataset.numCellaSingola;

    //23. controllo se il numero associato alla cella corrisponde a quello della bomba 
    if ( bomba.includes (numCellaSingola)){
        //24. mostro un avviso in caso l'utente abbia trovato una bomba
        alert("Sei esploso!");

        //25. aggiungo una classe che si attiverà al momento del click
        this.classList.add("active", "bomba"); 
    }else{
        //26. aggiungo una classe che mostrerà lo stile della cella senza bomba
        this.classList.toggle("active");
    }
}

//13. Generiamo un numero compreso tra due estremi
/**
 * 
 * @param {number} min 
 * @param {number} max 
 */
function generateRandomNumber(min, max){
    //14. scrivo la formula per generare i numeri random di due estremi
    return Math.floor( Math.random() * (max - min + 1 )) + min;
}

//15. creo una funzione che genererà le 16 bombe
/**
 * 
 * @param {number} nCelle 
 * @return {Array} 
 */
function generaBombeLista (nCelle){
    //16.creo un array vuoto
    const listaBomba = [];

    //17. uso un ciclo while per creare le 16 bombe
    while (listaBomba.length < 16){ //scrivo < 16 perchè è fin lì che voglio che il ciclo arrivi 
        //18. creo una variabile che genererà le bombe in posizioni random 
        const numB = generateRandomNumber(1, nCelle);

        //19. creo una condizione che controllerà se ci sono doppioni di bombe oppure no
        if (!listaBomba.includes(numB)){
            //20. genero un numero unico e lo aggiungo all'array 
            listaBomba.push( numB );
        }
    }
    //21. scrivo il return
    return listaBomba;
}