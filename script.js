/* =====================================================
   1. MUSIC
===================================================== */

const music = document.getElementById("weddingMusic");

if (music) {

    music.loop = true;
    music.volume = 0.7;

    let musicStarted = false;

    function playMusic() {

        if (musicStarted) {
            return;
        }

        const promise = music.play();

        if (promise !== undefined) {

            promise.then(() => {

                musicStarted = true;

                console.log("Music started successfully");

            }).catch((error) => {

                console.log(
                    "Autoplay blocked:",
                    error
                );

            });

        }

    }


    /* محاولة التشغيل عند فتح الصفحة */

    window.addEventListener(
        "load",
        playMusic
    );


    /* أول تفاعل حقيقي مع الشاشة */

    document.addEventListener(
        "pointerdown",
        playMusic,
        {
            once: true,
            passive: true
        }
    );

}
