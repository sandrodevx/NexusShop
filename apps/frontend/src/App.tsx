import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Heart, Star, Zap, TrendingUp, Package, Shield, Users } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm"
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
              <a href="#products" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Products</a>
              <a href="#categories" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Categories</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <motion.button 
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="h-5 w-5" />
                {wishlist.size > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {wishlist.size}
                  </span>
                )}
              </motion.button>

              <motion.button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {cartItemsCount}
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
            Discover thousands of premium products with cutting-edge technology, 
            smart features, and exceptional user experience.
          </p>
          
          <div className="flex justify-center space-x-4 mb-8">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3"
            >
              <Zap className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{products.length}</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-gray-600">Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4.9★</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </motion.div>
        </motion.section>

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