import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Search, Heart, Star, Zap } from 'lucide-react';
import { Button } from './components/Button';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">NexusShop</span>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Products</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <motion.button 
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-5 w-5" />
              </motion.button>
              
              <motion.button 
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="h-5 w-5" />
              </motion.button>

              <motion.button 
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              <motion.button 
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {" "}E-commerce
            </span>
            <br />
            Experience
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our innovative shopping platform with cutting-edge technology, 
            smart features, and premium user experience.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button 
              variant="primary" 
              size="lg"
              onClick={addToCart}
              className="px-8 py-3"
            >
              <Zap className="mr-2 h-5 w-5" />
              Demo Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </motion.section>

        {/* Demo Product */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Product</h2>
            <p className="text-gray-600">Experience our premium product showcase</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Product Demo Card */}
            <motion.div
              className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 rounded-2xl flex items-center justify-center relative overflow-hidden mb-6">
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)",
                      "radial-gradient(circle at 40% 40%, #06b6d4 0%, transparent 50%)",
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                
                {/* 3D Product Placeholder */}
                <motion.div
                  className="relative z-10 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="w-32 h-32 mx-auto mb-6 relative"
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ perspective: "1000px" }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                      <div className="absolute inset-4 bg-gradient-to-tl from-white/20 to-white/40 rounded-xl backdrop-blur-sm"></div>
                      <div className="absolute bottom-2 right-2 w-6 h-6 bg-white/30 rounded-full backdrop-blur-sm"></div>
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Premium Product</h3>
                  <p className="text-gray-600 mb-4">Interactive 3D Experience</p>
                  <div className="flex justify-center space-x-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-3xl font-bold text-blue-600">$299.99</p>
                </motion.div>
                
                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/40 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 2) * 40}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={addToCart}
                  className="px-8 py-3"
                >
                  Add to Cart - ${299.99}
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features */}
        <motion.section 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            {
              title: "Smart Cart",
              description: "Persistent shopping cart with intelligent recommendations",
              icon: "🛒",
              color: "from-blue-400 to-blue-600"
            },
            {
              title: "3D Visualization",
              description: "Interactive product models with real-time customization",
              icon: "🎯",
              color: "from-purple-400 to-purple-600"
            },
            {
              title: "Premium UX",
              description: "Glassmorphism design with smooth micro-interactions",
              icon: "✨",
              color: "from-pink-400 to-pink-600"
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 text-center shadow-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Stats */}
        <motion.section 
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white text-center shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-8">Live Demo Stats</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">{cartCount}</div>
              <div className="text-blue-100">Items in Cart</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1</div>
              <div className="text-blue-100">Active User</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">95+</div>
              <div className="text-blue-100">Performance Score</div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer 
        className="bg-gray-900 text-white py-12 mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold">NexusShop</span>
          </div>
          <p className="text-gray-400 mb-4">
            Premium e-commerce platform built with React 18, TypeScript, and TailwindCSS
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>🚀 Vite + SWC</span>
            <span>🎨 TailwindCSS</span>
            <span>📱 PWA Ready</span>
            <span>🔒 Secure Auth</span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App; 