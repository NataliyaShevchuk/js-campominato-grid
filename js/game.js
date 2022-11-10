/**
 * 

Devono essere generate 16 bombe --creiamo un array di 16 numeri casuali che rappresenteranno le bombe nelle varie parti della griglia 
Quando l'utente clicca su unaa cella, devo controllare se quella cella contiene una bomba
SE si, il gioco finisce e l'utente perde
altrimenti il gioco va avanti
 */




const btnPlay = document.getElementById("btn-play");

//dopo aver fatto tutto inizio a collegare la select al js
const selectLevel = document.querySelector("[name='select-level']");

//scritto dopo
let bombs; //è il nostro array 
//scritta la let così è undifined ( si può scrivere sollo con la let, mai con la const)

btnPlay.addEventListener("click", function() {
    //scritto all'inzio
    // generateCells();

    //recupero il valore dalla select del livello
    const level = selectLevel.value; // il valore della select
    //il level rappresenta il numero di celle che devo generare 

    //salviamo nella variabile globale "bombs" l'array risultante 
    //dalla funzione generateBombsList
    bombs = generateBombsList( +level ); //la nostra array 

    //spostato sotto
    //invoco la funzione che genera le celle 
    generateCells( +level ); //aggiungo il +level 

    //l'altro metodo per convertire un valore in numero è parsInt
    //generateCells( PaarseInt(level) );

    console.log(+level); //il + in questo caso converte la stringa in numeri
    //il slectedIndex dice l'indice selezionato 
    //selected options mi ritorna le opzione del cliente 

});

/**
 * 
 * @param {number} numCelle //numero di celle che dovranno essere create 
 */
                    //l'attributo della function = è un segnaposto 
function generateCells( numCelle ){
// creo una const padre
    const gridContainer = document.querySelector(".grid-container");

    //facendo così non replico infinite volte le celle 
    gridContainer.classList.add("d-none"); // questo dice che prima deve svuotare lo spazio
    gridContainer.innerHTML = ""; // questo invece svuota sempre lo spaazio originale prima di aggiungere il contenuto nuovo

    for (let i = 0; i < numCelle; i++){ //il numero che usiamo nel ciclo for è lo stesso che poi useremo all'interno della radice quadrata 
        //creo l'elemneto tramite create element 
        const newCell = document.createElement("div");

        //creo il calcolo di quante righe devono esserci
        const rowsNum = Math.sqrt(numCelle); // questo mi scriveà 10 righe (sqrt è la radice quadrata )
        //assegno all'elemento tutti gli stili e classi 
        newCell.classList.add("cell");
        newCell.style.width = 100 / rowsNum + "%"; //diamo solo la alrghezza perchè nel mio aspect ratio ho daato solo già l'altezza con aspect ratio
        //rowsNum in questo caso rappresenta il 10

        //i + 1 = numero + 1 per arrivare a cento, indice = numero 
        newCell.dataset.numCella = i + 1; //aggiungo un atributo personale sull'elemento HTML
        //va ad aggiungere qualcosa al mio HTML e lo converte in scrittura kebabcase (-)  

        //dobbiamo aaggiungere l'event listner alla newcella per farla cliccabile
        newCell.addEventListener("click", onCellClick); //"on" dice che l'azione eseguita è il click quando la cella viene schiacciata
        //quando ad un event listner assegnamo una funzione non vanno messe le () all fine della funzione assegnata perchè la useremo successivamente in una nuova funzione 

        // se volessi usare un img all'interno della cella
        // const img = document.createElement("img");
        // newCell.append(img); // in questa maniera la newCell diventa un container di qualcosa a sua volta

        //aggiungo un append all'emento appena creato via create element 
        gridContainer.append( newCell ); 
    }

    gridContainer.classList.remove("d-none"); //rimuovo la classe dopo che sono state create le classi per non avere un effetto scaglionato 
}

//al click di ogni cella questaa funziona viene invocata 
// il this, sarà sempre l'elemento HTML appena cliccato 
/**
 * @this {HTMLElement}
 */
function onCellClick(){
    //il this in questo caso è il onCellClick 
    // this.classList.toggle("active");

    //voglio leggere la lista delle bombe al click dell'utente 
    //Ma prima devo capire il numero associato a questa cella e controllo se il numero corrisponde ad una delle celle bombe, se sì Boom

    //devo capire il numero associato a questa cella 
    const numCella = +this.dataset.numCella; //il this è una funzione che viene invocata dall'event listner 
    //tutte i numeri che vengono scritti da dataset sono in stringa, con il + li converto in numero
    //controllo se il numero corrisponde ad una delle bombe
    if ( bombs.includes ( numCella )){
        alert("Hai trovato una bomba!");

        this.classList.add( "active", "bomb" );
    }else{
        this.classList.toggle("active");

        //per fare il counter da tener conto quante volte l'utente ha cliccato senza far esplodere la bomba 
    }

}

//this : ogni funzione ha il this al suo interno , in alcune situazioni in base a come viene incocata la funzione, il this ne assume significati divesi
//nel caso di onCellClick avrà come this l'elemento che ho associato all'event listner 
//la funzione che stiaamo usando è sempre la stessa, perchè ogni volta che vinee invocaa/cliccata il this interagisce dinamicly (applicando l'event listner ad ogni cella) 


//BOmbe
/**
 * Generiamo un numero random compreso tra 2 estremi 
 * @param {number} min 
 * @param {number} max 
 */

function generateRandomNumber(min, max){
    return Math.floor( Math.random() * (max - min + 1 )) + min;
}

/**
 * 
 * @param {number} numCelle 
 * @return {Array}
 */
//genere un array di 16 bombe 
function generateBombsList( numCelle ){
    const bombsList = []; 

    //**potremmo usare anche un ciclo for ma creremmo delle variabili in più ed inutili */

    //devo riuscire ad ottenere un ciclo unico per non generare doppioni 
    //usiamo il while perchè va avanti fino a quando bombsList non raggiunge una lunghezza di 16
    while (bombsList.length < 16){
        //genera un numero random 
    
        const num = generateRandomNumber(1, numCelle); //mettiamo il numero massimo di celle perchè sono sparse

        //controllo se il numero è già presente dell'array bombsList
        //facendo così evitiamo i doppioni 
        //SE NON è presente, lo aggiungo 
        if ( !bombsList.includes (num) ){  //aggiungengo all bombsList prima ! (not) dico "se NON include bombsList(num) allora aggiungi il numero generato alla lista"
        //un altro metodo per scrivere la condizione ed ottenere la stessa cosa : if ( bombsList.indexOf(num) ){  } 
            //aggiungo il numero generato alla lista bombslist
            bombsList.push( num );  //grazie al push generiamo un numero unico nel suo caso
        }
    }

    return bombsList;
}

//fare effetto slide-in di ogni cella 