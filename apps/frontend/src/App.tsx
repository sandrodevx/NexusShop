import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Heart, Star, Zap, TrendingUp, Package, Shield, Users, Menu, X, Search } from 'lucide-react';
import { Button } from './components/Button';
import { ProductCard } from './components/ProductCard';
import { CategoryCard } from './components/CategoryCard';
import { SearchAndFilters } from './components/SearchAndFilters';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SideCart } from './components/SideCart';
import { 
  categories, 
  products,
  getFeaturedProducts, 
  getNewProducts, 
  getSaleProducts,
  Product 
} from './data/products';

// Cart item interface
interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variant?: any;
  addedAt: Date;
}

function App() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [selectedSection, setSelectedSection] = useState<'featured' | 'new' | 'sale' | 'categories'>('featured');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultsCount, setSearchResultsCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Product detail modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();
  const saleProducts = getSaleProducts();

  // Get currently displayed products based on search/filters or section
  const displayProducts = searchQuery || filteredProducts.length !== products.length 
    ? filteredProducts 
    : (selectedSection === 'featured' ? featuredProducts :
       selectedSection === 'new' ? newProducts :
       selectedSection === 'sale' ? saleProducts : featuredProducts);

  const addToCart = (product: Product, quantity: number = 1, variant?: any) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.product.id === product.id && 
               JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (existingItemIndex > -1) {
      // Update existing item quantity
      setCartItems(prev => prev.map((item, index) => 
        index === existingItemIndex 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `${product.id}-${variant?.id || 'default'}-${Date.now()}`,
        product,
        quantity,
        variant,
        addedAt: new Date()
      };
      setCartItems(prev => [...prev, newItem]);
    }

    console.log('Added to cart:', product.name, 'Quantity:', quantity, 'Variant:', variant?.name);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (product: Product) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(product.id)) {
      newWishlist.delete(product.id);
    } else {
      newWishlist.add(product.id);
    }
    setWishlist(newWishlist);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const closeProductDetail = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const onCategoryClick = (category: any) => {
    console.log('Category clicked:', category.name);
    // You could implement category filtering here
  };

  const handleFilteredProducts = (products: Product[]) => {
    setFilteredProducts(products);
  };

  const handleSearchResults = (query: string, count: number) => {
    setSearchQuery(query);
    setSearchResultsCount(count);
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-900 via-dark-50 to-cyber-800 grid-bg">
      {/* Animated Background Particles */}
      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-400 rounded-full opacity-30"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="glass-dark sticky top-0 z-50 shadow-2xl border-b border-neon-400/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div 
                className="relative w-12 h-12 cyber-border rounded-xl bg-gradient-to-br from-neon-500 to-electric-400 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Zap className="h-6 w-6 text-dark-900" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-neon-400/20 to-electric-400/20 rounded-xl"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <span className="text-2xl font-display font-bold gradient-text">NexusShop</span>
                <p className="text-xs text-cyber-400 font-medium">CYBER MARKETPLACE</p>
              </div>
            </motion.div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyber-400" />
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  className="w-full h-12 pl-12 pr-4 glass-dark rounded-xl text-cyber-100 placeholder-cyber-400 focus:outline-none focus:ring-2 focus:ring-neon-400 focus:border-transparent transition-all duration-300"
                />
                <motion.div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="neon" size="sm" className="h-8">
                    <Search className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { name: 'Home', href: '#' },
                { name: 'Products', href: '#products' },
                { name: 'Categories', href: '#categories' },
                { name: 'Deals', href: '#deals' },
              ].map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-cyber-300 hover:text-neon-400 transition-all duration-300 font-medium relative group"
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-400 to-electric-400 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <motion.button 
                className="relative p-3 text-cyber-300 hover:text-plasma-400 transition-all duration-300 rounded-xl hover:bg-dark-100/20 group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="h-6 w-6 group-hover:fill-current transition-all duration-300" />
                {wishlist.size > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-plasma-500 to-plasma-400 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {wishlist.size}
                  </motion.span>
                )}
              </motion.button>

              {/* Cart */}
              <motion.button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 text-cyber-300 hover:text-neon-400 transition-all duration-300 rounded-xl hover:bg-dark-100/20 group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-neon-500 to-neon-400 text-dark-900 text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </motion.button>

              {/* User */}
              <motion.button 
                className="relative p-3 text-cyber-300 hover:text-electric-400 transition-all duration-300 rounded-xl hover:bg-dark-100/20"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="h-6 w-6" />
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 text-cyber-300 hover:text-neon-400 transition-all duration-300 rounded-xl hover:bg-dark-100/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden glass-dark border-t border-neon-400/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyber-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full h-12 pl-12 pr-4 glass-dark rounded-xl text-cyber-100 placeholder-cyber-400 focus:outline-none focus:ring-2 focus:ring-neon-400"
                />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {[
                  { name: 'Home', href: '#' },
                  { name: 'Products', href: '#products' },
                  { name: 'Categories', href: '#categories' },
                  { name: 'Deals', href: '#deals' },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-3 px-4 text-cyber-300 hover:text-neon-400 hover:bg-dark-100/20 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                <span className="gradient-text">NEXUS</span>
                <br />
                <span className="gradient-text-plasma">MARKETPLACE</span>
              </h1>
              <p className="text-xl md:text-2xl text-cyber-300 mb-8 max-w-3xl mx-auto font-medium">
                Experience the future of shopping with cutting-edge products and seamless transactions
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                { icon: Package, label: 'Products', value: '10K+' },
                { icon: Users, label: 'Customers', value: '50K+' },
                { icon: Shield, label: 'Secure', value: '100%' },
                { icon: TrendingUp, label: 'Growth', value: '150%' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="cyber-card p-6 rounded-2xl text-center group hover-lift"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <stat.icon className="h-8 w-8 text-neon-400 mx-auto mb-3 group-hover:text-electric-400 transition-colors duration-300" />
                  <div className="text-2xl font-display font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-cyber-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button variant="neon" size="lg" glow className="min-w-48">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Start Shopping
              </Button>
              <Button variant="cyber" size="lg" className="min-w-48">
                <Zap className="mr-2 h-5 w-5" />
                Explore Categories
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border-2 border-neon-400/30 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 border-2 border-plasma-400/30 rounded-lg"
          animate={{ rotate: -360, y: [-10, 10, -10] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SearchAndFilters
            products={products}
            onFilteredProducts={handleFilteredProducts}
            onSearchResults={handleSearchResults}
          />
        </motion.section>

        {/* Categories Section */}
        <motion.section 
          id="categories"
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Explore our diverse range of premium products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={onCategoryClick}
                index={index}
              />
            ))}
          </div>
        </motion.section>

        {/* Products Section */}
        <motion.section 
          id="products"
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {searchQuery ? (
                `Search Results for "${searchQuery}"`
              ) : (
                selectedSection === 'featured' ? 'Featured Products' :
                selectedSection === 'new' ? 'New Arrivals' :
                selectedSection === 'sale' ? 'Products on Sale' : 'Featured Products'
              )}
            </h2>
            <p className="text-gray-600 mb-6">
              {searchQuery ? (
                `Found ${searchResultsCount} result${searchResultsCount !== 1 ? 's' : ''}`
              ) : (
                'Discover our handpicked selection of premium items'
              )}
            </p>
            
            {/* Section Tabs - Hide when searching */}
            {!searchQuery && (
              <div className="flex justify-center space-x-4 mb-8">
                {[
                  { key: 'featured', label: 'Featured', icon: Star },
                  { key: 'new', label: 'New Arrivals', icon: Package },
                  { key: 'sale', label: 'On Sale', icon: TrendingUp },
                ].map(({ key, label, icon: Icon }) => (
                  <motion.button
                    key={key}
                    onClick={() => setSelectedSection(key as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                      selectedSection === key
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Products Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            key={`${selectedSection}-${searchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {displayProducts.length > 0 ? (
              displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={openProductDetail}
                  onAddToCart={(product) => addToCart(product, 1)}
                  onToggleWishlist={toggleWishlist}
                  isInWishlist={wishlist.has(product.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose NexusShop?</h2>
            <p className="text-gray-600">Experience the future of online shopping</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Shopping",
                description: "Your data is protected with enterprise-grade security and encryption."
              },
              {
                icon: Users,
                title: "Expert Support",
                description: "24/7 customer support from our team of shopping experts."
              },
              {
                icon: TrendingUp,
                title: "Smart Features",
                description: "AI-powered recommendations and smart cart technology for better shopping."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the future of e-commerce today.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 border-white hover:bg-blue-50 px-8 py-3"
            >
              Browse Products
            </Button>
            <Button 
              variant="primary"
              size="lg"
              className="bg-blue-700 hover:bg-blue-800 px-8 py-3"
            >
              Sign Up Now
            </Button>
          </div>
        </motion.section>
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={closeProductDetail}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        isInWishlist={selectedProduct ? wishlist.has(selectedProduct.id) : false}
      />

      {/* Side Cart */}
      <SideCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

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