import { Types } from "mongoose";
import { NextApiRequest } from "next";

/*バックエンド*/

//schemeModels
export interface ItemDataType {
  title: string;
  image: [string];
  image2: string;
  image3: string;
  price: string;
  description: string;
  email: string;
}

//schemeModels
export interface UserDataType {
  name: string;
  email: string;
  password: string;
}

//auth.ts
export interface DecodedType {
  email: string;
}

//auth.ts
//NextApiRequestのbodyの方をextendsで変更
export interface ExtendedNextApiRequestAuth extends NextApiRequest {
  body: {
    email: string;
  };
  headers: {
    authorization: string;
  };
}

//register.ts,login.ts
export interface ExtendedNextApiRequestUser extends NextApiRequest {
  body: UserDataType;
}

//UserDataTypeにextendsで_idを追加
export interface savedUserDataType extends UserDataType {
  _id: Types.ObjectId;
}

//common
export interface ResMessageType {
  message: string;
  token?: string;
}

//create.ts,readAll.ts,update/[id].ts,delete/[id].ts
export interface savedItemDataType extends ItemDataType {
  _id: Types.ObjectId;
}

//readAll.ts
export interface ResReadAllType {
  message: string;
  allItems?: savedItemDataType[];
}

//create.ts
export interface ExtendedNextApiRequestItem extends NextApiRequest {
  body: ItemDataType;
}

//[id].ts
export interface ResReadSingleType {
  message: string;
  singleItem?: savedItemDataType;
}

/*フロントエンド*/

//item/[id].tsx ,update/[id].tsx,delete/[id].tsx
export interface ReadSingleDataType {
  singleItem: {
    _id: string;
    title: string;
    image: string;
    image2?: string;
    image3?: string;
    price: string;
    description: string;
    email: string;
  };
}

//index.tsx
export interface ReadAllDataType {
  allItems: {
    _id: string;
    title: string;
    image: string;
    price: string;
    description: string;
    email: string;
  }[];
}
