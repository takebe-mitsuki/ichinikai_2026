/*
========================================

News List Page

教育学部祭 いちにかい企画
Ver.2

========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {


        loadAllNews();


    }
);







async function loadAllNews(){


    const container =
        document.querySelector(
            "#news-list-all"
        );


    if(!container){

        return;

    }



    try{


        const response =
            await fetch(
                "data/news.json"
            );


        const newsData =
            await response.json();



        const category =
            getCategoryParam();



        const targetData =
            category
                ? newsData.filter(
                    (news) => {

                        return (
                            news.category === category ||
                            news.category === "全体"
                        );

                    }
                )
                : newsData;



        const sortedNews =
            sortNewsByDateDesc(
                targetData
            );



        updateNewsPageHeading(
            category
        );



        displayAllNews(
            sortedNews,
            container
        );


    }catch(error){


        console.error(
            "News list loading error:",
            error
        );


    }

}







/*
URLの ?category=肉じゃが を読み取る。
班ページの「もっと見る」から
遷移してきた場合に絞り込むための仕組み。
*/


function getCategoryParam(){


    const params =
        new URLSearchParams(
            window.location.search
        );


    return params.get(
        "category"
    );


}







/*
班ごとの絞り込み表示のときは、
見出しを「◯◯のお知らせ」に変え、
戻るリンクは元のページに
history.back()で戻す。
*/


function updateNewsPageHeading(category){


    if(!category){

        return;

    }



    const heading =
        document.querySelector(
            "#news-page-heading"
        );


    if(heading){

        heading.textContent =
            `${category}のお知らせ`;

    }



    const backLink =
        document.querySelector(
            "#news-page-back"
        );


    if(backLink){


        backLink.textContent =
            "← 戻る";


        backLink.addEventListener(

            "click",

            (event) => {


                event.preventDefault();


                history.back();


            }

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







function displayAllNews(
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
