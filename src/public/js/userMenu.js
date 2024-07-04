
document.addEventListener("DOMContentLoaded", function() {
  var modal = document.getElementById("cartModal");
  var cartButtons = document.querySelectorAll(".card__cart-icon, .card__cart-text");
  var span = document.querySelector(".modal-content .close");
  var productImage = document.getElementById("productImage");
  var quantityInput = document.getElementById("quantity");
  var submitButton = document.querySelector(".footer__modal-btn--submit");
  var productPrice = 0;
  var cardName = document.getElementById("productName");

  var productId, productName, img,  totalPrice;

  cartButtons.forEach(button => {
    button.addEventListener("click", function(event) {
      event.preventDefault();
      var cardContainer = event.target.closest('.card-container');
      var imgSrc = cardContainer.querySelector('img').src;
      img = imgSrc;
      productImage.src = imgSrc;
      productName = cardContainer.getAttribute('data-name');
      cardName.textContent = productName;

      productPrice = parseFloat(cardContainer.getAttribute('data-price'));
      
      productId = cardContainer.getAttribute('data-id');
      updateSubmitButton(productPrice, quantityInput.value);
      modal.classList.add("active");
    });
  });

  span.onclick = function() {
    modal.classList.remove("active");
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.classList.remove("active");
    }
  };

  document.getElementById("addToCartForm").addEventListener("submit", function(event) {
    event.preventDefault();
    if (validateForm()) {
      addToCart();
    }
  });

  var decreaseButton = document.querySelector(".btn-decrease");
  var increaseButton = document.querySelector(".btn-increase");

  decreaseButton.addEventListener("click", function() {
    var currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
      updateSubmitButton(productPrice, quantityInput.value);
    }
  });

  increaseButton.addEventListener("click", function() {
    var currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
    updateSubmitButton(productPrice, quantityInput.value);
  });

  function updateSubmitButton(price, quantity) {
    var total = price * quantity;
    totalPrice = total;
    submitButton.textContent = `Thêm vào giỏ hàng - ${total.toLocaleString()} VND`;
  }

  function validateForm() {
    var size = document.querySelector('input[name="size[]"]:checked');
    var sugar = document.querySelector('input[name="sugar"]:checked');
    var ice = document.querySelector('input[name="ice"]:checked');
    var description = document.getElementById("description").value.trim();

    if (!size || !sugar || !ice || description === "") {
      alert("Vui lòng điền đầy đủ thông tin.");
      return false;
    }
    return true;
  }

  function addToCart() {
    var size = document.querySelector('input[name="size[]"]:checked').value;
    var sugar = document.querySelector('input[name="sugar"]:checked').value;
    var ice = document.querySelector('input[name="ice"]:checked').value;
    var description = document.getElementById("description").value.trim();

    var formData = {
      productId: productId || '',
      name: productName || '',
      image: img || '',
      priceItem: productPrice || 0,
      totalPrice: totalPrice || 0,
      quantity: parseInt(quantityInput.value) || 1,
      size: size ? size : '',
      sugar: sugar ? sugar : '',
      ice: ice ? ice : '',
      description: description || ''
    };
  
    console.log('Dữ liệu gửi lên server:', formData);


    fetch('/menu/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Lỗi khi gửi yêu cầu: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Đã thêm vào giỏ hàng:', data);
      modal.classList.remove("active");
      alert("Thêm thành công !!!");
      loadCartItems(); // Load giỏ hàng sau khi thêm thành công
    })
    .catch(error => {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
    });
  }

  function loadCartItems() {
    fetch('/menu/cart/items', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Lỗi khi lấy sản phẩm từ giỏ hàng: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        const cartItemsContainer = document.getElementById('cartItemsContainer');
        cartItemsContainer.innerHTML = '';

        data.items.forEach(item => {
          const itemElement = document.createElement('div');
          itemElement.classList.add('cart-item');
          itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item__image">
            <div class="cart-item__info">
              <h2>${item.name}</h2>
              <p>Giá: ${item.priceItem}</p>
              <p>Số lượng: ${item.quantity}</p>
              <!-- Các thông tin khác của sản phẩm -->
            </div>
          `;
          cartItemsContainer.appendChild(itemElement);
        });

        cartItemsContainer.style.display = 'block';
      } else {
        console.error('Lỗi khi lấy sản phẩm từ giỏ hàng:', data.message);
      }
    })
    .catch(error => {
      console.error('Lỗi khi lấy sản phẩm từ giỏ hàng:', error);
    });
  }

  // Gọi loadCartItems() khi click vào biểu tượng giỏ hàng
  document.getElementById('cartIcon').addEventListener('click', function() {
    loadCartItems();
  });

  // Gọi loadCartItems() để load giỏ hàng khi trang được tải
  loadCartItems();
});
