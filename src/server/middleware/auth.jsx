import React from 'react';
import jwt from 'jsonwebtoken';

export const AuthMiddleware = {
  verifyToken(token) {
    try {
      if (!token) {
        throw new Error('No token provided');
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

  async verifySupplier(userId) {
    try {
      // Check supplier status
      const query = {
        where: {
          user_id: userId,
          verification_status: 'verified'
        }
      };

      return { isVerified: false }; // Replace with actual DB query
    } catch (error) {
      throw new Error('Error verifying supplier');
    }
  }
};

export default AuthMiddleware;