fetch("footer.html")
    .then(response => response.text())
    .then(html => document.getElementById("footer").innerHTML = html);

fetch("header.html")
    .then(response => response.text())
    .then(html => {
        document.getElementById("header").innerHTML = html;
        document.querySelector('h1').textContent = document.title;
    });