const hero = document.getElementById("hero");
const images = [
    "assets/img/banner/DeLapis.jpg",
    "assets/img/banner/TheRG.jpg",
    "assets/img/banner/BK.jpg",
    "assets/img/banner/BNV.jpg",
    "assets/img/banner/Modiz.jpg",
    "assets/img/banner/MM.jpg",
    "assets/img/banner/WH.jpg",
    "assets/img/banner/LSWH.jpg",
    "assets/img/banner/Proud.jpg"
    ];

    let index = 0;

    function changeHeroImage() {
        hero.style.backgroundImage = `url('${images[index]}')`;
        index = (index + 1) % images.length;
    }

    // เริ่มต้น
    changeHeroImage();

    // เปลี่ยนทุก 10 วินาที
    setInterval(changeHeroImage, 5000);