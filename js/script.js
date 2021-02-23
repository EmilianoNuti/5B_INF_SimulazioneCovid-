var myCanvas = document.getElementById("myCanvas");
var myLabels = ["12/02", "12/03", "12/04", "12/05", "12/06", "12/07"];
var myData = [120, 180, 32, 100, 67, 450 ];

var colore = "rgba(255, 99, 132, 1)";

var ctx = document.getElementById("myChart");
//creazione grafico
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: myLabels,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], //sono i nomi nell'asse X
        datasets: [{
            label:"Andamento contagi", //si trova sopra al grafico, è tipo una legenda
            backgroundColor: colore,
            data: myData, //[12, 19, 3, 5, 2, 3], //dati che inserisco nel grafico
            borderColor: colore, //linea
            borderWidth: 5,
            fill: false
        }]
    },
//FINE DATA
options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true //è un boolean, serve per far partire asseY da 0
            }
        }]
    },
    responsive: true
}
});


/* SONO 3 OGGETTI CON QUESTI ATTRIBUTI
[
  {
     nSani: 99,
     nMalati: 1,
     nGuarito: 0
  }, {
     nSani: 99,
     nMalati: 1,
     nGuarito: 0
  },
{
     nSani: 95,
     nMalati: 5,
     nGuarito: 0
  }
{
     nSani: 90,
     nMalati: 10,
     nGuarito: 0
  }
]
*/