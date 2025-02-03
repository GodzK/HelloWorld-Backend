การอธิบายโค้ด JWT Authentication อย่างละเอียด

1. การนำเข้าไลบรารี

javascript
import { Loginuser } from "../models/authModel.js";
import jwt from "jwt-simple";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"; 
import passport from "passport";
Loginuser: ฟังก์ชันนี้ถูกนำเข้าจาก authModel.js และใช้ในการตรวจสอบข้อมูลผู้ใช้จากฐานข้อมูลหรือแหล่งข้อมูลภายนอก
jwt-simple: ไลบรารีที่ใช้ในการเข้ารหัสและถอดรหัส JSON Web Tokens (JWT)
passport-jwt: ไลบรารีที่ใช้ในการจัดการการตรวจสอบ JWT ภายใน Passport
Strategy as JwtStrategy: นำเข้า Strategy จาก passport-jwt และเปลี่ยนชื่อเป็น JwtStrategy เพื่อใช้ในการสร้างกลยุทธ์การตรวจสอบ JWT
ExtractJwt: ใช้ในการดึง JWT จากคำขอ (request)
passport: ไลบรารีที่ใช้ในการจัดการการพิสูจน์ตัวตนของผู้ใช้ในแอปพลิเคชัน
2. การกำหนดค่ารหัสลับ (Secret Key)
javascript
แสดงรายละเอียดเสมอ

คัดลอก
const SECRET = "your-secret-key-here";
ที่นี่คุณสามารถกำหนดค่ารหัสลับ (secret key) ซึ่งเป็นค่าสำคัญที่ใช้ในการเข้ารหัสและถอดรหัส JWT โดยต้องเก็บให้ปลอดภัย

3. การกำหนดค่า JWT Options และกลยุทธ์ในการตรวจสอบ JWT
javascript
แสดงรายละเอียดเสมอ

คัดลอก
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: SECRET,
};

const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
    if (payload.sub === "admin") done(null, true);
    else done(null, false);
});
jwtOptions: ตัวแปรนี้ใช้สำหรับตั้งค่าการดึง JWT จาก request header และการตั้งค่า secretOrKey สำหรับการตรวจสอบ
ExtractJwt.fromHeader("authorization"): ใช้เพื่อดึง JWT ออกจาก header ของ request
JwtStrategy: สร้างกลยุทธ์การตรวจสอบ JWT โดยกำหนดให้ payload.sub (ข้อมูลที่เก็บใน JWT) เป็น "admin" เพื่อให้ผู้ใช้ที่เป็น admin สามารถผ่านการตรวจสอบได้
4. การใช้ Passport ในการตรวจสอบ JWT
javascript
แสดงรายละเอียดเสมอ

คัดลอก
passport.use(jwtAuth);
ที่นี่เรากำหนดให้ Passport ใช้กลยุทธ์การตรวจสอบ JWT ที่เราสร้างขึ้นมา

5. การดำเนินการในฟังก์ชัน authUser
javascript
แสดงรายละเอียดเสมอ

คัดลอก
export const authUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userdata = await Loginuser(username, password);
        const payload = {
            sub: req.body.username,
            iat: new Date().getTime(),
        };
        if (userdata === true) {
            return res.status(200).json({
                message: "Login successful",
                jwtcode: jwt.encode(payload, SECRET),
            });
        } else {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
username, password: รับข้อมูลผู้ใช้จาก req.body ที่ส่งเข้ามาจากคำขอ
Loginuser(username, password): ตรวจสอบข้อมูลผู้ใช้ว่าเป็นผู้ใช้ที่ถูกต้องหรือไม่
payload: สร้างข้อมูล payload ที่จะถูกเข้ารหัสใน JWT
jwt.encode(payload, SECRET): เข้ารหัสข้อมูล payload โดยใช้ SECRET ที่เรากำหนดไว้ในตอนต้น
ถ้าผู้ใช้ถูกต้อง เราจะส่ง JWT กลับไปให้ผู้ใช้เพื่อใช้ในการพิสูจน์ตัวตนในการร้องขอครั้งถัดไป

6. การจัดการข้อผิดพลาด
หากพบข้อผิดพลาดในกระบวนการเข้าสู่ระบบ (เช่น ข้อมูลไม่ถูกต้อง) จะมีการส่งข้อความผิดพลาดกลับไปยังผู้ใช้

401: ถ้าผู้ใช้ไม่ถูกต้อง หรือข้อมูลผิด
500: ถ้าเกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
ข้อสรุป: ในโค้ดนี้ เราสร้างระบบการตรวจสอบผู้ใช้ (Authentication) โดยใช้ JWT ผ่าน Passport.js ซึ่งจะช่วยให้สามารถยืนยันตัวตนของผู้ใช้และให้สิทธิ์การเข้าถึงส่วนต่าง ๆ ของแอปพลิเคชันได้