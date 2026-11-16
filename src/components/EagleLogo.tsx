import officialLogo from '../assets/images/auros_official_logo.png';

interface EagleLogoProps {
  className?: string;
}

export function EagleLogo({ className = 'w-12 h-12' }: EagleLogoProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full overflow-hidden border border-amber-500/50 bg-[#1a1a1a] shadow-[0_0_18px_-4px_rgba(245,175,25,0.45)] shrink-0 ${className}`}
    >
      <img
        src={officialLogo}
        alt="Emblème officiel Auros Cars Rent A Car"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover"
      />
    </span>
  );
}
