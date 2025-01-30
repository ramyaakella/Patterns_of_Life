import task1 from "./task1.js";
import task2 from "./task2.js";
import task3 from "./task3.js";
import task4 from "./task4.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("main-container");

  for (let i = 0; i < 3; i++) {
    const row = document.createElement("div");
    row.className = "col-md-12";
    container.appendChild(row);

    const card = document.createElement("div");
    card.id = `task${i + 1}Card`;
    card.className = "card";
    card.style.marginBottom = "30px";
    row.appendChild(card);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.id = `card-${i + 1}`;
    card.appendChild(cardBody);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = `task${i + 1}Svg`;
    svg.style.width = "100%";
    svg.style.height = "700px";
    cardBody.appendChild(svg);

    switch (i + 1) {
      case 1:
        task1(`task${i + 1}Svg`);
        break;
      case 2:
        task2(`task${i + 1}Svg`);
        break;
      case 3:
        task3(`task${i + 1}Svg`);
        break;
      case 4:
        task4(`task${i + 1}Svg`);
        break;
    }
  }
});
