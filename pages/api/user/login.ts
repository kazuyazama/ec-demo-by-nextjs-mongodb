// ログイン
import jwt from "jsonwebtoken";
import connectDB from "@/utils/database";
import { UserModel } from "@/utils/schemeModels";
import { NextApiRequest, NextApiResponse } from "next";
import type {  ExtendedNextApiRequestUser, ResMessageType,savedUserDataType } from "../../../utils/types";


//シークレットキー　発行されたトークンの安全性を高めるために使用する
const secret_key = "nextmarket";

async function loginUser(req: ExtendedNextApiRequestUser, res: NextApiResponse<ResMessageType>) {
  try {
    await connectDB();
    const savedUserData:savedUserDataType | null = await UserModel.findOne({ email: req.body.email });

    if (savedUserData) {
      // emailが存在する場合の処理

      if (req.body.password === savedUserData.password) {
        //パスワードが存在する場合

        //ペイロード　トークンに含ませたいデータ
        const payload = {
          email: req.body.email,
        };

        //jwtのトークンを発行 ペイロード、シークレットキー、有効期限の３つが必要　順番順
        const token = jwt.sign(payload, secret_key, { expiresIn: "23h" });
        console.log(token);
        return res.status(200).json({ message: "ログイン成功", token: token });
      } else {
        //パスワードが存在しない場合
        return res.status(400).json({ message: "パスワードが間違っています" });
      }
    } else {
      //emailが存在しない場合
      return res.status(400).json({ message: "ユーザー登録をしてください" });
    }
  } catch (error) {
    return res.status(400).json({ message: "ログイン失敗" });
  }
}

export default loginUser;
