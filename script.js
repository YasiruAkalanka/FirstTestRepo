// script.js
const datetimeEl = document.getElementById("datetime");

function updateDateTime() {
  const now = new Date();

  // Format: Sunday, 7 May 2025 - 2:22 PM
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };

  datetimeEl.textContent = now.toLocaleString('en-US', options);
}

// Run once and then every second
updateDateTime();
setInterval(updateDateTime, 1000);


let menuData = []
let Total=0;


function removeFromCart(button) {
    const li = button.closest('li');
    Total -= parseFloat(li.dataset.price);
    if (li) li.remove();

    const payAmt = document.getElementById('totalPrice');
    payAmt.innerHTML = `$ ${Total.toFixed(2)}`;
    payAmt.style.fontSize = "1.5em";
    payAmt.style.fontWeight = "bold";
}


    function addToCart(id) {
        const cartList = document.getElementById('cartList'); 
        const result = menuData.find(obj => obj.id === id);
        //console.log(result); 
        //console.log(result.name);

        const li = document.createElement('li');
        li.dataset.price = result.price;
        li.innerHTML = 
            `<div>
                <strong>${result.name}</strong><br>
                $${result.price.toFixed(2)}
                <button class="remove-from-cart" data-id="${result.id}" onclick="removeFromCart(this)">X</button>

            </div>`;
            cartList.appendChild(li);
            Total += result.price;
            console.log(Total);
            const payAmt = document.getElementById('totalPrice');
            payAmt.innerHTML = `$ ${Total.toFixed(2)}`;
            payAmt.style.fontSize = "1.5em";
            payAmt.style.fontWeight = "bold";
    }
        
    

document.addEventListener('DOMContentLoaded', () => {
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            menuData = data; // Store the data in a global variable
            const menuList = document.getElementById('prodList'); 
            if (!menuList) {
                console.error("Element with ID 'prodlist' not found.");
                return;
            }

            data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" style="width: 90px; height: 90px; border-radius: 0.3em;">
                    <div>
                        <strong>${item.name}</strong><br>
                        $${item.price.toFixed(2)}
                    </div>
                    <button class="add-to-cart" data-id="${item.id}" onclick="addToCart(${item.id})">Add to Cart</button>
                `;
                menuList.appendChild(li); // Corrected to 'menuList'
            });
        })
        .catch(error => {
            console.error("Failed to load menu items:", error);
        });
});



document.getElementById('paybtn').addEventListener('click', () => {
    const alertBox = document.getElementById('alertBox');
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);

    // 1. Clear the cart list
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';

    // 2. Reset total
    Total = 0;

    // 3. Update total display
    const payAmt = document.getElementById('totalPrice');
    payAmt.innerHTML = `${Total.toFixed(2)}`;

  });