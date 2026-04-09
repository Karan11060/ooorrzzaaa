import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import MandalaBackground from '@/components/MandalaBackground';

const Contact = () => {
  const phoneNumbers = [
    { number: '+91 8949229443', label: 'Phone' },
    { number: '+91 7425097960', label: 'Phone' },
    { number: '+91 7357475818', label: 'WhatsApp Only' },
  ];

  return (
    <div className="pt-20">
      <section className="relative section-padding overflow-hidden">
        <MandalaBackground />
        <div className="container mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl sm:text-6xl text-foreground mb-6">
              Get in <span className="text-secondary">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have questions about our products or need help with an order? We'd love to hear from you.
              Reach out to us through any of the channels below.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="indian-divider" />

      <section className="section-padding indian-section-bg">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              Feel free to call us or send a WhatsApp message. We're happy to assist you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {phoneNumbers.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <span className="font-heading text-lg text-foreground">{item.number}</span>
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="font-heading text-2xl text-foreground mb-4">Business Hours</h3>
            <p className="text-muted-foreground">Monday – Saturday: 9:00 AM – 7:00 PM IST</p>
            <p className="text-muted-foreground">Sunday: Closed</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
