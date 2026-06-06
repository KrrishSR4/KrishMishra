export function BrushStroke({
  color,
  className = "",
  seed = 1,
}: {
  color: string;
  className?: string;
  seed?: number;
}) {
  const elements = [];

  const random = (i: number) => {
    const x = Math.sin(seed * 1337 + i + 1) * 10000;
    return x - Math.floor(x);
  };

  // Generate a massive number of thin, overlapping bristles
  const totalBristles = 250;

  for (let i = 0; i < totalBristles; i++) {
    // Distribute bristles vertically across 0-100.
    // Concentrate heavily in the middle (20 to 80) to ensure text legibility.
    // u will be from -1 to 1, biased towards center.
    const u = (random(i * 10) + random(i * 11) + random(i * 12) - 1.5) / 1.5;

    const y = 50 + u * 50; // 0 to 100
    const distanceFromCenter = Math.abs(u); // 0 to 1

    // Bristles near the top/bottom edges start later and end earlier (tapering).
    // Central bristles span almost the full width.
    let startX = 0 + distanceFromCenter * 15 + random(i * 13) * 15;
    let endX = 100 - distanceFromCenter * 15 - random(i * 14) * 15;

    // Streaks shooting out aggressively (dry brush extending)
    if (random(i * 15) > 0.9) {
      endX += 5 + random(i * 16) * 15;
    }
    if (random(i * 17) > 0.92) {
      startX -= 5 + random(i * 18) * 15;
    }

    // Chunks of missing paint (bristles that ran dry early)
    if (random(i * 19) > 0.8) {
      endX -= 10 + random(i * 20) * 30;
    }

    // Dynamic wave/arch for each bristle so they aren't perfectly straight
    const cp1x = 33;
    const cp1y = y + (random(i * 21) * 10 - 5);
    const cp2x = 66;
    const cp2y = y + (random(i * 22) * 10 - 5);
    const endY = y + (random(i * 23) * 10 - 5);

    // Thickness: thin for individual bristle texture.
    const isStray = distanceFromCenter > 0.7;
    const strokeWidth = isStray ? 0.5 + random(i * 24) * 1.5 : 1.5 + random(i * 25) * 3;

    // Opacity: Solid in the center, transparent at edges
    const opacity = isStray ? 0.4 + random(i * 26) * 0.4 : 0.8 + random(i * 27) * 0.2;

    elements.push(
      <path
        key={`bristle-${i}`}
        d={`M ${startX},${y} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="butt" // Sharp, hard bristle ends
        opacity={opacity}
      />,
    );
  }

  // Slight global rotation for dynamic feel
  const rotation = random(999) * 4 - 2;

  const filterId = `acrylic-brush-${seed}-${color.replace("#", "")}`;

  return (
    <svg
      aria-hidden="true"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
      // viewBox 0 0 100 100 perfectly matches the coordinate generation
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Extreme horizontal displacement tears the paths apart, creating razor sharp paint breaks */}
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.08 0.6"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          {/* Hard edge thresholding: converts any anti-aliased blur into pure, jagged acrylic */}
          <feComponentTransfer in="displaced">
            <feFuncA type="linear" slope="10" intercept="-3" />
          </feComponentTransfer>
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>{elements}</g>
    </svg>
  );
}
