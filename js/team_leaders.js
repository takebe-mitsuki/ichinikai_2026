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
                `data/leaders_${TEAM_SLUG}.json`,
                { cache: "no-store" }
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







function displayTeamLeaders(members, container){

    members.forEach((member) => {

        const card = document.createElement("article");

        card.className =
            "profile-card" +
            (member.role === "班長" ? " profile-card--main" : "");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <div>
                <span class="profile-card__role">${member.role}</span>
                <h3>${member.name}</h3>
                ${member.nickname ? `<p class="profile-card__nickname">${member.nickname}</p>` : ""}
                <div class="profile-card__text">${member.description}</div>
            </div>
        `;

        container.appendChild(card);

    });

}
