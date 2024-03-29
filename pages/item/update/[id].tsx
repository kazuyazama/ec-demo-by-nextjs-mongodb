import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { ReadSingleDataType } from "@/utils/types";
import { useState } from "react";
import useAuth from "@/utils/useAuth";
import ImgInput from "@/components/ImgInput";

const inter = Inter({ subsets: ["latin"] });

const UpdateItem: NextPage<ReadSingleDataType> = ({ singleItem }) => {
  const [title, setTitle] = useState(singleItem.title);
  const [image, setImage] = useState(singleItem.image);
  const [price, setPrice] = useState(singleItem.price);
  const [description, setDescription] = useState(singleItem.description);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/item/update/${singleItem._id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: title,
            price: price,
            image: image,
            description: description,
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (error) {
      alert("作成失敗");
    }
  };

  const loginUser = useAuth();

  if (loginUser === singleItem.email) {
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ImgInput setImage={setImage} />
        <ImgInput setImage={setImage} />
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            value={title}
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="アイテム名"
            required
          />
          <br />

          <br />
          <input
            type="text"
            name="image"
            placeholder="画像"
            value={image}
            required
            onChange={(e) => setImage(e.target.value)}
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

          <button>更新</button>
        </form>
      </>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export const getServerSideProps: GetServerSideProps<
  ReadSingleDataType
> = async (context) => {
  const response = await fetch(
    `http://localhost:3000/api/item/${context.query.id}`
  );
  const singleItem = await response.json();
  return {
    props: singleItem,
  };
};

export default UpdateItem;
