modes.forEach((mode, i) => {
  if (mode == center_mode) {
    pos[i] = center_pos;
  } else {
    pos[i] = {
      x: plot_radius * Math.cos(i * angle) + center_pos.x,
      y: plot_radius * Math.sin(i * angle) + center_pos.y,
    };
  }
});

sched_objs = [];
document.addEventListener("DOMContentLoaded", async () => {


  const response = await fetch("../data/schedule.json");

  const schedule = await response.json();

  let svg = d3
    .select("#chart2")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


  let nodes = schedule.map((o, i) => {
    let mode_index = o[0].mode;
    return {
      mode_index,
      radius: 5,
      x: pos[mode_index].x + Math.random(),
      y: pos[mode_index].y + Math.random(),
      color: color[mode_index],
      duration: o[0].duration,
      sched: o,
      moves: 0,
    };
  });

  const tempSimulation = d3
    .forceSimulation(nodes)
    .force("center", d3.forceCenter(width / 2, height / 2).strength(0))
    .force("charge", d3.forceManyBody().strength(0))
    .force(
      "collide",
      d3.forceCollide().radius(function (d) {
        return d.radius;
      })
    )
    .on("tick", tick)
    .alphaDecay(0.9);

  var circle = svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", function (d) {
      return d.radius;
    })
    .style("fill", function (d) {
      return d.color;
    });

  const collide = (alpha) => {
    let quadtree = d3.quadtree().addAll(nodes);
    return (d) => {
      let r = d.radius + maxRadius + padding;
      let nx1 = d.x - r;
      let nx2 = d.x + r;
      let ny1 = d.y - r;
      let ny2 = d.y + r;

      quadtree.visit((quad, x1, y1, x2, y2) => {
        if (quad.point && quad.point !== d) {
          var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r =
              d.radius +
              quad.point.radius +
              (d.mode_index !== quad.point.mode_index) * padding;
          if (l < r) {
            l = ((l - r) / l) * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  };
  let count = 0;
  function tick() {
    let k = 0.04 * tempSimulation.alpha();

    nodes.forEach((o, i) => {
      let curr_mode = o.mode_index;
      let decay = 1;
      if (curr_mode === "0") {
        decay = 0.6;
      }
      o.color = color[curr_mode];
      o.x += (pos[curr_mode].x - o.x) * k * decay;
      o.y += (pos[curr_mode].y - o.y) * k * decay;
    });

    circle
      .style("fill", function (d) {
        return d.color;
      })
      .attr("cx", function (d) {
        if (count < 10) {
          console.log("cx", d.x);
          count += 1;
        }
        return d.x;
      })
      .attr("cy", function (d) {
        if (count < 10) {
          console.log("cy", d.y);
          count += 1;
        }
        return d.y;
      });
  }

  var label = svg
    .selectAll("text")
    .data(modes)
    .enter()
    .append("text")
    .attr("class", "mode_label")
    .attr("x", (mode, i) => {
      if (mode === center_mode) {
        return center_pos.x;
      } else {
        return plot_radius * Math.cos(i * angle) + center_pos.x;
      }
    })
    .attr("y", (mode, i) => {
      if (mode === center_mode) {
        return center_pos.y;
      } else {
        return plot_radius * Math.sin(i * angle) + center_pos.y;
      }
    })
    .text((d) => d);

  function timer() {
    nodes.forEach((curr_node, i) => {
      let curr_moves = curr_node.moves;
      if (curr_node.duration == curr_minute) {
        if (curr_node.moves == curr_node.sched.length - 1) {
          curr_moves = 0;
        } else {
          curr_moves += 1;
        }

        curr_node.mode_index = curr_node.sched[curr_moves].mode;

        curr_node.moves = curr_moves;
        curr_node.x = pos[curr_node.mode_index].x;
        curr_node.y = pos[curr_node.mode_index].y;

        nodes[i].duration += nodes[i].sched[curr_node.moves].duration;
      }
    });

    tempSimulation.alpha(1).restart();
    curr_minute += 1;

    const true_minute = curr_minute % 1440;
    setTimeout(timer, 10);
  }
  setTimeout(timer, 10);

});
