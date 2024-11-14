let userName;
let password;
let clientId;
let secret;


export const serverRequests = {
    api: async function () {
        const url = 'https://www.reddit.com/api/v1/access_token';

        const requestBody = new URLSearchParams({
            grant_type: "password",
            username: userName,
            password: password
        }).toString();


        const user = btoa(`${clientId}:${secret}`);

        const headers = {
            'User-Agent': 'Reddcopy/1.0 by userName',
            'Authorization': `Basic ${user}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: requestBody

            })
            if (response.ok) {
                const jsonResponse = await response.json();
                
                return jsonResponse;
            }
            else {
                throw new Error("Request failed")
            }

        }
        catch (e) {
            console.log(e);
        }

    },

    getPosts: async function (searchParam = "top", after) {
        let response;
        if (!after) {
            const URL = `https://www.reddit.com/${searchParam}.json?sr_detail=true`;
            response = await fetch(URL);
        }
        else {
            const URL = `https://www.reddit.com/${searchParam}.json?after=${after}&sr_detail=true`;
            response = await fetch(URL);  
        }
        const posts = await response.json();
        return (posts);
    },

    getPostInfo: async function (postId) {
        const getCommentsUrl = `https://www.reddit.com/comments/${postId}.json?sr_detail=true&showedits=true&showmedia=true&showmore=true&showtitle=true`;
        const response = await fetch(getCommentsUrl);
        const responseJson = await response.json();
        return responseJson;
    },

}




