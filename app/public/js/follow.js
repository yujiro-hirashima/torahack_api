const followModule = (() =>{
    const BASE_URL = "http://localhost:3000/api/v1/users";

    return{
        
        fetchAllFollowers: async(fid)=>{
            const res_self = await fetch(BASE_URL + "/" + fid );
            const self = await res_self.json();
            document.getElementById("title")
                    .innerHTML = `${self.name}のフォロワー情報`;

            const res_followers = await fetch(BASE_URL + "/" + fid + "/followers");
            const followers = await res_followers.json();

            followers.map((follower)=>{
                const body = `<p>${follower.name}</p>`;
                document.getElementById("followers")
                        .insertAdjacentHTML("beforeend",body);
            });

            const res_following = await fetch(BASE_URL + "/" + fid + "/following");
            const following = await res_following.json();

            following.map((follow)=>{
                const body = `<p>${follow.name}</p>`;
                document.getElementById("following")
                        .insertAdjacentHTML("beforeend",body);
            });
        }
    }
})();