import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Category } from '../data/products';

interface CategoryCardProps {
  category: Category;
  onClick?: (category: Category) => void;
  index?: number;
}

export function CategoryCard({ category, onClick, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      onClick={() => onClick?.(category)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* Background Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Glassmorphism Content Overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
              {category.name}
            </h3>
            <p className="text-white/90 text-sm mb-3 line-clamp-2">
              {category.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">
                {category.productCount} products
              </span>
              
              <motion.div
                className="flex items-center gap-1 text-white group-hover:text-blue-200 transition-colors"
                whileHover={{ x: 5 }}
              >
                <span className="text-sm font-medium">Explore</span>
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 bg-blue-500/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Subcategories Preview */}
      <motion.div
        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0.8, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
      >
        <div className="text-xs text-gray-600 font-medium mb-1">Categories:</div>
        <div className="flex flex-col gap-1">
          {category.subcategories.slice(0, 3).map((sub) => (
            <div key={sub.id} className="text-xs text-gray-800">
              {sub.name}
            </div>
          ))}
          {category.subcategories.length > 3 && (
            <div className="text-xs text-gray-500">
              +{category.subcategories.length - 3} more
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
} 