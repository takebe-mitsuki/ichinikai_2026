/*
========================================

Team News System
(その班のカテゴリ + 全体のお知らせだけを表示)

教育学部祭 いちにかい企画
Ver.2

========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadTeamNews();

    }
);







async function loadTeamNews(){


    const container =
        document.querySelector(
            "#news-list"
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



        const filtered =
            newsData.filter(
                (news) => {

                    return (
                        news.category === TEAM_CATEGORY ||
                        news.category === "全体"
                    );

                }
            );



        const sorted =
            [...filtered].sort(

                (a, b) => {

                    return (
                        parseNewsDate(b.date) -
                        parseNewsDate(a.date)
                    );

                }

            );



        displayTeamNews(
            sorted.slice(0, 3),
            container
        );


    }catch(error){


        console.error(
            "Team news loading error:",
            error
        );


    }

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







function displayTeamNews(
    newsData,
    container
){


    if(newsData.length === 0){


        container.innerHTML =
            `<p class="news__empty">現在、お知らせはありません。</p>`;


        return;

    }



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
