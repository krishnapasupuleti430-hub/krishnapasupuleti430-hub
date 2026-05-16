import { Star, Quote } from 'lucide-react';
import { useInView } from '../hooks/useAnimations';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  stat: string;
  statLabel: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Rahul Sharma',
    role: 'Hostel Student, Delhi',
    text: 'Caesar AI changed my life. I gained 8kg muscle in 3 months on a hostel budget of Rs.150/day. The AI meal plans are insane.',
    rating: 5,
    stat: '+8kg',
    statLabel: 'Muscle Gained',
    color: 'text-caesar-red',
  },
  {
    name: 'Priya Patel',
    role: 'Gym Beginner, Mumbai',
    text: 'As a complete beginner, I was lost. Caesar gave me perfect home workouts and Indian diet plans. Lost 12kg in 4 months!',
    rating: 5,
    stat: '-12kg',
    statLabel: 'Fat Lost',
    color: 'text-caesar-gold',
  },
  {
    name: 'Arjun Reddy',
    role: 'Engineering Student, Chennai',
    text: 'The hostel mode is a game-changer. No-cook meals with proper protein? AI coach that actually understands Indian food? Incredible.',
    rating: 5,
    stat: '92g',
    statLabel: 'Daily Protein',
    color: 'text-green-400',
  },
  {
    name: 'Sarah Johnson',
    role: 'Fitness Lover, London',
    text: 'Even from the UK, Caesar adapts perfectly to local foods. The AI coach is like having a personal trainer 24/7. Worth every penny.',
    rating: 5,
    stat: '+5kg',
    statLabel: 'Muscle Gained',
    color: 'text-blue-400',
  },
  {
    name: 'Vikram Singh',
    role: 'Weight Gain Journey, Punjab',
    text: 'I was 52kg and struggling. Caesar AI created budget meals with dal, paneer, eggs that helped me reach 68kg in 5 months.',
    rating: 5,
    stat: '+16kg',
    statLabel: 'Weight Gained',
    color: 'text-caesar-red',
  },
  {
    name: 'Ananya Iyer',
    role: 'Fat Loss Journey, Bangalore',
    text: 'The protein tracker and AI insights kept me motivated daily. Lost 15kg and gained confidence. Caesar is my fitness partner now.',
    rating: 5,
    stat: '-15kg',
    statLabel: 'Fat Lost',
    color: 'text-caesar-gold',
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`glass-strong rounded-2xl p-6 card-3d group transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-caesar-gold text-caesar-gold" />
          ))}
        </div>
        <Quote className="w-6 h-6 text-caesar-border" />
      </div>

      <p className="text-sm text-caesar-muted leading-relaxed mb-6">
        "{testimonial.text}"
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-caesar-red to-caesar-gold flex items-center justify-center text-sm font-bold text-white">
            {testimonial.name[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-caesar-white">{testimonial.name}</p>
            <p className="text-[10px] text-caesar-muted">{testimonial.role}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-lg font-black ${testimonial.color}`}>{testimonial.stat}</p>
          <p className="text-[10px] text-caesar-muted">{testimonial.statLabel}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-caesar-black via-caesar-dark to-caesar-black" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-caesar-gold/3 rounded-full blur-3xl" />

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-caesar-gold" />
            <span className="text-xs font-medium text-caesar-gold uppercase tracking-wider">Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-caesar-white">Real People.</span>
            <br />
            <span className="text-gradient-gold">Real Transformations.</span>
          </h2>
          <p className="text-caesar-muted max-w-2xl mx-auto">
            From hostel students to gym beginners - thousands have transformed their bodies with Caesar AI.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
