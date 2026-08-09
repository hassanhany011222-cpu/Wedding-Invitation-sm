/* =====================================================
   WEDDING INVITATION
   MOHAMED & SAMAH
===================================================== */


/* =====================================================
   MUSIC
===================================================== */

const weddingMusic =
    document.getElementById("weddingMusic");


let musicStarted = false;


function startWeddingMusic() {

    if (!weddingMusic) {
        return;
    }


    if (musicStarted) {
        return;
    }


    weddingMusic.volume = 0.7;

    weddingMusic.loop = true;


    const playPromise =
        weddingMusic.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicStarted = true;

                console.log(
                    "Wedding music started"
                );

            })
            .catch(() => {

                console.log(
                    "Browser blocked autoplay"
                );

            });

    }

}


/*
    محاولة التشغيل مباشرة
*/

startWeddingMusic();



/*
    تشغيل الأغنية عند أول
    تفاعل مع الصفحة.

    لا نجعل زر تأكيد الحضور
    هو المسؤول عن تشغيلها.
*/

function musicInteraction(event) {

    if (
        event.target &&
        event.target.closest &&
        event.target.closest(
            "#attendanceButton"
        )
    ) {

        return;

    }


    startWeddingMusic();

}


document.addEventListener(
    "click",
    musicInteraction,
    {
        once: true
    }
);


document.addEventListener(
    "touchstart",
    musicInteraction,
    {
        once: true,
        passive: true
    }
);


window.addEventListener(
    "scroll",
    function() {

        startWeddingMusic();

    },
    {
        once: true,
        passive: true
    }
);



/* =====================================================
   COUNTDOWN
===================================================== */


/*
    تاريخ الفرح:

    الثلاثاء
    22 سبتمبر 2026
    الساعة 9 مساءً
*/


const weddingDate =
    new Date(
        "September 22, 2026 21:00:00"
    ).getTime();



function updateCountdown() {

    const now =
        new Date().getTime();


    const difference =
        weddingDate - now;


    if (difference <= 0) {

        document.getElementById(
            "days"
        ).textContent = "00";


        document.getElementById(
            "hours"
        ).textContent = "00";


        document.getElementById(
            "minutes"
        ).textContent = "00";


        document.getElementById(
            "seconds"
        ).textContent = "00";


        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                difference %
                (1000 * 60)
            ) /
            1000
        );


    document.getElementById(
        "days"
    ).textContent =
        String(days).padStart(2,"0");


    document.getElementById(
        "hours"
    ).textContent =
        String(hours).padStart(2,"0");


    document.getElementById(
        "minutes"
    ).textContent =
        String(minutes).padStart(2,"0");


    document.getElementById(
        "seconds"
    ).textContent =
        String(seconds).padStart(2,"0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(
                function(entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(
    function(element) {

        revealObserver.observe(
            element
        );

    }
);



/* =====================================================
   RSVP
===================================================== */

const attendanceButton =
    document.getElementById(
        "attendanceButton"
    );


const celebrationContainer =
    document.getElementById(
        "celebration-container"
    );


const attendanceModal =
    document.getElementById(
        "attendanceModal"
    );


const closeModal =
    document.getElementById(
        "closeModal"
    );


const modalCloseButton =
    document.getElementById(
        "modalCloseButton"
    );



/* =====================================================
   CELEBRATION
===================================================== */

function createCelebration() {

    if (!celebrationContainer) {
        return;
    }


    const symbols = [

        "♥",
        "♡",
        "💜",
        "🤎",
        "🌸",
        "🌹",
        "🌷",
        "✦",
        "✨"

    ];


    const numberOfItems = 75;


    for (
        let i = 0;
        i < numberOfItems;
        i++
    ) {


        const item =
            document.createElement(
                "div"
            );


        item.className =
            "celebration-item";


        item.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        /*
            نقطة البداية
        */

        const startX =
            30 +
            Math.random() * 40;


        const startY =
            48 +
            Math.random() * 12;


        item.style.left =
            startX + "%";


        item.style.top =
            startY + "%";


        /*
            اتجاه الانفجار
        */

        const x =
            Math.random() *
            700 -
            350;


        const y =
            Math.random() *
            650 -
            400;


        item.style.setProperty(
            "--x",
            `${x}px`
        );


        item.style.setProperty(
            "--y",
            `${y}px`
        );


        /*
            حجم العنصر
        */

        const size =
            16 +
            Math.random() * 25;


        item.style.fontSize =
            `${size}px`;


        /*
            تأخير بسيط
        */

        item.style.animationDelay =
            `${Math.random() * 0.2}s`;


        celebrationContainer.appendChild(
            item
        );


        setTimeout(
            function() {

                item.remove();

            },
            2400
        );

    }

}



/* =====================================================
   OPEN MODAL
===================================================== */

function openAttendanceModal() {

    if (!attendanceModal) {
        return;
    }


    attendanceModal.classList.add(
        "show"
    );


    attendanceModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}



/* =====================================================
   CLOSE MODAL
===================================================== */

function closeAttendanceModal() {

    if (!attendanceModal) {
        return;
    }


    attendanceModal.classList.remove(
        "show"
    );


    attendanceModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}



/* =====================================================
   ATTENDANCE BUTTON
===================================================== */

if (attendanceButton) {

    attendanceButton.addEventListener(
        "click",
        function() {


            /*
                لا نشغل الأغنية هنا.

                عند الضغط:
                1 - انفجار قلوب وورود
                2 - انتظار
                3 - ظهور الصندوق
            */


            createCelebration();


            setTimeout(
                function() {

                    openAttendanceModal();

                },
                1200
            );

        }
    );

}



/* =====================================================
   CLOSE MODAL
===================================================== */

if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeAttendanceModal
    );

}


if (modalCloseButton) {

    modalCloseButton.addEventListener(
        "click",
        closeAttendanceModal
    );

}



/* =====================================================
   CLICK OUTSIDE
===================================================== */

if (attendanceModal) {

    attendanceModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                attendanceModal
            ) {

                closeAttendanceModal();

            }

        }
    );

}



/* =====================================================
   ESC
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeAttendanceModal();

        }

    }
);



/* =====================================================
   IMAGE CHECK
===================================================== */

const mainImage =
    document.querySelector(
        ".photo-frame img"
    );


if (mainImage) {

    mainImage.addEventListener(
        "error",
        function() {

            console.log(
                "her-photo.jpg not found"
            );

        }
    );

}


/* =====================================================
   END
===================================================== */
