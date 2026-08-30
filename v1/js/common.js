/* =========================================
   common.js
   Common JavaScript
========================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /*
            Scroll Animation
        */

        const targets =
            document.querySelectorAll(
                ".section, .card, .leader-card, .team-card, .news-card"
            );


        targets.forEach(
            (target) => {

                target.classList.add(
                    "fade-in"
                );

            }
        );



        const observer =
            new IntersectionObserver(
                (entries) => {


                    entries.forEach(
                        (entry) => {


                            if(entry.isIntersecting){


                                entry.target.classList.add(
                                    "active"
                                );


                                observer.unobserve(
                                    entry.target
                                );


                            }


                        }
                    );


                },
                {
                    threshold:
                        0.15
                }

            );



        targets.forEach(
            (target)=>{

                observer.observe(
                    target
                );

            }
        );



        /*
            Smooth Scroll
            ナビゲーション移動
        */


        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                (link)=>{


                    link.addEventListener(
                        "click",
                        (e)=>{


                            e.preventDefault();


                            const target =
                                document.querySelector(
                                    link.getAttribute("href")
                                );


                            if(target){


                                target.scrollIntoView(
                                    {
                                        behavior:
                                            "smooth"
                                    }
                                );


                            }


                        }
                    );


                }
            );



    }
);