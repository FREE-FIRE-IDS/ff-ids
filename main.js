let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.menu');

document.getElementById("bell-icon").addEventListener("click", function() {
    let notificationBox = document.querySelector(".notification");
    notificationBox.classList.toggle("active"); // Toggle visibility
});

// ✅ Cart System
document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    const cartBox = document.getElementById("cart-box");
    const cartIcon = document.getElementById("cart-icon");
    const clearCartBtn = document.getElementById("clear-cart");
    const bellIcon = document.getElementById("bell-icon");
    const closeCart = document.getElementById("close-cart"); // Cross Button
    const notificationBox = document.getElementById("notification-box");

    function updateCartDisplay() {
        cartItems.innerHTML = cart.length === 0 ? "<p>Cart is empty.</p>" : "";
        cart.forEach((item, index) => {
            cartItems.innerHTML += `<div class="cart-item">
                <p>ID: ${item.id} | Level: ${item.level} | Price: ${item.price}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>`;
        });

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }
    // ✅ "Buy Now" button se cart me add karna
    document.querySelectorAll(".buy-btn").forEach(button => {
        button.addEventListener("click", function () {
            let item = {
                id: this.parentElement.querySelector("h3").textContent.split(": ")[1],
                level: this.parentElement.querySelector("p:nth-child(2)").textContent.split(": ")[1],
                price: this.parentElement.querySelector("p:nth-child(3)").textContent.split(": ")[1]
            };

            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
            notificationBox.classList.add("active");

            setTimeout(() => {
                notificationBox.classList.remove("active");
            }, 3000);
        });
    });
    // ✅ Cart icon click karne se cart open/close hoga
    cartIcon.addEventListener("click", function () {
        cartBox.classList.toggle("active");
    });

    // ✅ "X" (cross) button se cart hide hoga
    closeCart.addEventListener("click", function () {
        cartBox.classList.remove("active");
    });
    // ✅ Bell icon click hone par bhi cart hide hoga
    bellIcon.addEventListener("click", function () {
        cartBox.classList.remove("active");
    });

    // ✅ "Clear Cart" button se cart empty hoga
    clearCartBtn.addEventListener("click", function () {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    });

    updateCartDisplay();
});
// ✅ Navbar System
menu.onclick = () => {
    navbar.classList.toggle('active');
    menu.classList.toggle('move');
};
// ✅ Notification Toggle
let bell = document.querySelector('.notification');

document.querySelector('#bell-icon').onclick = () => {
    bell.classList.toggle('active');
};
document.addEventListener("DOMContentLoaded", function () {
    let item = JSON.parse(localStorage.getItem("selectedID"));
    if (item) {
        document.querySelector(".id-details").innerHTML = `
            <h2>Selected Free Fire ID</h2>
            <p><strong>ID:</strong> ${item.id}</p>
            <p><strong>Level:</strong> ${item.level}</p>
            <p><strong>Price:</strong> ${item.price}</p>
        `;
    } else {
        document.querySelector(".id-details").innerHTML = "<p>No ID selected.</p>";
    }
});
// ✅ Custom Scroll Bar
window.onscroll = function() { mufunction(); };

function mufunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById('scroll-bar').style.width = scrolled + '%';
}
document.addEventListener("DOMContentLoaded", function () {
    let item = JSON.parse(localStorage.getItem("selectedID"));

    if (item) {
        document.querySelector(".id-details").innerHTML = `
            <h2>Selected Free Fire ID</h2>
            <p><strong>ID:</strong> ${item.id}</p>
            <p><strong>Level:</strong> ${item.level}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            <button id="confirm-purchase" class="btn">Confirm Purchase</button>
        `;

        const confirmBtn = document.getElementById("confirm-purchase");
        const orderPopup = document.getElementById("order-popup");
        const whatsappPopup = document.getElementById("whatsapp-popup");
        const closeBtns = document.querySelectorAll(".close-btn");
        const confirmOrderBtn = document.getElementById("confirm-order");
        const orderDetails = document.getElementById("order-details");

        // ✅ "Confirm Purchase" button se pehla popup show hoga
        confirmBtn.addEventListener("click", function () {
            orderDetails.innerHTML = `
                <p><strong>ID:</strong> ${item.id}</p>
                <p><strong>Level:</strong> ${item.level}</p>
                <p><strong>Price:</strong> ${item.price}</p>
            `;
            orderPopup.style.display = "block"; // ✅ Pehla popup show hoga
        });

        // ✅ "Confirm Order" button se pehla popup band aur dusra open
        confirmOrderBtn.addEventListener("click", function () {
            orderPopup.style.display = "none"; // ✅ Pehla popup band hoga
            whatsappPopup.style.display = "block"; // ✅ Dusra popup show hoga
        });

        // ✅ Close button se dono popup band ho jayenge
        closeBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                orderPopup.style.display = "none";
                whatsappPopup.style.display = "none";
            });
        });

        // ✅ Agar user background pe click kare to popup band ho jaye
        window.onclick = function (event) {
            if (event.target === orderPopup) {
                orderPopup.style.display = "none";
            }
            if (event.target === whatsappPopup) {
                whatsappPopup.style.display = "none";
            }
        };
    } else {
        document.querySelector(".id-details").innerHTML = "<p>No ID selected.</p>";
    }
});
