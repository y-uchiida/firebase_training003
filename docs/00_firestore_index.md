# firestore にインデックスを貼る

ログインしたユーザーごとの todo の一覧を取得する処理を以下のように記述した

```ts
/** ログインしたときにTodoの一覧を取得する */
useEffect(() => {
  if (currentUser === null) {
    return;
  }

  const todoItemsCollectionRef = collection(db, "todoItems");
  const q = query(
    todoItemsCollectionRef,
    orderBy("createdAt", "desc"),
    where("uid", "==", currentUser?.uid)
  );
  const unSub = onSnapshot(
    q,
    (snapshot) => {
      setTodoList(
        snapshot.docs.map<TodoItem>((doc) => {
          return {
            id: doc.id,
            uid: doc.data().uid,
            title: doc.data().title,
            isComplete: doc.data().isComplete,
            country: doc.data().country,
            createdAt: doc.data().createdAt,
          };
        })
      );
    },
    (err) => {
      console.log(err);
    }
  );
  return unSub;
}, [currentUser]);
```

すると、コンソールに以下のエラーが。

```plain
FirebaseError: The query requires an index. You can create it here: https://console.firebase.google.com/v1/r/project/XXXXXXXX/firestore/indexes?create_composite=XXXXXXXXXXXX
```

※url はダミーのものに変更

どうやら、ソートに用いるフィールドと絞り込み条件に用いるフィールドが異なっていると処理できない仕様になっているみたい。  
なので、単一のフィールドとみなせるように復号インデックスを作れということらしい。

親切なことに、エラーメッセージに示される`create it here` の URL をクリックすると該当のインデックス作成画面を開いてくれるので、そのまま「インデックスを作成」ボタンを押して完了。

firestore では複数のフィールドにまたがって条件指定ができない、ということは覚えておいた方がよさそう。

## 参考

- 【Firebase】Cloud Firestore の複合クエリを作る:  
  https://zenn.dev/tentel/articles/35040a2782990c

- Cloud Firestore のインデックスの種類 | Firebase ドキュメント:  
  https://firebase.google.com/docs/firestore/query-data/index-overview?hl=ja
