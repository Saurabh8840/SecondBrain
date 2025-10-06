import jwt, { SignOptions, Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessSecret = process.env.ACCESS_TOKEN_SECRET as Secret;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET as Secret;

if (!accessSecret || !refreshSecret) {
  throw new Error("JWT secrets are missing in environment variables");
}

export const generateAccessToken = (userId: number): string => {
  return jwt.sign(
    { id: userId },
    accessSecret,
    {
      expiresIn: (process.env.ACCESS_TOKEN_EXPIRY as `${number}${'s' | 'm' | 'h' | 'd' | 'y'}`) || "1h",
    }
  );
};

export const generateRefreshToken = (userId: number): string => {
  return jwt.sign(
    { id: userId },
    refreshSecret,
    {
      expiresIn: (process.env.REFRESH_TOKEN_EXPIRY as `${number}${'s' | 'm' | 'h' | 'd' | 'y'}`) || "7d",
    }
  );
};
