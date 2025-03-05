export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/assets/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white bg-black/50">
        <h1 className="text-8xl font-bold tracking-wide">Kolahal</h1>
        <p className="text-2xl mt-2">Where chaos meets creativity</p>
      </div>
    </div>
  );
}