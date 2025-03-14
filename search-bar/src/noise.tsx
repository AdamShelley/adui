const NoiseBackground = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`relative ${className} bg-black/95`}>
      {/* Base background with dot pattern */}
      {/* <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "radial-gradient(transparent 1px, white 1px)",
          backgroundSize: "4px 4px",
        }}
      /> */}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 w-full h-full opacity-10"
        style={{
          backgroundImage: `url("/noise-texture.png")`,
          backgroundRepeat: "repeat",
          backgroundSize: "100px",
        }}
      />

      {/* Content container */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export default NoiseBackground;
