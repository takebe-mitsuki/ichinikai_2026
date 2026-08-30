/*
========================================

Members System

教育学部祭 いちにかい企画
Ver.2

========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadMembers();

    }
);





async function loadMembers(){


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
                "data/members.json"
            );


        const members =
            await response.json();



        displayMembers(
            members,
            container
        );


    }catch(error){


        console.error(
            "Members loading error:",
            error
        );


    }

}







function displayMembers(
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



            if(member.role === "代表"){


                card.classList.add(
                    "leader-card--main"
                );


            }




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

                </h3>


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