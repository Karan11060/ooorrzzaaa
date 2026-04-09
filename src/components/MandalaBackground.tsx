const MandalaBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Indian Monuments Background Layer */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Taj Mahal on the left */}
        <g transform="translate(150, 300)">
          {/* Dome */}
          <path d="M 60 20 Q 80 -10 100 0 L 100 30 Q 80 50 60 50 L 20 50 Q 0 50 0 30 L 0 0 Q 20 -10 40 20" 
            fill="none" stroke="hsl(var(--deep-green))" strokeWidth="2" opacity="0.6"/>
          {/* Main structure */}
          <rect x="10" y="40" width="100" height="80" fill="none" stroke="hsl(var(--deep-green))" strokeWidth="2" opacity="0.6"/>
          {/* Minarets */}
          <line x1="5" y1="40" x2="5" y2="150" stroke="hsl(var(--gold))" strokeWidth="1.5" opacity="0.5"/>
          <line x1="115" y1="40" x2="115" y2="150" stroke="hsl(var(--gold))" strokeWidth="1.5" opacity="0.5"/>
        </g>

        {/* Hindu Temple Spire - Center */}
        <g transform="translate(600, 250)">
          {/* Spire */}
          <path d="M 30 100 L 50 60 L 70 100" fill="none" stroke="hsl(var(--saffron))" strokeWidth="2" opacity="0.5"/>
          <path d="M 35 90 L 65 90" stroke="hsl(var(--saffron))" strokeWidth="1.5" opacity="0.5"/>
          <path d="M 33 80 L 67 80" stroke="hsl(var(--saffron))" strokeWidth="1.5" opacity="0.5"/>
          {/* Base temple structure */}
          <rect x="20" y="95" width="60" height="70" fill="none" stroke="hsl(var(--deep-green))" strokeWidth="2" opacity="0.6"/>
          <circle cx="50" cy="110" r="12" fill="none" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.5"/>
        </g>

        {/* Indian Gateway/Arch - Right */}
        <g transform="translate(1000, 280)">
          {/* Arch */}
          <path d="M 20 80 Q 50 30 80 80" fill="none" stroke="hsl(var(--deep-green))" strokeWidth="3" opacity="0.6"/>
          {/* Pillars */}
          <line x1="20" y1="80" x2="20" y2="150" stroke="hsl(var(--deep-green))" strokeWidth="2.5" opacity="0.6"/>
          <line x1="80" y1="80" x2="80" y2="150" stroke="hsl(var(--deep-green))" strokeWidth="2.5" opacity="0.6"/>
          {/* Decorative elements */}
          <circle cx="50" cy="60" r="6" fill="none" stroke="hsl(var(--saffron))" strokeWidth="1.5" opacity="0.5"/>
          <circle cx="35" cy="75" r="4" fill="none" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.4"/>
          <circle cx="65" cy="75" r="4" fill="none" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.4"/>
        </g>

        {/* Lotus temple elements - scattered */}
        <g transform="translate(200, 150)">
          <circle cx="0" cy="0" r="20" fill="none" stroke="hsl(var(--gold))" strokeWidth="1.5" opacity="0.4"/>
          <circle cx="0" cy="0" r="15" fill="none" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.3"/>
          <circle cx="0" cy="0" r="10" fill="none" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.3"/>
        </g>

        {/* Fort/Palace walls - bottom right */}
        <g transform="translate(950, 500)">
          <rect x="0" y="0" width="80" height="120" fill="none" stroke="hsl(var(--deep-green))" strokeWidth="2" opacity="0.5"/>
          <line x1="0" y1="30" x2="80" y2="30" stroke="hsl(var(--deep-green))" strokeWidth="1.5" opacity="0.4"/>
          <line x1="0" y1="60" x2="80" y2="60" stroke="hsl(var(--deep-green))" strokeWidth="1.5" opacity="0.4"/>
          <line x1="0" y1="90" x2="80" y2="90" stroke="hsl(var(--deep-green))" strokeWidth="1.5" opacity="0.4"/>
          {/* Corner towers */}
          <rect x="-5" y="-10" width="10" height="50" fill="none" stroke="hsl(var(--saffron))" strokeWidth="1.5" opacity="0.4"/>
          <rect x="75" y="-10" width="10" height="50" fill="none" stroke="hsl(var(--saffron))" strokeWidth="1.5" opacity="0.4"/>
        </g>
      </svg>

      {/* Main rotating mandala */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow opacity-[0.08] w-[800px] h-[800px]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 30} 200 200)`}>
            <ellipse cx="200" cy="80" rx="30" ry="60" stroke="hsl(var(--deep-green))" strokeWidth="1" fill="none" />
            <ellipse cx="200" cy="100" rx="15" ry="35" stroke="hsl(var(--gold))" strokeWidth="0.8" fill="none" />
            <circle cx="200" cy="55" r="5" fill="hsl(var(--saffron))" opacity="0.5" />
          </g>
        ))}
        {[60, 90, 120, 150].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} stroke="hsl(var(--gold))" strokeWidth="0.5" fill="none" opacity="0.6" />
        ))}
        <circle cx="200" cy="200" r="20" fill="hsl(var(--saffron))" opacity="0.3" />
      </svg>

      {/* Secondary mandala - counter-rotating */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-mandala opacity-[0.05] w-[600px] h-[600px]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animationDirection: 'reverse' }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 45} 200 200)`}>
            <path
              d="M 200 50 Q 250 100 200 150 Q 150 100 200 50"
              stroke="hsl(var(--deep-green))"
              strokeWidth="1.5"
              fill="none"
              opacity="0.7"
            />
          </g>
        ))}
      </svg>

      {/* Decorative chakra-inspired rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-secondary/20 rounded-full animate-orbit opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-accent/15 rounded-full animate-chakra opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-primary/10 rounded-full animate-spin-slow opacity-25" />

      {/* Central decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/20 rounded-full blur-xl animate-pulse opacity-40" />
    </div>
  );
};

export default MandalaBackground;
