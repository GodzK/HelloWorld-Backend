ทดสอบฟังก์ชัน Register
Request:
Method: POST

URL: http://localhost:3000/api/users/register

Body: (เลือก raw และ JSON)

json
Copy
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "student"
}
Expected Response:
Status Code: 201 Created

Response Body:

json
Copy
{
  "message": "User registered successfully",
  "userId": 1
}
3. ทดสอบฟังก์ชัน Login
Request:
Method: POST

URL: http://localhost:3000/api/users/login

Body: (เลือก raw และ JSON)

json
Copy
{
  "email": "john.doe@example.com",
  "password": "password123"
}
Expected Response:
Status Code: 200 OK

Response Body:

json
Copy
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Cookie: จะมี token ที่ถูกตั้งค่าในคุกกี้

4. ทดสอบฟังก์ชัน Book Room
Request:
Method: POST

URL: http://localhost:3000/api/bookings

Headers:

Authorization: Bearer <token> (ใช้ token ที่ได้จากล็อกอิน)

Body: (เลือก raw และ JSON)

json
Copy
{
  "room_id": 1,
  "start_time": "2023-10-15T09:00:00Z",
  "end_time": "2023-10-15T10:00:00Z",
  "duration": 60,
  "status": "pending",
  "description": "Meeting with team"
}
Expected Response:
Status Code: 201 Created

Response Body:

json
Copy
{
  "message": "Booking Successful",
  "booking": {
    "booking_id": 1,
    "user_id": 1,
    "room_id": 1,
    "start_time": "2023-10-15T09:00:00Z",
    "end_time": "2023-10-15T10:00:00Z",
    "duration": 60,
    "status": "pending",
    "description": "Meeting with team"
  }
}
5. ทดสอบฟังก์ชัน Fetch Bookings
Request:
Method: GET

URL: http://localhost:3000/api/bookings

Headers:

Authorization: Bearer <token> (ใช้ token ที่ได้จากล็อกอิน)

Expected Response:
Status Code: 200 OK

Response Body:

json
Copy
{
  "bookings": [
    {
      "booking_id": 1,
      "user_id": 1,
      "room_id": 1,
      "start_time": "2023-10-15T09:00:00Z",
      "end_time": "2023-10-15T10:00:00Z",
      "duration": 60,
      "status": "pending",
      "description": "Meeting with team"
    }
  ]
}
6. ทดสอบฟังก์ชัน Cancel Booking
Request:
Method: DELETE

URL: http://localhost:3000/api/bookings/cancel

Headers:

Authorization: Bearer <token> (ใช้ token ที่ได้จากล็อกอิน)

Body: (เลือก raw และ JSON)

json
Copy
{
  "booking_id": 1
}
Expected Response:
Status Code: 200 OK

Response Body:

json
Copy
{
  "message": "Booking cancelled successfully"
}
7. ทดสอบฟังก์ชัน Fetch Rooms
Request:
Method: GET

URL: http://localhost:3000/api/rooms

Headers:

Authorization: Bearer <token> (ใช้ token ที่ได้จากล็อกอิน)

Expected Response:
Status Code: 200 OK

Response Body:

json
Copy
{
  "rooms": [
    {
      "room_id": 1,
      "room_name": "Conference Room A",
      "capacity": 10,
      "area": "Building 1"
    }
  ]
}
8. ทดสอบฟังก์ชัน Logout
Request:
Method: POST

URL: http://localhost:3000/api/users/logout

Headers:

Authorization: Bearer <token> (ใช้ token ที่ได้จากล็อกอิน)

Expected Response:
Status Code: 200 OK

Response Body:

json
Copy
{
  "message": "Logged out successfully"
}
Cookie: token จะถูกลบออก

9. ทดสอบฟังก์ชัน Fetch Logs
Request:
Method: GET

URL: http://localhost:3000/api/logs

Headers:

Authorization: Bearer <token> (ใช้ token ที่ได้จากล็อกอิน)

Expected Response:
Status Code: 200 OK

Response Body:

json
Copy
{
  "logs": [
    {
      "log_id": 1,
      "booking_id": 1,
      "start_time": "2023-10-15T09:00:00Z",
      "end_time": "2023-10-15T10:00:00Z",
      "action": "created",
      "changed_by": 1
    }
  ]
}
10. ทดสอบฟังก์ชัน Fetch Staff
Request:
Method: GET

URL: http://localhost:3000/api/staff

Headers:

Authorization: Bearer <token> (ใช้ token ที่ได้จากล็อกอิน)

Expected Response:
Status Code: 200 OK

Response Body:

json
Copy
{
  "staff": [
    {
      "staff_id": 1,
      "firstname": "Jane",
      "lastname": "Doe",
      "email": "jane.doe@example.com",
      "role": "admin"
    }
  ]
}
