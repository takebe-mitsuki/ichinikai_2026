/*
========================================

News System

教育学部祭 いちにかい企画
Ver.2

========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {


        loadNews();


    }
);







async function loadNews(){


    const newsList =
        document.querySelector(
            "#news-list"
        );


    if(!newsList){

        return;

    }



    try{


        const response =
            await fetch(
                "data/news.json"
            );



        const newsData =
            await response.json();




        displayNews(
            newsData,
            newsList
        );



    }catch(error){


        console.error(

            "News loading error:",
            error

        );


    }


}







function displayNews(
    newsData,
    container
){



    newsData.forEach(

        (news)=>{


            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "news-card";



            article.innerHTML = `


                <time>

                    ${news.date}

                </time>


                <span class="news-card__category">

                    ${news.category}

                </span>



                <h3>

                    ${news.title}

                </h3>


            `;



            article.addEventListener(

                "click",

                ()=>{


                    showNewsDetail(
                        news
                    );


                }

            );



            container.appendChild(
                article
            );


        }

    );


}







function showNewsDetail(news){


   function showNewsDetail(news){


    openNewsModal(news);


}


}