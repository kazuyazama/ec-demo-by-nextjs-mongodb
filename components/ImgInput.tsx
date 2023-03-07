import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";

interface Props {
  setImage: Dispatch<SetStateAction<string>>;
}

const ImgInput = ({ setImage }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<FileList | null>(null);

  const handleClick = async () => {
    try {
      if (!imageFile) return;

      const data = new FormData();
      for (const file of imageFile) {
        data.append("file", file);
      }
      data.append("upload_preset", "j3ilig6y");
      data.append("cloud_name", `${process.env.CLOUDINAEY_CLOUD_NAME}`);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINAEY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );
      const jsonData = await response.json();

      setImage(jsonData.url);

      console.log(jsonData);

      alert("画像アップロード成功");
    } catch (err) {
      alert("画像アップロード失敗");
    }
  };

  return (
    <div className="imginput">
      <input
        type="file"
        multiple
        onChange={(e) => setImageFile(e.target.files || null)}
        accept="image/png,image/jpg"
      />

      <button onClick={handleClick} disabled={!imageFile}>
        画像Upload
      </button>
    </div>
  );
};
export default ImgInput;
