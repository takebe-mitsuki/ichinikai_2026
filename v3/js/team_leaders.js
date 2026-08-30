/*
========================================

Team Leaders System
(班長・副班長紹介)

教育学部祭 いちにかい企画
Ver.2

========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadTeamLeaders();

    }
);







async function loadTeamLeaders(){


    const container =
        document.querySelector(
            "#leaders-list"
        );


    if(!container){

        return;

    }



    try{


        const response =
            await fetch(
                `data/leaders_${TEAM_SLUG}.json`
            );


        const members =
            await response.json();



        displayTeamLeaders(
            members,
            container
        );


    }catch(error){


        console.error(
            "Team leaders loading error:",
            error
        );


    }

}







function displayTeamLeaders(
    members,
    container
){


    members.forEach(
        (member)=>{


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "leader-card";



            if(member.role === "班長"){


                card.classList.add(
                    "leader-card--main"
                );


            }




            const nicknameHTML =
                member.nickname
                    ? `<p class="leader-card__nickname">${member.nickname}</p>`
                    : "";



            card.innerHTML = `

                <span>

                    ${member.role}

                </span>


                <img
                    src="${member.image}"
                    alt="${member.name}"
                >


                <h3>

                    ${member.name}

                    <span class="leader-card__role">

                        ${member.role}

                    </span>

                </h3>


                ${nicknameHTML}


                <p>

                    ${member.description}

                </p>

            `;



            container.appendChild(
                card
            );


        }
    );

}
