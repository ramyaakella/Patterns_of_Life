const monthlyData = [{"category":"2022-03","segments":[{"name":"Education","value":28707.679672945145},{"name":"Food","value":327843.1433588392},{"name":"Recreation","value":649590.7184854163},{"name":"Shelter","value":1162645.2640903224}]},{"category":"2022-04","segments":[{"name":"Education","value":11423.437130106584},{"name":"Food","value":304297.06145432976},{"name":"Recreation","value":389694.875678679},{"name":"Shelter","value":559918.5722960253}]},{"category":"2022-05","segments":[{"name":"Education","value":11423.437130106584},{"name":"Food","value":313555.6300104847},{"name":"Recreation","value":336418.1463940531},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-06","segments":[{"name":"Education","value":11423.437130106584},{"name":"Food","value":302909.19657905906},{"name":"Recreation","value":314808.2907419787},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Food","value":313819.36000180524},{"name":"Recreation","value":329613.1868180741},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-08","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":306962.55118896684},{"name":"Food","value":312841.3302490856},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-09","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":301910.3194317255},{"name":"Food","value":302878.0688152801},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-10","segments":[{"name":"Education","value":11423.437130106584},{"name":"Food","value":313577.26832209993},{"name":"Recreation","value":326722.2715642223},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-11","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":288290.4847578219},{"name":"Food","value":302847.1389759584},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-12","segments":[{"name":"Education","value":11423.437130106584},{"name":"Food","value":313102.7969396141},{"name":"Recreation","value":316620.8373579357},{"name":"Shelter","value":558450.711295259}]},{"category":"2023-01","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":311579.8080024536},{"name":"Food","value":313271.96509556944},{"name":"Shelter","value":558450.711295259}]},{"category":"2023-02","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":271126.5449842026},{"name":"Food","value":282477.8813844513},{"name":"Shelter","value":558450.711295259}]},{"category":"2023-03","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":295210.41859322856},{"name":"Food","value":312974.4674121277},{"name":"Shelter","value":558450.711295259}]},{"category":"2023-04","segments":[{"name":"Education","value":11423.437130106584},{"name":"Food","value":303816.8863606134},{"name":"Recreation","value":310294.34164954524},{"name":"Shelter","value":558450.711295259}]},{"category":"2023-05","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":224251.50801820104},{"name":"Food","value":242305.6371404142},{"name":"Shelter","value":558450.711295259}]}];  

const weeklyData = {"2022-03":[{"category":"2022-03-2022-03-01 to 2022-03-07","segments":[{"name":"Education","value":28707.679672945145},{"name":"Food","value":81713.89200304922},{"name":"Recreation","value":209150.5219321298},{"name":"Shelter","value":1162645.2640903224}]},{"category":"2022-03-2022-03-08 to 2022-03-14","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":72539.74100040045},{"name":"Recreation","value":159927.2473767307}]},{"category":"2022-03-2022-03-15 to 2022-03-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":71938.03562116102},{"name":"Recreation","value":134288.7397306862}]},{"category":"2022-03-2022-03-22 to 2022-03-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":71613.18576107436},{"name":"Recreation","value":112508.99177069019}]},{"category":"2022-03-2022-03-29 to 2022-03-31","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":30038.288973154158},{"name":"Recreation","value":33715.21767517941}]}],"2022-04":[{"category":"2022-04-2022-04-01 to 2022-04-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Food","value":71175.40965638426},{"name":"Recreation","value":100841.71615542914},{"name":"Shelter","value":558564.7714299004}]},{"category":"2022-04-2022-04-08 to 2022-04-14","segments":[{"name":"Education","value":0},{"name":"Shelter","value":1353.8008661248866},{"name":"Food","value":70959.5849944231},{"name":"Recreation","value":87481.13472467981}]},{"category":"2022-04-2022-04-15 to 2022-04-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70983.25658129233},{"name":"Recreation","value":86559.11639029103}]},{"category":"2022-04-2022-04-22 to 2022-04-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70730.93465375158},{"name":"Recreation","value":82925.86171219041}]},{"category":"2022-04-2022-04-29 to 2022-04-30","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":20447.875568478514},{"name":"Recreation","value":31887.04669608865}]}],"2022-05":[{"category":"2022-05-2022-05-01 to 2022-05-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Food","value":70833.50786553769},{"name":"Recreation","value":79990.49214217659},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-05-2022-05-08 to 2022-05-14","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70872.72827585886},{"name":"Recreation","value":76026.67557058681}]},{"category":"2022-05-2022-05-15 to 2022-05-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70740.02263569046},{"name":"Recreation","value":75156.06890787785}]},{"category":"2022-05-2022-05-22 to 2022-05-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70732.50447392854},{"name":"Recreation","value":72670.18051372352}]},{"category":"2022-05-2022-05-29 to 2022-05-31","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":30376.866759469158},{"name":"Recreation","value":32574.729259688374}]}],"2022-06":[{"category":"2022-06-2022-06-01 to 2022-06-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Food","value":70566.68987787922},{"name":"Recreation","value":75370.6175000059},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-06-2022-06-08 to 2022-06-14","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70765.69716766279},{"name":"Recreation","value":75558.77035896416}]},{"category":"2022-06-2022-06-15 to 2022-06-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70731.57696744663},{"name":"Recreation","value":76481.82249163456}]},{"category":"2022-06-2022-06-22 to 2022-06-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":71001.12504632532},{"name":"Recreation","value":76207.8481864804}]},{"category":"2022-06-2022-06-29 to 2022-06-30","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":11189.232204893637},{"name":"Food","value":19844.10751974507}]}],"2022-07":[{"category":"2022-07-2022-07-01 to 2022-07-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Food","value":70612.364685401},{"name":"Recreation","value":71084.06708598079},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-07-2022-07-08 to 2022-07-14","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70726.78290738231},{"name":"Recreation","value":73111.35372999439}]},{"category":"2022-07-2022-07-15 to 2022-07-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70783.54421706958},{"name":"Recreation","value":71212.32466128419}]},{"category":"2022-07-2022-07-22 to 2022-07-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":69742.91246884775},{"name":"Food","value":70740.52473677177}]},{"category":"2022-07-2022-07-29 to 2022-07-31","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":30956.143455180565},{"name":"Recreation","value":44462.52887196702}]}],"2022-08":[{"category":"2022-08-2022-08-01 to 2022-08-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":69340.75122482638},{"name":"Food","value":70620.62582437659},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-08-2022-08-08 to 2022-08-14","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70877.67417031532},{"name":"Recreation","value":73380.87644213287}]},{"category":"2022-08-2022-08-15 to 2022-08-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70892.57505559824},{"name":"Recreation","value":73994.89637420845}]},{"category":"2022-08-2022-08-22 to 2022-08-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70653.24585660572},{"name":"Recreation","value":73979.39470656012}]},{"category":"2022-08-2022-08-29 to 2022-08-31","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":16266.632441239044},{"name":"Food","value":29797.209342189777}]}],"2022-09":[{"category":"2022-09-2022-09-01 to 2022-09-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":69829.6734650999},{"name":"Food","value":70710.82011623998},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-09-2022-09-08 to 2022-09-14","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70702.31135111165},{"name":"Recreation","value":71370.3308187589}]},{"category":"2022-09-2022-09-15 to 2022-09-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70773.53119504568},{"name":"Recreation","value":73959.90891349371}]},{"category":"2022-09-2022-09-22 to 2022-09-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70797.78127987785},{"name":"Recreation","value":73438.11392942007}]},{"category":"2022-09-2022-09-29 to 2022-09-30","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":13312.292304952916},{"name":"Food","value":19893.624873004963}]}],"2022-10":[{"category":"2022-10-2022-10-01 to 2022-10-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":70336.29732149944},{"name":"Food","value":70726.42895627562},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-10-2022-10-08 to 2022-10-14","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":68941.21096099247},{"name":"Food","value":70610.27434727133}]},{"category":"2022-10-2022-10-15 to 2022-10-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70677.6512761762},{"name":"Recreation","value":71244.47684194002}]},{"category":"2022-10-2022-10-22 to 2022-10-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":70607.14983520072},{"name":"Food","value":70663.37613690048}]},{"category":"2022-10-2022-10-29 to 2022-10-31","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":30899.53760547636},{"name":"Recreation","value":45593.13660458967}]}],"2022-11":[{"category":"2022-11-2022-11-01 to 2022-11-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":67991.39371051676},{"name":"Food","value":70723.74676896574},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-11-2022-11-08 to 2022-11-14","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":70271.27988890126},{"name":"Food","value":70895.37912953188}]},{"category":"2022-11-2022-11-15 to 2022-11-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":68027.87294552612},{"name":"Food","value":70601.91586627402}]},{"category":"2022-11-2022-11-22 to 2022-11-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70745.88280717155},{"name":"Recreation","value":71358.24896141607}]},{"category":"2022-11-2022-11-29 to 2022-11-30","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":10641.68925146164},{"name":"Food","value":19880.21440401522}]}],"2022-12":[{"category":"2022-12-2022-12-01 to 2022-12-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Food","value":70496.33573638083},{"name":"Recreation","value":73863.99473759846},{"name":"Shelter","value":558450.711295259}]},{"category":"2022-12-2022-12-08 to 2022-12-14","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":68144.36072838331},{"name":"Food","value":70589.56565218173}]},{"category":"2022-12-2022-12-15 to 2022-12-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":69541.85562627326},{"name":"Food","value":70822.48967625339}]},{"category":"2022-12-2022-12-22 to 2022-12-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":70315.8533033265},{"name":"Food","value":70746.78179251724}]},{"category":"2022-12-2022-12-29 to 2022-12-31","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":30447.6240822809},{"name":"Recreation","value":34754.772962354225}]}],"2023-01":[{"category":"2023-01-2023-01-01 to 2023-01-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":69038.60158255094},{"name":"Food","value":70776.88241836677},{"name":"Shelter","value":558450.711295259}]},{"category":"2023-01-2023-01-08 to 2023-01-14","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70788.0581831435},{"name":"Recreation","value":71322.29005599595}]},{"category":"2023-01-2023-01-15 to 2023-01-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":68146.56010297836},{"name":"Food","value":70517.61400371985}]},{"category":"2023-01-2023-01-22 to 2023-01-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":70848.40739082165},{"name":"Recreation","value":71812.09497195229}]},{"category":"2023-01-2023-01-29 to 2023-01-31","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":30341.00309951765},{"name":"Recreation","value":31260.261288976028}]}],"2023-02":[{"category":"2023-02-2023-02-01 to 2023-02-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":69958.92063625476},{"name":"Food","value":70644.41463835549},{"name":"Shelter","value":558450.711295259}]},{"category":"2023-02-2023-02-08 to 2023-02-14","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":67800.45898746043},{"name":"Food","value":70577.31246584859}]},{"category":"2023-02-2023-02-15 to 2023-02-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":65140.890203769566},{"name":"Food","value":70630.63429449027}]},{"category":"2023-02-2023-02-22 to 2023-02-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":68226.27515671786},{"name":"Food","value":70625.51998575698}]}],"2023-03":[{"category":"2023-03-2023-03-01 to 2023-03-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":69120.01794452118},{"name":"Food","value":70870.72469841636},{"name":"Shelter","value":558450.711295259}]},{"category":"2023-03-2023-03-08 to 2023-03-14","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":68589.24119657875},{"name":"Food","value":70753.72051578411}]},{"category":"2023-03-2023-03-15 to 2023-03-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":70166.32086824549},{"name":"Food","value":70715.76819250784}]},{"category":"2023-03-2023-03-22 to 2023-03-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":67192.44822618616},{"name":"Food","value":70767.41167472213}]},{"category":"2023-03-2023-03-29 to 2023-03-31","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":20142.390357697},{"name":"Food","value":29866.842330697284}]}],"2023-04":[{"category":"2023-04-2023-04-01 to 2023-04-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":70397.32759812375},{"name":"Food","value":70723.10265715142},{"name":"Shelter","value":558450.711295259}]},{"category":"2023-04-2023-04-08 to 2023-04-14","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":67803.86417124537},{"name":"Food","value":70730.82068578871}]},{"category":"2023-04-2023-04-15 to 2023-04-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":70197.37230945373},{"name":"Food","value":70880.62646346213}]},{"category":"2023-04-2023-04-22 to 2023-04-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":66788.52108038557},{"name":"Food","value":70629.54058921241}]},{"category":"2023-04-2023-04-29 to 2023-04-30","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":20852.795964998713},{"name":"Recreation","value":35107.25649033683}]}],"2023-05":[{"category":"2023-05-2023-05-01 to 2023-05-07","segments":[{"name":"Education","value":11423.437130106584},{"name":"Recreation","value":70096.43510042607},{"name":"Food","value":70913.1258551469},{"name":"Shelter","value":558450.711295259}]},{"category":"2023-05-2023-05-08 to 2023-05-14","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":70122.52045908547},{"name":"Food","value":70619.04677257649}]},{"category":"2023-05-2023-05-15 to 2023-05-21","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":64417.903640793986},{"name":"Food","value":70577.92702202083}]},{"category":"2023-05-2023-05-22 to 2023-05-28","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Recreation","value":19614.648817895515},{"name":"Food","value":30195.537490669976}]},{"category":"2023-05-2023-05-29 to 2023-05-31","segments":[{"name":"Shelter","value":0},{"name":"Education","value":0},{"name":"Food","value":0},{"name":"Recreation","value":0}]}]}

const svg = d3.select('#task2Svg');
const margin = { top: 50, right: 260, bottom: 110, left: 100 };
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;
const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)
const x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
const y = d3.scaleLinear().rangeRound([height, 0]);
const colorScale = d3.scaleOrdinal(d3.schemeDark2)
const tooltip = d3.select("#tooltip")

g.append("g")
    .attr("class", "x-axis")
    .attr('transform', `translate(0,${height})`)
g.append("g")
    .attr("class", "y-axis")
svg.append("text")             
    .attr("transform", `translate(${(width / 2) + margin.left - 10}, ${height + margin.top + 50})`)
    .style("text-anchor", "middle")
    .text("Time in Months/Weeks")
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 + 10)
    .attr("x",0 - (height / 2) - 50)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Expenditure"); 

updateChart(monthlyData);

function updateChart(dataArray, isWeekly = false) {
    dataArray.forEach(d => {
        let cumValue = 0;
        d.segments.forEach(segment => {
            segment.startValue = cumValue;
            cumValue += segment.value;
            segment.endValue = cumValue;
        });
    })
    const maxVal = d3.max(dataArray, d => d.segments[d.segments.length - 1].endValue);
    x.domain(dataArray.map(d => d.category));
    y.domain([0, maxVal])
    g.select(".x-axis")
        .transition()
        .duration(750)
        .call(d3.axisBottom(x))
    g.select(".y-axis")
        .transition()
        .duration(750)
        .call(d3.axisLeft(y).ticks(10))
    const bars = g.selectAll('.bar')
        .data(dataArray.flatMap(d => d.segments.map(segment => ({ ...segment, category: d.category }))), d => d.category + d.name)
    bars.enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.category))
        .attr('y', d => y(d.startValue))
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .attr('fill', d => colorScale(d.name))
        .on('mouseover', function (event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Category: " + d.name + "<br/>Value: " + d.value.toFixed(2))
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 300) + "px");
        })
        .on('mouseout', function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .merge(bars)
        .transition()
        .duration(750)
        .attr('y', d => y(d.endValue))
        .attr('height', d => y(d.startValue) - y(d.endValue))
    bars.exit()
        .transition()
        .duration(250)
        .attr('y', d => y(d.startValue))
        .attr('height', 0)
        .remove()
    g.selectAll('.bar')
        .on('click', function (event, d) {
            if (!isWeekly) {
                const month = d.category;
                expandBar(month);
            } else {
                updateChart(monthlyData);
            }
        })
    createLegend(dataArray.flatMap(d => d.segments.map(segment => segment.name)));
}

function expandBar(category) {
    const expandedData = weeklyData[category];
    if (expandedData) {
        updateChart(expandedData, true);
    }
}

function createLegend(categories) {
    svg.selectAll('.legend').remove();
    categories = Array.from(new Set(categories));
    const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${width + margin.left}, 100)`)
    categories.forEach((category, index) => {
        const legendItem = legend.append('g')
            .attr('transform', `translate(0, ${index * 30})`)
        legendItem.append('rect')
            .attr('width', 24)
            .attr('height', 24)
            .attr('fill', colorScale(category))
        legendItem.append('text')
            .attr('x', 30)
            .attr('y', 12)
            .attr('dy', '.35em')
            .text(category);
    });
}
