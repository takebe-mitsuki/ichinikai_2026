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

        tabs.innerHTML = teams.map((t, i) => `
            <button type="button" class="menu-tab" data-index="${i}"
                style="--team-color:${t.color || "#888"}">
                <small>${t.days || ""}</small>
                <span>${t.team}</span>
            </button>
        `).join("");

        tabs.querySelectorAll(".menu-tab").forEach((btn) => {
            btn.addEventListener("click", () => {
                showMenuTeam(teams, Number(btn.dataset.index));
            });
        });

        showMenuTeam(teams, 0);

    }catch(error){

        console.error("Menu loading error:", error);

    }

}

function showMenuTeam(teams, index){

    const team = teams[index];

    const list = document.querySelector("#menu-list");

    document.querySelectorAll(".menu-tab").forEach((b, i) => {
        b.classList.toggle("is-active", i === index);
    });

    list.style.setProperty("--team-color", team.color || "#888");

    list.innerHTML = "";

    const items = team.items || [];

    if(items.length === 0){
        list.innerHTML = `<p class="menu__empty">メニューは準備中です。</p>`;
        return;
    }

    items.forEach((item) => {

        const row = document.createElement("article");

        row.className = "menu-item";

        row.innerHTML = `
            ${item.image ? `<img src="${item.image}" alt="${item.name}">` : "<span></span>"}
            <div>
                <h3>${item.name}</h3>
                <p class="menu-item__price">${item.price || ""}</p>
            </div>
        `;

        row.addEventListener("click", () => {
            openMenuItem(team, item);
        });

        list.appendChild(row);

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