import pool from '../../db/config';

export const getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      sort = 'created_at'
    } = req.query;

    const offset = (page - 1) * limit;
    
    let query = `
      SELECT 
        p.*, c.name as category_name, pi.url as primary_image,
        COALESCE(AVG(pr.rating), 0) as average_rating,
        COUNT(DISTINCT pr.id) as review_count
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      LEFT JOIN product_reviews pr ON p.id = pr.product_id
      WHERE p.is_active = true
    `;

    const queryParams = [];
    if (category) {
      query += ' AND c.slug = ?';
      queryParams.push(category);
    }
    if (minPrice) {
      query += ' AND p.price >= ?';
      queryParams.push(minPrice);
    }
    if (maxPrice) {
      query += ' AND p.price <= ?';
      queryParams.push(maxPrice);
    }
    query += ' GROUP BY p.id';
    
    switch (sort) {
      case 'price_asc':
        query += ' ORDER BY p.price ASC';
        break;
      case 'price_desc':
        query += ' ORDER BY p.price DESC';
        break;
      case 'rating':
        query += ' ORDER BY average_rating DESC';
        break;
      default:
        query += ' ORDER BY p.created_at DESC';
    }

    query += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);
    const [rows] = await pool.execute(query, queryParams);

    const [countResult] = await pool.execute(
      'SELECT COUNT(DISTINCT p.id) as total FROM products p WHERE p.is_active = true'
    );
    
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      products: rows,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        total_items: total,
        items_per_page: limit
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
