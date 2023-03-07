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
import useAuth from "@/utils/useAuth";

const inter = Inter({ subsets: ["latin"] });

const Delete: NextPage<ReadSingleDataType> = ({ singleItem }) => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/item/delete/${singleItem._id}`,
        {
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
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (error) {
      alert("削除失敗");
    }
  };

  const loginUser = useAuth();

  if (loginUser === singleItem.email) {
    return (
      <div>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h2>{singleItem.title}</h2>
          <Image
            src={singleItem.image}
            width={750}
            height={500}
            alt="itemimage"
          />
          <h3>¥{singleItem.price}</h3>
          <p>{singleItem.description}</p>
          <button>削除</button>
        </form>
      </div>
    );
  } else {
    return <h3>権限がありません</h3>;
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

export default Delete;
