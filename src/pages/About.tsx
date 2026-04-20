import { motion } from 'framer-motion';
import MandalaBackground from '@/components/MandalaBackground';

const About = () => {
  const stats = [
    { value: '5', label: 'Health Products' },
    { value: '100%', label: 'Natural' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <MandalaBackground />
        <div className="container mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl sm:text-6xl text-foreground mb-6">
              Born in <span className="text-secondary">India</span>,<br />
              Loved by the World
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ooorrrzzzaaa is on a mission to make wholesome, authentic Indian health food accessible to everyone, everywhere.
              We blend ancient wisdom with modern nutrition science to create meals that nourish body and soul.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="indian-divider" />

      {/* Stats */}
      <section className="section-padding bg-primary indian-section-bg">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 text-center justify-center max-w-2xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <p className="font-heading text-5xl text-accent mb-2">{stat.value}</p>
              <p className="text-primary-foreground/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="indian-divider" />

      {/* Mission */}
      <section className="section-padding indian-paisley-left indian-paisley-right relative">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-6">Our Mission</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            We believe that the best food comes from nature, prepared with respect for tradition.
            Every Ooorrrzzzaaa product is made from 100% natural ingredients — no preservatives,
            no artificial colors, no compromises.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From the fertile plains of India to tables in 11+ countries, we're bringing the warmth
            of Indian home cooking to the world. Our ready-to-eat meals preserve the authenticity
            of ancient recipes while meeting the highest international food safety standards.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
