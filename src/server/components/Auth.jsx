import React from 'react';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

export const Auth = {
  async register(userData) {
    try {
      const { email, password, full_name, phone } = userData;
      
      // Hash password
      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      
      // Create user
      const user = {
        email,
        password_hash: passwordHash,
        full_name,
        phone,
        role: 'customer'
      };
      
      // Generate token
      const token = jwt.sign(
        { userId: user.id, role: 'customer' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return { token, user };
    } catch (error) {
      throw new Error('Error registering user');
    }
  },

  async login(credentials) {
    try {
      const { email, password } = credentials;

      // Validate credentials
      const validPassword = await bcrypt.compare(password, user.password_hash);

      if (!validPassword) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return { token, user };
    } catch (error) {
      throw new Error('Error logging in');
    }
  }
};

export default Auth;