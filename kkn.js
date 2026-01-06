let cart = [];

// Element Selectors
const splash = document.getElementById("splash");
const shop = document.getElementById("shop");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");

// Tombol Masuk Toko
window.enterShop = function () {
    splash.style.display = "none";
    shop.style.display = "block";
};

// Tambah ke Keranjang
window.addToCart = function (name, price) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    renderCart();
};

// Update Tampilan Keranjang
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");

    cartItems.innerHTML = "";
    let subtotal = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty">Keranjang kosong</p>`;
    }

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        cartItems.innerHTML += `<p>${item.name} x ${item.qty} - ${formatRupiah(item.price * item.qty)}</p>`;
    });

    subtotalEl.innerText = formatRupiah(subtotal);
    totalEl.innerText = formatRupiah(subtotal); // Total bayar
}

function formatRupiah(num) {
    return "Rp " + num.toLocaleString("id-ID");
}

window.clearCart = function () {
    cart = [];
    renderCart();
};

// Checkout Logic
window.openCheckout = function () {
    if (cart.length === 0) {
        alert("Keranjang masih kosong");
        return;
    }
    document.getElementById("checkout-modal").style.display = "block";
};

function validCustomer() {
    if (!nameInput.value || !phoneInput.value || !addressInput.value) {
        alert("Lengkapi data pemesan!");
        return false;
    }
    return true;
}

// Menampilkan Modal Pembayaran
window.showCOD = function () {
    if (!validCustomer()) return;
    closeAll();
    document.getElementById("cod-modal").style.display = "block";
    document.getElementById("finalTotalCOD").innerText = document.getElementById("total").innerText;
};

window.showTransfer = function () {
    if (!validCustomer()) return;
    closeAll();
    document.getElementById("transfer-modal").style.display = "block";
    document.getElementById("finalTotalTransfer").innerText = document.getElementById("total").innerText;
};

window.showQRIS = function () {
    if (!validCustomer()) return;
    closeAll();
    document.getElementById("qris-modal").style.display = "block";
    document.getElementById("finalTotalQRIS").innerText = document.getElementById("total").innerText;
};

// FUNGSI TOMBOL SELESAI (Perbaikan Utama)
window.finishOrder = function (method) {
    // Di sini kamu bisa menambahkan logika kirim WA jika mau
    closeAll();
    document.getElementById("success-modal").style.display = "block";
    cart = [];
    renderCart();
    // Reset Form
    nameInput.value = "";
    phoneInput.value = "";
    addressInput.value = "";
};

window.closeAll = function () {
    document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
};

window.closeSuccess = function() {
    document.getElementById("success-modal").style.display = "none";
};

window.closeCheckout = function() {
    document.getElementById("checkout-modal").style.display = "none";
};