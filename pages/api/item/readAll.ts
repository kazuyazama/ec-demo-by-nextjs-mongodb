import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemeModels";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ResReadAllType, savedItemDataType } from "../../../utils/types";

export default async function readAll(
  req: NextApiRequest,
  res: NextApiResponse<ResReadAllType>
) {
  try {
    await connectDB();
    //findで読み取る
    const allItems: savedItemDataType[] = await ItemModel.find();
    return res
      .status(200)
      .json({ message: "アイテム読み取り成功(オール)", allItems: allItems });
  } catch (error) {
    return res.status(400).json({ message: "アイテム読み取り失敗（オール）" });
  }
}
