const Item = () => {
  return (
    <>
      <h1>データ入力窓口</h1>
      <form action="http://localhost:3000/api/item/create" method="POST">
        タイトル：
        <input type="text" name="title" />
        <br />
        画像：
        <input type="text" name="image" />
        <br />
        値段：
        <input type="text" name="price" />
        <br />
        説明：
        <input type="text" name="description" />
        <br />
        メールアドレス：
        <input type="text" name="email" />
        <br />
        <button type="submit">投稿</button>
      </form>
    </>
  );
};

export default Item;
