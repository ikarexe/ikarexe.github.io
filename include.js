fetch("footer.html")
    .then(response => response.text())
    .then(html => document.getElementById("footer").innerHTML = html);

fetch("header.html")
    .then(response => response.text())
    .then(html => {
        document.getElementById("header").innerHTML = html;
        document.querySelector('h1').textContent = document.title;

        const page = location.pathname.split("/").pop();
        if (page && page !== "index.html") {
            const crumbs = document.createElement("nav");
            crumbs.className = "breadcrumbs";
            crumbs.setAttribute("aria-label", "Breadcrumb");
            let items = '<a href="index.html">ikar</a>';
            if (document.querySelector(".project-page-icon")) {
                items += '<span aria-hidden="true">/</span><a href="index.html#projects">projects</a>';
            }
            items += '<span aria-hidden="true">/</span><span class="crumb-current"></span>';
            crumbs.innerHTML = items;
            crumbs.querySelector(".crumb-current").textContent = document.title;
            const header = document.querySelector("header");
            header.insertBefore(crumbs, header.querySelector("h1"));
        }
    });