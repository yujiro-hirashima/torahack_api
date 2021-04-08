const indexModule = (() => {
  const path = location.pathname;

  switch (path) {
    case "/":
      //検索ボタンをクリックした時のイベントリスナー設定
      document.getElementById("search-btn").addEventListener("click", () => {
        return searchModule.searchUsers();
      });

      //UsersモジュールのfetchAllUsersメソッドを呼び出す
      return usersModule.fetchAllUsers();

    case "/create.html":
      document.getElementById("save-btn").addEventListener("click", () => {
        return usersModule.createUser();
      });
      document.getElementById("cancel-btn").addEventListener("click", () => {
        return (location.href = "/");
      });

    case "/edit.html":
      const uid = location.search.split("?uid=")[1];

      document.getElementById("edit-btn").addEventListener("click", () => {
        return usersModule.saveUser(uid);
      });
      document.getElementById("cancel-btn").addEventListener("click", () => {
        return (location.href = "/");
      });
      document.getElementById("delete-btn").addEventListener("click", () => {
        return usersModule.deleteUser(uid);
      });

      return usersModule.setExistingValue(uid);

    case "/followers.html":
        const fid = location.search.split("?uid=")[1];

        return followModule.fetchAllFollowers(fid);

    default:
      break;
  }
})();
