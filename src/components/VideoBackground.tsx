
const VideoBackground = () => {
  return (
    <video
      id="video-background"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="fixed inset-0 w-full h-full object-cover -z-10"
    >
      <source
        src="https://cdn.pixabay.com/video/2020/08/27/48420-453832153_large.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;
