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
                "data/news.json",
                { cache: "no-store" }
            );



        const newsData =
            await response.json();



        const sortedNews =
            sortNewsByDateDesc(
                newsData
            );



        displayNews(
            sortedNews.slice(0, 5),
            newsList
        );



    }catch(error){


        console.error(

            "News loading error:",
            error

        );


    }


}







/*
日付("2026.10.01"のような形式)を
新しい順に並び替える。
月・日が1桁の場合でも
正しく並ぶように、
文字列のまま比較せず
Dateに変換してから比較する。
*/


function sortNewsByDateDesc(newsData){


    return [...newsData].sort(

        (a, b) => {


            return (

                parseNewsDate(b.date) -
                parseNewsDate(a.date)

            );


        }

    );


}







function parseNewsDate(dateStr){


    const [year, month, day] =
        dateStr
            .split(".")
            .map(Number);


    return new Date(
        year,
        month - 1,
        day
    );


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


    openNewsModal(news);


}
