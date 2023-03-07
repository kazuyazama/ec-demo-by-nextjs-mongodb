import { NextPage } from "next";
import { FormEvent, useState } from "react";

const Register:NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        //POSTで送るデータの種類やその他詳細情報
        headers: {
          //jsonで送る設定
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        //stateの各それぞれをjson形式に変換して設定
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (error) {
      alert("ユーザー登録失敗");
    }
  };
  return (
    <div>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="名前"
          required
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="メールアドレス"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="password"
          placeholder="パスワード"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>登録</button>
      </form>
    </div>
  );
};

export default Register;
