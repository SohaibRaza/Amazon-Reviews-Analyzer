// let data = [{
//     values: [19, 26, 55],
//     labels: ['Residential', 'Non-Residential', 'Utility'],
//     type: 'pie'
// }];
// var layout = {
// height: 400,
// width: 500,
// "plot_bgcolor": "rgb(17,17,17)",
// "paper_bgcolor": "ffffff",
// };
// Plotly.newPlot('pieChart', data, layout);





// let plotlyPieChart = response => {
//     TESTER = document.getElementById('pieChart');
//     Plotly.newPlot( TESTER, [{
//     x: Object.keys(response.data.posNegReviews),
//     y: Object.values(response.data.posNegReviews) }], {
//     margin: { t: 0 } } );
//     var data = [{
//         values: Object.values(response.data.ratingCounts),
//         labels: Object.keys(response.data.ratingCounts),
//         type: 'pie'
//     }];
//     var layout = {
//     height: 400,
//     width: 500,
//     title: 'Rating Chart',
//     paper_bgcolor : 'rgba(0,0,0,0)',
//     plot_bgcolor : 'rgba(0,0,0,0)',
//     font: {
//         family: 'monospace ',
//         size: 16,
//         color: '#c8d6e5'
//     },
//     };
//     Plotly.newPlot('pieChart', data, layout,{displaylogo: false});
// }


// let plotlyBarChart = (response) => {
//     var trace1 = {
//         x: Object.keys(response.posNegReviews),
//         y: Object.values(response.posNegReviews),
//         marker:{
//             color: ['rgba(16, 172, 132,1.0)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', ]
//         },
//         type: 'bar'
//     };
//     var data = [trace1];
//     var layout = {
//         height: 400,
//         width: 500,
//         title: 'Sentiments Bar Chart',
//         paper_bgcolor : 'rgba(0,0,0,0)',
//         plot_bgcolor : 'rgba(0,0,0,0)',
//         font: {
//             family: 'monospace ',
//             size: 16,
//             color: '#c8d6e5'
//         },
//     };
//     Plotly.newPlot('plotlyBarChart', data, layout, {displaylogo: false});
// }

// let reviewsDonuts = (response) => {
//     let positive = response.posNegReviews.positive
//     let negative = response.posNegReviews.negative
//     let neutral = response.posNegReviews.neutral

//     //  Neutral  <><><><><><><><><><><>
//     var dataStatus = [{
//         values: [neutral, positive + negative],
//         textinfo: 'value',
//         labels: ['Neutral', 'Other'],
//         marker: {
//             colors: [ 'rgba(87, 101, 116,1.0)',  '#e7eeeb']
//         },
//         type: 'pie',
//         hole: .5
//     }];
//     var layoutStatus = {
//         font: {
//             family: 'monospace ',
//             size: 16,
//             color: '#c8d6e5'
//         },
//         height : 200,
//         width : 330,
//         margin : {l: 0, r: 0, b: 4, t: 4, pad: 8},
//         paper_bgcolor : 'rgba(0,0,0,0)',
//         plot_bgcolor : 'rgba(0,0,0,0)',
//     };
//     var optionsStatus = {
//         //displayModeBar: false, //this one does work
//     };
//     Plotly.newPlot('reviewDonuts', dataStatus, layoutStatus, optionsStatus);

//     //  Negative  <><><><><><><><><><><>
//     var dataStatus = [{
//         values: [negative, positive + neutral ],
//         textinfo: 'value',
//         labels: ['Negative', 'Other'],
//         marker: {
//             colors: [ '#EA2027',  '#e7eeeb']
//         },
//         type: 'pie',
//         hole: .5
//     }];
//     var layoutStatus = {
//         font: {
//             family: 'monospace ',
//             size: 16,
//             color: '#c8d6e5',
//         },
//         height: 200,
//         width: 330,
//         margin: {l: 0, r: 0, b: 4, t: 4, pad: 8},
//         paper_bgcolor: 'rgba(0,0,0,0)',
//     };
//     var optionsStatus = {
//         //displayModeBar: false, //this one does work
//     };
//     Plotly.newPlot('reviewDonuts2', dataStatus, layoutStatus, optionsStatus);


//     var dataStatus = [{
//         values: [positive, negative + neutral ],
//         textinfo: 'value',
//         labels: ['Positive', 'Other'],
//         marker: {
//             colors: [ '#10AC84',  '#e7eeeb']
//         },
//         type: 'pie',
//         hole: .5
//     }];
//     var layoutStatus = {
//         font: {
//             family: 'monospace ',
//             size: 16,
//             color: '#c8d6e5',
//         },
//         height: 200,
//         width: 330,
//         margin: {l: 0, r: 0, b: 4, t: 4, pad: 8},
//         paper_bgcolor: 'rgba(0,0,0,0)',
//     };
//     var optionsStatus = {
//         //displayModeBar: false, //this one does work
//     };
//     Plotly.newPlot('reviewDonuts3', dataStatus, layoutStatus, optionsStatus);
// }

// // let chartsJsGraph = (response)=>{
// //     var ctx = document.getElementById("myChart").getContext("2d");
// //     var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
// //     gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
// //     gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
// //     gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
// //     ctx.canvas.width = 300;
// //     ctx.canvas.height = 300;

// //     $('#myChart').css({"width":"700px","height":"500px"});
// //     var myChart = new Chart(ctx, {
// //         type: 'bar',
// //         data: {
// //             labels: Object.keys(response.data.posNegReviews),
// //             datasets: [{
// //                 label: 'Number of Reviews',
// //                 fill: true,
// //                 data: Object.values(response.data.posNegReviews),
// //                 backgroundColor: gradientStroke,
// //                 hoverBackgroundColor: gradientStroke,
// //                 borderColor: "#1f8ef1",
// //                 borderWidth: 2,
// //                 borderDash: [],
// //                 borderDashOffset: 0.0,
// //             }]
// //         },
// //         options: {
// //             scales: {
// //                 yAxes: [{
// //                     ticks: {
// //                         beginAtZero: true,
// //                     }
// //                 }]
// //             },
// //             responsive : true,
// //         }
// //     });
// // } //    Graph End   <<<<<<<

// // <!--   Sentiment Comments    -->

// let sentiment = (response)=>{
//     console.log('Inside Sentiment function')
//     if (response.data.sentiment.flag === 1){
//         $('#emoji').attr('src', "/static/images/smile.png");
//         $('#sentiment').html(response.sentiment.comment)
//     }
//     if (response.data.sentiment.flag === 0 ){
//         $('#sentiment').html(response.sentiment.comment)
//     }

//     if (response.data.sentiment.flag === -1){
//         $('#sentiment').html(response.sentiment.comment)
//     }

// }

// const handleFileUpload = event => {
//     const files = event.target.files
//     const formData = new FormData()
//     formData.append('myFile', files[0])
//     console.log('data.path')

//     axios.post(
//     '/api/analyze/', formData
//     ).then((response)=>{
//         console.log(response)
//         chartsJsGraph(response)
//         plotlyBarChart(response)
//         plotlyPieChart(response)
//         reviewsDonuts(response)
//         $('#totalReviews').html(response.data.totalReviews)
//         sentiment(response)
//     })
// }
// document.querySelector('#fileUpload').addEventListener('change', event => {
//     handleFileUpload(event)
// })






