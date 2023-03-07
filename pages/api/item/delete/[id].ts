import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemeModels";
import type { NextApiResponse } from "next";
import auth from "../../../../utils/auth";
import type {
  ExtendedNextApiRequestAuth,
  ResReadSingleType,
  savedItemDataType,
} from "../../../../utils/types";

async function deleteItem(
  req: ExtendedNextApiRequestAuth,
  res: NextApiResponse<ResReadSingleType>
) {
  try {
    await connectDB();
    //該当のアイテムを取得  query
    const singleItem: savedItemDataType | null = await ItemModel.findById(
      req.query.id
    );
    //singleItemが存在しなかった場合
    if (!singleItem)
      return res
        .status(400)
        .json({ message: "アイテムが存在していため読み取り失敗" });
    //DBのItemに保存されているemailとDBのUserのemailが同じだった場合
    if (singleItem.email === req.body.email) {
      await ItemModel.deleteOne({ _id: req.query.id });
      return res.status(200).json({
        message: "アイテム削除に成功しました",
        singleItem: singleItem,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: "アイテム削除に失敗しました" });
  }
}

export default auth(deleteItem);
