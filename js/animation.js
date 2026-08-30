/*
========================================

Scroll Animation

教育学部祭 いちにかい企画
Ver.2

========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {


        setupScrollAnimation();


    }
);







function setupScrollAnimation(){


    const targets = document.querySelectorAll(

        ".section__heading, " +
        ".news-card, " +
        ".about-item, " +
        ".schedule-item, " +
        ".leader-card, " +
        ".team-card, " +
        ".recipe-card"

    );



    if(!targets.length){

        return;

    }






    const observer = new IntersectionObserver(

        (entries) => {


            entries.forEach(

                (entry) => {


                    if(entry.isIntersecting){


                        entry.target.classList.add(

                            "is-visible"

                        );


                        observer.unobserve(

                            entry.target

                        );


                    }


                }

            );


        },


        {

            threshold: 0.15

        }


    );





    targets.forEach(

        (target)=>{


            target.classList.add(

                "fade-up"

            );


            observer.observe(

                target

            );


        }

    );


}
