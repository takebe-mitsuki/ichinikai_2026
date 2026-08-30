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


    setupTeamSwitcher();


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



    setupHeaderMenu();


}







/*
----------------------------------------
Header Menu (Mobile)
----------------------------------------
*/


function setupHeaderMenu(){


    const toggleButton =
        document.querySelector(
            "#header-toggle"
        );


    const menu =
        document.querySelector(
            "#header-menu"
        );


    if(!toggleButton || !menu){

        return;

    }



    toggleButton.addEventListener(

        "click",

        () => {


            const isOpen =
                menu.classList.toggle(
                    "is-open"
                );


            toggleButton.classList.toggle(
                "is-open",
                isOpen
            );


            toggleButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );


        }

    );



    menu.querySelectorAll("a").forEach(

        (link) => {


            link.addEventListener(

                "click",

                () => {


                    menu.classList.remove(
                        "is-open"
                    );


                    toggleButton.classList.remove(
                        "is-open"
                    );


                    toggleButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                }

            );


        }

    );


}







/*
----------------------------------------
Team Switcher
(班ページ上部の「他の班」メニュー)
----------------------------------------
*/


function setupTeamSwitcher(){


    const toggleButton =
        document.querySelector(
            "#team-switcher-toggle"
        );


    const menu =
        document.querySelector(
            "#team-switcher-menu"
        );


    if(!toggleButton || !menu){

        return;

    }



    toggleButton.addEventListener(

        "click",

        (event) => {


            event.stopPropagation();


            const isOpen =
                menu.classList.toggle(
                    "is-open"
                );


            toggleButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );


        }

    );



    document.addEventListener(

        "click",

        (event) => {


            if(

                !toggleButton.contains(event.target) &&
                !menu.contains(event.target)

            ){


                menu.classList.remove(
                    "is-open"
                );


                toggleButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


            }


        }

    );


}
