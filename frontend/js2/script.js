const fs = require("fs");


async function processJsonFile(filePath) {
  try {
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData);

    const sched_objs = [];

    jsonData.forEach((d) => {
      let k = Object.keys(d)[0];
      let d_arr = d[k].split(",");
      var acts = [];
      for (var i = 0; i < d_arr.length; i++) {
        
        if (i % 2 == 1) {
          acts.push({ mode: d_arr[i - 1], duration: parseInt(d_arr[i]) });
        }
      }

      sched_objs.push(acts);
    });

    
    fs.writeFileSync(
      "../data/schedule.json",
      JSON.stringify(sched_objs, null, 2)
    );
  } catch (error) {
    console.error("Error reading or parsing the JSON file:", error);
  }
}


const jsonFilePath = "../data/data.json";


processJsonFile(jsonFilePath);
