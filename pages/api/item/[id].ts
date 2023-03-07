import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemeModels";
import type { NextApiRequest, NextApiResponse } from "next";
import auth from "../../../utils/auth";
import type {
  ResReadSingleType,
  savedItemDataType,
} from "../../../utils/types";

async function readSingle(
  req: NextApiRequest,
  res: NextApiResponse<ResReadSingleType>
) {
  try {
    await connectDB();
    console.log(req.query.id);
    //findbyidで一つだけ持ってくる  query
    const singleItem: savedItemDataType | null = await ItemModel.findById(
      req.query.id
    );
    if (!singleItem)
      return res
        .status(400)
        .json({ message: "アイテムが存在していため読み取り失敗" });
    return res
      .status(200)
      .json({ message: "取得に成功しました", singleItem: singleItem });
  } catch (error) {
    return res.status(400).json({ message: "取得できませんでした" });
  }
}

export default auth(readSingle);
