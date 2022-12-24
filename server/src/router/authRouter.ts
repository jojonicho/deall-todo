import { Router } from "express";
import { verify } from "jsonwebtoken";
import { COOKIE_NAME, REFRESH_TOKEN_SECRET } from "../constants";
import { appDataSource } from "../datasource";
import { User } from "../entity/User";
import { isAuth } from "../middleware/isAuth";
import {
  getErrorAuthResponse,
  createRefreshToken,
  createAccessToken,
} from "../utils/auth";
import { sendRefreshToken } from "../utils/sendRefreshToken";

export const authRouter = Router();
authRouter.post("/refresh_token", async (req, res) => {
  // refresh token
  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    return res.send(getErrorAuthResponse());
  }

  let payload: any = null;
  try {
    payload = verify(token, REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    return res.send(getErrorAuthResponse());
  }

  try {
    const user = await appDataSource.getRepository(User).findOneBy({
      id: payload.userId,
    });
    if (!user || user.tokenVersion !== payload.tokenVersion) {
      return res.send(getErrorAuthResponse());
    }
    sendRefreshToken(res, createRefreshToken(user));
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  } catch (e) {
    console.log(e);
    return res.send(getErrorAuthResponse());
  }
});

authRouter.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await User.create({
      email,
      username,
      password,
    }).save();
    res.send({ ok: true, user });
  } catch (err) {
    res.send({ ok: false, error: err.message });
  }
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await appDataSource.getRepository(User).findOneBy({
    username,
  });
  if (!user || user.password !== password) {
    return res.send({ ok: false, error: "Invalid username or password" });
  }

  sendRefreshToken(res, createRefreshToken(user));
  const accessToken = createAccessToken(user);
  return res.send({ ok: true, accessToken });
});

authRouter.get("/me", isAuth, async (req: any, res) => {
  return res.send({ ok: true, payload: req?.payload });
});
