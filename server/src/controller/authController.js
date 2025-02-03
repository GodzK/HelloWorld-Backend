import { Loginuser } from "../models/authModel.js";
import jwt from "jwt-simple";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"; // Correct import
import passport from "passport";

const SECRET = "your-secret-key-here"; // You should store this in an environment variable, not in the code.

export const authUser = async (req, res) => {
  const { username, password } = req.body; // Extract username and password from the request
  
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"), // Extract JWT from 'authorization' header
    secretOrKey: SECRET, // The secret key to verify the token
  };

  // Define Passport JWT strategy for user authentication
  const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
    // If the JWT payload has the correct subject (sub), consider the user authenticated
    if (payload.sub === "admin") done(null, true);
    else done(null, false); // Invalid user
  });
  
  passport.use(jwtAuth);

  try {
    // Check user credentials with the Loginuser function
    const userdata = await Loginuser(username, password);

    // Payload to store in JWT (sub is the subject)
    const payload = {
      sub: username, // Store the username in the 'sub' field of the token
      iat: new Date().getTime(), // Issued at timestamp
    };

    // If login is successful, generate a JWT token
    if (userdata === true) {
      const token = jwt.encode(payload, SECRET); // Encode the token with payload and secret key
      return res.status(200).json({
        message: "Login successful",
        jwtcode: token, // Send the generated JWT in response
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
