# Tiêu Chuẩn Thực Thi Layout, SEO, UI/UX (AURELIA Web) 2026

Tài liệu này đóng vai trò "nguồn sự thật" về tiêu chuẩn tối ưu hóa thiết kế Frontend (chuẩn Landing Page, SEO và UI/UX mượt mà) cho dự án AI Try-on AURELIA. Được đúc kết và trích xuất trực tiếp từ kho kiến thức chuyên sâu của NotebookLM cập nhật tiêu chuẩn năm 2026.

---

## 1. Tối Ưu Hóa Landing Page & Tăng Chuyển Đổi (CRO)

### 1.1 Nguyên lý Hick's Law & Lựa Chọn Duy Nhất
- **Một mục tiêu chính:** Landing page chỉ phục vụ MỘT mục đích duy nhất. Thiết kế lược bỏ các thanh điều hướng rườm rà (Remove Distractions) gây xao nhãng khỏi hành động cốt lõi là "Trải nghiệm Thử Đồ AI" và "Mua Ngay".
- **Tiết lộ dần dần (Progressive Disclosure):** Không nhồi nhét mọi thứ. Trình bày UI bằng cách chia luồng thông tin: Danh mục, Feature chính -> Nút xem chi tiết.

### 1.2 Luật Hình - Nền & Tối Ưu Call-To-Action (CTA)
- Nút CTA phải có sự tương phản tĩnh siêu thu hút, có yếu tố "Shape" lớn hơn và làm nổi bật hoàn toàn khỏi phông nền (Figure/Ground).
- Câu từ CTA cần ngắn gọn và mang tính đốc thúc hành động.

### 1.3 Tính Thuyết Phục (Social Proof & Tin Cậy)
- Thêm các phần review thực tế, logo thương hiệu chuyên gia vào ngay bên dưới hoặc gần vùng CTA (Cialdini's Persuasion).

---

## 2. Tiết Kiệm & Tối Ưu Search Engine (SEO Master 2026)

### 2.1 Core Interaction Signals 2026 (Thay thế Core Web Vitals)
- **Visual Stability (Độ ổn định hình ảnh - CLS) < 0.15:** 
  - LUÔN thiết lập thuộc tính `width`, `height`, hoặc `aspect-ratio` cho tất cả ảnh, video mẫu thử.
  - Sử dụng Skeleton Box tĩnh khi hình đang Load để tránh việc ảnh tải xong đẩy dãn chữ. Không dùng Popup Inline đẩy nội dung.
- **Interaction Latency (Độ trễ tương tác) < 300ms:**
  - Break nhỏ các Long Tasks JS. UI Click đổi màu áo phải mượt mà tức thì (Optimistic UI) mà không bị treo do xử lý API mô phỏng.
- **Content Paint (Tốc độ hiển thị LCP) < 3.5s:**
  - Nén toàn bộ ảnh (Aurelia Lookbook) bằng WebP hoặc AVIF.
  - Thêm thẻ `fetchpriority="high"` vào Hero Banner đầu tiên.

### 2.2 E-E-A-T & Cấu trúc On-Page
- Đảm bảo thẻ `<H1>` là duy nhất trên trang, phân tầng `<H2>`, `<H3>` hợp lý theo chủ đề gốc.
- Gắn đầy đủ Schema Markup chuẩn `Product`, `Article` cho mục đích tối ưu hóa Google Rich Results.

---

## 3. Tối Ưu UI/UX: Trải Nghiệm Mượt Mà & Tâm Lý Học

### 3.1 Minimalist Website UI Design (Thiết Kế Tối Giản)
- Sử dụng layout 1 cột làm trọng tâm cho các section giải thích tính năng.
- Khoảng trắng (White space) không gian rộng rãi: `64px` - `120px` giữa các Section để giảm tải tư duy não bộ.
- Code tinh gọn, bỏ hoàn toàn các thư viện JQuery/Hiệu ứng cuộn lố bịch nặng nề, chỉ áp dụng Framer Motion cho các UI siêu nhẹ (Fade in, Hover button quy mô cấp Component).

### 3.2 Nhịp độ Ánh Mắt: F-Pattern và Z-Pattern
- Lướt màn hình theo hướng Z-Pattern: 
  - Top Left: Logo Aurelia
  - Top Right: Menu / Login Nav.
  - Bottom Right (Điểm hội tụ): Nút Action bự "TRY ON VIRTUAL" để dụ người dùng click.
- Áp dụng F-Pattern (căn lề trái mạnh) cho các trang có Blocks nội dung dài (Policies, Product Descriptions).

### 3.3 Khả năng truy cập chuẩn hóa (Accessibility - WCAG 2.2 AA)
- **Nút Chạm (Touch Target Size):** Mọi Nút bấm, Link phải có kích thước tương tác Cực Tiểu là `24x24px`, lý tưởng chuẩn ngón tay là `44x44px` trên màn hình điện thoại.
- **Tương Phản Màu Sắc:** Text/Icon phải tương phản TỐI THIỂU 4.5:1 so với dải màu Nền.
- **Navigation Phím:** Mọi Button, Link, Input thao tác Focus được thông qua phím TAB và có vòng báo hiệu dễ nhìn. (Focus indicator > 3:1).
