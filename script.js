/* =====================================================
   Wedding Invitation
   Mohamed & Samah
===================================================== */


/* =====================================================
   1. MUSIC
===================================================== */

const weddingMusic = document.getElementById("weddingMusic");

if (weddingMusic) {

    weddingMusic.volume = 0.7;

    // محاولة التشغيل التلقائي
    const playMusic = () => {

        weddingMusic.play().catch(() => {
            // بعض المتصفحات تمنع التشغيل التلقائي
            // وسيتم تشغيلها بعد أول تفاعل من المستخدم
        });

    };

    playMusic();


    // تشغيل الأغنية عند أول تفاعل
    const startMusicAfterInteraction = () => {

        weddingMusic.play().catch(() => {});

        document.removeEventListener(
            "click",
            startMusicAfterInteraction
        );

        document.removeEventListener(
            "touchstart",
            startMusicAfterInteraction
        );

    };

    document.addEventListener(
        "click",
        startMusicAfterInteraction,
        { once: true }
    );

    document.addEventListener(
        "touchstart",
        startMusicAfterInteraction,
        { once: true }
    );

}


/* =====================================================
   2. COUNTDOWN
===================================================== */

// موعد الفرح
const weddingDate = new Date(
    "September 22, 2026 21:00:00"
).getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = weddingDate - now;


    // لو الموعد انتهى
    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (difference %
            (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
    );


    const minutes = Math.floor(
        (difference %
            (1000 * 60 * 60))
        /
        (1000 * 60)
    );


    const seconds = Math.floor(
        (difference %
            (1000 * 60))
        /
        1000
    );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


// تشغيل العداد فورًا
updateCountdown();


// تحديث كل ثانية
setInterval(
    updateCountdown,
    1000
);


/* =====================================================
   3. SCROLL REVEAL
===================================================== */

const revealSections =
    document.querySelectorAll(".section-reveal");


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealSections.forEach((section) => {

    revealObserver.observe(section);

});


/* =====================================================
   4. RSVP BUTTON
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
   5. HEARTS + FLOWERS EXPLOSION
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
        "✦",
        "✨"
    ];


    // عدد العناصر
    const numberOfItems = 70;


    for (
        let i = 0;
        i < numberOfItems;
        i++
    ) {

        const item =
            document.createElement("div");


        item.className =
            "celebration-item";


        // اختيار رمز عشوائي
        item.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        // نقطة بداية قريبة من الزر
        const startX =
            35 +
            Math.random() * 30;


        const startY =
            55 +
            Math.random() * 10;


        item.style.left =
            startX + "%";


        item.style.top =
            startY + "%";


        // اتجاه الانفجار
        const x =
            (Math.random() * 700) - 350;


        const y =
            (Math.random() * 600) - 400;


        item.style.setProperty(
            "--x",
            `${x}px`
        );


        item.style.setProperty(
            "--y",
            `${y}px`
        );


        // أحجام مختلفة
        const size =
            18 +
            Math.random() * 28;


        item.style.fontSize =
            `${size}px`;


        // تأخير بسيط
        item.style.animationDelay =
            `${Math.random() * 0.25}s`;


        celebrationContainer.appendChild(
            item
        );


        // حذف العنصر بعد انتهاء الحركة
        setTimeout(() => {

            item.remove();

        }, 2300);

    }

}


/* =====================================================
   6. OPEN MODAL
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
   7. CLOSE MODAL
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
   8. ATTENDANCE BUTTON ACTION
===================================================== */

if (attendanceButton) {

    attendanceButton.addEventListener(
        "click",
        () => {

            // تشغيل الموسيقى لو المتصفح منعها
            if (weddingMusic) {

                weddingMusic.play().catch(
                    () => {}
                );

            }


            // انفجار القلوب والورود
            createCelebration();


            // ننتظر لحظة قبل ظهور الصندوق
            setTimeout(() => {

                openAttendanceModal();

            }, 1200);

        }
    );

}


/* =====================================================
   9. CLOSE BUTTON
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
   10. CLICK OUTSIDE MODAL
===================================================== */

if (attendanceModal) {

    attendanceModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target.classList.contains(
                    "modal-overlay"
                )
            ) {

                closeAttendanceModal();

            }

        }
    );

}


/* =====================================================
   11. ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeAttendanceModal();

        }

    }
);


/* =====================================================
   12. SMOOTH SCROLL
===================================================== */

document.documentElement.style.scrollBehavior =
    "smooth";


/* =====================================================
   13. PREVENT BROKEN IMAGE LOOK
===================================================== */

const weddingImage =
    document.querySelector(
        ".photo-frame img"
    );


if (weddingImage) {

    weddingImage.addEventListener(
        "error",
        () => {

            weddingImage.style.display =
                "none";

        }
    );

}


/* =====================================================
   END
===================================================== */
