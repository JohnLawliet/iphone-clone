import { useRef } from "react"
import {hightlightsSlides} from "../constants"
import { useState } from "react"
import { useEffect } from "react"
import { pauseImg, playImg, replayImg } from "../utils"

const VideoCarousel = () => {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false
    })
    const {isEnd, startPlay, videoId, isLastVideo, isPlaying} = video
    const [loadedData, setLoadedData] = useState([])

    useEffect(() => {

    }, [startPlay, videoId, isPlaying, loadedData])

    useEffect(() => {
        const currentProgress = 0
        let span = videoSpanRef.current
        if (span[videoId]){
            //animate the progress of video
            let anim = gsap.to(span[videoId], {
                onStart: () => {

                },
                onComplete: () => {

                }
            })
        }

    }, [videoId, startPlay])

    const handleProcess = (type, i) => {
        switch(type){
            case 'video-end':
                setVideo(prev => ({
                    ...prev, isEnd: true, videoId: i+1
                }))
                break   
            case 'video-last':
                setVideo(prev => ({
                    ...prev, isLastVideo: true
                }))
                break;
            case 'video-reset':
                setVideo(prev => ({
                    ...prev, isLast:false, videoId: 0
                }))
                break;
            case 'play' :
                setVideo(prev => ({
                    ...prev, isPlaying: !prev
                }))
                break
            default:
                return video;
        }
    }

  return (
    <>
        <div className="flex items-center">
            {
                hightlightsSlides.map((list,i) => (
                    <div className="sm:pr-20 pr-10" key={list.id} id="slider">
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video 
                                    id="video"
                                    playsInline={true}
                                    muted
                                    preload="auto"
                                    ref={el => videoRef.current[i] = el}
                                    onPlay={() => {
                                        setVideo(prev => ({
                                            ...prev, isPlaying: true
                                        }))
                                    }}
                                >
                                    <source src={list.video} type="video/mp4"/>
                                </video>
                            </div>

                            <div className="absolute top-12 left-[5%] z-10">
                            {
                                list.textLists.map((text) => (
                                    <p 
                                        key={text}
                                        className="text-xl font-medium md:text-2xl"
                                    >
                                        {text}
                                    </p>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

        <div className="relative flex-center mt-10">
            <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
            {
                videoRef.current.map((_, i) => (
                    <span
                        key={i}
                        ref={el => videoDivRef.current[i] = el}
                        className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                    >
                        <span 
                            className="absolute h-full w-full rounded-full"
                            ref={el => videoSpanRef.current[i] = el}
                        />
                    </span>
                ))
            }
            </div>
            <button className="control-btn">
                <img 
                    src={isLastVideo? replayImg : 
                            !isPlaying ? playImg : pauseImg}
                    alt={isLastVideo ? 'replay' : 
                            !isPlaying? 'play' : 'pause'}
                    onClick = {isLastVideo ?
                        () => handleProcess('video-reset') 
                        : !isPlaying 
                            ? () => handleProcess('play')
                            : () => handleProcess('pause')
                    }
                />
            </button>
        </div>
    </>
  )
}

export default VideoCarousel