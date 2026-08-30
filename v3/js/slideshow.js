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







async function setupSlideshow(){


    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    if(!heroImage){

        return;

    }



    try{


        const response =
            await fetch(
                "data/hero.json"
            );


        const images =
            await response.json();



        if(!images.length){

            return;

        }




        shuffleArray(
            images
        );




        let currentIndex = 0;



        /*
        JSONの1枚目を初期表示にする
        (HTML側に書かれた初期画像と
        ズレないようにするため)
        */

        heroImage.src =
            images[currentIndex];



        if(images.length === 1){

            return;

        }




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

            3000

        );


    }catch(error){


        console.error(
            "Hero slideshow loading error:",
            error
        );


    }

}







/*
配列の中身をランダムな順番に
並び替える(Fisher-Yatesアルゴリズム)。
ページを開くたびに写真の順番が変わる。
*/


function shuffleArray(array){


    for(
        let i = array.length - 1;
        i > 0;
        i--
    ){


        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [array[i], array[j]] =
            [array[j], array[i]];


    }


}
