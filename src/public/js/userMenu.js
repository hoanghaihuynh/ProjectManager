document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("cartModal");
  const cartButtons = document.querySelectorAll(".card__cart-icon, .card__cart-text");
  const span = document.querySelector(".modal-content .close");
  const productImage = document.getElementById("productImage");
  const quantityInput = document.getElementById("quantity");
  const submitButton = document.querySelector(".footer__modal-btn--submit");
  const productNameElement = document.getElementById("productName");

  let productId, productName, img, productPrice, totalPrice;

  function updateSubmitButton(price, quantity) {
    const total = price * quantity;
    totalPrice = total;
    submitButton.textContent = `Thêm vào giỏ hàng - ${total.toLocaleString()} VND`;
  }

  function addToCart() {
    const size = document.querySelector('input[name="size[]"]:checked')?.value;
    const sugar = document.querySelector('input[name="sugar"]:checked')?.value;
    const ice = document.querySelector('input[name="ice"]:checked')?.value;
    const description = document.getElementById("description")?.value.trim();

    const formData = {
      productId: productId || '',
      name: productName || '',
      image: img || '',
      priceItem: parseFloat(productPrice) || 0,
      totalPrice: parseFloat(totalPrice) || 0,
      quantity: parseInt(quantityInput.value) || 1,
      size: size || '',
      sugar: sugar || '',
      ice: ice || '',
      description: description || ''
    };

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
      alert("Thêm vào giỏ hàng thành công !!!");
      window.location.reload(); // Tải lại trang để cập nhật các mục giỏ hàng
    })
    .catch(error => {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
    });
  }

  cartButtons.forEach(button => {
    button.addEventListener("click", function(event) {
      event.preventDefault();
      const cardContainer = event.target.closest('.card-container');
      if (!cardContainer) return;
      const imgSrc = cardContainer.querySelector('img')?.src;
      img = imgSrc;
      productImage.src = imgSrc;
      productName = cardContainer.getAttribute('data-name');
      productNameElement.textContent = productName;

      productPrice = cardContainer.getAttribute('data-price');
      productId = cardContainer.getAttribute('data-id');
      quantityInput.value = 1; // Reset số lượng về 1 mỗi khi mở modal
      updateSubmitButton(productPrice, quantityInput.value);
      modal.classList.add("active");
    });
  });

  document.querySelectorAll('.btn-increase').forEach(button => {
    button.addEventListener("click", function() {
      let currentQuantity = parseInt(quantityInput.value) || 1;
      currentQuantity++;
      quantityInput.value = currentQuantity;
      updateSubmitButton(productPrice, currentQuantity);
    });
  });

  document.querySelectorAll('.btn-decrease').forEach(button => {
    button.addEventListener("click", function() {
      let currentQuantity = parseInt(quantityInput.value) || 1;
      if (currentQuantity > 1) {
        currentQuantity--;
        quantityInput.value = currentQuantity;
        updateSubmitButton(productPrice, currentQuantity);
      }
    });
  });

  if (span) {
    span.onclick = function() {
      modal.classList.remove("active");
    };
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.classList.remove("active");
    }
  };

  const addToCartForm = document.getElementById("addToCartForm");
  if (addToCartForm) {
    addToCartForm.addEventListener("submit", function(event) {
      event.preventDefault();
      if (validateForm()) {
        addToCart();
      }
    });
  }

  function validateForm() {
    const size = document.querySelector('input[name="size[]"]:checked');
    const sugar = document.querySelector('input[name="sugar"]:checked');
    const ice = document.querySelector('input[name="ice"]:checked');

    if (!size || !sugar || !ice) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return false;
    }
    return true;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const deleteLinks = document.querySelectorAll('.delete-link');

  deleteLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const id = this.getAttribute('data-id');
      const itemElement = document.querySelector(`.header__cart-item[data-id="${id}"]`);

      fetch(`/menu/${id}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      .then(response => {
        if (response.ok) {
          if (itemElement) {
            itemElement.remove();
            // Cập nhật lại số lượng sản phẩm
            const cartNotice = document.getElementById('cart-notice');
            if (cartNotice) {
              const currentCount = parseInt(cartNotice.textContent);
              cartNotice.textContent = currentCount - 1;
            }
            // Cập nhật lại tổng số tiền
            calculateTotal();
          }
        } else {
          console.log('Xóa thất bại');
        }
      })
      .catch(error => {
        console.error('Có lỗi xảy ra:', error);
      });
    });
  });

  function calculateTotal() {
    let total = 0;
    document.querySelectorAll('.header__cart-item').forEach(function(item) {
      const price = parseFloat(item.querySelector('.header__cart-item-price').textContent.replace(/[\D]/g, '').replace(/^0+/, ''));
      const quantity = parseInt(item.querySelector('.header__cart-item-qnt').textContent);
      total += price * quantity;
    });
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
      totalPriceElement.textContent = 'Tổng số tiền: ' + formatPrice(total);
    }
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }

  // Tính tổng số tiền khi tải trang
  calculateTotal();
});





