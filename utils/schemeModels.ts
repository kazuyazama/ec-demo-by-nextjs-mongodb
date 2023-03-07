//スキーマモデル作成

import mongoose from "mongoose";
import type { ItemDataType, UserDataType } from "../utils/types";

const Schema = mongoose.Schema;

//スキーマ定義

//商品データ
const ItemSchema = new Schema<ItemDataType>({
  title: String,
  image:String,
  image2: String,
  image3: String,
  price: String,
  description: String,
  email: String,
});

//ユーザーデータ
const UserSchema = new Schema<UserDataType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    //必須
    required: true,
    //同じメールアドレスでは作成できないようにする
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//スキーマをItemというものに割り当ててモデルを作成
//モデルがすでに存在する場合は、そのモデルを再利用する

//商品のモデル
export const ItemModel =
  mongoose.models.Item || mongoose.model("Item", ItemSchema);
//ユーザーのモデル
export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
