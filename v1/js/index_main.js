/* =========================================
   index_main.js
   Main Page JavaScript
========================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        loadNews();



    }
);





/* =========================================
   News Loading
========================================= */


async function loadNews(){


    const newsContainer =
        document.querySelector(
            ".news-container"
        );


    if(!newsContainer){
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
            newsData
        );



    }
    catch(error){


        console.error(
            "ニュース読み込みエラー:",
            error
        );


    }



}







/* =========================================
   News Display
========================================= */


function displayNews(
    newsList
){


    const container =
        document.querySelector(
            ".news-container"
        );



    container.innerHTML = "";



    newsList
        .slice(0,3)
        .forEach(
            (news)=>{


                const article =
                    document.createElement(
                        "article"
                    );


                article.className =
                    "news-card";



                article.innerHTML = `

                    <div class="news-meta">

                        <time>
                            ${news.date}
                        </time>


                        <span class="category">
                            ${news.category}
                        </span>


                    </div>


                    <h3>
                        ${news.title}
                    </h3>


                    <p>
                        詳細を見る
                    </p>


                `;



                article.addEventListener(
                    "click",
                    ()=>{


                        openNewsDetail(
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







/* =========================================
   News Detail
========================================= */


function openNewsDetail(
    news
){


    alert(
        `
${news.title}

${news.content}
        `
    );


}