//ミドルウェア　特定の機能を持って他の処理を補助するもの
//作成、修正、削除の処理はログインしているユーザーにだけ許可する　handlerで受け取る
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import type {
  DecodedType,
  ExtendedNextApiRequestAuth,
  ResMessageType,
} from "../utils/types";

const secret_key = "nextmarket";

const auth = (handler: Function) => {
  return async (
    req: ExtendedNextApiRequestAuth,
    res: NextApiResponse<ResMessageType>
  ) => {
    if (req.method === "GET") {
      //GETの場合はそのまま返す
      return handler(req, res);
    }
    //トークン取得
    //空白スペースのとこで分割して2番目を取得
    const token = req.headers.authorization.split(" ")[1];
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphbWFAcmVzdGFydHMuY28uanAiLCJpYXQiOjE2Nzc4NTE1NTUsImV4cCI6MTY3NzkzNDM1NX0.bB9Z7f4b0RuroBoxt54qnHZmNyRScdY-SbgV3N2EfXQ"

    if (!token) {
      return res.status(401).json({ message: "トークンがありません" });
    }

    //トークンがあった場合
    try {
      const decoded = jwt.verify(token, secret_key);
      //req.body.emailにtokenのemailを当てる
      //asを使うものを型アサーションという
      req.body.email = (decoded as DecodedType).email;
      return handler(req, res);
    } catch (error) {
      return res
        .status(401)
        .json({ message: "トークンが正しくないので、ログインしてください" });
    }
  };
};

export default auth;
