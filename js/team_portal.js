document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("[data-page]").forEach((tile) => {

        const page = tile.dataset.page;

        tile.href = `team.html?team=${TEAM_SLUG}&page=${page}`;

        const img = tile.querySelector(".portal-tile__image");

                if(img){

            const exts = ["jpg", "png", "jpeg", "webp"];

            let n = 0;

            img.addEventListener("error", () => {

                n++;

                if(n < exts.length){

                    img.src =
                        `images/portal/${TEAM_SLUG}_${page}.${exts[n]}`;

                }else{

                    img.remove();
                    tile.classList.add("portal-tile--noimage");

                }

            });

            img.src =
                `images/portal/${TEAM_SLUG}_${page}.${exts[0]}`;

        }

    });

});