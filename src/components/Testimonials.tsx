import { Star, Quote, Check } from 'lucide-react';
import { useInView } from '../hooks/useAnimations';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  stat: string;
  statLabel: string;
  statColor: string;
  budget: string;
  badge: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Rahul Sharma',
    role: 'Engineering Student, Delhi',
    text: 'I gained 8kg muscle in 3 months on a hostel budget of Rs.150/day. The AI meal plans with dal, eggs, and milk actually work. No supplements needed.',
    rating: 5,
    stat: '+8kg',
    statLabel: 'Muscle Gained',
    statColor: 'text-caesar-cyan',
    budget: 'Rs.150/day',
    badge: 'Hostel Student',
  },
  {
    name: 'Priya Patel',
    role: 'College Student, Mumbai',
    text: 'Lost 12kg in 4 months with home workouts and budget Indian meals. The no-cook meal options saved me in hostel. No gym membership needed.',
    rating: 5,
    stat: '-12kg',
    statLabel: 'Fat Lost',
    statColor: 'text-caesar-purple',
    budget: 'Rs.100/day',
    badge: 'Home Workouts',
  },
  {
    name: 'Arjun Reddy',
    role: 'B.Tech Student, Chennai',
    text: 'The hostel mode is a game-changer. Mess food + cheap protein sources tracked perfectly. Hit 100g protein daily for Rs.120. Never thought it was possible.',
    rating: 5,
    stat: '100g',
    statLabel: 'Daily Protein',
    statColor: 'text-caesar-blue',
    budget: 'Rs.120/day',
    badge: 'Hostel Mode',
  },
  {
    name: 'Vikram Singh',
    role: 'Hostel Resident, Punjab',
    text: 'I was 52kg and struggling. Caesar AI created meals with dal, paneer, eggs that helped me reach 68kg in 5 months. All on student food budget.',
    rating: 5,
    stat: '+16kg',
    statLabel: 'Weight Gained',
    statColor: 'text-caesar-cyan',
    budget: 'Rs.200/day',
    badge: 'Weight Gain',
  },
  {
    name: 'Ananya Iyer',
    role: 'Medical Student, Bangalore',
    text: 'The protein tracker and budget meals kept me on track during exam season. Lost 15kg without leaving my PG room. AI coach understood my schedule.',
    rating: 5,
    stat: '-15kg',
    statLabel: 'Fat Lost',
    statColor: 'text-caesar-purple',
    budget: 'Rs.130/day',
    badge: 'PG Student',
  },
  {
    name: 'Karthik Nair',
    role: 'CS Student, Kerala',
    text: 'Push-ups, dips, and squats - that\'s all I needed. The home workout plans are legit. Gained visible muscle in 2 months. Zero gym, zero equipment.',
    rating: 5,
    stat: '+5kg',
    statLabel: 'Muscle Gained',
    statColor: 'text-caesar-blue',
    budget: 'Rs.150/day',
    badge: 'No Equipment',
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`glass-strong rounded-2xl p-6 group transition-all duration-700 hover:scale-[1.02] ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-caesar-gold text-caesar-gold" />
            ))}
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-caesar-cyan/10 text-caesar-cyan border border-caesar-cyan/20 font-space font-medium">{testimonial.badge}</span>
        </div>
        <Quote className="w-5 h-5 text-caesar-border/50" />
      </div>

      <p className="text-sm text-caesar-muted leading-relaxed mb-5 font-space">
        "{testimonial.text}"
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-caesar-blue to-caesar-purple flex items-center justify-center text-sm font-clash font-bold text-white">
            {testimonial.name[0]}
          </div>
          <div>
            <p className="text-sm font-clash font-semibold text-caesar-white">{testimonial.name}</p>
            <p className="text-[10px] text-caesar-muted font-space">{testimonial.role}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-lg font-clash font-bold ${testimonial.statColor}`}>{testimonial.stat}</p>
          <p className="text-[10px] text-caesar-muted font-space">{testimonial.statLabel}</p>
          <div className="flex items-center gap-1 justify-end mt-0.5">
            <Check className="w-2.5 h-2.5 text-green-400" />
            <span className="text-[9px] text-green-400 font-space">{testimonial.budget}</span>
          </div>
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
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-caesar-blue/5 rounded-full blur-3xl" />

      <div className="relative z-10 container-premium mx-auto">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-caesar-gold" />
            <span className="text-xs font-space font-medium text-caesar-gold uppercase tracking-wider">Real Student Results</span>
          </div>
          <h2 className="heading-xl mb-5">
            <span className="text-caesar-white">Students Who</span>
            <br />
            <span className="text-gradient-premium">Actually Transformed</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto font-space">
            No fake reviews. No paid influencers. Real Indian students who gained muscle, lost fat, and transformed on a student budget.
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
