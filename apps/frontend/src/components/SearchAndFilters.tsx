import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  ChevronDown, 
  Star, 
  SlidersHorizontal,
  Tag,
  Sparkles
} from 'lucide-react';
import { Product, categories } from '../data/products';

interface SearchAndFiltersProps {
  products: Product[];
  onFilteredProducts: (products: Product[]) => void;
  onSearchResults: (query: string, count: number) => void;
}

interface FilterState {
  searchQuery: string;
  priceRange: [number, number];
  selectedCategories: string[];
  selectedBrands: string[];
  selectedRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
}

export function SearchAndFilters({ 
  products, 
  onFilteredProducts, 
  onSearchResults 
}: SearchAndFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    priceRange: [0, 2000],
    selectedCategories: [],
    selectedBrands: [],
    selectedRating: 0,
    inStockOnly: false,
    onSaleOnly: false,
  });

  const [showFilters, setShowFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    brands: false,
    rating: false,
  });

  // Get unique brands from products
  const uniqueBrands = useMemo(() => {
    return [...new Set(products.map(p => p.brand))].sort();
  }, [products]);

  // Get price range from products
  const priceRange = useMemo(() => {
    const prices = products.map(p => p.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, [products]);

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchText = `${product.name} ${product.description} ${product.brand} ${product.tags.join(' ')}`.toLowerCase();
        if (!searchText.includes(query)) return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Category filter
      if (filters.selectedCategories.length > 0 && !filters.selectedCategories.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (filters.selectedBrands.length > 0 && !filters.selectedBrands.includes(product.brand)) {
        return false;
      }

      // Rating filter
      if (filters.selectedRating > 0 && product.rating < filters.selectedRating) {
        return false;
      }

      // Stock filter
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      // Sale filter
      if (filters.onSaleOnly && !product.sale) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  // Update filtered products when filters change
  useEffect(() => {
    onFilteredProducts(filteredProducts);
    onSearchResults(filters.searchQuery, filteredProducts.length);
  }, [filteredProducts, filters.searchQuery, onFilteredProducts, onSearchResults]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleCategory = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter(id => id !== categoryId)
        : [...prev.selectedCategories, categoryId]
    }));
  };

  const toggleBrand = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      selectedBrands: prev.selectedBrands.includes(brand)
        ? prev.selectedBrands.filter(b => b !== brand)
        : [...prev.selectedBrands, brand]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      searchQuery: '',
      priceRange: [priceRange[0], priceRange[1]],
      selectedCategories: [],
      selectedBrands: [],
      selectedRating: 0,
      inStockOnly: false,
      onSaleOnly: false,
    });
  };

  const activeFiltersCount = 
    filters.selectedCategories.length + 
    filters.selectedBrands.length +
    (filters.selectedRating > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0) +
    (filters.priceRange[0] !== priceRange[0] || filters.priceRange[1] !== priceRange[1] ? 1 : 0);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-full mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            value={filters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
          />
          {filters.searchQuery && (
            <motion.button
              onClick={() => updateFilter('searchQuery', '')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </motion.div>

        {/* Search Results Counter */}
        {filters.searchQuery && (
          <motion.div
            className="mt-2 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Sparkles className="inline h-4 w-4 mr-1" />
            Found {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{filters.searchQuery}"
          </motion.div>
        )}
      </div>

      {/* Filter Toggle & Quick Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Filter Toggle Button */}
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
            showFilters 
              ? 'bg-blue-500 text-white border-blue-500' 
              : 'bg-white/80 text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-1">
              {activeFiltersCount}
            </span>
          )}
        </motion.button>

        {/* Quick Filter Pills */}
        <motion.button
          onClick={() => updateFilter('onSaleOnly', !filters.onSaleOnly)}
          className={`px-3 py-1 rounded-full text-sm transition-all ${
            filters.onSaleOnly
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          <Tag className="inline h-3 w-3 mr-1" />
          On Sale
        </motion.button>

        <motion.button
          onClick={() => updateFilter('inStockOnly', !filters.inStockOnly)}
          className={`px-3 py-1 rounded-full text-sm transition-all ${
            filters.inStockOnly
              ? 'bg-green-500 text-white'
              : 'bg-white/80 text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          In Stock
        </motion.button>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <motion.button
            onClick={clearAllFilters}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Clear All
          </motion.button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 space-y-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Categories Filter */}
              <div>
                <button
                  onClick={() => toggleSection('categories')}
                  className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                >
                  Categories
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {expandedSections.categories && (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {categories.map(category => (
                        <label key={category.id} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={filters.selectedCategories.includes(category.id)}
                            onChange={() => toggleCategory(category.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{category.name}</span>
                          <span className="text-gray-400 text-xs">({category.productCount})</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Price Range Filter */}
              <div>
                <button
                  onClick={() => toggleSection('price')}
                  className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                >
                  Price Range
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {expandedSections.price && (
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="flex items-center space-x-2 text-sm">
                        <span>${filters.priceRange[0]}</span>
                        <span>-</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min={priceRange[0]}
                        max={priceRange[1]}
                        step="10"
                        value={filters.priceRange[1]}
                        onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-blue-500"
                        aria-label="Maximum price range"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Brands Filter */}
              <div>
                <button
                  onClick={() => toggleSection('brands')}
                  className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                >
                  Brands
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {expandedSections.brands && (
                    <motion.div
                      className="space-y-2 max-h-32 overflow-y-auto"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {uniqueBrands.map(brand => (
                        <label key={brand} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={filters.selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Rating Filter */}
              <div>
                <button
                  onClick={() => toggleSection('rating')}
                  className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                >
                  Rating
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {expandedSections.rating && (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {[4, 3, 2, 1].map(rating => (
                        <label key={rating} className="flex items-center space-x-2 text-sm cursor-pointer">
                          <input
                            type="radio"
                            name="rating"
                            checked={filters.selectedRating === rating}
                            onChange={() => updateFilter('selectedRating', rating)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-gray-600">& up</span>
                          </div>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 