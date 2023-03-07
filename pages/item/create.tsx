import ImgInput from "@/components/ImgInput";
import useAuth from "@/utils/useAuth";
import { NextPage } from "next";
import { FormEvent, useState } from "react";

const Create: NextPage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");

  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/item/create", {
        method: "POST",
        //POSTで送るデータの種類やその他詳細情報
        headers: {
          //jsonで送る設定
          Accept: "application/json",
          "Content-Type": "application/json",
          //ログインしていないと作成できない
          //ローカルストレージからtokenを取得
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        //stateの各それぞれをjson形式に変換して設定
        body: JSON.stringify({
          title: title,
          image: image,
          image2: image2,
          image3: image3,
          price: price,
          description: description,
        }),
      });
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (error) {
      alert("作成失敗");
    }
  };

  console.log(image);
  const loginUser = useAuth();

 

  console.log(loginUser);

  if (loginUser) {
    return (
      <div>
        <h1>商品作成</h1>
        <ImgInput setImage={setImage} />
        <ImgInput setImage={setImage2} />
        <ImgInput setImage={setImage3} />

        <form onSubmit={handleSubmit}>
          <input
            value={title}
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="アイテム名"
            required
          />

          <br />
          <input
            type="text"
            name="image"
            placeholder="画像"
            value={image}
            required
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="text"
            name="image"
            placeholder="画像"
            value={image2}
            onChange={(e) => setImage2(e.target.value)}
          />
          <input
            type="text"
            name="image"
            placeholder="画像"
            value={image3}
            onChange={(e) => setImage3(e.target.value)}
          />
          <br />
          <input
            type="text"
            name="price"
            placeholder="値段"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <textarea
            rows={15}
            name="description"
            placeholder="説明"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br />
          <button type="submit">作成</button>
        </form>
      </div>
    );
  } else {
    return <h3>ログインしてください</h3>;
  }
};

export default Create;
