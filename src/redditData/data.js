


export const serverRequests={
    api: async function (){
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
        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: requestBody
        
            })
            if (response.ok){
                const jsonResponse = await response.json();
                return jsonResponse;
            }
            else{
                throw new Error("Request failed")
            }
            
        }
        catch(e){
            console.log(e);
        }
        
    },
    
    getPosts: async function (searchParam="top", after){
        let response;
        if (!after){
            const URL = `https://www.reddit.com/${searchParam}?sr_detail=true`;
            response = await fetch(URL);
            console.log("No after: "+ URL)
        }
        else{
            const URL = `https://www.reddit.com/${searchParam}.json?after=${after}&sr_detail=true`;
            response = await fetch(URL);
            console.log("after is used: " + URL)
        }
        const posts = await response.json();
        return(posts);
    },

    getPostInfo: async function(postId){
        const url = `https://www.reddit.com/comments/${postId}.json?sr_detail=true`;
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson;
    }



}




