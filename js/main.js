// Consegna
// L’utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
// Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
// Consigli del giorno: 
// Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio:
// Di cosa ho bisogno per generare i numeri?
// Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
// Le validazioni e i controlli possiamo farli anche in un secondo momento.

//realizzo la var. del bottone attivarla tramite event listner
const btnGenera = document.getElementById("btn-play");
//creeo anche la costante di grid container da usare per dopo
const gridContainer = document.querySelector(".grid-container");
const numCelle = 10;



//ora attivo il bottone play 


// btnGenera.addEventListener("click", function () {
//     console.log(this);
    
    
// });


function generaGriglia(numCelle){
    
    const totalCelle = parseInt(numCelle * numCelle);
    
    for (let i = 0; i < totalCelle; i++){
        
        
        //creo una cella nuova per renderla cliccabile
        const newCella = document.createElement("div");
        
        //assegno gli stili alla new cella
        newCella.classList.add("grid-cell");
        newCella.style.width = `calc(100% / ${numCelle})`;
        
        newCella.innerHTML = i + 1;
        
        newCella.addEventListener("click", function (){
            this.classList.toggle("bg-primary");
            console.log(this.textContent);
        });
        gridContainer.append( newCella );
    }
}


btnGenera.addEventListener("click", function () {
    console.log(this);
    
    generaGriglia(numCelle);
    
});

