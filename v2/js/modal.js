/*
========================================

News Modal

教育学部祭 いちにかい企画
Ver.2

========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {


        setupModal();


    }
);







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
    ).textContent =
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