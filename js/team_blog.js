document.addEventListener("DOMContentLoaded", () => {
    loadTeamBlog();
});

async function loadTeamBlog(){
    const currentBox = document.querySelector("#blog-current");
    const postsBox = document.querySelector("#blog-posts");
    if(!currentBox || !postsBox){ return; }

    try{
        const response = await fetch(
            `data/blog_${TEAM_SLUG}.json`,
            { cache: "no-store" }
        );
        const data = await response.json();
        displayBlogCurrent(data.current, currentBox);
        displayBlogPosts(data.posts || [], postsBox);
    }catch(error){
        console.error("Team blog loading error:", error);
    }
}

function displayBlogCurrent(current, box){
    if(!current || !current.image){
        box.style.display = "none";
        return;
    }
    box.innerHTML = `
        <h3 class="blog__subtitle">現在の状況</h3>
        <img class="blog-current__image" src="${current.image}" alt="現在の状況">
        ${current.caption ? `<p class="blog-current__caption">${current.caption}</p>` : ""}
    `;
}

function parseBlogDate(dateStr){
    const [y, m, d] = dateStr.split(".").map(Number);
    return new Date(y, m - 1, d);
}

function displayBlogPosts(posts, box){
    if(posts.length === 0){
        box.innerHTML = `<p class="news__empty">まだ投稿はありません。</p>`;
        return;
    }
    [...posts]
        .sort((a, b) => parseBlogDate(b.date) - parseBlogDate(a.date))
        .forEach((post) => {
            const article = document.createElement("article");
            article.className = "blog-post";
            article.innerHTML = `
                <time>${post.date}</time>
                <h3>${post.title}</h3>
            `;
            article.addEventListener("click", () => {
                openBlogPost(post);
            });
            box.appendChild(article);
        });
}

function openBlogPost(post){
    const images = (post.images || [])
        .map((src) => `<img class="blog-modal__image" src="${src}" alt="">`)
        .join("");
    const text = (post.text || "").replace(/\n/g, "<br>");

    openNewsModal({
        category: "看板製作日記",
        title: post.title,
        date: post.date,
        content: text + "<br><br>" + images
    });
}