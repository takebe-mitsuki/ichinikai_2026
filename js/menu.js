document.addEventListener("DOMContentLoaded", () => {
    loadMenu();
});

async function loadMenu(){

    const tabs = document.querySelector("#menu-tabs");

    if(!tabs){ return; }

    try{

        const response = await fetch(
            "data/menu.json",
            { cache: "no-store" }
        );

        const teams = await response.json();

        const days = [...new Set(teams.map((t) => t.days))];

        tabs.innerHTML = days.map((d, i) => `
            <button type="button" class="menu-tab" data-index="${i}">${d}</button>
        `).join("");

        tabs.querySelectorAll(".menu-tab").forEach((btn) => {
            btn.addEventListener("click", () => {
                showMenuDay(teams, days, Number(btn.dataset.index));
            });
        });

        showMenuDay(teams, days, 0);

    }catch(error){

        console.error("Menu loading error:", error);

    }

}

function showMenuDay(teams, days, index){

    document.querySelectorAll(".menu-tab").forEach((b, i) => {
        b.classList.toggle("is-active", i === index);
    });

    const list = document.querySelector("#menu-list");

    list.innerHTML = "";

    teams
        .filter((t) => t.days === days[index])
        .forEach((team) => {

            const col = document.createElement("section");

            col.className = "menu-team";

            col.style.setProperty("--team-color", team.color || "#888");

            col.innerHTML = `<h3 class="menu-team__name">${team.team}</h3>`;

            const items = team.items || [];

            if(items.length === 0){
                col.innerHTML += `<p class="menu__empty">メニューは準備中です。</p>`;
            }

            items.forEach((item) => {

                const card = document.createElement("article");

                card.className = "menu-card";

                card.innerHTML = `
                    ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ""}
                    <h4>${item.name}</h4>
                    <p class="menu-card__price">${item.price || ""}</p>
                    <button type="button" class="menu-card__button">詳細はこちら</button>
                `;

                card.querySelector("button").addEventListener("click", () => {
                    openMenuItem(team, item);
                });

                col.appendChild(card);

            });

            list.appendChild(col);

        });

}

function openMenuItem(team, item){

    const parts = [];

    if(item.image){
        parts.push(`<img class="menu-modal__image" src="${item.image}" alt="">`);
    }

    if(item.description){
        parts.push(item.description.replace(/\n/g, "<br>"));
    }

    if(item.toppings && item.toppings.length){
        parts.push("<b>トッピング</b><br>" + item.toppings.join("<br>"));
    }

    openNewsModal({
        category: team.team,
        title: item.name,
        date: item.price || "",
        content: parts.join("<br><br>")
    });

}