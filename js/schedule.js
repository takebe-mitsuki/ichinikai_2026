/*
========================================

Schedule System

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



        displaySchedule(
            scheduleData,
            container
        );


    }catch(error){


        console.error(
            "Schedule loading error:",
            error
        );


    }

}







function displaySchedule(
    scheduleData,
    container
){


    scheduleData.forEach(
        (item)=>{


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



            container.appendChild(
                div
            );


        }
    );

}
