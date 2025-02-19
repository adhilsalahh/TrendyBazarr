export const products = {
    'fashion-1': {
      id: 'fashion-1',
      name: 'Designer Summer Dress',
      price: 159.99,
      category: 'Fashion',
      images: [
        'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1583759136431-9d70db2eb04c?auto=format&fit=crop&q=80&w=600'
      ],
      rating: 4.8,
      reviews: 245,
      description: 'Elegant designer summer dress crafted from premium lightweight fabric. Features a flattering A-line silhouette with delicate floral patterns.',
      specs: {
        'Material': '100% Premium Cotton',
        'Style': 'A-Line Dress',
        'Pattern': 'Floral Print',
        'Length': 'Midi',
        'Care Instructions': 'Machine wash cold',
        'Sizes Available': 'XS to XL',
        'Country of Origin': 'Italy'
      },
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Sage Green', code: '#74917C' },
        { name: 'Dusty Rose', code: '#D8A7B1' },
        { name: 'Sky Blue', code: '#95B8D1' }
      ],
      features: [
        'Premium lightweight fabric',
        'Breathable material',
        'Side pockets',
        'Adjustable waist tie',
        'Hidden back zipper'
      ],
      inStock: true,
      deliveryTime: '3-5 business days',
      freeShipping: true,
      returnPeriod: 30
    },
    'fashion-2': {
      id: 'fashion-2',
      name: 'Leather Jacket',
      price: 199.99,
      category: 'Fashion',
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600'
      ],
      rating: 4.7,
      reviews: 189,
      description: 'Premium leather jacket with a modern cut and exceptional craftsmanship.',
      specs: {
        'Material': 'Genuine Leather',
        'Style': 'Biker Jacket',
        'Lining': '100% Polyester',
        'Closure': 'YKK Zipper',
        'Care Instructions': 'Professional leather clean',
        'Sizes Available': 'S to XXL',
        'Country of Origin': 'Italy'
      },
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [
        { name: 'Black', code: '#000000' },
        { name: 'Brown', code: '#8B4513' }
      ],
      features: [
        'Genuine leather construction',
        'Multiple pockets',
        'Quilted lining',
        'Heavy-duty zippers',
        'Adjustable waist'
      ],
      inStock: true,
      deliveryTime: '3-5 business days',
      freeShipping: true,
      returnPeriod: 30
    },
    'fashion-3': {
      id: 'fashion-3',
      name: 'Denim Jeans',
      price: 89.99,
      category: 'Fashion',
      images: [
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600'
      ],
      rating: 4.6,
      reviews: 312,
      description: 'Classic denim jeans with a perfect fit and premium quality construction.',
      specs: {
        'Material': '98% Cotton, 2% Elastane',
        'Style': 'Slim Fit',
        'Rise': 'Mid Rise',
        'Wash': 'Medium Blue',
        'Care Instructions': 'Machine wash cold',
        'Sizes Available': '28-38',
        'Country of Origin': 'USA'
      },
      sizes: ['28', '30', '32', '34', '36', '38'],
      colors: [
        { name: 'Medium Blue', code: '#4169E1' },
        { name: 'Dark Blue', code: '#191970' }
      ],
      features: [
        'Premium denim fabric',
        'Stretch comfort',
        'Reinforced stitching',
        'Classic 5-pocket design',
        'Branded hardware'
      ],
      inStock: true,
      deliveryTime: '3-5 business days',
      freeShipping: true,
      returnPeriod: 30
    },
    'fashion-4': {
      id: 'fashion-4',
      name: 'Summer Dress',
      price: 79.99,
      category: 'Fashion',
      images: [
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600'
      ],
      rating: 4.5,
      reviews: 156,
      description: 'Light and breezy summer dress perfect for warm days and casual outings.',
      specs: {
        'Material': '100% Cotton',
        'Style': 'Sundress',
        'Pattern': 'Solid',
        'Length': 'Knee Length',
        'Care Instructions': 'Machine wash cold',
        'Sizes Available': 'XS to XL',
        'Country of Origin': 'India'
      },
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'White', code: '#FFFFFF' },
        { name: 'Yellow', code: '#FFD700' },
        { name: 'Pink', code: '#FFB6C1' }
      ],
      features: [
        'Lightweight cotton fabric',
        'Adjustable straps',
        'Side pockets',
        'Lined bodice',
        'Elastic back'
      ],
      inStock: true,
      deliveryTime: '3-5 business days',
      freeShipping: true,
      returnPeriod: 30
    },
    '1': {
      id: '1',
      name: 'Wireless Headphones',
      price: 199.99,
      category: 'Electronics',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&q=80&w=600',
      ],
      rating: 4.5,
      reviews: 128,
      description: 'High-quality wireless headphones with noise-canceling technology.',
      specs: {
        'Bluetooth Version': '5.0',
        'Battery Life': '40 hours',
        'Charging Time': '2 hours',
        'Driver Size': '40mm',
        'Frequency Response': '20Hz - 20kHz',
        'Impedance': '32 Ohm',
        'Weight': '250g'
      }
    },
    '2': {
      id: '2',
      name: 'Smart Watch',
      price: 299.99,
      category: 'Electronics',
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=600',
      ],
      rating: 4.8,
      reviews: 256,
      description: 'Feature-rich smartwatch with advanced health tracking capabilities.',
      specs: {
        'Display': '1.4" AMOLED',
        'Battery Life': '7 days',
        'Water Resistance': '5 ATM',
        'Sensors': 'Heart Rate, SpO2, GPS',
        'Compatibility': 'iOS and Android',
        'Storage': '4GB',
        'Weight': '45g'
      }
    }
  };