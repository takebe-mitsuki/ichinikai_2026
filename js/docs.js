(function(){

    const root = document.querySelector("#docs");
    const fab = document.querySelector("#docs-fab");

    if(!root || !fab){ return; }

    const $ = (selector) => root.querySelector(selector);

    const screens = {
        notice: $("#docs-notice"),
        pass: $("#docs-pass"),
        select: $("#docs-select"),
        viewer: $("#docs-viewer")
    };

    const passInput = $("#docs-pass-input");
    const passError = $("#docs-pass-error");
    const scroller = $("#docs-scroller");
    const toc = $("#docs-toc");

    let config = null;
    let current = 0;
    let total = 0;
    let rtl = false;
    let observer = null;

    function show(name){
        Object.keys(screens).forEach((key) => {
            screens[key].hidden = key !== name;
        });
    }

    function openDocs(){
        root.classList.add("is-open");
        document.body.style.overflow = "hidden";
        show("notice");
    }

    function closeDocs(){
        root.classList.remove("is-open");
        document.body.style.overflow = "";
        passInput.value = "";
        passError.hidden = true;
        scroller.innerHTML = "";
        if(observer){ observer.disconnect(); }
    }

    async function loadConfig(){
        if(!config){
            const res = await fetch("data/docs.json", { cache: "no-store" });
            config = await res.json();
        }
        return config;
    }

    async function checkPass(){
        try{
            const conf = await loadConfig();
            if(passInput.value === String(conf.password)){
                passInput.value = "";
                passError.hidden = true;
                buildSelect(conf);
                show("select");
            }else{
                passError.textContent = "パスワードが違います。";
                passError.hidden = false;
                passInput.value = "";
            }
        }catch(error){
            passError.textContent = "読み込みに失敗しました。";
            passError.hidden = false;
        }
    }

    function buildSelect(conf){
        const box = $("#docs-select-list");
        box.innerHTML = "";
        conf.docs.forEach((doc) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "docs__choice";
            btn.textContent = doc.title;
            btn.addEventListener("click", () => { openViewer(doc); });
            box.appendChild(btn);
        });
    }

    function goPage(index, behavior){
        const page = scroller.children[Math.min(Math.max(index, 0), total - 1)];
        if(page){
            page.scrollIntoView({
                behavior: behavior || "smooth",
                inline: "start",
                block: "nearest"
            });
        }
    }

    function openViewer(doc){

        rtl = !!doc.rtl;
        total = doc.count;
        current = 0;

        $("#docs-title").textContent = doc.title;
        $("#docs-counter").textContent = `1 / ${total}`;
        $("#docs-nav").dir = rtl ? "rtl" : "ltr";

        scroller.dir = rtl ? "rtl" : "ltr";
        scroller.innerHTML = "";

        if(observer){ observer.disconnect(); }

        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting){
                    current = Number(entry.target.dataset.i);
                    $("#docs-counter").textContent = `${current + 1} / ${total}`;
                }
            });
        }, { root: scroller, threshold: 0.6 });

        const pad = Math.max(2, String(total).length);

        for(let i = 1; i <= total; i++){

            const page = document.createElement("div");
            page.className = "docs__page";
            page.dataset.i = i - 1;

            const img = document.createElement("img");
            img.src = `${doc.folder}${String(i).padStart(pad, "0")}.${doc.ext || "jpg"}`;
            img.alt = `${i}ページ`;
            img.draggable = false;
            if(i > 2){ img.loading = "lazy"; }

            page.appendChild(img);
            scroller.appendChild(page);
            observer.observe(page);

        }

        toc.innerHTML = "";
        toc.hidden = true;

        const items = doc.toc || [];

        $("#docs-toc-btn").hidden = items.length === 0;

        items.forEach((item) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = item.title;
            btn.addEventListener("click", () => {
                goPage(item.page - 1, "auto");
                toc.hidden = true;
            });
            toc.appendChild(btn);
        });

        show("viewer");

    }

    fab.addEventListener("click", openDocs);

    root.querySelectorAll("[data-docs-close]").forEach((btn) => {
        btn.addEventListener("click", closeDocs);
    });

    root.addEventListener("click", (event) => {
        if(event.target === root){ closeDocs(); }
    });

    $("#docs-agree").addEventListener("click", () => {
        show("pass");
        passInput.focus();
    });

    passInput.addEventListener("input", () => {
        passInput.value = passInput.value.replace(/\D/g, "").slice(0, 4);
        if(passInput.value.length === 4){ checkPass(); }
    });

    $("#docs-back").addEventListener("click", () => { show("select"); });

    $("#docs-toc-btn").addEventListener("click", () => {
        toc.hidden = !toc.hidden;
    });

    $("#docs-prev").addEventListener("click", () => { goPage(current - 1); });
    $("#docs-next").addEventListener("click", () => { goPage(current + 1); });

    scroller.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

    document.addEventListener("keydown", (event) => {

        if(!root.classList.contains("is-open") || screens.viewer.hidden){ return; }

        if(event.key === "Escape"){ closeDocs(); }

        if(event.key === "ArrowRight"){ goPage(current + (rtl ? -1 : 1)); }

        if(event.key === "ArrowLeft"){ goPage(current + (rtl ? 1 : -1)); }

    });

})();