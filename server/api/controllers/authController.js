import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../db/config';

const SALT_ROUNDS = 10;

export const register = async (req, res) => {
  try {
    const { email, password, full_name, phone } = req.body;
    const [existingUser] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser[0]) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const [result] = await pool.execute(
      `INSERT INTO users (email, password_hash, full_name, phone, role) 
       VALUES (?, ?, ?, ?, ?)`,
      [email, passwordHash, full_name, phone, 'customer']
    );

    const token = jwt.sign(
      { userId: result.insertId, role: 'customer' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: result.insertId,
        email,
        full_name,
        role: 'customer'
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await pool.execute(
      `SELECT id, email, password_hash, full_name, role FROM users WHERE email = ?`,
      [email]
    );

    const user = users[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};
