/*
========================================

Hero Slideshow

教育学部祭 いちにかい企画
Ver.2

========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {


        setupSlideshow();


    }
);







function setupSlideshow(){


    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    if(!heroImage){

        return;

    }





    const images = [


        "images/hero/hero01.jpg",

        "images/hero/hero02.jpg",

        "images/hero/hero03.jpg"


    ];



    let currentIndex = 0;





    setInterval(
        () => {


            currentIndex++;


            if(
                currentIndex >= images.length
            ){

                currentIndex = 0;

            }




            heroImage.style.opacity = 0;



            setTimeout(
                () => {


                    heroImage.src =
                        images[currentIndex];


                    heroImage.style.opacity = 1;


                },

                800

            );


        },

        6000

    );


}