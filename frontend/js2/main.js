const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let daily_social =[];
let monthly_social = [];
let daily_travel = [];
let monthly_travel = [];
let daily_checkin = [];
let monthly_checkin = [];

document.addEventListener('DOMContentLoaded', function () {

   Promise.all([d3.csv('data/daily_social.csv'),d3.csv('data/monthly_social.csv'),d3.csv('data/daily_travel.csv'),d3.csv('data/monthly_travel.csv'),d3.csv('data/daily_checkin.csv'),d3.csv('data/monthly_checkin.csv')])
        .then(function (values) {
            console.log('loaded daily_social.csv , monthly_social.csv , daily_travel.csv and monthly_travel.csv');
            daily_social = values[0];
            monthly_social = values[1];
            daily_travel = values[2];
            monthly_travel = values[3];
            daily_checkin = values[4];
            monthly_checkin = values[5];
            
            parseMonthlyData(monthly_social)
            parseDailyData(daily_social,"timestamp")
            parseMonthlyData(monthly_travel)
            parseDailyData(daily_travel,"Date")
            parseMonthlyData(monthly_checkin)
            parseDailyData(daily_checkin,"timestamp")
            
            drawLineChart('#myDataVis', daily_social, 'formatted_day', 'count', 'Daily Social Count', 'Days', 'Social Interactions');
            
        });
});

function updateGraph() {
    const graphFrequencySelector = document.getElementById('graphFrequencySelector');
    const selectedGraphFreq = graphFrequencySelector.value;

    const graphTypeSelector = document.getElementById('graphTypeSelector');
    const selectedGraphType = graphTypeSelector.value;

    var trendLocationDiv = document.getElementById('trendLocationSelector');

    if (selectedGraphType === 'checkin') {
        trendLocationDiv.style.display = 'block'; 
    } else {
        trendLocationDiv.style.display = 'none';
    }

    
    loadAndDrawGraph(selectedGraphFreq, selectedGraphType);
}

function loadAndDrawGraph(graphFreq, graphType) 
{
    document.getElementById('myDataVis').innerHTML = '';

    xKey = "";
    yKey = "Count";
    xAxisLabel = "";
    title ="";
    yAxisLabel = "";
    data =[];

    
    if (graphFreq === 'daily') 
    {
        xKey = "formatted_day";
        xAxisLabel="Days";

        if(graphType == "social")
        {
            data = daily_social;
            title = "Daily Social Count";
            yAxisLabel = "Social Interactions";
            drawLineChart('#myDataVis', daily_social, 'formatted_day', 'count', 'Daily Social Count', 'Days', 'Social Interactions');
        }
        else if(graphType == "travel")
        {
            data = daily_travel;
            title = "Daily Travel Count";
            yAxisLabel = "Travels";
            drawLineChart('#myDataVis', daily_travel, 'formatted_day', 'count', 'Daily Travel Count', 'Days', 'Travels');
        }
        else
        {
            var location = document.getElementById('trendSelector').value;
            console.log(location);
            drawLineChart('#myDataVis', daily_checkin, 'formatted_day', location, `Daily Check In Count for ${location}`, 'Months', 'CheckIns');
        }
    } 
    
    else if (graphFreq === 'monthly') 
    {
        xKey = "formatted_month";
        xAxisLabel = "Months";

        if(graphType == "social")
        {
            data = monthly_social;
            title = "Monthly Social Count";
            yAxisLabel = "Social Interactions";
            drawLineChart('#myDataVis', monthly_social, 'formatted_month', 'count', 'Monthly Social Count', 'Months', 'Scoial Interactions');
        }
        else if(graphType == "travel")
        {
            data = monthly_travel;
            title = "Monthly Travel Count";
            yAxisLabel = "Travels";
            drawLineChart('#myDataVis', monthly_travel, 'formatted_month', 'count', 'Monthly Travel Count', 'Months', 'Travels');
        }
        else
        {
            drawLineChart('#myDataVis', monthly_checkin, 'formatted_month', 'Pub', 'Monthly Check In Count', 'Months', 'CheckIns');
        }
    } 
    
    else {
        console.error('Invalid graph type selected.');
    }

}

function drawLineChart(selector, data, xKey, yKey, title, xAxisLabel, yAxisLabel) {
    
    const timestamps = data.map(entry => entry[xKey]);
    const counts = data.map(entry => entry[yKey]);

    
    const canvas = document.createElement('canvas');
    canvas.id = 'line-chart';
    document.querySelector(selector).appendChild(canvas);

    
    if (typeof Chart !== 'undefined') {
        
        new Chart(canvas, {
            type: 'line',
            data: {
                labels: timestamps,
                datasets: [{
                    data: counts,
                    label: title,
                    borderColor: "#673ab7",
                    fill: false
                }]
            },
            options: {
                title: {
                    display: true,
                    text: title
                },
                scales: {
                    x: {
                        type: 'category',
                        labels: timestamps,
                        title: {
                            display: true,
                            text: xAxisLabel
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: yAxisLabel
                        }
                    }
                }
            }
        });
    } else {
        console.error('Chart.js library not found. Make sure it is loaded before calling drawLineChart.');
    }
}

function parseMonthlyData(month_data)
{
    
    month_data.sort((a, b) => {
        return a.year - b.year || a.month - b.month;
    });

    month_data.forEach(entry => {
        entry.formatted_month = `${monthNames[entry.month-1]} ${entry.year}`;
      });
}

function parseDailyData(daily_data,val)
{
    daily_data.forEach(entry => {
        const date = new Date(entry[val]);
        const dayOfWeek = date.getUTCDay();
        entry.formatted_day = `${dayNames[dayOfWeek]}`;
        
        });

}