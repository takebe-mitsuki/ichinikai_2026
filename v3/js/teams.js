/*
========================================

Teams System

教育学部祭 いちにかい企画
Ver.2

========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {


        loadTeams();


    }
);







async function loadTeams(){


    const container =
        document.querySelector(
            "#teams-list"
        );


    if(!container){

        return;

    }



    try{


        const response =
            await fetch(
                "data/teams.json"
            );


        const teams =
            await response.json();



        displayTeams(
            teams,
            container
        );


    }catch(error){


        console.error(
            "Teams loading error:",
            error
        );


    }


}







function displayTeams(
    teams,
    container
){


    teams.forEach(
        (team)=>{


            const card =
                document.createElement(
                    "a"
                );


            card.className =
                "team-card";


            card.href =
                team.link;



            card.innerHTML = `


                <img
                    src="${team.image}"
                    alt="${team.name}"
                >


                <h3>
                    ${team.name}
                </h3>


                <p>
                    ${team.catchcopy}
                </p>


            `;



            container.appendChild(
                card
            );


        }
    );

}