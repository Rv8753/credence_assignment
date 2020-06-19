var fs = require('fs');
var axios = require('axios');

var api_url = 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22';
(async function () {
    await axios.get(api_url).then(response => {
        console.log("Json Fetched From API!!!");
        writeData(response.data);

    });
})();

function writeData(response) {
    fs.writeFile('report.html', createFile(response), function (er) {
        if (er) throw er;
        console.log('Report Created!!!');
    })
}
function createFile(response) {
    var context = JSON.stringify(response);
    var html =
        '<!DOCTYPE html>\n\
        <html>\n\
        <head>\n\
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>\n\
            <script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>\n\
            <script type="text/javascript">\n\
                 $(function () {\n\
                        var theTemplateScript = $("#data").html();\n\
                        var theTemplate = Handlebars.compile(theTemplateScript);\n\
                         var context=JSON.parse(\''+ context + '\');\n\
                            var theCompiledHtml = theTemplate(context);\n\
                        $(\'.report\').html(theCompiledHtml);\n\
                });\n</script>\n</head>\n<body>\n\
        <script id="data" type="text/x-handlebars-template">\n\
            <h1 style=\'text-align:center;\'>Mini Weather Report</h1>\n\
            <table border=\'2\' align=\'center\' style=\'border-collapse:collapse; width:400px;\'>\n\
                <tr><td>City</td><td>{{name}}</td></tr>\n\
                <tr><td>Weather</td><td>{{weather.0.main}}</td></tr>\n\
                <tr><td>Description</td><td>{{weather.0.description}}</td></tr>\n\
                <tr><td>Current Temperature</td><td>{{main.temp}}</td></tr>\n\
                <tr><td>Maximum Temperature</td><td>{{main.temp_max}}</td></tr>\n\
                <tr><td>Minimum Temperate</td><td>{{main.temp_min}}</td></tr>\n\
                <tr><td>Pressure</td><td>{{main.pressure}}</td></tr>\n\
                <tr><td>Humidity</td><td>{{main.humidity}}</td></tr>\n\
                <tr><td>Visibility</td><td>{{visibility}}</td></tr>\n\
            </table>\n\
        </script>\n\
        <div class="report"></div></body></html>'
    return html;
}
