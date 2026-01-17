const titleEl = document.getElementById("productTitle");
const detailEl = document.getElementById("productDetail");
const mainImage = document.getElementById("mainImage");
const thumbs = document.getElementById("thumbs");

const prevBtn = document.querySelector(".nav.prev");
const nextBtn = document.querySelector(".nav.next");

let currentIndex = 0;
let images = [];

// อ่าน id จาก URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// โหลดข้อมูล
fetch("assets/data/products.json")
    .then(res => res.json())
    .then(products => {
        const product = products.find(p => p.id === productId);

        if (!product) {
            window.location.href = "products.html";
            return;
        }

        // แสดงข้อมูล
        titleEl.textContent = product.title;
        detailEl.innerHTML = product.detail;

        images = product.images;
        currentIndex = 0;
        mainImage.src = images[currentIndex];
        updateActiveThumb(currentIndex);

        // thumbnails
        thumbs.innerHTML = "";
        images.forEach((img, index) => {
            const t = document.createElement("img");
            t.src = img;

            t.onclick = () => {
                currentIndex = index;
                mainImage.src = images[currentIndex];
                updateActiveThumb(currentIndex);
            };

            thumbs.appendChild(t);
        });

    });

// ลูกศรซ้าย
prevBtn.onclick = () => {
    if (!images.length) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    mainImage.src = images[currentIndex];
    updateActiveThumb(currentIndex);
};

// ลูกศรขวา
nextBtn.onclick = () => {
    if (!images.length) return;
    currentIndex = (currentIndex + 1) % images.length;
    mainImage.src = images[currentIndex];
    updateActiveThumb(currentIndex);
};

function updateActiveThumb(index) {
    const thumbsImg = thumbs.querySelectorAll("img");

    thumbsImg.forEach((img, i) => {
        img.classList.toggle("active", i === index);
    });

    // เลื่อน thumbnail ให้เห็นรูปที่ active
    thumbsImg[index]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
    });
}
