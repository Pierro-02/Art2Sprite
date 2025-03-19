import RainingLetters from "./raining-letters";

export default function Hero() {
  return (
    <div className="relative h-screen">
      {/* Matrix-like raining letters background */}
      <div className="absolute inset-0 z-0">
        <RainingLetters />
      </div>
    </div>
  );
}
