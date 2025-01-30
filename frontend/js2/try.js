var USER_SPEED = "slow";

var width = 780,
    height = 800,
    padding = 1,
    maxRadius = 3;

var act_codes = [
    { "index": "0", "short": "AtWork", "desc": "AtWork" },
    { "index": "1", "short": "AtRecreation", "desc": "AtRecreation" },
    { "index": "2", "short": "AtHome", "desc": "AtHome" },
    { "index": "3", "short": "AtRestaurant", "desc": "AtRestaurant" },
    { "index": "4", "short": "Transport", "desc": "Transport" }
];

var speeds = { "slow": 1000, "medium": 200, "fast": 50 };

var time_notes = [

    { "start_minute": 1, "stop_minute": 60, "note": "Most people are sleeping at these hours. Some poor souls are still commuting back from work." },
    { "start_minute": 70, "stop_minute": 210, "note": "Finally, even the night owls are asleep right now. Good night." },
    { "start_minute": 240, "stop_minute": 300, "note": "We can see people start waking up for early breakfast. Interestingly, some of them goes back to sleep" },
    { "start_minute": 310, "stop_minute": 360, "note": "After breakfast, people start commuting to work / school" },
    { "start_minute": 370, "stop_minute": 480, "note": "Most of them are on their way to work now. They have their breakfast presumably near their workplace/ school after commuting" },
    { "start_minute": 490, "stop_minute": 570, "note": "It's time to start working! School bell starts ringing as well!" },
    { "start_minute": 580, "stop_minute": 660, "note": "Interestingly, some of them goes for breakfast or coffee / tea break after doing some work / study in the morning." },
    { "start_minute": 670, "stop_minute": 840, "note": "It's lunch time. Interestingly, the crowds don't go for lunch at similar time slot." },
    { "start_minute": 850, "stop_minute": 960, "note": "After lunch, some students / professionals have leisure break / commuting. Others continue working / studying. Small group of people are still having lunch or afternoon tea break" },
    { "start_minute": 970, "stop_minute": 1080, "note": "The crowds start to swarm in for the evening commute back to home / places for dinner." },
    { "start_minute": 1090, "stop_minute": 1200, "note": "It's dinner time! People start to go for their dinner, while some hardworking people are still enjoying their work/ study." },
    { "start_minute": 1210, "stop_minute": 1320, "note": "After dinner, most of the people are in their leisure activities/ commuting back home. Some professionals are still hustling at work." },
    { "start_minute": 1330, "stop_minute": 1400, "note": "The crowds are starting to head to their bed. Interesting observation: people are still eating at these late hours." },
    { "start_minute": 1410, "stop_minute": 1430, "note": "End of the day. See Ya Tomorrow" }
];


function color(activity) {

    var colorByActivity = {
        "0": "#e0d400",
        "1": "#1c8af9",
        "2": "#51BC05",
        "3": "#FF7F00",
        "4": "#DB32A4",
    }

    return colorByActivity[activity];

}


function readablePercent(n, total) {

    var pct = 100 * n / total;
    if (pct < 1 && pct > 0) {
        pct = "<1%";
    } else {
        pct = Math.round(pct) + "%";
    }

    return pct;
}


function minutesToTime(m) {
    var minutes = (m + 0 * 60) % 1440;
    var hh = Math.floor(minutes / 60);
    var ampm;
    if (hh > 12) {
        hh = hh - 12;
        ampm = "PM";
    } else if (hh == 12) {
        ampm = "PM";
    } else if (hh == 0) {
        hh = 12;
        ampm = "AM";
    } else {
        ampm = "AM";
    }
    var mm = minutes % 60;
    if (mm < 10) {
        mm = "0" + mm;
    }

    return hh + ":" + mm + " " + ampm
}


function calculateFoci(act_codes) {

    var center_pt = { "x": 380, "y": 365 };
    var foci = {};

    act_codes.forEach(function (code, i) {
        if (code.desc === "Transport") {

            foci[code.index] = center_pt;
        } else {


            var theta = 2 * Math.PI / (act_codes.length - 1);
            var angle = theta * i;

            foci[code.index] = {
                "x": center_pt.x + 250 * Math.cos(angle),
                "y": center_pt.y + 250 * Math.sin(angle)
            };
        }
    });

    return foci;
}


function initializeChart(containerId, dataFile) {

    var sched_objs = [],
        curr_minute = 0;
    var foci = calculateFoci(act_codes);


    var svg = d3.select(containerId).append("svg")
        .attr("width", width)
        .attr("height", height);


    d3.json(dataFile, function (error, data) {
        if (error) throw error;


        data.forEach(function (d) {
            var day_array = d.activity.split(",");
            var activities = [];
            for (var i = 0; i < day_array.length; i += 2) {
                activities.push({ 'act': day_array[i], 'duration': +day_array[i + 1] });
            }
            sched_objs.push({ 'schedule': activities, 'curr_act_index': 0 });
        });


        var act_counts = initializeActivityCounts(act_codes);


        var nodes = sched_objs.map(function (o, i) {
            var initialAct = o.schedule[0].act;
            var init_x = foci[initialAct].x + Math.random();
            var init_y = foci[initialAct].y + Math.random();
            act_counts[initialAct]++;

            return {
                act: initialAct,
                radius: maxRadius,
                x: init_x,
                y: init_y,
                color: color(initialAct),
                moves: 0,
                next_move_time: o.schedule[0].duration,
                schedule: o.schedule
            };
        });


        var force = d3.layout.force()
            .nodes(nodes)
            .size([width, height])
            .gravity(0)
            .charge(0)
            .friction(0.9)
            .on("tick", tick)
            .start();


        var circle = svg.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("r", function (d) { return d.radius; })
            .style("fill", function (d) { return d.color; });


        addActivityLabels(svg, act_codes, act_counts, foci);


        startTimer(nodes, force, act_counts, time_notes, curr_minute);
    });
}


function initializeActivityCounts(act_codes) {
    var act_counts = {};
    act_codes.forEach(function (code) {
        act_counts[code.index] = 0;
    });
    return act_counts;
}


function addActivityLabels(svg, act_codes, act_counts, foci) {

    var labels = svg.selectAll(".actlabel")
        .data(act_codes)
        .enter().append("text")
        .attr("class", "actlabel")
        .attr("x", function (d) { return foci[d.index].x; })
        .attr("y", function (d) { return foci[d.index].y; })
        .text(function (d) { return d.short; });


}


function startTimer(nodes, force, act_counts, time_notes) {
    var timer = d3.timer(function (elapsed) {
        nodes.forEach(function (node) {

            if (elapsed >= node.next_move_time) {

                act_counts[node.act] -= 1;
                node.moves++;
                if (node.moves >= node.schedule.length) {
                    node.moves = 0;
                }
                node.act = node.schedule[node.moves].act;
                act_counts[node.act] += 1;
                node.next_move_time += node.schedule[node.moves].duration;


                node.cx = foci[node.act].x;
                node.cy = foci[node.act].y;
            }
        });


        force.alpha(1).restart();


        curr_minute = Math.round(elapsed / 1000) % 1440;
        d3.select("#current_time").text(minutesToTime(curr_minute));


        time_notes.forEach(function (note) {
            if (curr_minute === note.start_minute) {
                d3.select("#note").text(note.note);
            }
        });



    });
}


function tick(e) {
    var k = 0.1 * e.alpha;


    nodes.forEach(function (node) {
        var target = foci[node.act];
        node.x += (target.x - node.x) * k;
        node.y += (target.y - node.y) * k;
    });


    d3.selectAll("circle")
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });
}


function collide(alpha) {
    var quadtree = d3.geom.quadtree(nodes);
    return function (d) {
        var r = d.radius + maxRadius + padding,
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
        quadtree.visit(function (quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== d)) {
                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d.radius + quad.point.radius + padding;
                if (l < r) {
                    l = (l - r) / l * alpha;
                    d.x -= x *= l;
                    d.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
    };
}



initializeChart("#chart", "data/updated_result_data1.json");


initializeChart("#chart2", "data/updated_result_data_trimmed.json");