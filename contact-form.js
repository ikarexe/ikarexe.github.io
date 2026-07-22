// Contact form: simple math captcha + AJAX submit via FormSubmit.co

(function () {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const questionEl = document.getElementById("captcha-question");
    const answerEl = document.getElementById("captcha-answer");
    const statusEl = document.getElementById("contact-status");
    const submitEl = document.getElementById("contact-submit");

    let expected = 0;

    function newCaptcha() {
        const a = 1 + Math.floor(Math.random() * 9);
        const b = 1 + Math.floor(Math.random() * 9);
        expected = a + b;
        questionEl.textContent = a + " + " + b;
        answerEl.value = "";
    }

    function setStatus(text, ok) {
        statusEl.textContent = text;
        statusEl.className = ok ? "status-ok" : "status-error";
    }

    newCaptcha();

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (parseInt(answerEl.value, 10) !== expected) {
            setStatus("Wrong answer, try again.", false);
            newCaptcha();
            answerEl.focus();
            return;
        }

        const data = new FormData(form);
        data.delete("_captcha"); // meaningful only for the non-AJAX endpoint

        submitEl.disabled = true;
        setStatus("Sending…", true);

        try {
            const response = await fetch("https://formsubmit.co/ajax/ae6775d4f2906c58be8596d3fe429d89", {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: data
            });
            if (!response.ok) throw new Error("HTTP " + response.status);
            form.reset();
            setStatus("Message sent. Thank you!", true);
        } catch (error) {
            setStatus("Could not send the message. Please email me directly.", false);
        } finally {
            submitEl.disabled = false;
            newCaptcha();
        }
    });
})();
