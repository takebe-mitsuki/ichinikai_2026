/*
========================================

News & Leader Modal

教育学部祭 いちにかい企画
Ver.2

========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {


        setupModal();

        setupLeaderModal();

        setupScheduleModal();


    }
);







/*
----------------------------------------
News Modal
----------------------------------------
*/


function openNewsModal(news){


    const modal =
        document.querySelector(
            "#news-modal"
        );


    if(!modal){

        return;

    }



    modal.querySelector(
        ".news-modal__category"
    ).textContent =
        news.category;



    modal.querySelector(
        ".news-modal__title"
    ).textContent =
        news.title;



    modal.querySelector(
        ".news-modal__date"
    ).textContent =
        news.date;



    modal.querySelector(
        ".news-modal__text"
    ).innerHTML =
        news.content;




    modal.classList.add(
        "is-open"
    );


    document.body.style.overflow =
        "hidden";


}







function closeNewsModal(){


    const modal =
        document.querySelector(
            "#news-modal"
        );


    modal.classList.remove(
        "is-open"
    );


    document.body.style.overflow =
        "";

}







function setupModal(){


    const modal =
        document.querySelector(
            "#news-modal"
        );


    const closeButton =
        document.querySelector(
            "#news-modal-close"
        );



    if(!modal){

        return;

    }




    closeButton.addEventListener(

        "click",

        closeNewsModal

    );





    modal.addEventListener(

        "click",

        (event)=>{


            if(
                event.target === modal
            ){

                closeNewsModal();

            }


        }

    );


}







/*
----------------------------------------
Leader Modal
(代表・副代表・班長のプロフィール表示)
----------------------------------------
*/


function openLeaderModal(member){


    const modal =
        document.querySelector(
            "#leader-modal"
        );


    if(!modal){

        return;

    }



    modal.querySelector(
        "#leader-modal-photo"
    ).src =
        member.image;


    modal.querySelector(
        "#leader-modal-photo"
    ).alt =
        member.name;



    modal.querySelector(
        "#leader-modal-role"
    ).textContent =
        member.role;



    modal.querySelector(
        "#leader-modal-name"
    ).textContent =
        member.nickname
            ? `${member.name}(${member.nickname})`
            : member.name;



    modal.querySelector(
        "#leader-modal-description"
    ).textContent =
        member.description;




    modal.classList.add(
        "is-open"
    );


    document.body.style.overflow =
        "hidden";


}







function closeLeaderModal(){


    const modal =
        document.querySelector(
            "#leader-modal"
        );


    if(!modal){

        return;

    }


    modal.classList.remove(
        "is-open"
    );


    document.body.style.overflow =
        "";

}







function setupLeaderModal(){


    const modal =
        document.querySelector(
            "#leader-modal"
        );


    const closeButton =
        document.querySelector(
            "#leader-modal-close"
        );



    if(!modal){

        return;

    }




    closeButton.addEventListener(

        "click",

        closeLeaderModal

    );





    modal.addEventListener(

        "click",

        (event)=>{


            if(
                event.target === modal
            ){

                closeLeaderModal();

            }


        }

    );


}







/*
----------------------------------------
Schedule Modal
(過去のスケジュールをまとめて表示)
----------------------------------------
*/


function openScheduleModal(pastItems){


    const modal =
        document.querySelector(
            "#schedule-modal"
        );


    if(!modal){

        return;

    }



    const list =
        modal.querySelector(
            "#schedule-modal-list"
        );


    list.innerHTML = "";



    pastItems.forEach(
        (item) => {


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



            list.appendChild(
                div
            );


        }
    );




    modal.classList.add(
        "is-open"
    );


    document.body.style.overflow =
        "hidden";


}







function closeScheduleModal(){


    const modal =
        document.querySelector(
            "#schedule-modal"
        );


    if(!modal){

        return;

    }


    modal.classList.remove(
        "is-open"
    );


    document.body.style.overflow =
        "";

}







function setupScheduleModal(){


    const modal =
        document.querySelector(
            "#schedule-modal"
        );


    const closeButton =
        document.querySelector(
            "#schedule-modal-close"
        );



    if(!modal){

        return;

    }




    closeButton.addEventListener(

        "click",

        closeScheduleModal

    );





    modal.addEventListener(

        "click",

        (event)=>{


            if(
                event.target === modal
            ){

                closeScheduleModal();

            }


        }

    );


}
