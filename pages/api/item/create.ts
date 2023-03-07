import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemeModels";
import type { NextApiResponse } from "next";
import auth from "../../../utils/auth";
import type {
  ExtendedNextApiRequestItem,
  ResMessageType,
} from "../../../utils/types";

async function create(
  req: ExtendedNextApiRequestItem,
  res: NextApiResponse<ResMessageType>
) {
  try {
    await connectDB();
    // console.log(req.body)

    //req.bodyで書き込む
    await ItemModel.create(req.body);
    return res.status(200).json({ message: "アイテム作成" });
  } catch (error) {
    return res.status(400).json({ message: "アイテム所得失敗" });
  }
}

export default auth(create);
