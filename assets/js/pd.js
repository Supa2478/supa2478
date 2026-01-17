const categoryButtons = document.querySelectorAll('.product-category button');
const products = document.querySelectorAll('.product-card');
const filters = document.querySelectorAll('.product-filter input');

categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;

        products.forEach(p => {
            p.style.display =
                category === 'all' || p.dataset.category === category
                ? 'block' : 'none';
        });
    });
});

filters.forEach(f => {
    f.addEventListener('change', () => {
        const selected = [...filters]
            .filter(f => f.checked)
            .map(f => f.value);

        products.forEach(p => {
            p.style.display =
                selected.length === 0 || selected.includes(p.dataset.type)
                ? 'block' : 'none';
        });
    });
});