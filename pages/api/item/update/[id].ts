import auth from "@/utils/auth";
import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemeModels";
import type { NextApiResponse } from "next";
import type {
  ExtendedNextApiRequestAuth,
  ResReadSingleType,
  savedItemDataType,
} from "../../../../utils/types";

async function updateItem(
  req: ExtendedNextApiRequestAuth,
  res: NextApiResponse<ResReadSingleType>
) {
  try {
    await connectDB();

    //該当のアイテムを取得 query
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
      //req.bodyを第２引数につけることによりreq.body全てをアップデート
      await ItemModel.updateOne({ _id: req.query.id }, req.body);
      return res.status(200).json({
        message: "アイテム取得に成功しました",
        singleItem: singleItem,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    return res.status(400).json({ message: "アイテム取得できませんでした" });
  }
}

export default auth(updateItem)
