import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export default function Player({ videoUri }){
  const videoEl = useRef(null);
  const [showBackBtn, setShowBackBtn] = useState(false);

  function setDimensions() {
    let { innerWidth, innerHeight } = window;
    videoEl.current.setAttribute('width', innerWidth);
    videoEl.current.setAttribute('height', innerHeight);
  }

  useEffect(() => {
    setDimensions();
    window.addEventListener('resize', setDimensions);

    return () => window.removeEventListener('resize', setDimensions);
  }, []);

  return (
  videoUri && (
  <div className="king-player" onMouseOver={() => setShowBackBtn(true)} onMouseOut={() => setShowBackBtn(false)}>
    <video ref={videoEl} id="video-player" controls src={videoUri} autoplay></video>
         
      <Link to="/browse">
          <BsArrowLeft className="backToBrowseBtn" style={showBackBtn ? { display: 'block' } : 
          {display: 'none' }} />
        </Link>
      </div>
    )
  );
}