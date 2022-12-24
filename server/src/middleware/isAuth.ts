import { verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constants";

export const isAuth = (req, res, next) => {
  const authorize = req.headers["authorization"];
  if (!authorize) {
    return res.send({ ok: false, message: "must be authenticated" });
  }

  try {
    const token = authorize.split(" ")[1];
    const payload = verify(token, ACCESS_TOKEN_SECRET);
    req.payload = payload;
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, message: "must be authenticated" });
  }
  return next();
};
