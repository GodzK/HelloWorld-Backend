import { Loginuser } from "../models/authModel.js";
import jwt from "jwt-simple";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"; 
import passport from "passport";

const SECRET = "your-secret-key-here"; 

export const authUser = async (req, res) => {
  const { username, password } = req.body; 
  
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"), 
    secretOrKey: SECRET, 
  };


  const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {

    if (payload.sub === "admin") done(null, true);
    else done(null, false); 
  });
  
  passport.use(jwtAuth);

  try {

    const userdata = await Loginuser(username, password);


    const payload = {
      sub: username, 
      iat: new Date().getTime(), 
    };

   
    if (userdata === true) {
      const token = jwt.encode(payload, SECRET); 
      return res.status(200).json({
        message: "Login successful",
        jwtcode: token, 
      });
    } else {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
