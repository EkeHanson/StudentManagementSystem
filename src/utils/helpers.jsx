// src/utils/helpers.js
import { jwtDecode } from 'jwt-decode';  // Changed from default import to named import

/**
 * Decodes a JWT token
 * @param {string} token - JWT token to decode
 * @returns {object|null} Decoded token payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);  // Changed from jwt_decode to jwtDecode
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Formats a date string to a readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date (e.g., "Jan 1, 2023")
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Generates initials from a full name
 * @param {string} name - Full name
 * @returns {string} Initials (e.g., "JS" for "John Smith")
 */
export const getInitials = (name) => {
  if (!name || typeof name !== 'string') return '';
  return name
    .trim()
    .split(/\s+/)
    .filter(part => part.length > 0)
    .map(part => part[0].toUpperCase())
    .join('')
    .slice(0, 2); // Limit to 2 initials
};

/**
 * Maps user roles to their dashboard paths
 * @param {string} role - User role
 * @returns {string} Corresponding dashboard path
 */
export const roleToPath = (role) => {
  const paths = {
    admin: '/dashboard/admin',
    teacher: '/dashboard/teacher',
    student: '/dashboard/student',
    parent: '/dashboard/parent',
  };
  return paths[role?.toLowerCase()] || '/';
};

/**
 * Safely parses JSON strings
 * @param {string} str - JSON string
 * @returns {object|null} Parsed object or null if invalid
 */
export const safeJsonParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};

/**
 * Capitalizes the first letter of a string
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};