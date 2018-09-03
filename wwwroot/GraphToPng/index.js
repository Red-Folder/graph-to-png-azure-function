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

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.log('Creating chartNode');
    var chartNode = new ChartjsNode(600, 600);
    context.log('Drawing the chart');

    return chartNode.drawChart(chartConfig)
    .then(() => {
        context.log("Chart created, getting image buffer");
        // chart is created
     
        // get image as png buffer
        return chartNode.getImageBuffer('image/png');
    })
    //.then(buffer => {
    //    context.log("Converting to image stream");
    //    Array.isArray(buffer) // => true
        // as a stream
    //    return chartNode.getImageStream('image/png');
    //})
    .then(buffer => {
    //.then(streamResult => {
        context.log("Return image");

        // using the length property you can do things like
        // directly upload the image to s3 by using the
        // stream and length properties
        //streamResult.stream // => Stream object
        //streamResult.length // => Integer length of stream
        
        // write to a file
        //chartNode.writeImageToFile('image/png', './testimage.png');
        
        //context.res.setHeader("Content-Type", "image/png");
        context.res = {
            status: 200,
            body: new  Uint8Array(buffer),
            isRaw: true,
            headers: {
                "Content-Type": "image/png"
            }
        };

        //if (req.query.name || (req.body && req.body.name)) {
        //    context.res = {
        //        // status: 200, /* Defaults to 200 */
        //        body: "Hello " + (req.query.name || req.body.name)
        //    };
        //}
        //else {
        //    context.res = {
        //        status: 400,
        //        body: "Please pass a name on the query string or in the request body"
        //    };
        //}
    })
    .catch(err => {
        context.log("[ERROR] - " + err);
    });
};