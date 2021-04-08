//即時関数でモジュール化
const usersModule = (() => {
  const BASE_URL = "http://localhost:3000/api/v1/users";

  //ヘッダーの設定
  const headers = new Headers();
  headers.set("Content-TYPE", "application/json");
  
  const handleError = async(res)=>{
    const resJson = await res.json();

    switch (res.status){
        case 200:
            alert(resJson.message);
            location.href = "/";
            break;
        case 201:
            alert(resJson.message);
            location.href = "/";
            break;
        case 400: //リクエストのパラメータ間違い
            alert(resJson.error);
            break;
        case 404: //指定したソースが見つからない
            alert(resJson.error);
            break;
        case 500: //サーバーの内部エラー
            alert(resJson.error);
            break;
        default:
            alert("何らかのエラーが発生しました。");
            break;
    }

  }

  return {
    fetchAllUsers: async () => {
      const res = await fetch(BASE_URL); //apiを叩く
      const users = await res.json(); 

      users.map((user)=>{

          //追加するHTMLを作成
          const body = `<tr>
                          <td>${user.id}</td>
                          <td>${user.name}</td>
                          <td>${user.profile}</td>
                          <td>${user.date_of_birth}</td>
                          <td>${user.created_at}</td>
                          <td>${user.updated_at}</td>
                          <td><a href="edit.html?uid=${user.id}">編集</a></td>
                          <td><a href="followers.html?uid=${user.id}">フォロー</a></td>
                          <td><a href="followers.html?uid=${user.id}">フォロワー</a></td>
                        </tr>`;
          document
            .getElementById("users-list") //追加する場所情報を取得
            .insertAdjacentHTML("beforeend", body); //指定ＩＤの末尾にHTML書き込み
      });
    },

    createUser: async()=>{
        //入力された値を取得
        const name = document.getElementById("name").value;
        const profile = document.getElementById("profile").value;
        const date_of_birth = document.getElementById("date_of_birth").value;

        //値をオブジェクトに格納
        const body = {
            name: name,
            profile: profile,
            date_of_birth: date_of_birth
        }

        //apiに接続、新規登録
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body) //オブジェクトをJSON文字列に変換
        });

        return handleError(res);
    },

    setExistingValue: async(uid)=>{
        const res = await fetch(BASE_URL + "/" + uid);
        const resJson = await res.json();

        document.getElementById('name').value = resJson.name;
        document.getElementById('profile').value = resJson.profile;
        document.getElementById('date_of_birth').value = resJson.date_of_birth;
    },

    saveUser: async(uid)=>{
        //入力された値を取得
        const name = document.getElementById("name").value;
        const profile = document.getElementById("profile").value;
        const date_of_birth = document.getElementById("date_of_birth").value;
        const getNow = ()=> {
            const now = new Date();
            const year = now.getFullYear();
            const mon = ( '00' + (now.getMonth()+1)).slice(-2); //１を足すこと
            const day = ( '00' + now.getDate()).slice(-2);
            const hour = ( '00' + now.getHours()).slice(-2);
            const min = ( '00' + now.getMinutes()).slice(-2);
            const sec = ( '00' + now.getSeconds()).slice(-2);
        
            //出力用
            const s = year + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sec; 
            return s;
        };

        //値をオブジェクトに格納
        const update_time = getNow();
        const body = {
            name: name,
            profile: profile,
            date_of_birth: date_of_birth,
            updated_at: update_time
        };

        //apiに接続,更新
        const res = await fetch(BASE_URL + '/' + uid, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body) //オブジェクトをJSON文字列に変換
        });

        return handleError(res);
    },
    deleteUser: async(uid)=>{
        const ret = confirm('このユーザーを削除しますか？');

        if(!ret){
            return false;
        } else{
            const res = await fetch(BASE_URL + "/" + uid,{
                method: "DELETE",
                headers: headers,
            });
            return handleError(res);
        }
    }

  }
})();
