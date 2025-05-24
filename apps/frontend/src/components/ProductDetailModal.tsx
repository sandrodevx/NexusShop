import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  Minus, 
  Plus, 
  Shield, 
  Truck, 
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Product } from '../data/products';
import { Button } from './Button';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant?: any) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}: ProductDetailModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
    setSelectedImageIndex(0);
    setQuantity(1);
    setActiveTab('description');
  }, [product]);

  if (!product) return null;

  const currentPrice = selectedVariant?.price || product.price;
  const currentImages = selectedVariant?.images || product.images;
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedVariant);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
              {/* Image Gallery */}
              <div className="lg:w-1/2 relative bg-gray-50">
                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>

                {/* Main Image */}
                <div className="relative aspect-square">
                  <motion.img
                    key={selectedImageIndex}
                    src={currentImages[selectedImageIndex]}
                    alt={product.name}
                    className={`w-full h-full object-cover cursor-zoom-in ${isImageZoomed ? 'scale-150' : ''}`}
                    onClick={() => setIsImageZoomed(!isImageZoomed)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Zoom Indicator */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    Click to zoom
                  </div>

                  {/* Navigation Arrows */}
                  {currentImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.new && (
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                        NEW
                      </span>
                    )}
                    {product.sale && discountPercentage > 0 && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        -{discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Image Thumbnails */}
                {currentImages.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto">
                    {currentImages.map((image: string, index: number) => (
                      <motion.button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === selectedImageIndex ? 'border-blue-500' : 'border-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                      {product.name}
                    </h1>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviewCount} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-bold text-gray-900">
                        ${currentPrice}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      {discountPercentage > 0 && (
                        <span className="text-lg font-semibold text-red-600">
                          Save {discountPercentage}%
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div className="mb-6">
                      {product.inStock ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">
                            {product.stockCount <= 10 
                              ? `Only ${product.stockCount} left in stock`
                              : 'In Stock'
                            }
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-sm font-medium">Out of Stock</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Variants */}
                  {product.variants && product.variants.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Options:</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.variants.map((variant) => (
                          <motion.button
                            key={variant.id}
                            onClick={() => setSelectedVariant(variant)}
                            className={`px-4 py-2 rounded-lg border transition-colors ${
                              selectedVariant?.id === variant.id
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {variant.name}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity & Add to Cart */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2 hover:bg-gray-50 transition-colors"
                          disabled={quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                          disabled={quantity >= product.stockCount}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        Total: ${(currentPrice * quantity).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className="flex-1"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                      </Button>
                      
                      <motion.button
                        onClick={() => onToggleWishlist(product)}
                        className={`p-3 rounded-lg border transition-colors ${
                          isInWishlist
                            ? 'border-red-500 bg-red-50 text-red-600'
                            : 'border-gray-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
                      </motion.button>
                      
                      <motion.button
                        onClick={handleShare}
                        className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share2 className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
                    <div className="text-center">
                      <Shield className="h-6 w-6 mx-auto text-green-600 mb-2" />
                      <p className="text-xs text-gray-600">Secure Payment</p>
                    </div>
                    <div className="text-center">
                      <Truck className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                      <p className="text-xs text-gray-600">Free Shipping</p>
                    </div>
                    <div className="text-center">
                      <RotateCcw className="h-6 w-6 mx-auto text-purple-600 mb-2" />
                      <p className="text-xs text-gray-600">Easy Returns</p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div>
                    <div className="flex border-b border-gray-200 mb-4">
                      {[
                        { key: 'description', label: 'Description' },
                        { key: 'specifications', label: 'Specifications' },
                        { key: 'reviews', label: `Reviews (${product.reviewCount})` },
                      ].map(({ key, label }) => (
                        <button
                          key={key}
                          onClick={() => setActiveTab(key as any)}
                          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === key
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-4">
                      {activeTab === 'description' && (
                        <div>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            {product.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === 'specifications' && (
                        <div className="space-y-3">
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                              <span className="font-medium text-gray-900">{key}:</span>
                              <span className="text-gray-600">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 'reviews' && (
                        <div className="space-y-4">
                          <div className="text-center py-8 text-gray-500">
                            <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>Reviews coming soon!</p>
                            <p className="text-sm">Be the first to review this product.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 