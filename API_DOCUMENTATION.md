# DevPulse API - Tài liệu Tích hợp Frontend (API Integration Guide)

Tài liệu hướng dẫn kết nối và tích hợp API cho đội ngũ Frontend (ReactJS / Next.js / Vue / Angular).

---

## 1. Thông Tin Chung (Base Configuration)

- **Base URL (Local)**: `http://localhost:3001` hoặc `http://127.0.0.1:3001`
- **Swagger UI**: `http://localhost:3001/api-docs`
- **OpenAPI JSON**: `http://localhost:3001/api-docs.json`
- **Content-Type**: `application/json`
- **CORS**: Đã bật sẵn (cho phép mọi origin trong quá trình phát triển).

---

## 2. Quy tắc Dữ liệu & Data Models

### 2.1. Resource Object

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả & Ràng buộc |
| :--- | :--- | :---: | :--- |
| `_id` | `string` | Tự động | MongoDB ObjectId (chuỗi 24 hex) |
| `title` | `string` | **Có** | Tiêu đề (3 - 100 ký tự, tự động `trim()`) |
| `url` | `string` | **Có** | Đường link hợp lệ (bắt đầu bằng `http://` hoặc `https://`) |
| `category` | `string` | **Có** | Chỉ nhận 1 trong các giá trị: `Frontend`, `Backend`, `DevOps`, `AI`, `Mobile`, `UI/UX` |
| `tags` | `string[]` | **Có** | Mảng từ 1 đến 5 tags. Mỗi tag tối đa 20 ký tự, chữ thường, không chứa ký tự đặc biệt |
| `summary` | `string` | Không | Mô tả tóm tắt, tối đa 300 ký tự |
| `upvotes` | `number` | Mặc định `0` | Số lượt like/upvote |
| `createdAt` | `string` (ISO Date) | Tự động | Thời gian tạo tài nguyên |
| `updatedAt` | `string` (ISO Date) | Tự động | Thời gian cập nhật gần nhất |

---

## 3. Danh sách Endpoints

### 3.1. Health Check
Kiểm tra kết nối và trạng thái server.

- **Method**: `GET`
- **Endpoint**: `/`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "DevPulse API is running...",
  "documentation": "/api-docs"
}
```

---

### 3.2. Lấy Danh sách Tài nguyên (Search, Filter, Sort, Pagination)

Dùng cho trang chủ, lưới danh sách tài nguyên, thanh tìm kiếm và bộ lọc.

- **Method**: `GET`
- **Endpoint**: `/api/resources`
- **Query Parameters**:

| Param | Kiểu | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `search` | `string` | `""` | Tìm kiếm từ khóa theo `title` và `summary` |
| `category` | `string` | `""` | Lọc theo danh mục: `Frontend`, `Backend`, `DevOps`, `AI`, `Mobile`, `UI/UX` |
| `tag` | `string` | `""` | Lọc theo tag cụ thể (ví dụ: `react`, `docker`, `python`) |
| `sortBy` | `string` | `newest` | Sắp xếp: `newest` (mới nhất), `most_upvoted` (nhiều vote nhất), `oldest` |
| `page` | `number` | `1` | Trang hiện tại |
| `limit` | `number` | `12` | Số lượng item trên một trang |

- **Ví dụ Request**:
```http
GET /api/resources?search=react&category=Frontend&sortBy=most_upvoted&page=1&limit=12
```

- **Response `200 OK`**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "67d71234567890abcdef1234",
      "title": "React Official Documentation",
      "url": "https://react.dev",
      "category": "Frontend",
      "tags": ["react", "frontend", "javascript"],
      "summary": "The official documentation for React.",
      "upvotes": 25,
      "createdAt": "2026-09-16T10:00:00.000Z",
      "updatedAt": "2026-09-16T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 12,
    "totalPages": 4
  }
}
```

---

### 3.3. Tạo Mới Tài nguyên (Create Resource)

- **Method**: `POST`
- **Endpoint**: `/api/resources`
- **Request Body (JSON)**:
```json
{
  "title": "Tailwind CSS Documentation",
  "url": "https://tailwindcss.com",
  "category": "UI/UX",
  "tags": ["tailwind", "css", "styling"],
  "summary": "A utility-first CSS framework packed with classes."
}
```

- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Resource created successfully",
  "data": {
    "_id": "67d71234567890abcdef5678",
    "title": "Tailwind CSS Documentation",
    "url": "https://tailwindcss.com",
    "category": "UI/UX",
    "tags": ["tailwind", "css", "styling"],
    "summary": "A utility-first CSS framework packed with classes.",
    "upvotes": 0,
    "createdAt": "2026-09-16T11:00:00.000Z",
    "updatedAt": "2026-09-16T11:00:00.000Z"
  }
}
```

- **Response `400 Bad Request` (Lỗi Validation)**:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Title must be between 3 and 100 characters.",
    "Category must be one of: Frontend, Backend, DevOps, AI, Mobile, UI/UX."
  ]
}
```

---

### 3.4. Lấy Chi Tiết Tài nguyên (Get Resource by ID)

- **Method**: `GET`
- **Endpoint**: `/api/resources/:id`
- **Params**:
  - `id`: MongoDB ObjectId (24 hex characters).

- **Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "_id": "67d71234567890abcdef1234",
    "title": "React Official Documentation",
    "url": "https://react.dev",
    "category": "Frontend",
    "tags": ["react", "frontend", "javascript"],
    "summary": "The official documentation for React.",
    "upvotes": 25,
    "createdAt": "2026-09-16T10:00:00.000Z",
    "updatedAt": "2026-09-16T10:00:00.000Z"
  }
}
```

- **Response `404 Not Found`**:
```json
{
  "success": false,
  "message": "Resource not found"
}
```

- **Response `400 Bad Request` (Sai định dạng ID)**:
```json
{
  "success": false,
  "message": "Invalid resource ID format. Must be a valid ObjectId."
}
```

---

### 3.5. Cập Nhật Tài nguyên (Update Resource)

Cho phép cập nhật một phần hoặc toàn bộ các trường thông tin.

- **Method**: `PUT`
- **Endpoint**: `/api/resources/:id`
- **Params**:
  - `id`: MongoDB ObjectId.
- **Request Body (JSON)**:
```json
{
  "title": "React 19 Official Documentation",
  "tags": ["react", "react19", "frontend"],
  "summary": "Updated documentation for React 19 features."
}
```

- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Resource updated successfully",
  "data": {
    "_id": "67d71234567890abcdef1234",
    "title": "React 19 Official Documentation",
    "url": "https://react.dev",
    "category": "Frontend",
    "tags": ["react", "react19", "frontend"],
    "summary": "Updated documentation for React 19 features.",
    "upvotes": 25,
    "createdAt": "2026-09-16T10:00:00.000Z",
    "updatedAt": "2026-09-16T11:30:00.000Z"
  }
}
```

---

### 3.6. Upvote / Like Tài nguyên (Atomic Increment)

Dùng cho nút Upvote ở giao diện card/grid (tăng realtime phía UI, cập nhật nguyên tử ở backend).

- **Method**: `PATCH`
- **Endpoint**: `/api/resources/:id/upvote`
- **Params**:
  - `id`: MongoDB ObjectId.
- **Request Body**: Không cần body.

- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Resource upvoted successfully",
  "data": {
    "_id": "67d71234567890abcdef1234",
    "title": "React Official Documentation",
    "url": "https://react.dev",
    "category": "Frontend",
    "tags": ["react", "frontend"],
    "summary": "The official documentation for React.",
    "upvotes": 26,
    "createdAt": "2026-09-16T10:00:00.000Z",
    "updatedAt": "2026-09-16T11:45:00.000Z"
  }
}
```

---

### 3.7. Xóa Tài nguyên (Delete Resource)

- **Method**: `DELETE`
- **Endpoint**: `/api/resources/:id`
- **Params**:
  - `id`: MongoDB ObjectId.

- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Resource deleted successfully"
}
```

- **Response `404 Not Found`**:
```json
{
  "success": false,
  "message": "Resource not found"
}
```

---

## 4. Gợi ý Code Mẫu Cho Frontend (Axios / Fetch API)

### 4.1. Cấu hình Axios Client (`src/api/apiClient.js`)

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export default apiClient;
```

### 4.2. Khai báo Resource Services (`src/api/resourceApi.js`)

```javascript
import apiClient from './apiClient';

export const resourceApi = {
  // Lấy danh sách + filter + search + sort + pagination
  getAll: (params) => apiClient.get('/api/resources', { params }),

  // Lấy chi tiết
  getById: (id) => apiClient.get(`/api/resources/${id}`),

  // Tạo mới
  create: (data) => apiClient.post('/api/resources', data),

  // Cập nhật
  update: (id, data) => apiClient.put(`/api/resources/${id}`, data),

  // Xóa
  delete: (id) => apiClient.delete(`/api/resources/${id}`),

  // Upvote (+1)
  upvote: (id) => apiClient.patch(`/api/resources/${id}/upvote`)
};
```
