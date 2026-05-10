import { Copyright, Heart } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-white/10 py-8 relative z-10 mt-12">
            <div className="container mx-auto px-6 flex flex-col items-center justify-center space-y-3">
                <p className="text-gray-400 text-sm md:text-base flex flex-wrap items-center justify-center gap-2">
                    <span>Designed and developed with</span>
                    <Heart className="w-4 h-4 text-red-500 fill-red-500 mx-1" />
                    <span>by</span>
                    <a
                        href="https://www.linkedin.com/in/muhammed-umer-s"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-purple-400 tracking-wide hover:text-purple-300 hover:underline transition-all"
                    >
                        Muhammed Umer
                    </a>
                </p>
                <div className="flex items-center text-gray-500 text-xs md:text-sm">
                    <Copyright className="w-4 h-4 mr-1.5" />
                    <span>{currentYear} All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
