import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  CreditCard, 
  Gift, 
  Percent,
  ArrowRight,
  Package
} from 'lucide-react';
import { Product } from '../data/products';
import { Button } from './Button';

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variant?: any;
  addedAt: Date;
}

interface SideCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export function SideCart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: SideCartProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);
  const [showGiftMessage, setShowGiftMessage] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    const price = item.variant?.price || item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const couponDiscount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0;
  const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
  const tax = (subtotal - couponDiscount) * 0.08; // 8% tax
  const total = subtotal - couponDiscount + shipping + tax;

  // Mock coupon validation
  const validateCoupon = (code: string) => {
    const validCoupons: Record<string, number> = {
      'WELCOME10': 10,
      'SAVE20': 20,
      'NEXUS15': 15,
    };
    
    return validCoupons[code.toUpperCase()];
  };

  const applyCoupon = () => {
    const discount = validateCoupon(couponCode);
    if (discount) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount });
      setCouponCode('');
    } else {
      // You could add error handling here
      console.log('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout...', {
      items,
      subtotal,
      couponDiscount,
      shipping,
      tax,
      total,
      giftMessage: showGiftMessage ? giftMessage : null
    });
    // Implement checkout logic here
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-dark-100/80 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md glass-dark shadow-2xl z-50 flex flex-col border-l border-neon-400/20"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neon-400/20">
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-500/20 to-neon-400/20 border border-neon-400/30 flex items-center justify-center"
                  animate={{ 
                    boxShadow: [
                      '0 0 10px rgba(34, 197, 94, 0.3)',
                      '0 0 20px rgba(34, 197, 94, 0.5)',
                      '0 0 10px rgba(34, 197, 94, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ShoppingBag className="h-6 w-6 text-neon-400" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold font-heading gradient-text">
                    CYBER CART
                  </h2>
                  <p className="text-sm text-cyber-400 font-medium">
                    {items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'} LOADED
                  </p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="p-3 glass-dark rounded-xl border border-cyber-400/30 hover:border-neon-400/50 text-cyber-300 hover:text-neon-400 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-full text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Package className="h-20 w-20 text-cyber-400 mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold font-heading gradient-text mb-4">CART MATRIX EMPTY</h3>
                  <p className="text-cyber-300 mb-8 font-medium">
                    Load some products into the digital marketplace!
                  </p>
                  <Button variant="neon" size="lg" glow onClick={onClose}>
                    Continue Mission
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {items.map((item, index) => {
                      const price = item.variant?.price || item.product.price;
                      const itemTotal = price * item.quantity;

                      return (
                        <motion.div
                          key={item.id}
                          className="flex gap-4 p-4 cyber-card rounded-2xl border border-cyber-400/30"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20, height: 0 }}
                          transition={{ delay: index * 0.1 }}
                          layout
                          whileHover={{ scale: 1.02, y: -2 }}
                        >
                          {/* Product Image */}
                          <div className="w-18 h-18 rounded-xl overflow-hidden border border-neon-400/30 bg-dark-100">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-cyber-100 truncate font-heading">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-electric-400 font-medium">{item.product.brand}</p>
                            {item.variant && (
                              <p className="text-sm text-plasma-400 font-medium">{item.variant.name}</p>
                            )}
                            
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center border border-gray-200 rounded-lg">
                                <motion.button
                                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="p-1 hover:bg-gray-100 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </motion.button>
                                <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                                <motion.button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 hover:bg-gray-100 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  disabled={item.quantity >= item.product.stockCount}
                                >
                                  <Plus className="h-3 w-3" />
                                </motion.button>
                              </div>

                              <div className="text-right">
                                <p className="font-semibold text-gray-900">${itemTotal.toFixed(2)}</p>
                                <motion.button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 mt-1"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                  Remove
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Clear Cart Button */}
                  {items.length > 0 && (
                    <motion.button
                      onClick={onClearCart}
                      className="w-full p-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Clear All Items
                    </motion.button>
                  )}
                </div>
              )}
            </div>

            {/* Cart Summary & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Coupon Code */}
                <div>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={applyCoupon}
                      disabled={!couponCode.trim()}
                      className="px-4"
                    >
                      <Percent className="h-4 w-4 mr-1" />
                      Apply
                    </Button>
                  </div>

                  {appliedCoupon && (
                    <motion.div
                      className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg text-sm"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <span className="text-green-700">
                        🎉 {appliedCoupon.code} applied ({appliedCoupon.discount}% off)
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="text-green-600 hover:text-green-800"
                        aria-label="Remove coupon"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Gift Message */}
                <div>
                  <motion.button
                    onClick={() => setShowGiftMessage(!showGiftMessage)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Gift className="h-4 w-4" />
                    {showGiftMessage ? 'Remove gift message' : 'Add gift message'}
                  </motion.button>

                  <AnimatePresence>
                    {showGiftMessage && (
                      <motion.textarea
                        className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Enter your gift message..."
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        rows={3}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Order Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon.code}):</span>
                      <span>-${couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {shipping > 0 && (
                  <motion.div
                    className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="text-sm text-blue-700 mb-2">
                      Add ${(100 - subtotal).toFixed(2)} more for FREE shipping! 🚚
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <motion.div
                        className="bg-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (subtotal / 100) * 100)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Checkout Button */}
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleCheckout}
                  className="w-full"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                {/* Continue Shopping */}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onClose}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 