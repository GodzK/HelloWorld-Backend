export const Loginuser = async (username, password) => {
  try {
    if (username === "admin" && password === "1234") {
      return true;
    } else {
      return false; 
    }
  } catch (err) {
    throw err; 
  }
};
