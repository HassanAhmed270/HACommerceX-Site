import { MessageCircle } from "lucide-react";

const NUMBER = "923348487499";
const TEXT = "Hello HACommerceX, I would like a quote for my project.";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${NUMBER}?text=${encodeURIComponent(TEXT)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HACommerceX on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#128C4A] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
