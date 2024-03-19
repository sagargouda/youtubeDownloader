import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

function App() {
    const [value, setValue] = useState('');
    const [id, setId] = useState('');
    const [video, setVideo] = useState('');
    const [videoPresent, setVideoPresent] = useState(false);
    const [error, setError] = useState('');
    const [loading , setLoading]= useState(false)

    useEffect(() => {
        if (id !== '') {
            getVideo();
        }
    }, [id]);

    function dataValuation(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|(?:youtu\.be|youtube\.com\/shorts)\/)([^"&?\/\s]{11})/gi;
        const match = regex.exec(url);
        return match ? match[1] : null;
    }

    function handleClick() {
        const videoId = dataValuation(value);
        if (videoId) {
            setId(videoId);
        } else {
            setError('Invalid YouTube URL');
        }
    }

    async function getVideo() {
        setLoading(true)
        const url = `https://yt-api.p.rapidapi.com/dl?id=${id}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key':  process.env.REACT_APP_RAPID_API_KEY,
                'X-RapidAPI-Host':process.env.REACT_APP_RAPID_API_HOST
            }
        };


        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Failed to fetch video');
            }
            const result = await response.json();
            if (result.status === 'OK') {
                setVideo(result.formats[0].url);
                setVideoPresent(true);
                setLoading(false)
            } else {
                setError('Failed to fetch video ');
                setLoading(false)
            }
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">YouTube Video Viewer</h1>
            <div className="w-full max-w-md">
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)}
                       className="border rounded-md px-4 py-2 mb-4 w-full" placeholder="Enter YouTube video URL"/>
                <button onClick={handleClick}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Watch
                    Video
                </button>
                {loading && <FaSpinner className="animate-spin mx-auto mt-4"/>}
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {videoPresent && <video controls className="mt-4 mx-auto " width={300} height={200}>
                    <source src={video} type="video/mp4"/>
                </video>}
            </div>
        </div>

    );
}

export default App;
