
import { Github, MessageSquare } from "lucide-react";

const Header = () => {
  return (
    <div className="flex flex-col items-center mb-16">
      <div className="relative mb-4">
        <img
          src="/lovable-uploads/a6176fc6-8240-40dd-aa8e-cf2242a79022.png"
          alt="Power Tools"
          className="w-96 animate-fade-in"
        />
        <div 
          className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" 
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite linear'
          }}
        />
      </div>
      
      <div className="flex gap-6 animate-fade-in">
        <a 
          href="https://github.com/TaverNxyz" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 story-link"
        >
          <Github className="w-5 h-5" />
          <span className="text-lg">TaverNxyz</span>
        </a>
        
        <a 
          href="https://discord.com/users/escobxrr_" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 story-link"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-lg">escobxrr_ / .cynicalbc</span>
        </a>
      </div>
    </div>
  );
};

export default Header;
