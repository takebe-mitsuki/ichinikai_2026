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
        box.querySelectorAll(".shift-day__image").forEach((img) => {

            img.addEventListener("click", () => {
                openShiftImage(img.src, img.alt);
            });

        });
    }catch(error){

        console.error("Team shift loading error:", error);

    }

    function openShiftImage(src, alt){

    const viewer = document.createElement("div");

    viewer.className = "shift-viewer";

    viewer.innerHTML = `
        <button type="button" class="shift-viewer__close" aria-label="閉じる">✕</button>
        <div class="shift-viewer__scroll">
            <img src="${src}" alt="${alt}">
        </div>
        <p class="shift-viewer__hint">画像をタップで拡大・縮小 ／ それ以外をタップで閉じる</p>
    `;

    const onKey = (event) => {
        if(event.key === "Escape"){ close(); }
    };

    const close = () => {
        viewer.remove();
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onKey);
    };

    viewer.querySelector("img").addEventListener("click", (event) => {
        event.stopPropagation();
        viewer.classList.toggle("is-zoomed");
    });

    viewer.addEventListener("click", close);

    document.addEventListener("keydown", onKey);

    document.body.style.overflow = "hidden";

    document.body.appendChild(viewer);

}
}