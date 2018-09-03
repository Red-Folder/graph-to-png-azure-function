const ChartjsNode = require('chartjs-node');

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

    if (req.body) {
        var chartConfig = req.body;

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
                    status: 201,
                    body: new Uint8Array(buffer),
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
    } else {
        context.res = {
            status: 400,
            body: htmlFormatError("You must pass chartjs configuration data"),
            isRaw: false
        };
    }
};