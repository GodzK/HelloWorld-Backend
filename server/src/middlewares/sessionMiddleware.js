import session from "express-session";

app.use(session({
    secret: process.env.SESSION_SECRET,  // รหัสลับที่ใช้เข้ารหัสข้อมูล
    resave: false,                      // ไม่ต้องบันทึกเซสชันถ้ามันไม่ได้มีการเปลี่ยนแปลง
    saveUninitialized: true,            // สร้างเซสชันแม้ว่าจะไม่มีข้อมูล
    cookie: { secure: false }           // ตั้งค่า secure เป็น false ในระหว่างการพัฒนา (เปลี่ยนเป็น true ใน production)
}));
