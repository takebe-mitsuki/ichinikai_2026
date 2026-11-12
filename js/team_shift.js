document.addEventListener("DOMContentLoaded", () => {
    loadTeamShift();
});

async function loadTeamShift(){

    const box = document.querySelector("#shift-list");

    if(!box){ return; }

    try{

        const response = await fetch(
            `data/shift_${TEAM_SLUG}.json`,
            { cache: "no-store" }
        );

        const days = await response.json();

        if(days.length === 0){
            box.innerHTML = `<p class="news__empty">シフトは準備中です。</p>`;
            return;
        }

        box.innerHTML = days.map((d) => `
            <div class="shift-day">
                <h3 class="shift-day__date">${d.date}</h3>
                ${d.image ? `<img class="shift-day__image" src="${d.image}" alt="${d.date}のシフト表">` : ""}
                ${d.updated ? `<p class="shift-day__updated">更新日時:${d.updated}</p>` : ""}
            </div>
        `).join("");

    }catch(error){

        console.error("Team shift loading error:", error);

    }

}