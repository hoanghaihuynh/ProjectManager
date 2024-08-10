
document.addEventListener('DOMContentLoaded', function() {
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const numTableInput = document.getElementById('numTable');
    const paymentMethodInput = document.getElementById('paymentMethod');
    const applyVoucherBtn = document.getElementById('applyVoucherBtn');
    const voucherCodeInput = document.getElementById('voucherCodeInput');
    let discountValue = 0;
    let discountType = 'fixed'; // Mặc định
  
    if (applyVoucherBtn) {
        applyVoucherBtn.addEventListener('click', function(event) {
            event.preventDefault();
            const voucherCode = voucherCodeInput.value;
            if (!voucherCode) {
                alert('Vui lòng nhập mã giảm giá.');
                return;
            }
  
            fetch('/admin/voucher/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: voucherCode })
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(data => {
                if (data.valid) {
                    discountValue = data.discountValue;
                    discountType = data.discountType;
                    alert('Mã giảm giá hợp lệ! Bạn được giảm giá.');
                    updateTotalPrice();
                } else {
                    alert('Mã giảm giá không hợp lệ.');
                }
            })
            .catch(error => {
                console.error('Lỗi khi kiểm tra mã giảm giá:', error);
                alert('Có lỗi xảy ra khi kiểm tra mã giảm giá. Vui lòng thử lại.');
            });
        });
    }
  
    function updateTotalPrice() {
        const items = document.querySelectorAll('.header__cart-item');
        let totalPrice = 0;
        items.forEach(item => {
            const priceItemElement = item.querySelector('.header__cart-item-price');
            const quantityElement = item.querySelector('.header__cart-item-qnt');
            const priceItem = priceItemElement ? parseFloat(priceItemElement.textContent.replace(/[\D]/g, '').replace(/^0+/, '')) : 0;
            const quantity = quantityElement ? parseInt(quantityElement.textContent) : 0;
            totalPrice += priceItem * quantity;
        });
        
        if (discountType === 'percentage') {
            totalPrice -= (totalPrice * discountValue / 100);
        } else {
            totalPrice -= discountValue;
        }
  
        document.getElementById('total-price').textContent = 'Tổng số tiền: ' + totalPrice + ' VND';
    }
  
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function(event) {
            event.preventDefault();
            if (!numTableInput.checkValidity()) {
                alert('Vui lòng nhập số bàn hợp lệ.');
                return;
            }
            const numTable = numTableInput.value;
            const paymentMethod = paymentMethodInput.value;
            const items = [];
            const cartItems = document.querySelectorAll('.header__cart-item');
            cartItems.forEach(item => {
                const productId = item.getAttribute('data-id');
                const nameElement = item.querySelector('.header__cart-item-name');
                const imageElement = item.querySelector('.header__cart-img');
                const priceItemElement = item.querySelector('.header__cart-item-price');
                const quantityElement = item.querySelector('.header__cart-item-qnt');
                const sizeElement = item.querySelector('.header__cart-item-size');
                const iceElement = item.querySelector('.header__cart-item-ice');
                const sugarElement = item.querySelector('.header__cart-item-sugar');
                const descriptionElement = item.querySelector('.header__cart-item-description');
  
                const name = nameElement ? nameElement.textContent : '';
                const image = imageElement ? imageElement.getAttribute('src') : '';
                const priceItem = priceItemElement ? parseFloat(priceItemElement.textContent.replace(/[\D]/g, '').replace(/^0+/, '')) : 0;
                const quantity = quantityElement ? parseInt(quantityElement.textContent) : 0;
                const size = sizeElement ? sizeElement.textContent : '';
                const ice = iceElement ? iceElement.textContent : '';
                const sugar = sugarElement ? sugarElement.textContent : '';
                const description = descriptionElement ? descriptionElement.textContent : '';
                const totalPrice = priceItem * quantity;
  
                items.push({
                    productId,
                    name,
                    image,
                    priceItem,
                    totalPrice,
                    quantity,
                    size,
                    ice,
                    sugar,
                    description,
                });
            });
  
            const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0);
            const orderData = {
                items,
                totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
                totalPrice: totalPrice - (discountType === 'percentage' ? (totalPrice * discountValue / 100) : discountValue),
                paymentMethod,
                numTable,
                voucherCode: voucherCodeInput.value,
                discountValue: discountValue,
                discountType: discountType
            };
  
            if (paymentMethod == 'cash') {
                fetch('/order/payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Đặt hàng thất bại: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Đặt hàng thành công!');
                    cartItems.forEach(item => {
                        item.remove();
                    });
                    const cartNotice = document.getElementById('cart-notice');
                    if (cartNotice) {
                        cartNotice.textContent = '0';
                    }
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Lỗi khi đặt hàng:', error);
                    alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
                });
            } else if (paymentMethod == 'paypal') {
                axios.post('/order/payment', orderData)
                .then((response) => {
                    window.location.href = response.data.forwardLink;
                })
                .catch((err) => console.log(err));
            }
        });
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    // Lấy tham số trạng thái từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status === 'success') {
        alert('Thanh toán thành công! Đơn hàng của bạn đã được xử lý.');
    } else if (status === 'failed') {
        alert('Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.');
    }
});
