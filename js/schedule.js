let calendarEvents = [];
let viewYear;
let viewMonth;

document.addEventListener("DOMContentLoaded", () => {
    loadSchedule();
});

async function loadSchedule(){

    const box = document.querySelector("#calendar");

    if(!box){ return; }

    try{

        const response = await fetch(
            "data/schedule.json",
            { cache: "no-store" }
        );

        const scheduleData = await response.json();

        calendarEvents = scheduleData.map((item) => ({
            title: item.title || (item.teams || []).join("・"),
            dateLabel: item.date || "",
            start: parseScheduleDate(item.start_date || item.end_date),
            end: parseScheduleDate(item.end_date),
            time: item.time || "",
            detail: item.detail || ""
        }));

        const today = new Date();
        viewYear = today.getFullYear();
        viewMonth = today.getMonth();

        displayToday();
        renderCalendar();

    }catch(error){

        console.error("Schedule loading error:", error);

    }

}

function parseScheduleDate(dateStr){

    const [year, month, day] =
        dateStr.split(".").map(Number);

    return new Date(year, month - 1, day);

}

/* 本日の予定(お知らせの上のブロック) */

function displayToday(){

    const section = document.querySelector("#today");
    const list = document.querySelector("#today-list");

    if(!section || !list){ return; }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const items = calendarEvents.filter(
        (e) => e.start <= today && today <= e.end
    );

    if(items.length === 0){ return; }

    items.forEach((e) => {

        const row = document.createElement("div");

        row.className = "schedule-item";

        row.style.cursor = "pointer";

        row.innerHTML = `
            <time>${e.dateLabel}</time>
            <p>${e.title}${e.time ? "(" + e.time + ")" : ""}</p>
        `;

        row.addEventListener("click", () => {
            openScheduleEvent(e);
        });

        list.appendChild(row);

    });

    section.style.display = "";

}

/* カレンダー本体 */

function renderCalendar(){

    const box = document.querySelector("#calendar");

    const firstWeekday =
        new Date(viewYear, viewMonth, 1).getDay();

    const lastDate =
        new Date(viewYear, viewMonth + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

    let html = `
        <div class="calendar__head">
            <button type="button" class="calendar__nav" id="calendar-prev" aria-label="前の月">‹</button>
            <h3 class="calendar__title">${viewYear}年${viewMonth + 1}月</h3>
            <button type="button" class="calendar__nav" id="calendar-next" aria-label="次の月">›</button>
        </div>
        <div class="calendar__grid">
            ${weekdays.map((d) => `<div class="calendar__weekday">${d}</div>`).join("")}
    `;

    for(let i = 0; i < firstWeekday; i++){
        html += `<div class="calendar__cell calendar__cell--empty"></div>`;
    }

    for(let d = 1; d <= lastDate; d++){

        const day = new Date(viewYear, viewMonth, d);

        const isToday = day.getTime() === today.getTime();

        const chips = calendarEvents
            .map((e, index) => ({ e, index }))
            .filter(({ e }) => e.start <= day && day <= e.end)
            .map(({ e, index }) =>
                `<button type="button" class="calendar__event" data-index="${index}">${e.title}</button>`
            )
            .join("");

        html += `
            <div class="calendar__cell${isToday ? " calendar__cell--today" : ""}">
                <span class="calendar__day">${d}</span>
                ${chips}
            </div>
        `;

    }

    html += `</div>`;

    box.innerHTML = html;

    box.querySelector("#calendar-prev")
        .addEventListener("click", () => { changeMonth(-1); });

    box.querySelector("#calendar-next")
        .addEventListener("click", () => { changeMonth(1); });

    box.querySelectorAll(".calendar__event").forEach((btn) => {
        btn.addEventListener("click", () => {
            openScheduleEvent(
                calendarEvents[Number(btn.dataset.index)]
            );
        });
    });

}

function changeMonth(diff){

    viewMonth += diff;

    if(viewMonth < 0){ viewMonth = 11; viewYear--; }

    if(viewMonth > 11){ viewMonth = 0; viewYear++; }

    renderCalendar();

}

/* タップしたときのポップアップ(お知らせと同じもの) */

function openScheduleEvent(e){

    const parts = [];

    if(e.time){ parts.push("🕒 " + e.time); }

    if(e.detail){ parts.push(e.detail.replace(/\n/g, "<br>")); }

    if(parts.length === 0){
        parts.push("詳細は決まり次第お知らせします。");
    }

    openNewsModal({
        category: "スケジュール",
        title: e.title,
        date: e.dateLabel,
        content: parts.join("<br><br>")
    });

}