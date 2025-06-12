document.addEventListener('DOMContentLoaded', () => {
  const userList = document.getElementById('user-list');
  const loadingIndicator = document.getElementById('loading');

  // Hàm để gọi API và hiển thị dữ liệu
  async function fetchUsers() {
      loadingIndicator.classList.add('show'); // Hiển thị chỉ báo "Đang tải..."
      userList.innerHTML = ''; // Xóa danh sách cũ (nếu có)

      try {
          // Gọi API bằng fetch
          const response = await fetch('https://jsonplaceholder.typicode.com/users');

          // Kiểm tra xem yêu cầu có thành công không
          if (!response.ok) {
              throw new Error(`Lỗi mạng: ${response.status}`);
          }

          // Chuyển đổi dữ liệu trả về sang JSON
          const users = await response.json();

          // Hiển thị dữ liệu lên giao diện
          displayUsers(users);

      } catch (error) {
          console.error('Không thể tải dữ liệu người dùng:', error);
          userList.innerHTML = '<li>Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.</li>';
      } finally {
          loadingIndicator.classList.remove('show'); // Ẩn chỉ báo "Đang tải..."
      }
  }

  // Hàm để tạo HTML cho mỗi người dùng và chèn vào danh sách
  function displayUsers(users) {
      if (users.length === 0) {
          userList.innerHTML = '<li>Không tìm thấy người dùng nào.</li>';
          return;
      }

      users.forEach(user => {
          const listItem = document.createElement('li');
          listItem.classList.add('user-item');

          listItem.innerHTML = `
              <h2>${user.name}</h2>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Điện thoại:</strong> ${user.phone}</p>
              <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
          `;

          userList.appendChild(listItem);
      });
  }

  // Gọi hàm để bắt đầu quá trình
  fetchUsers();
});