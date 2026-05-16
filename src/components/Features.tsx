import { Utensils, Wallet, Leaf, Globe, TrendingUp, Dumbbell, BarChart3, Bed, MessageCircle, Search } from 'lucide-react';
import { useInView, useMouse3D } from '../hooks/useAnimations';

function FeatureCard({ icon: Icon, title, description, color }: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) {
  const { ref, isInView } = useInView(0.1);
  const { ref: mouseRef, style } = useMouse3D();

  return (
    <div
      ref={(el) => { (ref as React.MutableRefObject<HTMLDivElement | null>).current = el; (mouseRef as React.MutableRefObject<HTMLDivElement | null>).current = el; }}
      style={style}
      className={`glass rounded-2xl p-6 lg:p-8 card-3d group transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${color}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-caesar-white mb-3 group-hover:text-gradient-red transition-all">
        {title}
      </h3>
      <p className="text-sm text-caesar-muted leading-relaxed">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-caesar-red opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Learn more <span className="ml-1">&rarr;</span>
      </div>
    </div>
  );
}

const features = [
  {
    icon: Utensils,
    title: 'AI Meal Generator',
    description: 'Enter your available foods and watch AI create perfectly balanced meals instantly. Smart nutrition, zero effort.',
    color: 'bg-caesar-red/20 text-caesar-red',
  },
  {
    icon: Wallet,
    title: 'Budget Diet Plans',
    description: 'Premium meal plans at Rs.100/day, Rs.200/day, and Rs.300/day. Eat like a king on a student budget.',
    color: 'bg-caesar-gold/20 text-caesar-gold',
  },
  {
    icon: Leaf,
    title: 'Indian Foods Database',
    description: 'Dosa, idli, dal, rice, paneer, roti, curd, chicken curry, poha - all your local affordable meals tracked smartly.',
    color: 'bg-green-500/20 text-green-400',
  },
  {
    icon: Globe,
    title: 'Global Meal Support',
    description: 'Select your country during signup. Caesar adapts foods, meals, and budgets to your local cuisine and affordability.',
    color: 'bg-blue-500/20 text-blue-400',
  },
  {
    icon: TrendingUp,
    title: 'Protein Tracker',
    description: 'Smart AI protein tracking with animated daily progress bars. Get "Protein left today" AI guidance in real-time.',
    color: 'bg-caesar-red/20 text-caesar-red',
  },
  {
    icon: Dumbbell,
    title: 'Home Workout Generator',
    description: 'AI-generated home workouts - no equipment needed. Fat loss, muscle gain, and beginner-friendly plans.',
    color: 'bg-caesar-gold/20 text-caesar-gold',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Weight tracking, muscle progress, weekly AI reports, AI motivation system, and transformation journey dashboard.',
    color: 'bg-purple-500/20 text-purple-400',
  },
  {
    icon: Bed,
    title: 'Hostel Student Mode',
    description: 'Cheap meals, fast meals, no-cook meals, hostel-friendly plans, and budget protein hacks for student life.',
    color: 'bg-orange-500/20 text-orange-400',
  },
  {
    icon: MessageCircle,
    title: 'AI Fitness Coach',
    description: 'Chat-style AI assistant that gives recommendations, motivates you, and suggests meals and workouts 24/7.',
    color: 'bg-caesar-red/20 text-caesar-red',
  },
  {
    icon: Search,
    title: 'Smart Search Engine',
    description: 'Type "I have eggs and oats" - AI generates meals, calories, protein, and meal timing instantly.',
    color: 'bg-caesar-gold/20 text-caesar-gold',
  },
];

export default function Features() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="features" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-caesar-red/3 rounded-full blur-3xl" />

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-red rounded-full px-4 py-2 mb-6">
            <span className="text-xs font-medium text-caesar-red uppercase tracking-wider">Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-caesar-white">Everything You Need to</span>
            <br />
            <span className="text-gradient-red">Transform Your Body</span>
          </h2>
          <p className="text-caesar-muted max-w-2xl mx-auto">
            AI-powered tools designed for students, gym beginners, and fitness lovers. From budget meals to elite coaching.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
