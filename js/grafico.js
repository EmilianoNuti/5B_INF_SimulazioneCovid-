var myCanvas = document.getElementById("myCanvas");
var myLabels = ["12/02", "12/03", "12/04", "12/05", "12/06", "12/07"];
var myData = [120, 180, 32, 100, 67, 450 ];
var myData2 =  [30, 190, 69, 3, 63, 98];

var colore = "rgb(220,20,60)";
var colore2 = "rgb(255,255,0)";

var ctx = document.getElementById("myChart");
//creazione grafico
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: myLabels, //sono i nomi nell'asse X
        datasets: [{
            label:"Andamento contagi", //si trova sopra al grafico, è tipo una legenda
            backgroundColor: colore,
            data: myData, //dati che inserisco nel grafico
            borderColor: colore, //linea
            borderWidth: 5,
            fill: false
        },
        {
            label: "Andamento guariti",
            backgroundColor: colore2,
            data:myData2, //dati che inserisco nel grafico
            borderColor: colore2, //linea
            borderWidth: 5,
            fill: false
        }],
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


