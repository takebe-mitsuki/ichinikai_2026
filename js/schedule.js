/*
========================================

Schedule System
(今後の予定を一覧表示、過去の予定は
 ポップアップでまとめて表示)

教育学部祭 いちにかい企画
Ver.2

========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadSchedule();

    }
);







async function loadSchedule(){


    const container =
        document.querySelector(
            "#schedule-list"
        );


    if(!container){

        return;

    }



    try{


        const response =
            await fetch(
                "data/schedule.json",
                { cache: "no-store" }
            );


        const scheduleData =
            await response.json();



        const today = new Date();

        today.setHours(0, 0, 0, 0);



        const upcoming =
            scheduleData.filter(
                (item) => {

                    return (
                        parseScheduleDate(item.end_date) >= today
                    );

                }
            );



        const past =
            scheduleData.filter(
                (item) => {

                    return (
                        parseScheduleDate(item.end_date) < today
                    );

                }
            );



        displaySchedule(
            upcoming,
            container
        );



        setupPastScheduleButton(
            past
        );


    }catch(error){


        console.error(
            "Schedule loading error:",
            error
        );


    }

}







function parseScheduleDate(dateStr){


    const [year, month, day] =
        dateStr
            .split(".")
            .map(Number);


    return new Date(
        year,
        month - 1,
        day
    );


}







function displaySchedule(
    scheduleData,
    container
){


    if(scheduleData.length === 0){


        container.innerHTML =
            `<div class="schedule-item"><p>現在、予定されているスケジュールはありません。</p></div>`;


        return;

    }



    scheduleData.forEach(
        (item)=>{


            container.appendChild(
                createScheduleRow(item)
            );


        }
    );

}







function createScheduleRow(item){


    const div =
        document.createElement(
            "div"
        );


    div.className =
        "schedule-item";



    div.innerHTML = `

        <time>

            ${item.date}

        </time>


        <p>

            ${item.teams.join("<br>")}

        </p>

    `;


    return div;

}







/*
過去のスケジュールが1件以上あるときだけ
「過去のスケジュールはこちら」ボタンを表示する。
*/


function setupPastScheduleButton(pastItems){


    const wrapper =
        document.querySelector(
            "#schedule-more"
        );


    const button =
        document.querySelector(
            "#schedule-more-toggle"
        );


    if(!wrapper || !button){

        return;

    }



    if(pastItems.length === 0){


        wrapper.style.display =
            "none";


        return;

    }



    wrapper.style.display = "";



    button.addEventListener(

        "click",

        () => {


            openScheduleModal(
                pastItems
            );


        }

    );


}
