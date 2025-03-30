import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { productUtils, categoryUtils } from '../server/utils/database';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: { min: '', max: '' },
    sortBy: 'newest'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productUtils.getAllProducts(),
        categoryUtils.getAllCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const addToCart = (product) => {
    setCart([...cart, product.id]);
    showToast('Item Added to Cart');
  };

  const toggleWishlist = (product) => {
    if (wishlist.includes(product.id)) {
      setWishlist(wishlist.filter(id => id !== product.id));
      showToast('Item Removed from Wishlist');
    } else {
      setWishlist([...wishlist, product.id]);
      showToast('Item Added to Wishlist');
    }
  };

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesCategory = !filters.category || product.category_id === filters.category;
    const matchesPriceRange = (!filters.priceRange.min || product.price >= filters.priceRange.min) &&
                             (!filters.priceRange.max || product.price <= filters.priceRange.max);
    return matchesCategory && matchesPriceRange;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default: // newest
        return new Date(b.created_at) - new Date(a.created_at);
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 min-w-[200px] max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-indigo-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
              {showFilters ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </button>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-indigo-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price Range
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange.min}
                    onChange={(e) => setFilters({
                      ...filters,
                      priceRange: { ...filters.priceRange, min: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                           focus:ring-indigo-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange.max}
                    onChange={(e) => setFilters({
                      ...filters,
                      priceRange: { ...filters.priceRange, max: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                           focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group 
                     hover:-translate-y-1 transition-all duration-300"
          >
            <Link to={`/product/${product.id}`} className="block relative">
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/300'}
                alt={product.name}
                className="w-full aspect-square object-cover transform transition-transform 
                         duration-500 group-hover:scale-110"
              />
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full 
                             text-xs">
                  -{product.discount}%
                </div>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(product);
                }}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white 
                         transition-colors duration-200"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlist.includes(product.id)
                      ? 'text-red-500 fill-current'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            </Link>
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 
                           hover:text-indigo-600">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {product.categories?.name}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  {product.compare_price && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${product.compare_price}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 
                         transition-colors duration-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg 
                   transform transition-transform duration-300 ${
                     showNotification ? 'translate-y-0' : 'translate-y-24'
                   }`}
      >
        {notificationMessage}
        {notificationMessage.includes('Cart') && (
          <Link
            to="/cart"
            className="ml-4 text-indigo-400 hover:text-indigo-300 font-medium"
          >
            View Cart
          </Link>
        )}
      </div>
    </div>
  );
}

export default Products;