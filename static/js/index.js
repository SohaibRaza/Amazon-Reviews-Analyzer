var taskId;
var uniqueId;
var statusInterval;
$('#exportButton').hide();  //Hide Export Button
var siteUrl = {
    1: 'http://www.inven.co.kr/board/maple/2587?p=',
    2: 'http://www.inven.co.kr/board/maple/2299?p='
};
var selectedCategory;

$(document).ready(function(){
    $(document).on('click', '#start-crawl', function(){
        $('#exportButton').hide(); //Hide Export Button
        selectedCategory = $('#site-select option:selected').val();

        let url = $("#url").val();
        console.log(url);

        $('#progress').attr("class", "alert alert-secondary mt-3");
        $('#progress').html('crawler is working...');
        $.ajax({
            url: '/api/crawl/',
            type: 'POST',
            data: {
                'url': url,
            },
            success: crawlSuccess,
            error: crawlFail,
        })
    });

    $(document).on('click', '#show-data', function(){
        selectedCategory = $('#site-select option:selected').val();
        $.ajax({
            url: '/api/showdata/',
            type: 'GET',
            data: {
                'category': selectedCategory
            },
            success: showData,
            error: showDataFail
        })
    });
});

function checkCrawlStatus(taskId, uniqueId){
    $.ajax({
        url: '/api/crawl/?task_id='+taskId+'&unique_id='+uniqueId+'/',
        type: 'GET',
        success: showCrawledData,
        error: showCrawledDataFail,
    })
}

function crawlSuccess(data){
    taskId = data.task_id;
    uniqueId = data.unique_id;
    statusInterval = setInterval(function() {checkCrawlStatus(taskId, uniqueId);}, 2000);
}

function crawlFail(data){
    $('#progress').html(data.responseJSON.error);
    $('#progress').attr("class", "alert alert-danger mt-3");
}

function showCrawledData(data){
    if (data.status){
        $('#progress').attr("class", "alert alert-secondary mt-3");
        $('#progress').html('crawler is ' + data.status + ' : ' + 'Please wait, Crawling will take some time');
    }
    else{
        clearInterval(statusInterval);
        $('#progress').attr("class", "alert alert-primary mt-3");
        $('#progress').html('crawling is finished!');
        console.log("DATA TYPE:" + typeof(data));
        console.log(data);

        var list = data.data;
        console.log(typeof(list))
        console.log("Crawled Data")

        let html = '';
        for(var i=0; i<list.length; i++){
            html += `
                <tr>
                    <th scope="row">`+ (i + 1) +`</th>
                    <td width="20%">`+ list[i].title +`</td>
                    <td>`+ list[i].rating +`</td>
                    <td>`+ list[i].review +`</td>
                </tr>
            `;
        }
        $('#board').html(html);

        $('#exportButton').show()  // Show Export Button

        // Export Code
        const dataTable = document.getElementById("revTable");
        const btnExportToCsv = document.getElementById("export");

        btnExportToCsv.addEventListener("click", () => {
            const exporter = new TableCSVExporter(dataTable);
            const csvOutput = exporter.convertToCSV();
            const csvBlob = new Blob([csvOutput], { type: "text/csv" });
            const blobUrl = URL.createObjectURL(csvBlob);
            const anchorElement = document.createElement("a");

            anchorElement.href = blobUrl;
            let randomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

            console.log(randomName);

            let filename ="reviews" + randomName + ".csv" ;
            console.log(filename);
            anchorElement.download = filename;
            anchorElement.click();

            setTimeout(() => {
                URL.revokeObjectURL(blobUrl);
            }, 500);
        });

    }
}

function showCrawledDataFail(data){
    $('#progress').html(data.responseJSON.error);
    $('#progress').attr("class", "alert alert-danger mt-3");
}

function showData(data){
    var list = data.data;
    var html = '';
    for(var i=0; i<list.length; i++){
        html += `
            <tr>
                <th scope="row">`+ (i + 1) +`</th>
                <td width="20%">`+ list[i].title +`</td>
                <td>`+ list[i].rating +`</td>
                <td>`+ list[i].review +`</td>
            </tr>
        `;
    }
    $('#progress').attr("class", " mt-3");
    $('#progress').empty();
    $('#board').html(html);
}

function showDataFail(data){
    $('#progress').attr("class", "alert alert-danger  mt-3");
    $('#progress').html(data.responseJSON.error);
    $('#board').empty();
}
