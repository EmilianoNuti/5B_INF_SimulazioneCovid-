idSimulazione = null;
stop = false;

function simulazione(npallini, nmalati, nfermi, tempoguarigione) {
    //Grandezza finestra di gioco
    console.log(tempoguarigione)
    var canvas = document.getElementById("finestraGioco");
    var ctx = canvas.getContext("2d");

    var pallino = [];
    var pareti = [
		[0, 0],
		[canvas.width, 0],
		[canvas.width, canvas.height],
		[0, canvas.height]
    ];
    
    var dati_iterazione = []

    var maxmalati = 0;
    var frame = 0;
    var start = new Date().getTime() / 1000;
    var pallinicalc = [];
    for (i = 0; i < npallini; i++) {
        var x = Math.floor(Math.random() * (canvas.width - 20)) + 10;
        var y = Math.floor(Math.random() * (canvas.height - 20)) + 10;
        var pos = [x, y];
        // verifichiamo che la posizione non sia già esistente, in tal caso non
        // aggiungiamo il pallino al numero totale
        var trovato = false;
        for (j = 0; j < pallinicalc.length; j++) {
            if (JSON.stringify(pos) == JSON.stringify(pallinicalc[j])) {
                trovato = true;
            }
        }
        if (!trovato) {
            pallinicalc.push(pos);
        } else {
            i--; // se la posizione esiste di già, torniamo di uno indietro e riproviamo
        }
    }
    //Creazione numeri casuali fra intervallo
    class Pallino {

        constructor(x, y, stato, direzione, velocita) {
            this.x = x;
            this.y = y;
            // 0 = sano, 1 = malato, 2 = guarito
            this.stato = stato;
            // valore in pi-greco
            this.direzione = direzione;
            this.velocita = velocita;
            this.raggio = 5;
            // il tempo ci servirà per valure la guarigione
            this.tempo = stato ? new Date().getTime() : 0;
        }

        // calcoliamo l'urto sulle pareti
        // nel mio caso ho considerato solamente pareti verticali ed orizzontali
        urtoParete() {
            var nPareti = pareti.length;
            for (vi = 0; vi < nPareti; vi++) {
                var vf = vi < nPareti - 1 ? vi + 1 : 0;
                // calcoliamo il coefficiente angolare della parete
                var a = (pareti[vf][1] - pareti[vi][1]) / (pareti[vf][0] - pareti[vi][0]);
                // parete orizzontale
                if (isFinite(a)) {
                    var b = -1;
                    var c = -a * pareti[vi][0] + pareti[vi][1];

                    var d = Math.abs(a * this.x + b * this.y + c) / Math.sqrt(a * a + b * b);
                    // invertiamo velocità e direzione
                    if (d <= this.raggio) {
                        this.direzione = -this.direzione;
                        this.velocita = this.velocita;
                    }
                    // parete verticale
                } else {
                    // invertiamo velocità e direzione
                    if (Math.abs(this.x - pareti[vf][0]) <= this.raggio) {
                        this.direzione = -this.direzione;
                        this.velocita = -this.velocita;
                    }
                }
            }
        }

        // controlliamo se i pallini si toccano tra di loro
        urtoPallino(pallino) {
            // se il pallino non è se stesso
            if (this.x != pallino.x && this.y != pallino.y) {
                // la massima distanza tra due pallini
                var d = Math.sqrt(Math.pow(this.x - pallino.x, 2) + Math.pow(this.y - pallino.y, 2));
                // la confrontiamo con la somma dei raggi di ciascun pallino
                if (d <= this.raggio + pallino.raggio) {
                    // questa è una semplificazione dell'urto elastico bidimensionale
                    // visto che entrambi i pallini hanno la medesima massa
                    // calcoliamo l'angolo di impatto e sommiamolo alla direzione
                    var phi = Math.atan((this.y - pallino.y) / (this.x - pallino.x));
                    this.direzione += phi / 2;
                    if (this.stato < 1 && pallino.stato == 1) {
                        this.stato = 1;
                        this.tempo = new Date().getTime();
                    }
                }
            }
        }

        // restituiamo il colore in base allo stato: sano, malato, guarito
        getColore() {
            var colori = ["green", "red", "blue"];
            return colori[this.stato];
        }

        // controlliamo le interazioni da eseguire su tutti
        controlla() {
            for (var j = 0; j < pallino.length; j++) {
                this.urtoPallino(pallino[j]);
            }
            this.urtoParete();
            if (new Date().getTime() - this.tempo > tempoguarigione && this.tempo > 0) {
                this.stato = 2;
            }
        }

        // poi effettuiamo il movimento, derivato dai controlli precedenti
        muovi() {
            this.x += this.velocita * Math.cos(this.direzione);
            this.y += this.velocita * Math.sin(this.direzione);
        }

    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    for (i = 0; i < pallinicalc.length; i++) {
        var stato = nmalati-- > 0 ? 1 : 0;
        var velocita = nfermi-- > 0 ? 0 : 2;
        pallino.push(new Pallino(pallinicalc[i][0], pallinicalc[i][1], stato, 2 * Math.PI * Math.random(), velocita));
    }

    function disegna() {
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var sani = 0;
        var malati = 0;
        var curati = 0;

        function disegnaPareti() {
            var nPareti = pareti.length;
            for (vi = 0; vi < nPareti; vi++) {
                var vf = vi < nPareti - 1 ? vi + 1 : 0;
                ctx.moveTo(pareti[vi][0], pareti[vi][1]);
                ctx.lineTo(pareti[vf][0], pareti[vf][1]);
                ctx.stroke();
            }
        }

        function disegnaPallino(x, y, colore, raggio) {
            var pallino = new Path2D();
            pallino.arc(x, y, raggio, 0, Math.PI * 2, false);
            ctx.fillStyle = colore;
            ctx.fill(pallino);
        }

        function disegnaTuttiPallini() {
            for (i = 0; i < pallino.length; i++) {
                disegnaPallino(pallino[i].x, pallino[i].y, pallino[i].getColore(), pallino[i].raggio)
                switch (pallino[i].stato) {
                    case 0: sani++; break;
                    case 1: malati++; break;
                    case 2: curati++; break;
                }

            }
        }

        function muoviPallini() {
            for (i = 0; i < pallino.length; i++) {
                pallino[i].controlla();
            }
            for (i = 0; i < pallino.length; i++) {
                pallino[i].muovi();
            }
        }

        disegnaPareti();
        disegnaTuttiPallini();
        muoviPallini();

        dati_iterazione.push(
            {
                malati: malati,
                sani: sani,
                guariti: curati
            },
        )

        // controlla che finisca il ciclo
        if (malati != 0){
            id = window.requestAnimationFrame(disegna);
        } else{
            disegnaGrafico(dati_iterazione);
            console.log("Sani: " + sani);
            console.log("Malati: " + malati);
            console.log("Guariti: " + curati);
        }
        // frame++;
    }

    function init() {
        id = window.requestAnimationFrame(disegna);
    }

    init();
}

function start(e)
{
    e.preventDefault();
    simulazione(20, 1, 0, 10000);
}

var el = document.getElementById("bottone");
el.addEventListener('click', start, false);