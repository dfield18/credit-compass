import { CreditCard } from "lucide-react";

const AnimatedCreditCard = () => {
  return (
      <div className="relative w-full flex justify-center items-center py-8">
        <div className="relative">
          {/* Animated credit card */}
          <div className="relative w-96 h-60 rounded-3xl bg-gradient-to-br from-mint via-mint/90 to-coral shadow-elevated transform transition-all duration-1000 animate-bounce-slow">
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            
            {/* Card content */}
            <div className="relative h-full p-9 flex flex-col justify-between text-white">
              {/* Top section - Chip and logo area */}
              <div className="flex justify-between items-start">
                {/* Chip */}
                <div className="w-18 h-15 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm" style={{ width: '4.5rem', height: '3.75rem' }}>
                  <div className="w-12 h-9 bg-gradient-to-br from-white/40 to-white/10 rounded-sm" />
                </div>
                
                {/* Sparkle icon */}
                <div className="animate-pulse">
                  <CreditCard className="w-9 h-9 text-white/90" />
                </div>
              </div>
              
              {/* Middle section - Card number */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex-1 h-12 bg-white/20 rounded-lg backdrop-blur-sm animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Bottom section - Name and expiry */}
              <div className="flex justify-between items-end">
                <div className="space-y-1.5">
                  <div className="h-4.5 w-36 bg-white/20 rounded backdrop-blur-sm animate-pulse" style={{ height: '1.125rem', width: '9rem' }} />
                  <div className="h-3 w-24 bg-white/15 rounded backdrop-blur-sm animate-pulse" style={{ animationDelay: '0.2s', height: '0.75rem', width: '6rem' }} />
                </div>
                <div className="h-4.5 w-18 bg-white/20 rounded backdrop-blur-sm animate-pulse" style={{ animationDelay: '0.4s', height: '1.125rem', width: '4.5rem' }} />
              </div>
            </div>
          </div>
          
          {/* Floating particles */}
          <div className="absolute -top-6 -left-6 w-4.5 h-4.5 bg-mint/60 rounded-full animate-float" style={{ animationDelay: '0s', width: '1.125rem', height: '1.125rem' }} />
          <div className="absolute -top-3 -right-12 w-3 h-3 bg-coral/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
          <div className="absolute -bottom-9 left-12 w-3.75 h-3.75 bg-mint/50 rounded-full animate-float" style={{ animationDelay: '1s', width: '0.9375rem', height: '0.9375rem' }} />
          <div className="absolute -bottom-6 -right-6 w-3 h-3 bg-coral/50 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>
  );
};

export default AnimatedCreditCard;

