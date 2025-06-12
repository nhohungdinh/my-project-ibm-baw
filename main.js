import './style.css';

// 1. Lấy tham chiếu đến các phần tử HTML
const dataList = document.getElementById('data-list');
const loadingIndicator = document.getElementById('loading');
const fetchUsersBtn = document.getElementById('fetchUsersBtn');
const fetchPostsBtn = document.getElementById('fetchPostsBtn');

// =======================================================
// PHẦN LOGIC HIỂN THỊ DỮ LIỆU
// =======================================================

// Hàm để hiển thị danh sách Người dùng
function displayUsers(users) {
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.className = 'user-item'; // Dùng lại class CSS cũ
        listItem.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Điện thoại:</strong> ${user.phone}</p>
        `;
        dataList.appendChild(listItem);
    });
}

// Hàm để hiển thị danh sách Bài viết
function displayPosts(posts) {
    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.className = 'user-item'; // Dùng lại class CSS cũ cho đồng bộ
        listItem.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;
        dataList.appendChild(listItem);
    });
}

// =======================================================
// PHẦN LOGIC GỌI API
// =======================================================

// Hàm gọi API chung
async function fetchData(apiUrl, displayFunction) {
    // Hiển thị chỉ báo "Đang tải..." và xóa dữ liệu cũ
    loadingIndicator.style.display = 'block';
    dataList.innerHTML = '';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Lỗi mạng: ${response.status}`);
        }
        const data = await response.json();
        // Gọi hàm hiển thị tương ứng được truyền vào
        displayFunction(data);
    } catch (error) {
        console.error('Không thể tải dữ liệu:', error);
        dataList.innerHTML = '<li>Đã xảy ra lỗi khi tải dữ liệu.</li>';
    } finally {
        // Luôn ẩn chỉ báo "Đang tải..." sau khi hoàn tất
        loadingIndicator.style.display = 'none';
    }
}

// =======================================================
// PHẦN BẮT SỰ KIỆN
// =======================================================

// 2. Thêm sự kiện 'click' cho nút "Tải Người dùng"
fetchUsersBtn.addEventListener('click', () => {
    fetchData('https://jsonplaceholder.typicode.com/users', displayUsers);
});

// 3. Thêm sự kiện 'click' cho nút "Tải Bài viết"
fetchPostsBtn.addEventListener('click', () => {
    // Lấy 10 bài viết đầu tiên cho ngắn gọn
    fetchData('https://jsonplaceholder.typicode.com/posts?_limit=10', displayPosts);
});