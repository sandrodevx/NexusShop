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
  Product,
  Category 
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
      (item: CartItem) => item.product.id === product.id && 
               JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (existingItemIndex > -1) {
      // Update existing item quantity
      setCartItems((prev: CartItem[]) => prev.map((item: CartItem, index: number) => 
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
      setCartItems((prev: CartItem[]) => [...prev, newItem]);
    }

    console.log('Added to cart:', product.name, 'Quantity:', quantity, 'Variant:', variant?.name);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems((prev: CartItem[]) => prev.map((item: CartItem) => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev: CartItem[]) => prev.filter((item: CartItem) => item.id !== itemId));
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

  const onCategoryClick = (category: Category) => {
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

  const cartItemsCount = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

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
              ].map((stat) => (
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
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <span className="gradient-text">PRODUCT</span>
              <br />
              <span className="gradient-text-plasma">CATEGORIES</span>
            </motion.h2>
            <p className="text-xl text-cyber-300 font-medium max-w-2xl mx-auto">
              Explore our diverse range of cutting-edge products across multiple categories
            </p>
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
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <span className="gradient-text">
                {searchQuery ? (
                  `SEARCH MATRIX`
                ) : (
                  selectedSection === 'featured' ? 'FEATURED TECH' :
                  selectedSection === 'new' ? 'LATEST DROPS' :
                  selectedSection === 'sale' ? 'CYBER DEALS' : 'FEATURED TECH'
                )}
              </span>
            </motion.h2>
            <p className="text-xl text-cyber-300 font-medium mb-8 max-w-3xl mx-auto">
              {searchQuery ? (
                `${searchResultsCount} results found in the digital marketplace`
              ) : (
                'Discover cutting-edge products powered by next-generation technology'
              )}
            </p>
            
            {/* Section Tabs - Hide when searching */}
            {!searchQuery && (
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { key: 'featured', label: 'Featured', icon: Star, color: 'neon' },
                  { key: 'new', label: 'New Arrivals', icon: Package, color: 'plasma' },
                  { key: 'sale', label: 'On Sale', icon: TrendingUp, color: 'electric' },
                ].map(({ key, label, icon: Icon, color }) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => setSelectedSection(key as any)}
                      className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold font-heading text-lg transition-all duration-300 ${
                        selectedSection === key
                          ? `glass-dark border-2 ${
                              color === 'neon' ? 'border-neon-400 text-neon-300 neon-glow' :
                              color === 'plasma' ? 'border-plasma-400 text-plasma-300 neon-glow-pink' :
                              'border-electric-400 text-electric-300 neon-glow-yellow'
                            }`
                          : 'glass text-cyber-300 border border-cyber-400/30 hover:border-cyber-300/50 hover:text-cyber-200'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </button>
                  </motion.div>
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
              <div className="col-span-full text-center py-16">
                <motion.div
                  className="cyber-card p-12 rounded-2xl max-w-md mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Package className="h-20 w-20 mx-auto text-cyber-400 mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold font-heading gradient-text mb-4">No Data Found</h3>
                  <p className="text-cyber-300 font-medium">
                    The search matrix returned empty results. Try recalibrating your filters.
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <span className="gradient-text">NEXUS</span>
              <br />
              <span className="gradient-text-plasma">ADVANTAGES</span>
            </motion.h2>
            <p className="text-xl text-cyber-300 font-medium max-w-2xl mx-auto">
              Experience next-generation shopping technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Quantum Security",
                description: "Military-grade encryption with blockchain verification protects every transaction.",
                color: "neon"
              },
              {
                icon: Users,
                title: "Neural Support",
                description: "AI-powered 24/7 assistance with human expertise when you need it most.",
                color: "plasma"
              },
              {
                icon: TrendingUp,
                title: "Smart Matrix",
                description: "Predictive algorithms and neural networks optimize your shopping experience.",
                color: "electric"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-8 cyber-card rounded-2xl hover-lift group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                <motion.div 
                  className={`w-20 h-20 cyber-border rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                    feature.color === 'neon' ? 'bg-gradient-to-br from-neon-500/20 to-neon-400/20' :
                    feature.color === 'plasma' ? 'bg-gradient-to-br from-plasma-500/20 to-plasma-400/20' :
                    'bg-gradient-to-br from-electric-500/20 to-electric-400/20'
                  }`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <feature.icon className={`h-10 w-10 ${
                    feature.color === 'neon' ? 'text-neon-400' :
                    feature.color === 'plasma' ? 'text-plasma-400' :
                    'text-electric-400'
                  } group-hover:scale-110 transition-transform duration-300`} />
                </motion.div>
                <h3 className="text-2xl font-bold font-heading gradient-text mb-4">{feature.title}</h3>
                <p className="text-cyber-300 font-medium leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="relative text-center cyber-card rounded-3xl p-16 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-neon-500/20 via-plasma-500/20 to-electric-500/20"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: '200% 200%' }}
          />
          
          <div className="relative z-10">
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <span className="gradient-text">READY TO ENTER</span>
              <br />
              <span className="gradient-text-plasma">THE NEXUS?</span>
            </motion.h2>
            <p className="text-xl text-cyber-300 mb-12 max-w-3xl mx-auto font-medium">
              Join thousands of digital pioneers and experience the future of commerce in the cyber marketplace
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button 
                variant="neon"
                size="lg"
                glow
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="min-w-48"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Enter Matrix
              </Button>
              <Button 
                variant="plasma"
                size="lg"
                className="min-w-48"
              >
                <User className="mr-2 h-5 w-5" />
                Join Network
              </Button>
            </div>
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
        className="relative glass-dark py-16 mt-20 border-t border-neon-400/20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="flex items-center justify-center space-x-3 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div 
              className="relative w-12 h-12 cyber-border rounded-xl bg-gradient-to-br from-neon-500 to-electric-400 flex items-center justify-center"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(34, 197, 94, 0.3)',
                  '0 0 40px rgba(34, 197, 94, 0.6)',
                  '0 0 20px rgba(34, 197, 94, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="h-6 w-6 text-dark-900" />
            </motion.div>
            <div>
              <span className="text-2xl font-display font-bold gradient-text">NexusShop</span>
              <p className="text-xs text-cyber-400 font-medium">CYBER MARKETPLACE</p>
            </div>
          </motion.div>
          
          <p className="text-cyber-300 mb-8 font-medium max-w-2xl mx-auto">
            Next-generation e-commerce platform powered by cutting-edge technology stack
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { icon: '🚀', label: 'Vite + SWC', desc: 'Lightning Fast' },
              { icon: '🎨', label: 'TailwindCSS', desc: 'Modern Design' },
              { icon: '📱', label: 'PWA Ready', desc: 'Mobile First' },
              { icon: '🔒', label: 'Secure Auth', desc: 'Enterprise Grade' },
            ].map((tech, index) => (
              <motion.div
                key={tech.label}
                className="glass-dark p-4 rounded-xl border border-cyber-400/20 hover:border-neon-400/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="text-2xl mb-2">{tech.icon}</div>
                <div className="text-sm font-bold text-neon-400 mb-1">{tech.label}</div>
                <div className="text-xs text-cyber-400">{tech.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App; 