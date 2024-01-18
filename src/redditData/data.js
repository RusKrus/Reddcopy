const clientId = "MjqQYi3e216qkBZjvkp_cA";
const secret = "HSlJzMl6eOo28fO1dRMrAjd3clwOcw";
const userName = "Inside-Importance370";
const password = "rust1999081155555";


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
    
        popularPosts: async function (searchParam="top", after){
        
        try{
            let response;
            if (!after){
                response = await fetch(`https://www.reddit.com/${searchParam}.json?sr_detail=true`);
                
            }
            else{
                response = await fetch(`https://www.reddit.com/${searchParam}.json?after=${after}?sr_detail=true`)
            }
            
            if (response.ok){
                const posts = await response.json();
                return(posts)
            }
            
            console.log("Error occured")
            
            
        }
        catch(e){
            console.log(e)
        }
    
    },
    getPostInfo: async function(postId){
        const url = `https://www.reddit.com/comments/${postId}.json?sr_detail=true`;
        try{
            const response = await fetch(url);
            if(response.ok){
                const responseJson = await response.json();
                return responseJson;
            }
            else{
                console.log("Error occured");
            }
        }
        catch(e){
            console.log(e)
        }

    }



}




