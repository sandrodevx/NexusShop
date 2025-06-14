import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Category } from '../data/products';

interface CategoryCardProps {
  category: Category;
  onClick?: (category: Category) => void;
  index?: number;
}

export function CategoryCard({ category, onClick, index = 0 }: CategoryCardProps) {
  const colors = ['neon', 'plasma', 'electric'];
  const colorScheme = colors[index % 3];

  return (
    <motion.div
      className="group relative overflow-hidden cyber-card rounded-2xl cursor-pointer hover-lift"
      onClick={() => onClick?.(category)}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      whileHover={{ y: -12, scale: 1.03 }}
    >
      {/* Animated Border Effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl p-[2px] ${
          colorScheme === 'neon' ? 'bg-gradient-to-r from-neon-400 via-neon-500 to-neon-400' :
          colorScheme === 'plasma' ? 'bg-gradient-to-r from-plasma-400 via-plasma-500 to-plasma-400' :
          'bg-gradient-to-r from-electric-400 via-electric-500 to-electric-400'
        }`}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear",
          delay: index * 0.5
        }}
        style={{ backgroundSize: '200% 200%' }}
      >
        <div className="w-full h-full bg-gradient-to-br from-cyber-800 to-dark-100 rounded-2xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 p-1">
        {/* Background Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl m-1">
          <motion.img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Cyber Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 via-cyber-800/60 to-transparent" />
          
          {/* Holographic Effect */}
          <motion.div
            className={`absolute inset-0 ${
              colorScheme === 'neon' ? 'bg-gradient-to-br from-neon-400/10 via-transparent to-neon-400/20' :
              colorScheme === 'plasma' ? 'bg-gradient-to-br from-plasma-400/10 via-transparent to-plasma-400/20' :
              'bg-gradient-to-br from-electric-400/10 via-transparent to-electric-400/20'
            }`}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Main Content */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
          >
            <div className="glass-dark rounded-2xl p-5 border border-cyber-400/30 backdrop-blur-xl">
              {/* Category Icon */}
              <motion.div
                className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                  colorScheme === 'neon' ? 'bg-gradient-to-br from-neon-500/20 to-neon-400/20 border border-neon-400/30' :
                  colorScheme === 'plasma' ? 'bg-gradient-to-br from-plasma-500/20 to-plasma-400/20 border border-plasma-400/30' :
                  'bg-gradient-to-br from-electric-500/20 to-electric-400/20 border border-electric-400/30'
                }`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Zap className={`h-6 w-6 ${
                  colorScheme === 'neon' ? 'text-neon-400' :
                  colorScheme === 'plasma' ? 'text-plasma-400' :
                  'text-electric-400'
                }`} />
              </motion.div>

              <h3 className={`text-xl font-bold font-heading mb-3 line-clamp-2 ${
                colorScheme === 'neon' ? 'text-neon-300 group-hover:text-neon-200' :
                colorScheme === 'plasma' ? 'text-plasma-300 group-hover:text-plasma-200' :
                'text-electric-300 group-hover:text-electric-200'
              } transition-colors duration-300`}>
                {category.name}
              </h3>
              
              <p className="text-cyber-300 text-sm mb-4 line-clamp-2 font-medium leading-relaxed">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.span 
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      colorScheme === 'neon' ? 'bg-neon-400/20 text-neon-300 border border-neon-400/30' :
                      colorScheme === 'plasma' ? 'bg-plasma-400/20 text-plasma-300 border border-plasma-400/30' :
                      'bg-electric-400/20 text-electric-300 border border-electric-400/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {category.productCount} ITEMS
                  </motion.span>
                </div>
                
                <motion.div
                  className={`flex items-center gap-2 font-bold text-sm ${
                    colorScheme === 'neon' ? 'text-neon-400 group-hover:text-neon-300' :
                    colorScheme === 'plasma' ? 'text-plasma-400 group-hover:text-plasma-300' :
                    'text-electric-400 group-hover:text-electric-300'
                  } transition-colors duration-300`}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="font-display">EXPLORE</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Hover Glow Effect */}
          <motion.div
            className={`absolute inset-0 rounded-xl ${
              colorScheme === 'neon' ? 'bg-neon-400/10' :
              colorScheme === 'plasma' ? 'bg-plasma-400/10' :
              'bg-electric-400/10'
            }`}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Subcategories Preview */}
        <motion.div
          className="absolute top-4 right-4 glass-dark rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-cyber-400/30"
          initial={{ scale: 0.8, opacity: 0, y: -10 }}
          whileHover={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="text-xs text-cyber-400 font-bold font-display mb-2">SUB-CATEGORIES:</div>
          <div className="flex flex-col gap-1">
            {category.subcategories.slice(0, 3).map((sub) => (
              <motion.div 
                key={sub.id} 
                className="text-xs text-cyber-200 font-medium"
                whileHover={{ x: 2, scale: 1.05 }}
              >
                • {sub.name}
              </motion.div>
            ))}
            {category.subcategories.length > 3 && (
              <div className={`text-xs font-bold ${
                colorScheme === 'neon' ? 'text-neon-400' :
                colorScheme === 'plasma' ? 'text-plasma-400' :
                'text-electric-400'
              }`}>
                +{category.subcategories.length - 3} MORE
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Outer Glow on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: [
            `0 0 0px ${colorScheme === 'neon' ? 'rgba(34, 197, 94, 0)' : colorScheme === 'plasma' ? 'rgba(236, 72, 153, 0)' : 'rgba(234, 179, 8, 0)'}`,
            `0 0 30px ${colorScheme === 'neon' ? 'rgba(34, 197, 94, 0.4)' : colorScheme === 'plasma' ? 'rgba(236, 72, 153, 0.4)' : 'rgba(234, 179, 8, 0.4)'}`,
            `0 0 0px ${colorScheme === 'neon' ? 'rgba(34, 197, 94, 0)' : colorScheme === 'plasma' ? 'rgba(236, 72, 153, 0)' : 'rgba(234, 179, 8, 0)'}`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
} 