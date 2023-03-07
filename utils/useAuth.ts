//カスタムフック

//jsonwebtoken9.0.0はブラウザではverifyでエラーとなるため、8.5.1へのダウングレードが必要
//npm remove jsonwebtoken
//npm install jsonwebtoken@8.5.1

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { DecodedType } from "./types";

const useAuth = () => {
  const secret_key = "nextmarket";
  const [loginUser, setLoginUser] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/user/login");
    }

    try {
      const decoded = jwt.verify(token as string, secret_key);
      setLoginUser((decoded as DecodedType).email);
    } catch (error) {
      router.push("/user/login");
    }
  }, [router]);

  return loginUser;
};

export default useAuth;
