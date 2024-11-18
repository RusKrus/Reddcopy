import { /*Headers,*/ ReceivedPostsData, ReceivedSinglePostData } from "../helperData/types";


/*
let userName: string;
let password: string;
let clientId: string;
let secret: string;
*/

export const serverRequests = {
    //not used for now]
    /*
    api: async function () {
        const url = 'https://www.reddit.com/api/v1/access_token';

        const requestBody: string = new URLSearchParams({
            grant_type: "password",
            username: userName,
            password: password
        }).toString();


        const user: string = btoa(`${clientId}:${secret}`);

        const headers: Headers = {
            'User-Agent': 'Reddcopy/1.0 by userName',
            'Authorization': `Basic ${user}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        try {
            const response: Response = await fetch(url, {
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
    */
    getPosts: async function (searchParam: string = "top", after?: string): Promise<ReceivedPostsData> {
        let response: Response;
        if (!after) {
            const URL: string = `https://www.reddit.com/${searchParam}.json?sr_detail=true`;
            response = await fetch(URL);
        }
        else {
            const URL: string = `https://www.reddit.com/${searchParam}.json?after=${after}&sr_detail=true`;
            response = await fetch(URL);  
        }
        const responseJson: ReceivedPostsData = await response.json();
        return responseJson;
    },

    getPostInfo: async function (postId: string): Promise<ReceivedSinglePostData> {
        const getCommentsUrl = `https://www.reddit.com/comments/${postId}.json?sr_detail=true&showedits=true&showmedia=true&showmore=true&showtitle=true`;
        const response = await fetch(getCommentsUrl);
        const responseJson: ReceivedSinglePostData = await response.json();
        return responseJson;
    }

}




