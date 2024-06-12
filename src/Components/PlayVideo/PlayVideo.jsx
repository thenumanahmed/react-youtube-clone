import React, { useEffect, useState } from 'react'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import moment from 'moment'

import './PlayVideo.css'
import { API_KEY, value_converter } from '../../data'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {

    const {videoId} = useParams();

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    const fetchVideoData = async ()=>{
        const videoDetailUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(videoDetailUrl).then(res=>res.json()).then(data => setApiData(data.items[0]));
    }

    const fetchOtherData= async ()=>{
        //fetching channel data
        const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channelDataUrl).then(response=>response.json()).then(data=>setChannelData(data.items[0]));

        //fetching comment data
        const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
        await fetch(commentUrl).then(res=>res.json()).then(data=>setCommentData(data.items))
    }

    useEffect(()=>{
        fetchVideoData();
    },[videoId])

    useEffect(()=>{
       if(apiData) fetchOtherData();
    },[apiData])

    return (
        <div className='play-video'>
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}></iframe>
            <h3 > {apiData? apiData.snippet.title:"Title here" }</h3>
            <div className="play-video-info">
                <p>
                    {apiData?value_converter(apiData.statistics.viewCount):"16k"} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}
                </p>
                <div> 
                    <span><img src={like} alt=''/> {apiData?value_converter(apiData.statistics.likeCount):"155"}</span>
                    <span><img src={dislike} alt=''/> </span>
                    <span><img src={share} alt=''/> Share</span>
                    <span><img src={save} alt=''/> Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt='' />
                <div>
                    <p>{apiData?apiData.snippet.channelTitle:""}</p>
                    <span>{channelData?value_converter(channelData.statistics.subscriberCount):"-"} Subsribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className='vid-description'>
                <p>{apiData?apiData.snippet.description.slice(0,250):"Description here"}</p>
                <hr />
                <h4>{apiData?value_converter(apiData.statistics.commentCount):10} Comments</h4>
                {commentData && commentData.length > 0 ? (
                    commentData.map((item,index)=>{
                        return (
                            <div key={index} className="comment">
                                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt=''/>
                                <div>
                                    <h3> {item.snippet.topLevelComment.snippet.authorDisplayName} <span> 1 day ago</span></h3>
                                    <p> {item.snippet.topLevelComment.snippet.textDisplay} </p>
                                    <div className="comment-action">
                                        <img src={like} alt='' />
                                        <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                                        <img src={dislike} alt='' />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div>No comments available.</div>
                )}
            </div>
        </div>
    )
}

export default PlayVideo
