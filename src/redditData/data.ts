import { ReceivedPostsData, ReceivedSinglePostData } from "../helperData/types";



//going to be used later


const clientId: string = '';
const clientSecret: string = '';
const username: string = '';
const password: string = '';
const credentials: string = btoa(`${clientId}:${clientSecret}`);

export const serverRequests = {
    
    getApiKey: async function () {
        const url = 'https://www.reddit.com/api/v1/access_token';

        const headers = {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Reddcopy',
        };

        const body = new URLSearchParams({
            grant_type: 'password',
            username,
            password

        });

        try {
            const response: Response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
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
            throw new Error('Reuquest failed on client side');
        }

    },
    
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




