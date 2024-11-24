import { Player } from "../videojs/VideoJS";

//common types
export type DeviceData = {
    model?: string,
    type?: string,
    vendor?: string
};

export type ParserResult = {
    getDevice: ()=>DeviceData,
    [otherData: string]: any
};

export type ObserverEntryType = {
    isIntersecting: boolean,
    target: Element,
    [otherKeys:string]: any
};


export type GalleryInfoType = {
    [key:string]:{
        s: {
            u: string,
            x: number,
            y: number
        },
        [key:string]: any;
    }
}

export type ImageGalleryProp = {
        original: string,
        thumbnail: string,
        originalAlt: string,
        thumbnailAlt: string
}

export type imgResolutions = {
    source: {
        url: string,
        width: number,
        height: number
    },
    resolutions: {
        height: number, 
        width: number, 
        url: string
    }[]
}

export type ImageGalleryPhoto = {
    original: string,
    thumbnail: string,
    originalAlt: string,
    thumbnailAlt: string
}

//component props types
export type MediaContainerProps = {
    containerType: string,
    deviceData: DeviceData,
    galleryInfo?: GalleryInfoType,
    title: string,
    mediaType?: string,
    imgResolutions?: imgResolutions,
    media: string,
    video?: string,
    isGallery?: boolean,
    thumbnail: string,
    isNsfw: boolean,
    isSelf: boolean,
    htmlDataForParseSelfText:{
        selfTextHTML?: string,
        htmlStringIframe?: string 
    },
    flairProps: {
        flairText: string, 
        flairTextColor: string, 
        flairBackgroundColor: string
    }
};

export type VideojsProps = {
    options: {
      muted:boolean,
      autoplay: boolean,
      controls: boolean,
      responsive: boolean,
      sources: {
          src?: string,
          type: string
      }[]
      },
    onReady: (player: Player) => void,
    className: string,
    isShowNsfwClicked: boolean,
    isAppleMobileDevice: boolean
  };

export type PostBoxProps = {
    deviceData: DeviceData, 
    subredditName: string,
    author: string,
    title: string, 
    score: number,
    media: string,
    imgResolutions?: imgResolutions,
    time: number,
    video?: string
    mediaType?: string,
    iconUrlWithSearchParam: string,
    reserverIconUrl: string, 
    selfTextHTML?: string,
    numComments: number, 
    isGallery?: boolean,
    thumbnail: string,
    isNsfw: boolean, 
    isSelf: boolean,
    htmlStringIframe?: string,
    flairText: string,
    flairTextColor: string, 
    flairBackgroundColor: string,
    id: string
};

export type CommentProps = {
    comment: Comment
}

export type LikesCounterProps = {
    score?: number,
    containerType: string
}

export type FailedToLoadProps = {
    reloadAction: Function
    actionParam?: string
}

export type NotFoundProps = {
    text: string;
}

//server answer types
export interface PostData {
    subreddit_name_prefixed: string,
    author: string,
    title: string,
    score: number,
    url: string,
    preview?: {
        enabled: boolean, 
        images: imgResolutions[]
    },
    created_utc: number,
    media?:{
        reddit_video?:{
            hls_url: string,
            [otherData: string]: any
        }, 
        oembed?:{
            html: string,
            [otherData: string]: any
        },
        [otherData: string]: any
    },
    post_hint?: string,
    sr_detail: {
        community_icon: string,
        icon_img: string,
        [otherData: string]: any
    },
    selftext_html?: string,
    num_comments: number,
    is_gallery?: boolean,
    thumbnail: string, 
    over_18: boolean,
    is_self: boolean,
    link_flair_text: string,
    link_flair_text_color: string,
    link_flair_background_color: string,
    id: string,
    [otherData: string]: any
};

export type ReceivedPostsData = {
    kind: string,
    data: {
        after: string,
        children: Post[]
    }
}

export interface PostAreaData extends PostData {
    followers: number,
    media_metadata?: GalleryInfoType
};

export type ReceivedSinglePostData = [
    {
        kind: string,
        data: {
            children: {
                kind: string,
                data: PostAreaData
            }[],
            [otherPorps: string]: any
        }
    },
    {
        kind: string,
        data: {
            children: Comment[],
            [otherPorps: string]: any
        }
    }
]

export type Comment = {
    kind: string, 
    data:{
        author: string,
        created_utc: number,
        body_html: string,
        score: number,
        replies: {
            kind: string,
            data: {
                children: Comment[],
                [otherPorps: string]: any
            },
            
        } | "",
        [otherPorps: string]: any
    }
};


//slices types
export type Post = {
    kind: string,
    data: PostData
};


export interface initialFeedAreatState {
    after: string,
    status: string,
    posts: {
        [key: string]: Post[],
    }
};

export type PostAreaState = {
    postData: { 
        [postId: string]: {
            postInfo: {kind: string, data: PostAreaData}[] | null,
            postComments: Comment[] | null
        }
    }, 
    status: "idle" | "loading" | "loaded" | "rejected"
};

export type headerSliceState = {
        inputValue: string,
        filterValue: string,
        showHeader: boolean
}

//Payload types
export type feedAreaPayload = {
    data: {
        kind: string, 
        data: {
            [key: string]: any,
            children: Post[]
        }
    },
    searchParam: string
};

export type PostAreaPayload = {
    postId: string,
    data: ReceivedSinglePostData
};

//server request types 
        
export type Headers= {
    'User-Agent': string;
    Authorization: string;
    'Content-Type': string;
};

//testing types 
export type MockedPostServerAnswerParams = ({
    publicDescription?: string,
    comments?: Comment[],
    iconUrl?: string,
    iconUrlSpare?: string,
    numComments?: number,
    media?:{
        reddit_video?:{
            hls_url: string,
            [otherData: string]: any
        }, 
        oembed?:{
            html: string,
            [otherData: string]: any
        },
        [otherData: string]: any
    },
    postHint?: string,
    isSelf?: boolean,
    selfText?: string,
});

