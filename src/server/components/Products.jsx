import React from 'react';

export const Products = {
  async getAllProducts(filters = {}) {
    try {
      const {
        page = 1,
        limit = 12,
        category,
        minPrice,
        maxPrice,
        sort = 'created_at'
      } = filters;

      // Build query
      let query = {
        where: { is_active: true },
        include: ['category', 'images', 'reviews'],
        limit,
        offset: (page - 1) * limit
      };

      // Add filters
      if (category) {
        query.where.category = category;
      }

      if (minPrice) {
        query.where.price = { $gte: minPrice };
      }

      if (maxPrice) {
        query.where.price = { ...query.where.price, $lte: maxPrice };
      }

      // Add sorting
      switch (sort) {
        case 'price-low':
          query.order = [['price', 'ASC']];
          break;
        case 'price-high':
          query.order = [['price', 'DESC']];
          break;
        case 'rating':
          query.order = [['average_rating', 'DESC']];
          break;
        default:
          query.order = [['created_at', 'DESC']];
      }

      return { products: [], pagination: {} }; // Replace with actual DB query
    } catch (error) {
      throw new Error('Error fetching products');
    }
  },

  async getProductById(id) {
    try {
      // Get product with relations
      const query = {
        where: { id, is_active: true },
        include: ['category', 'supplier', 'images', 'reviews']
      };

      return { product: null }; // Replace with actual DB query
    } catch (error) {
      throw new Error('Error fetching product');
    }
  },

  async createProduct(productData, supplierId) {
    try {
      const {
        name,
        description,
        price,
        category_id,
        sku,
        quantity,
        images
      } = productData;

      // Create product
      const product = {
        supplier_id: supplierId,
        category_id,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
        price,
        sku,
        quantity
      };

      // Add images
      if (images?.length) {
        const productImages = images.map((url, index) => ({
          url,
          is_primary: index === 0
        }));
      }

      return { product };
    } catch (error) {
      throw new Error('Error creating product');
    }
  }
};

export default Products;