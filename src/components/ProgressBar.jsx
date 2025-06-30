import { useEffect, useRef } from "react";

const ProgressBar = ({ progress, setProgress, setLength }) => {
  const barContainerRef = useRef(null);
  const isDruggingRef = useRef(false);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const upDateProgressBar = (clientX) => {
    //get progress bar size and position relative to viewport
    const rect = barContainerRef.current.getBoundingClientRect();
    //calculate where the mouse is
    const x = Math.min(Math.max(clientX - rect.x, 0), rect.width);
    // turn it into porsentage
    const newProgress = (x / rect.width) * 100;
    // update the position in UI
    setProgress(newProgress);
    const charNum = Math.floor((newProgress * 20) / 100);
    setLength(charNum);
  };

  const handleThumbMouseDown = (e) => {
    isDruggingRef.current = true;
    upDateProgressBar(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDruggingRef.current) upDateProgressBar(e.clientX);
  };

  const handleMouseUp = () => {
    isDruggingRef.current = false;
  };

  const handleClickBar = (e) => {
    //horizontal coordinate within the application's viewport at which the event occurred
    upDateProgressBar(e.clientX);
  };

  return (
    <div
      className="progressive-bar__container"
      ref={barContainerRef}
      onClick={handleClickBar}
    >
      <div className="progressive-bar" style={{ width: `${progress}%` }}></div>
      <div
        className="progressive-bar__thumb"
        onMouseDown={handleThumbMouseDown}
        style={{
          position: "absolute",
          left: `calc(${progress}% - 15px)`,
          top: "-25%",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
