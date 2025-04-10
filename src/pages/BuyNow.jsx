import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, CreditCard, Truck, Shield } from 'lucide-react';
import { useShop } from '../context/useShop';

function BuyNow() {
  const location = useLocation();
  const product = location.state?.product;
  const quantity = location.state?.quantity || 1;

  const [expandedSections, setExpandedSections] = useState({
    address: true,
    payment: false
  });

  const [selectedAddress, setSelectedAddress] = useState('');
  const [saveAddress, setSaveAddress] = useState(false);

  const savedAddresses = [
    {
      id: '1',
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States'
    }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const calculateSubtotal = () => {
    return product ? product.price * quantity : 0;
  };

  const calculateShipping = (subtotal) => {
    return subtotal > 100 ? 0 : 10;
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.1;
  };

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No product selected</h2>
          <Link to="/products" className="mt-4 text-indigo-600 hover:text-indigo-500">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Quick Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Product Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">Quantity: {quantity}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                  ${(product.price * quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleSection('address')}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center">
                <Truck className="h-6 w-6 text-indigo-600 mr-3" />
                <span className="text-lg font-semibold">Shipping Address</span>
              </div>
              {expandedSections.address ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>

            {expandedSections.address && (
              <div className="p-6 border-t">
                <div className="space-y-4">
                  {savedAddresses.map(address => (
                    <label
                      key={address.id}
                      className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer
                               hover:border-indigo-500 hover:shadow-md transition-all duration-200"
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="mt-1 text-indigo-600"
                      />
                      <div>
                        <p className="font-medium">{address.name}</p>
                        <p className="text-sm text-gray-600">{address.street}</p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} {address.zip}
                        </p>
                        <p className="text-sm text-gray-600">{address.country}</p>
                      </div>
                    </label>
                  ))}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="State/Province"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="ZIP/Postal Code"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                    </select>
                  </div>

                  <label className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      checked={saveAddress}
                      onChange={(e) => setSaveAddress(e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Save this address for future use
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleSection('payment')}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center">
                <CreditCard className="h-6 w-6 text-indigo-600 mr-3" />
                <span className="text-lg font-semibold">Payment Method</span>
              </div>
              {expandedSections.payment ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>

            {expandedSections.payment && (
              <div className="p-6 border-t space-y-4">
                <div className="border rounded-lg p-4 hover:border-indigo-500 hover:shadow-md transition-all duration-200">
                  <label className="flex items-center">
                    <input type="radio" name="payment" className="text-indigo-600" />
                    <span className="ml-2">Credit/Debit Card</span>
                  </label>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <label className="flex items-center">
                    <input type="radio" name="payment" className="text-indigo-600" />
                    <span className="ml-2">Cash on Delivery</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 
                       transition-colors duration-200"
            >
              Place Order
            </button>

            <div className="mt-6 space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="h-5 w-5 mr-2" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="h-5 w-5 mr-2" />
                <span>Secure payment processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyNow;