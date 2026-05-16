import { useState, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useInView } from '../hooks/useAnimations';

interface Message {
  role: 'ai' | 'user';
  text: string;
}

const demoConversation: Message[] = [
  { role: 'user', text: 'I have eggs, oats, and milk. What can I make?' },
  { role: 'ai', text: 'Great ingredients! Here are 3 AI-generated meals:\n\n1. Protein Oats Bowl - Oats + milk + 2 boiled eggs (420 cal, 28g protein)\n2. Egg Omelette with Oats - 3 egg omelette + oats porridge (510 cal, 35g protein)\n3. Power Shake - Oats + milk + 1 raw egg blended (380 cal, 24g protein)\n\nBest for muscle gain: Option 2. Best budget: Option 3.' },
  { role: 'user', text: 'I\'m in a hostel with no stove. Help?' },
  { role: 'ai', text: 'Hostel mode activated! No-cook options:\n\n1. Overnight Oats - Oats soaked in milk overnight + boiled eggs from canteen (350 cal, 26g protein)\n2. Egg Salad Bowl - Boiled eggs + milk (280 cal, 22g protein)\n3. Banana Oats Shake - Mash banana + oats + cold milk (320 cal, 18g protein)\n\nAll under Rs.80/day. Protein target: achievable!' },
];

export default function AIAssistant() {
  const { ref, isInView } = useInView(0.1);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev >= demoConversation.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-caesar-red/3 rounded-full blur-3xl" />

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-red rounded-full px-4 py-2 mb-6">
            <Bot className="w-4 h-4 text-caesar-red" />
            <span className="text-xs font-medium text-caesar-red uppercase tracking-wider">AI Coach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-caesar-white">Your AI Fitness</span>
            <br />
            <span className="text-gradient-red">Coach is Here</span>
          </h2>
          <p className="text-caesar-muted max-w-2xl mx-auto">
            Chat with Caesar AI. Tell it what you have, what you want, and get instant personalized recommendations.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-strong rounded-2xl overflow-hidden glow-red">
            <div className="flex items-center gap-3 p-4 border-b border-caesar-border">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-caesar-red to-caesar-gold flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-caesar-white">Caesar AI Coach</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-green-400">Online</span>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto">
              {demoConversation.slice(0, visibleMessages).map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 animate-slide-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'ai'
                      ? 'bg-gradient-to-br from-caesar-red to-caesar-gold'
                      : 'bg-caesar-border'
                  }`}>
                    {msg.role === 'ai' ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-caesar-muted" />}
                  </div>
                  <div className={`glass rounded-xl p-3 max-w-[80%] ${msg.role === 'user' ? 'glass-red' : ''}`}>
                    <p className="text-xs text-caesar-muted leading-relaxed whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}
              {visibleMessages < demoConversation.length && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-caesar-red to-caesar-gold flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="glass rounded-xl p-3">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-caesar-red animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-caesar-red animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-caesar-red animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-caesar-border">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="I have eggs, rice, and dal..."
                  className="flex-1 bg-caesar-dark border border-caesar-border rounded-xl px-4 py-3 text-sm text-caesar-white placeholder:text-caesar-muted focus:outline-none focus:border-caesar-red/50 transition-colors"
                />
                <button className="w-11 h-11 rounded-xl bg-gradient-to-br from-caesar-red to-caesar-red-glow flex items-center justify-center hover:scale-105 transition-transform">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
