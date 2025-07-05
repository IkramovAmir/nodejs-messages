import dotenv from "dotenv";
dotenv.config();
export const configFile = {
    PORT: process.env.PORT || 3000
};