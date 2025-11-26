import { motion } from 'framer-motion';
import { Shield, Truck, Clock, Award } from 'lucide-react';

export const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure transactions',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free shipping over $50',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance',
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: '30-day money-back',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                <badge.icon className="text-white" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">{badge.title}</h3>
              <p className="text-gray-600 text-sm">{badge.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
