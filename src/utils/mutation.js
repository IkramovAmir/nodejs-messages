import path from "path";
import fs from "fs/promises";

export const fsReadFile = async (filename) => {
    let data = await fs.readFile(path.join(process.cwd(), "db", filename + ".json"), "utf-8");
    return data ? JSON.parse(data) : [];
};

export const fsWriteFile = async (filename, elem) => {
    let data = await fs.writeFile(path.join(process.cwd(), "db", filename + ".json"), JSON.stringify(elem, null, 4));
    return true;
};