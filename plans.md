Bạn là **Senior Frontend Architect + Senior UI Engineer**.
Nhiệm vụ của bạn là **phân tích file design `try.pen` được đính kèm**, sau đó **xây dựng toàn bộ frontend bám sát 100% giao diện trong file này**, đồng thời **tuân thủ kiến trúc code chuẩn production** dưới đây.

## 1. Mục tiêu dự án

Xây dựng một website thời trang cao cấp tích hợp:

* Landing page / homepage
* Virtual try-on
* Product listing
* Product detail
* Cart / checkout
* Authentication
* Profile / body metrics
* Wishlist
* Chatbot AI support
* Order tracking / history
* About / policies / contact / FAQ
* Các trang trạng thái như success / 404

Design nguồn sự thật là file **`try.pen`**.
Bạn phải:

1. **Đọc kỹ toàn bộ frame trong `try.pen`**
2. **Xác định đầy đủ các màn hình**
3. **Dựng giao diện đúng layout, hierarchy, spacing, tone màu, typography, card style, button style, border radius, glassmorphism, visual emphasis**
4. **Không tự ý đổi bố cục nếu không cần thiết**
5. **Ưu tiên giống thiết kế hơn là sáng tạo lại**

## 2. Công nghệ bắt buộc

Sử dụng stack sau:

* **Next.js** (App Router)
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui** cho UI primitives nếu cần
* **Framer Motion** cho animation nhẹ
* **React Hook Form + Zod** cho form
* **Zustand** cho UI/global state nhẹ
* **TanStack Query** hoặc **SWR** cho data fetching mock
* Kiến trúc **Feature-based Modular Architecture + Layered structure + BFF-ready**

Không dùng Vue. Không dùng React thuần kiểu SPA cũ.

## 3. Kiến trúc code bắt buộc

Phải tổ chức code theo **feature-based modular architecture**, không được để project theo kiểu toàn cục lộn xộn như:

* components/
* hooks/
* services/
* utils/
  ở mức root mà không có chia feature rõ ràng.

### Cấu trúc thư mục yêu cầu

```txt
src/
app/
(public)/
page.tsx
about/page.tsx
policies/page.tsx
contact/page.tsx
lookbook/page.tsx
(shop)/
products/page.tsx
products/[slug]/page.tsx
cart/page.tsx
checkout/page.tsx
wishlist/page.tsx
orders/page.tsx
orders/[id]/page.tsx
(account)/
auth/login/page.tsx
auth/register/page.tsx
auth/forgot-password/page.tsx
profile/page.tsx
profile/body-metrics/page.tsx
try-on/
page.tsx
not-found.tsx
api/
try-on/
chatbot/
cart/
checkout/
features/
home/
components/
sections/
hooks/
services/
types/
mappers/
product/
components/
hooks/
services/
types/
mappers/
catalog/
components/
filters/
hooks/
services/
types/
cart/
components/
hooks/
services/
store/
types/
checkout/
components/
hooks/
services/
types/
auth/
components/
hooks/
services/
schemas/
types/
profile/
components/
hooks/
services/
schemas/
types/
try-on/
components/
hooks/
services/
store/
types/
mappers/
chatbot/
components/
hooks/
services/
store/
types/
wishlist/
components/
hooks/
services/
types/
orders/
components/
hooks/
services/
types/
lookbook/
components/
hooks/
services/
types/
shared/
components/
ui/
layout/
common/
lib/
utils/
hooks/
constants/
types/
config/
server/
services/
repositories/
adapters/
dto/
```

## 4. Nguyên tắc layering

Mỗi feature phải tách rõ:

* **Presentation**: page, section, component, modal, form
* **Application logic**: hooks/use-case orchestration
* **Data layer**: services, adapters, mappers

### Quy tắc bắt buộc

* Component UI **không chứa business logic quá nặng**
* Không gọi API bừa bãi trực tiếp trong component trình bày
* Logic upload ảnh, tạo try-on request, polling kết quả, add to cart, checkout flow, chatbot flow phải đi qua **hook + service**
* Dữ liệu mock cần có type rõ ràng
* Tất cả form phải có schema validation
* Chuẩn bị sẵn kiến trúc để sau này nối backend thật

## 5. Yêu cầu đọc file design

Bạn phải đọc file **`try.pen`** như nguồn thiết kế chính.
Sau khi đọc, hãy:

1. Liệt kê tất cả frame/screen phát hiện được
2. Mapping mỗi frame thành route/page tương ứng
3. Dựng lại giao diện theo đúng thiết kế
4. Nếu có component lặp lại giữa nhiều màn, trích xuất thành shared component hoặc feature component hợp lý
5. Nếu `try.pen` có asset path tham chiếu ảnh, hãy dùng mock image/fallback image hợp lý nhưng vẫn giữ đúng bố cục

## 6. Danh sách màn hình cần dựng

Từ file design, cần dựng các màn sau:

1. HOMEPAGE
2. VIRTUAL TRY-ON ROOM
3. PRODUCT DETAIL PAGE
4. CHECKOUT
5. ORDER SUCCESS
6. ORDER TRACKING & HISTORY
7. CHATBOT AI SUPPORT WIDGET
8. PRODUCT LISTING PAGE
9. CART DRAWER
10. CART PAGE
11. PROFILE & BODY METRICS
12. ABOUT US
13. POLICIES & FAQ
14. CONTACT & SUPPORT
15. WISHLIST
16. 404 ERROR PAGE
17. LOOKBOOK / FASHION INSPIRATION
18. AUTHENTICATION - LOGIN
19. AUTH REGISTER
20. AUTH FORGOT PASSWORD

## 7. Yêu cầu về UI/UX

Phong cách phải bám thiết kế:

* Luxury fashion + AI
* Dark elegant
* Premium editorial feeling
* Glassmorphism tinh tế
* Gradient hồng nude / rose / champagne nhẹ
* Rounded corners lớn
* Clean spacing
* Hero section ấn tượng
* Typography sang, hiện đại
* Có chiều sâu thị giác nhưng không nặng

### Không được:

* Tự đổi màu chủ đạo sang style khác
* Biến UI thành dashboard khô cứng
* Làm card/button quá thô
* Bỏ qua hierarchy thị giác của hero, sections, CTA

## 8. Animation

Chỉ thêm animation nhẹ, đúng tinh thần premium:

* fade in
* slide up nhẹ
* hover scale nhẹ
* shimmer / gradient glow rất tiết chế
* transition mềm cho cards/buttons
* parallax rất nhẹ nếu hợp lý

Không làm animation lòe loẹt hoặc gây nặng trang.

## 9. Responsive

Phải hỗ trợ:

* Desktop trước
* Tablet
* Mobile

Khi responsive:

* Giữ tinh thần layout gốc
* Không phá hierarchy
* Navbar, hero, product grid, try-on area, checkout form phải sắp xếp hợp lý trên mobile

## 10. Dữ liệu và mock behavior

Tạm thời dùng mock data có type đầy đủ cho:

* products
* categories
* looks
* try-on history
* cart items
* wishlist items
* user profile
* body metrics
* orders
* chatbot messages

### Các flow cần mock được:

* chọn sản phẩm
* thêm vào wishlist
* thêm vào cart
* mở cart drawer
* checkout form
* order success
* upload ảnh try-on
* chọn item để thử
* hiển thị before/after mock
* chatbot gửi/nhận message giả lập

## 11. BFF-ready / server-ready

Cấu trúc code phải sẵn sàng cho việc tích hợp backend sau này:

* tạo folder `server/`
* route handlers trong `app/api/`
* tách `services` rõ ràng
* không hardcode business logic vào page

Ví dụ:

* `/api/try-on/create`
* `/api/try-on/result/[id]`
* `/api/chatbot/message`
* `/api/cart/sync`
* `/api/checkout/create-order`

Có thể để mock response, nhưng structure phải production-oriented.

## 12. Chất lượng code

Yêu cầu:

* code sạch, dễ đọc
* component tách hợp lý
* tránh file quá dài
* type đầy đủ
* tên file, tên biến, tên component rõ ràng
* không lặp code
* reusable component đúng chỗ
* route organization rõ ràng
* không viết tất cả trong một file

## 13. Output mong muốn

Hãy trả ra theo thứ tự sau:

### Bước 1

Phân tích file `try.pen` và liệt kê:

* các màn hình tìm thấy
* route tương ứng
* component/section chính của từng màn

### Bước 2

Đề xuất cây thư mục hoàn chỉnh theo kiến trúc ở trên

### Bước 3

Sinh code cho toàn bộ project theo từng phần:

* app routes
* shared layout
* features
* mock data
* hooks
* services
* UI components
* page implementations

### Bước 4

Đảm bảo các page render ra giao diện bám sát file `try.pen`

### Bước 5

Nếu output quá dài, chia thành nhiều phần nhưng phải theo thứ tự logic:

1. project setup + structure
2. shared foundation
3. homepage
4. catalog + product detail
5. try-on
6. cart + checkout
7. auth + profile
8. orders + wishlist + chatbot
9. about / policies / contact / lookbook / 404

## 14. Quy tắc thực thi quan trọng

* Không được trả lời chung chung
* Không chỉ mô tả kiến trúc suông
* Phải sinh code thực tế
* Phải bám đúng `try.pen`
* Nếu có chỗ nào chưa rõ từ asset, hãy dùng placeholder hợp lý nhưng **không được đổi layout**
* Ưu tiên dựng đúng giao diện trước, sau đó mới tối ưu hóa nhỏ

## 15. Tiêu chuẩn hoàn thành

Chỉ được coi là hoàn thành khi:

* tất cả màn trong design đã được mapping
* có kiến trúc feature-based rõ ràng
* code có thể mở rộng production
* UI bám sát `try.pen`
* responsive ổn
* mock flow hoạt động hợp lý

Bây giờ hãy bắt đầu bằng:

1. phân tích file `try.pen`
2. liệt kê toàn bộ screen
3. mapping route
4. đề xuất project structure
5. sau đó mới sinh code.
