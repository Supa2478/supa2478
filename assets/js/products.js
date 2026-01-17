const grid = document.getElementById("productGrid");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDetail = document.getElementById("modalDetail");
const modalImage = document.getElementById("modalImage");
const modalThumbs = document.getElementById("modalThumbs");
const closeModal = document.getElementById("closeModal");

const categoryBtns = document.querySelectorAll(".product-category button");
const filterSidebar = document.getElementById("filterSidebar");
const filterList = document.getElementById("filterList");

let allProducts = [];
let currentCategory = "all";

/* ===============================
   LOAD DATA
================================ */
fetch("assets/data/products.json")
    .then(res => res.json())
    .then(products => {
        allProducts = products;
        renderProducts(allProducts); // เข้าเว็บครั้งแรก
    });

/* ===============================
   RENDER PRODUCTS
================================ */
function renderProducts(products) {
    grid.innerHTML = "";

    products.forEach(p => {
        if (currentCategory !== "all" && p.category !== currentCategory) return;

                const div = document.createElement("a");
                div.className = "product-card";
                div.href = `product-detail.html?id=${p.id}`;
                div.innerHTML = `
                    <img src="${p.images[0]}">
                    <h3>${p.title}</h3>
                `;
        div.onclick = () => openModal(p);

        grid.appendChild(div);
    });
}

/* ===============================
   BUILD FILTER BY CATEGORY
================================ */
function buildFilterByCategory(category) {
    filterList.innerHTML = "";

    const filtered = allProducts.filter(p => p.category === category);

    const types = [
        ...new Set(
            filtered.flatMap(p => p.type)
        )
    ];

    types.forEach(type => {
        const item = document.createElement("div");
        item.className = "filter-item";
        item.dataset.value = type;
        item.textContent = type;

        filterList.appendChild(item);
    });

    bindFilterEvents();
}

/* ===============================
   FILTER CLICK EVENTS
================================ */
function bindFilterEvents() {
    const items = filterList.querySelectorAll(".filter-item");

    items.forEach(item => {
        item.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            // ล้าง active ทั้งหมดก่อน
            items.forEach(i => i.classList.remove("active"));

            // ถ้าคลิกอันเดิมซ้ำ → ไม่ต้องเปิดใหม่
            if (!isActive) {
                item.classList.add("active");
            }

            // หา filter ที่ถูกเลือก (ถ้ามี)
            const selected = [...items]
                .filter(i => i.classList.contains("active"))
                .map(i => i.dataset.value);

            grid.innerHTML = "";

            allProducts.forEach(p => {
                if (p.category !== currentCategory) return;
                if (
                    selected.length &&
                    !p.type.some(t => selected.includes(t))
                ) return;

                const div = document.createElement("a");
                div.className = "product-card";
                div.href = `product-detail.html?id=${p.id}`;
                div.innerHTML = `
                    <img src="${p.images[0]}">
                    <h3>${p.title}</h3>
                `;

                div.onclick = () => openModal(p);

                grid.appendChild(div);
            });
        });
    });
}


/* ===============================
   CATEGORY BUTTON CLICK
================================ */
categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        categoryBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentCategory = btn.dataset.category;

        if (currentCategory === "all") {
            filterSidebar.classList.add("hidden");
            filterList.innerHTML = "";
        } else {
            filterSidebar.classList.remove("hidden");
            buildFilterByCategory(currentCategory);
        }

        renderProducts(allProducts);
    });
});

/* ===============================
   MODAL
================================ */
function openModal(product) {
    modal.classList.add("show");
    modalTitle.textContent = product.title;
    modalDetail.innerHTML = product.detail;

    modalImage.src = product.images[0];
    modalThumbs.innerHTML = "";

    product.images.forEach(img => {
        const t = document.createElement("img");
        t.src = img;
        t.style.width = "60px";
        t.onclick = () => modalImage.src = img;
        modalThumbs.appendChild(t);
    });
}

closeModal.onclick = () => modal.classList.remove("show");
modal.onclick = e => {
    if (e.target === modal) modal.classList.remove("show");
};