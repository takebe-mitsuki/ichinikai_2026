/*
========================================

Team Recipe System

教育学部祭 いちにかい企画
Ver.2

========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadTeamRecipe();

    }
);







async function loadTeamRecipe(){


    const container =
        document.querySelector(
            "#recipe-list"
        );


    if(!container){

        return;

    }



    try{


        const response =
            await fetch(
                `data/recipe_${TEAM_SLUG}.json`,
                { cache: "no-store" }
            );


        const recipes =
            await response.json();



        displayTeamRecipe(
            recipes,
            container
        );


    }catch(error){


        console.error(
            "Team recipe loading error:",
            error
        );


    }

}







function displayTeamRecipe(
    recipes,
    container
){


    recipes.forEach(
        (recipe)=>{


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "recipe-card";



            const personHTML =
                recipe.person_image
                    ? `<img class="recipe-card__person" src="${recipe.person_image}" alt="">`
                    : "";



            const ingredientsHTML =
                (recipe.ingredients || [])
                    .map(
                        (item) => `

                            <li>

                                <span class="recipe-card__ingredient-name">
                                    ${item.name}
                                </span>

                                <span class="recipe-card__ingredient-amount">
                                    ${item.amount}
                                </span>

                            </li>

                        `
                    )
                    .join("");



            const stepsHTML =
                (recipe.steps || [])
                    .map(
                        (item) => `<li>${item}</li>`
                    )
                    .join("");



            card.innerHTML = `

                <img
                    src="${recipe.image}"
                    alt="${recipe.name}"
                >


                <div class="recipe-card__body">

                    <h3 class="recipe-card__name">

                        ${recipe.name}

                    </h3>


                    <h4 class="recipe-card__section-title">

                        材料

                    </h4>


                    <ul class="recipe-card__ingredients">

                        ${ingredientsHTML}

                    </ul>


                    <h4 class="recipe-card__section-title">

                        工程

                    </h4>


                    <ol class="recipe-card__steps">

                        ${stepsHTML}

                    </ol>

                </div>


                ${personHTML}

            `;



            container.appendChild(
                card
            );


        }
    );

}
