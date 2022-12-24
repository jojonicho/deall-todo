import { User } from "../entity/User";
import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants";
import { appDataSource } from "../datasource";

export const createAccessToken = (user: User) => {
  return sign(
    {
      userId: user.id,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

export const createRefreshToken = (user: User) => {
  return sign(
    {
      userId: user.id,
      tokenVersion: user.tokenVersion,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const revokeRefreshTokens = async (userId: number) => {
  await appDataSource.manager
    .getRepository(User)
    .increment({ id: userId }, "tokenVersion", 1);
};

export const getErrorAuthResponse = () => ({ ok: false, accessToken: "" });
