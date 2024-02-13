
import React, { useState, useEffect } from 'react';
import { torrentMovie } from '../axios';

const Torrent = () => {

    const [videoUrl, setVideoUrl] = useState('');
    const torrentId = "magnet:?xt=urn:btih:720BB660496A3F941B0EB4F8E0ED5913F9A0A18E&dn=The.Lord.of.the.Rings.The.Rings.of.Power.S01E03.Adar.1080p.AMZN.WEBRip.DDP5.1.x264-SMURF&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2950%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2940%2Fannounce&tr=udp%3A%2F%2Ftracker.thinelephant.org%3A12800%2Fannounce&tr=udp%3A%2F%2Ftracker.fatkhoala.org%3A13710%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce";
    console.log(encodeURIComponent(torrentId))
    useEffect(() => {
        const fetchTorrent = async () => {
            try {
                console.log("çalişiyor")
                const response = await torrentMovie(encodeURIComponent(torrentId && torrentId));
                setVideoUrl(URL.createObjectURL(new Blob([response.data])));
                alert('video indirildi')
            } catch (error) {
                console.error('Error fetching torrent:', error);
            }
        };

        fetchTorrent();
    }, [torrentId]);
    if(videoUrl != ''){
        console.log(videoUrl)
    }
    
    return (
        <div>
            {videoUrl != '' && <video controls src={videoUrl} />}
        </div>
    )
}

export default Torrent