import { Github } from 'lucide-react';

export function Footer() {
    return (
        <footer className="fixed bottom-4 w-full flex items-center justify-center">
            <a
                href="https://github.com/justin9668/url-shortener"
                target="_blank"
            >
                <Github className="w-6 h-6 hover:text-gray-600 transition-colors" />
            </a>
        </footer>
    );
}