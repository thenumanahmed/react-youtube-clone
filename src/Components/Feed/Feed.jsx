import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'

import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'

const Feed = ({category,query}) => {

    const [data,setData] = useState([]);

    const fetchCategoryData = async()=>{
        const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

        await fetch(videoListUrl).then(response=>response.json()).then(data=>setData(data.items))
    }
    const fetchQueryData = async()=>{
        const searchByKeywordUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${API_KEY}`;
        await fetch(searchByKeywordUrl).then(response=>response.json()).then(data=>setData(data.items))
    }

    useEffect(()=>{
        fetchCategoryData();
    },[category])

    useEffect(()=>{
        fetchQueryData();
    },[query])

  return (
    <div className="feed">
    {
        data.map((item, index) => {
            return (
                <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card' key={`item-${index}`}>
                    {item.snippet.thumbnails?.medium?.url ? (
                        <img src={item.snippet.thumbnails.medium.url} alt=''/>
                    ) : (
                        <img src="default-thumbnail.jpg" alt=''/>
                    )}
                    <h2>{item.snippet.title} </h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{item.statistics?.viewCount ? (
                        `${value_converter(item.statistics.viewCount)} Views`
                    ) : (
                        'No views data'
                    )} &bull; {moment(item.snippet.publishedAt).fromNow()} </p>
                </Link>
            )
        })
    }
</div>
  )
}

export default Feed
