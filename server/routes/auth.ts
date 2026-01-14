import type { RequestHandler } from "express";
import { z } from "zod";

// Simple in-memory user storage (in production, use a real database)
interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
}

const users: User[] = [];

// Validation schemas
const loginSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  password: z.string().min(1, "Password is required"),
});

// Simple password hashing (in production, use bcrypt)
const hashPassword = (password: string): string => {
  return Buffer.from(password).toString("base64");
};

const verifyPassword = (password: string, hash: string): boolean => {
  return Buffer.from(password).toString("base64") === hash;
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { fullName, password } = loginSchema.parse(req.body);

    // Find user
    const user = users.find((u) => u.fullName === fullName);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password
    if (!verifyPassword(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      user: userWithoutPassword,
      message: "Login successful",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.errors[0].message,
      });
    }
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfile: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
