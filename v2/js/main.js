/*
========================================

Main JavaScript

教育学部祭 いちにかい企画
Ver.2

========================================
*/


/*
----------------------------------------
DOM Loaded
----------------------------------------
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {


        console.log(
            "いちにかい企画サイト loaded"
        );


        initializeSite();


    }
);





/*
----------------------------------------
Initialize
----------------------------------------
*/


function initializeSite(){


    setupHeader();


}







/*
----------------------------------------
Header
----------------------------------------
*/


function setupHeader(){


    const header =
        document.querySelector(
            ".header"
        );


    if(!header){

        return;

    }



    window.addEventListener(
        "scroll",
        () => {


            if(window.scrollY > 80){


                header.classList.add(
                    "header--scrolled"
                );


            }else{


                header.classList.remove(
                    "header--scrolled"
                );


            }


        }

    );


}