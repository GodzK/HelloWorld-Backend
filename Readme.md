🔹 1. เตรียม Environment
1.1 เปิดเซิร์ฟเวอร์
ก่อนอื่นให้คุณรันเซิร์ฟเวอร์ก่อน

bash
Copy
Edit
node server.js
ตรวจสอบว่ามีข้อความ Server running on port 3000 แสดงขึ้นมา

1.2 เช็ค Database (MySQL)
ให้แน่ใจว่าฐานข้อมูลของคุณทำงานอยู่ และตรวจสอบว่ามีตารางที่ต้องใช้

sql
Copy
Edit
SHOW TABLES;
ถ้ายังไม่มี ให้สร้างตารางตามโครงสร้างที่มีใน ER Diagram

🔹 2. ทดสอบ API แต่ละส่วน
📝 หมายเหตุ

ทุก API ที่ต้องการ JWT Token ต้องมี Authorization: Bearer <TOKEN> ใน Header
คุณสามารถใช้ Postman / Thunder Client / cURL ก็ได้
✅ 2.1 Register User (สมัครสมาชิก)
📌 Endpoint: POST /api/users/register
📌 Headers: Content-Type: application/json
📌 Request Body:

json
Copy
Edit
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "johndoe@example.com",
  "password": "123456",
  "role": "student"
}
📌 Response ตัวอย่าง:

json
Copy
Edit
{
  "message": "User registered successfully"
}
✅ 2.2 Login (เข้าสู่ระบบ)
📌 Endpoint: POST /api/users/login
📌 Headers: Content-Type: application/json
📌 Request Body:

json
Copy
Edit
{
  "email": "johndoe@example.com",
  "password": "123456"
}
📌 Response ตัวอย่าง:

json
Copy
Edit
{
  "token": "eyJhbGciOiJIUzI1..."
}
📌 สำคัญ!

คัดลอก Token แล้วใช้ใน Authorization Header สำหรับ API ถัดไป
✅ 2.3 Get Users (ดึงข้อมูลผู้ใช้)
📌 Endpoint: GET /api/users
📌 Headers:

text
Copy
Edit
Authorization: Bearer <TOKEN>
📌 Response ตัวอย่าง:

json
Copy
Edit
{
  "users": [
    {
      "user_id": 1,
      "firstname": "John",
      "lastname": "Doe",
      "email": "johndoe@example.com",
      "role": "student"
    }
  ]
}
✅ 2.4 Create Room (เพิ่มห้องใหม่)
📌 Endpoint: POST /api/rooms
📌 Headers:

text
Copy
Edit
Authorization: Bearer <TOKEN>
Content-Type: application/json
📌 Request Body:

json
Copy
Edit
{
  "room_name": "Meeting Room A",
  "capacity": 10,
  "area": "Building 1"
}
📌 Response ตัวอย่าง:

json
Copy
Edit
{
  "message": "Room added successfully"
}
✅ 2.5 Get All Rooms (ดึงข้อมูลห้องทั้งหมด)
📌 Endpoint: GET /api/rooms
📌 Headers:

text
Copy
Edit
Authorization: Bearer <TOKEN>
📌 Response ตัวอย่าง:

json
Copy
Edit
{
  "rooms": [
    {
      "room_id": 1,
      "room_name": "Meeting Room A",
      "capacity": 10,
      "area": "Building 1"
    }
  ]
}
✅ 2.6 Book Room (จองห้อง)
📌 Endpoint: POST /api/bookings
📌 Headers:

text
Copy
Edit
Authorization: Bearer <TOKEN>
Content-Type: application/json
📌 Request Body:

json
Copy
Edit
{
  "room_id": 1,
  "start_time": "2025-02-04 10:00:00",
  "end_time": "2025-02-04 12:00:00",
  "duration": 120,
  "status": "pending",
  "description": "Team meeting"
}
📌 Response ตัวอย่าง:

json
Copy
Edit
{
  "message": "Booking Successful"
}
✅ 2.7 Get Bookings (ดึงข้อมูลการจองทั้งหมด)
📌 Endpoint: GET /api/bookings
📌 Headers:

text
Copy
Edit
Authorization: Bearer <TOKEN>
📌 Response ตัวอย่าง:

json
Copy
Edit
{
  "bookings": [
    {
      "booking_id": 1,
      "user_id": 1,
      "room_id": 1,
      "start_time": "2025-02-04 10:00:00",
      "end_time": "2025-02-04 12:00:00",
      "status": "pending",
      "description": "Team meeting"
    }
  ]
}
✅ 2.8 Log Action (บันทึกการเปลี่ยนแปลง)
📌 Endpoint: POST /api/logs
📌 Headers:

text
Copy
Edit
Authorization: Bearer <TOKEN>
Content-Type: application/json
📌 Request Body:

json
Copy
Edit
{
  "booking_id": 1,
  "start_time": "2025-02-04 10:00:00",
  "end_time": "2025-02-04 12:00:00",
  "action": "created"
}
📌 Response ตัวอย่าง:

json
Copy
Edit
{
  "message": "Log recorded"
}
✅ 2.9 Get Logs (ดึงข้อมูล Log)
📌 Endpoint: GET /api/logs
📌 Headers:

text
Copy
Edit
Authorization: Bearer <TOKEN>
📌 Response ตัวอย่าง:

json
Copy
Edit
{
  "logs": [
    {
      "log_id": 1,
      "booking_id": 1,
      "action": "created",
      "changed_by": 1
    }
  ]
}
🎯 สรุป
✅ เราได้ทดสอบทุกฟังก์ชันสำคัญของระบบแล้ว:

สมัครและเข้าสู่ระบบ ✅
จัดการข้อมูลผู้ใช้ ✅
จัดการข้อมูลห้อง ✅
ระบบจองห้อง ✅
ระบบบันทึกการเปลี่ยนแปลง ✅