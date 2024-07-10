// Kết nối tới server socket.io
const socket = io(); 

socket.on('connect', () => {
    console.log('Connected to server socket');
});

socket.on('newOrder', (data) => {
    // Tăng số lượng đơn hàng trên menu order
    const orderMenuCounter = document.getElementById('orderMenuCounter');
    if (orderMenuCounter) {
        // Chuyển đổi thành số, mặc định là 0 nếu không hợp lệ
        let currentCount = parseInt(orderMenuCounter.innerText.trim()) || 0; 
        orderMenuCounter.innerText = currentCount + 1;
    }

    // Am thanh
    const notificationSound = document.getElementById('notification-sound');
    notificationSound.play();
});

socket.on('disconnect', () => {
    console.log('Disconnected from server socket');
});

//set view
function markAsViewed(orderId) {
    fetch(`/order/${orderId}/view`, { method: 'POST' })
        .then(response => response.text())
        .then(data => {

            // Cập nhật giao diện để thay đổi màu sắc của đơn hàng đã xem
            const orderElement = document.getElementById(`order-${orderId}`);
            if (orderElement) {
                orderElement.classList.remove('not-viewed');
                orderElement.classList.add('viewed');
                
                const button = orderElement.querySelector('.btn');
                if (button) button.style.display = 'none';
            }
        })
        .catch(err => console.log(err));
}