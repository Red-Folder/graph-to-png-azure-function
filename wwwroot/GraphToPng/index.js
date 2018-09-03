const ChartjsNode = require('chartjs-node');

const chartConfig = {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        width: 400,
        height: 400,
        animation: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        tooltips: {
            mode: 'label'
        }
    }
};

const htmlFormatError = err => {
    return '<html>' +
                '<body>' +
                    '<h1>An error has occurred</h1>' +
                    '<h2>Error Text</h2>' +
                    err +
                '</body>' + 
            '</html>';
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.log('Creating chartNode');
    var chartNode = new ChartjsNode(600, 600);
    context.log('Drawing the chart');

    return chartNode.drawChart(chartConfig)
    .then(() => {
        context.log("Chart created, getting image buffer");

        return chartNode.getImageBuffer('image/png');
    })
    .then(buffer => {
        context.log("Return image");

        context.res = {
            status: 200,
            body: new  Uint8Array(buffer),
            isRaw: true,
            headers: {
                "Content-Type": "image/png"
            }
        };
    })
    .catch(err => {
        context.log("[ERROR] - " + err);
        context.res = {
            status: 500,
            body: htmlFormatError(err),
            isRaw: false
        };
    });
};