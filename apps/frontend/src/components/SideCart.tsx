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
                            
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center glass-dark border border-neon-400/30 rounded-xl">
                                <motion.button
                                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="p-2 hover:bg-neon-500/20 text-cyber-300 hover:text-neon-400 transition-colors disabled:opacity-50"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </motion.button>
                                <span className="px-4 py-2 text-sm font-bold text-cyber-100 font-mono">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-neon-500/20 text-cyber-300 hover:text-neon-400 transition-colors disabled:opacity-50"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  disabled={item.quantity >= item.product.stockCount}
                                >
                                  <Plus className="h-4 w-4" />
                                </motion.button>
                              </div>

                              <div className="text-right">
                                <p className="font-bold text-xl text-neon-400 font-mono">
                                  ${itemTotal.toFixed(2)}
                                </p>
                                <motion.button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-plasma-500 hover:text-plasma-400 text-sm flex items-center gap-1 mt-1 font-medium"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                  DELETE
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
                      className="w-full p-3 text-sm font-bold text-plasma-400 hover:text-plasma-300 glass-dark border border-plasma-400/30 hover:border-plasma-400/50 rounded-xl transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        PURGE ALL ITEMS
                      </motion.span>
                    </motion.button>
                  )}
                </div>
              )}
            </div>

            {/* Cart Summary & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-neon-400/20 p-6 space-y-5 bg-gradient-to-t from-dark-100/50 to-transparent">
                {/* Coupon Code */}
                <div>
                  <div className="flex gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="ENTER DISCOUNT CODE"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-4 py-3 glass-dark border border-cyber-400/30 rounded-xl text-sm font-medium text-cyber-100 placeholder-cyber-400 focus:outline-none focus:ring-2 focus:ring-neon-400/50 focus:border-neon-400/50"
                    />
                    <Button
                      variant="electric"
                      size="sm"
                      onClick={applyCoupon}
                      disabled={!couponCode.trim()}
                      className="px-6"
                    >
                      <Percent className="h-4 w-4 mr-2" />
                      APPLY
                    </Button>
                  </div>

                  {appliedCoupon && (
                    <motion.div
                      className="flex items-center justify-between p-3 glass-dark border border-neon-400/50 rounded-xl text-sm"
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        boxShadow: [
                          '0 0 10px rgba(34, 197, 94, 0.3)',
                          '0 0 20px rgba(34, 197, 94, 0.5)',
                          '0 0 10px rgba(34, 197, 94, 0.3)',
                        ]
                      }}
                      transition={{ 
                        boxShadow: { duration: 2, repeat: Infinity }
                      }}
                    >
                      <span className="text-neon-400 font-bold">
                        ⚡ {appliedCoupon.code} ACTIVATED ({appliedCoupon.discount}% OFF)
                      </span>
                      <motion.button
                        onClick={removeCoupon}
                        className="text-plasma-400 hover:text-plasma-300"
                        aria-label="Remove coupon"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                    </motion.div>
                  )}
                </div>

                {/* Gift Message */}
                <div>
                  <motion.button
                    onClick={() => setShowGiftMessage(!showGiftMessage)}
                    className="flex items-center gap-3 text-sm text-plasma-400 hover:text-plasma-300 font-medium transition-colors"
                    whileHover={{ scale: 1.02, x: 2 }}
                  >
                    <motion.div
                      animate={{ rotate: showGiftMessage ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Gift className="h-5 w-5" />
                    </motion.div>
                    {showGiftMessage ? 'REMOVE GIFT PROTOCOL' : 'ADD GIFT PROTOCOL'}
                  </motion.button>

                  <AnimatePresence>
                    {showGiftMessage && (
                      <motion.textarea
                        className="w-full mt-3 px-4 py-3 glass-dark border border-plasma-400/30 rounded-xl text-sm font-medium text-cyber-100 placeholder-cyber-400 focus:outline-none focus:ring-2 focus:ring-plasma-400/50 focus:border-plasma-400/50 resize-none"
                        placeholder="ENTER GIFT MESSAGE PROTOCOL..."
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        rows={3}
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Order Summary */}
                <div className="glass-dark p-4 rounded-xl border border-cyber-400/30 space-y-3">
                  <h3 className="text-lg font-bold font-heading gradient-text mb-4">
                    TRANSACTION BREAKDOWN
                  </h3>
                  
                  <div className="flex justify-between text-cyber-200 font-medium">
                    <span>SUBTOTAL:</span>
                    <span className="font-mono text-electric-400">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <motion.div 
                      className="flex justify-between text-neon-400 font-bold"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span>DISCOUNT ({appliedCoupon.code}):</span>
                      <span className="font-mono">-${couponDiscount.toFixed(2)}</span>
                    </motion.div>
                  )}
                  
                  <div className="flex justify-between text-cyber-200 font-medium">
                    <span>SHIPPING:</span>
                    <span className="font-mono">
                      {shipping === 0 ? (
                        <span className="text-neon-400 font-bold">FREE</span>
                      ) : (
                        <span className="text-electric-400">${shipping.toFixed(2)}</span>
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-cyber-200 font-medium">
                    <span>TAX:</span>
                    <span className="font-mono text-electric-400">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-neon-400/30 pt-3 flex justify-between font-bold text-xl">
                    <span className="gradient-text">TOTAL:</span>
                    <span className="font-mono text-neon-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {shipping > 0 && (
                  <motion.div
                    className="p-4 glass-dark border border-electric-400/50 rounded-xl"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      boxShadow: [
                        '0 0 10px rgba(252, 211, 77, 0.3)',
                        '0 0 20px rgba(252, 211, 77, 0.5)',
                        '0 0 10px rgba(252, 211, 77, 0.3)',
                      ]
                    }}
                    transition={{ 
                      boxShadow: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <div className="text-sm text-electric-400 font-bold mb-3">
                      ⚡ Add ${(100 - subtotal).toFixed(2)} more for FREE SHIPPING! 🚀
                    </div>
                    <div className="w-full bg-dark-100 rounded-full h-3 border border-electric-400/30">
                      <motion.div
                        className="bg-gradient-to-r from-electric-500 to-electric-400 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${Math.min(100, (subtotal / 100) * 100)}%`,
                          boxShadow: [
                            '0 0 5px rgba(252, 211, 77, 0.5)',
                            '0 0 15px rgba(252, 211, 77, 0.8)',
                            '0 0 5px rgba(252, 211, 77, 0.5)',
                          ]
                        }}
                        transition={{ 
                          width: { duration: 0.5 },
                          boxShadow: { duration: 1.5, repeat: Infinity }
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Checkout Button */}
                <Button
                  variant="neon"
                  size="lg"
                  glow
                  onClick={handleCheckout}
                  className="w-full font-bold"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  INITIALIZE PAYMENT
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                {/* Continue Shopping */}
                <Button
                  variant="cyber"
                  size="lg"
                  onClick={onClose}
                  className="w-full font-bold"
                >
                  CONTINUE BROWSING
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 