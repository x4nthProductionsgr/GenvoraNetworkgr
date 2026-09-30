/* =========================================================
   GENVORA NETWORK
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   SETTINGS
   ========================================================= */

const HOME_PAGE = "home.html";
const VERIFY_PAGE = "index.html";


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    handleVerification();

    setupVerifyButton();

    setupDiscordButtons();

    setupPageLinks();

});


/* =========================================================
   VERIFICATION SYSTEM
   ========================================================= */

function isVerified() {
    return localStorage.getItem("genvoraVerified") === "true";
}


function handleVerification() {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";


    /*
     * If user is already verified and opens the Verify page,
     * send them directly to Home.
     */

    if (currentPage === VERIFY_PAGE && isVerified()) {

        window.location.replace(HOME_PAGE);

        return;
    }


    /*
     * Protect the main website pages.
     */

    const protectedPages = [
        "home.html",
        "about.html",
        "store.html"
    ];


    if (
        protectedPages.includes(currentPage) &&
        !isVerified()
    ) {

        window.location.replace(VERIFY_PAGE);

        return;
    }
}


/* =========================================================
   VERIFY BUTTON
   ========================================================= */

function setupVerifyButton() {

    const verifyButton =
        document.getElementById("verifyButton");


    if (!verifyButton) {
        return;
    }


    verifyButton.addEventListener("click", () => {

        verifyButton.disabled = true;

        verifyButton.textContent = "VERIFYING...";


        /*
         * Small delay so the button feels like
         * an actual verification process.
         */

        setTimeout(() => {

            localStorage.setItem(
                "genvoraVerified",
                "true"
            );


            verifyButton.textContent = "VERIFIED";


            /*
             * Redirect to Home.
             */

            setTimeout(() => {

                window.location.href = HOME_PAGE;

            }, 500);

        }, 700);

    });

}


/* =========================================================
   DISCORD BUTTONS
   ========================================================= */

function setupDiscordButtons() {

    const discordButtons =
        document.querySelectorAll(
            ".discord-button, .secondary-button"
        );


    discordButtons.forEach(button => {

        button.addEventListener("click", event => {

            /*
             * Discord invite will be added here later.
             *
             * Example:
             *
             * window.open(
             *     "https://discord.gg/YOURINVITE",
             *     "_blank"
             * );
             */

            event.preventDefault();

            alert(
                "The Genvora Network Discord link will be available soon."
            );

        });

    });

}


/* =========================================================
   PAGE LINKS
   ========================================================= */

function setupPageLinks() {

    const links =
        document.querySelectorAll(
            'a[href$=".html"]'
        );


    links.forEach(link => {

        link.addEventListener("click", event => {

            const destination =
                link.getAttribute("href");


            /*
             * Don't interfere with the current page.
             */

            if (!destination) {
                return;
            }


            /*
             * Don't interfere with external links.
             */

            if (
                destination.startsWith("http://") ||
                destination.startsWith("https://")
            ) {
                return;
            }


            /*
             * Don't interfere with target="_blank".
             */

            if (link.target === "_blank") {
                return;
            }


            event.preventDefault();


            /*
             * Small fade-out transition.
             */

            document.body.style.opacity = "0";


            setTimeout(() => {

                window.location.href = destination;

            }, 180);

        });

    });

}


/* =========================================================
   PAGE FADE IN
   ========================================================= */

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});


/* =========================================================
   BROWSER BACK/FORWARD SUPPORT
   ========================================================= */

window.addEventListener("pageshow", event => {

    if (event.persisted) {

        document.body.style.opacity = "1";

    }

});
