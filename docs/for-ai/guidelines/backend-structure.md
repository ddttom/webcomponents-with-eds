# Backend Structure Guidelines

*Related: [Tech Stack Guidelines](tech-stack.md) | [Security Checklist](security-checklist.md) | [App Flow Guidelines](app-flow.md)*

## Overview

This document outlines backend structure guidelines for EDS (Edge Delivery Services) projects, focusing on server-side architecture, API design, and data management that complements EDS frontend development.

*See also: [Design Philosophy Guide](../design-philosophy-guide.md) for EDS principles | [Performance Optimization](../performance-optimization.md) for optimization techniques*

## Server Architecture

### Node.js Development Server

For EDS development, use a simple Node.js server with proxy capabilities:

```javascript
// server.js - Development server
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;
const PROXY_HOST = process.env.PROXY_HOST || 'https://allabout.network';

const server = http.createServer(async (req, res) => {
  const filePath = path.join(process.cwd(), req.url);
  
  // Serve local files first
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    serveLocalFile(filePath, res);
  } else {
    // Proxy to external server
    proxyRequest(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
```

### API Design Principles

Follow RESTful API design with EDS-compatible patterns:

```javascript
// api/routes/content.js
export const contentRoutes = {
  // GET /api/content - List content
  async list(req, res) {
    try {
      const { limit = 10, offset = 0, type } = req.query;
      const content = await contentService.list({ limit, offset, type });
      
      res.json({
        data: content.items,
        total: content.total,
        offset: parseInt(offset),
        limit: parseInt(limit)
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  // GET /api/content/:id - Get specific content
  async get(req, res) {
    try {
      const { id } = req.params;
      const content = await contentService.get(id);
      
      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }
      
      res.json({ data: content });
    } catch (error) {
      handleError(error, res);
    }
  }
};
```

### Data Layer

Implement clean data access patterns:

```javascript
// services/content-service.js
class ContentService {
  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  async list(options = {}) {
    const { limit = 10, offset = 0, type } = options;
    
    const query = {
      limit: Math.min(limit, 100), // Cap at 100
      offset: Math.max(offset, 0)
    };
    
    if (type) {
      query.type = type;
    }
    
    return await this.dataStore.query('content', query);
  }

  async get(id) {
    if (!id) {
      throw new Error('Content ID is required');
    }
    
    return await this.dataStore.findById('content', id);
  }

  async create(data) {
    const validation = this.validateContent(data);
    if (!validation.valid) {
      throw new Error(`Invalid content: ${validation.errors.join(', ')}`);
    }
    
    return await this.dataStore.create('content', {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  validateContent(data) {
    const errors = [];
    
    if (!data.title || data.title.trim().length === 0) {
      errors.push('Title is required');
    }
    
    if (!data.type || !['page', 'post', 'fragment'].includes(data.type)) {
      errors.push('Valid type is required (page, post, fragment)');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}
```

## Configuration Management

### Environment Configuration

Use environment variables for configuration:

```javascript
// config/environment.js
export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database
  database: {
    url: process.env.DATABASE_URL || 'sqlite:./data/app.db',
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS) || 10
  },
  
  // External services
  proxy: {
    host: process.env.PROXY_HOST || 'https://allabout.network',
    timeout: parseInt(process.env.PROXY_TIMEOUT) || 5000
  },
  
  // Security
  security: {
    corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
    rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW) || 900000, // 15 minutes
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX) || 100
  }
};

// Validation
function validateConfig() {
  const required = ['DATABASE_URL'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

if (config.nodeEnv === 'production') {
  validateConfig();
}
```

### Application Configuration

Structure application configuration clearly:

```javascript
// config/app.js
export const appConfig = {
  // Content management
  content: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    uploadPath: './uploads',
    cacheDuration: 3600 // 1 hour
  },
  
  // API settings
  api: {
    version: 'v1',
    prefix: '/api',
    defaultPageSize: 20,
    maxPageSize: 100
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'json',
    file: process.env.LOG_FILE || './logs/app.log'
  }
};
```

## Error Handling

### Centralized Error Handling

Implement consistent error handling:

```javascript
// middleware/error-handler.js
export class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(error, req, res, next) {
  let { statusCode = 500, message, code } = error;
  
  // Log error
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  
  // Don't leak error details in production
  if (process.env.NODE_ENV === 'production' && !error.isOperational) {
    message = 'Internal server error';
    code = 'INTERNAL_ERROR';
  }
  
  res.status(statusCode).json({
    error: {
      message,
      code,
      timestamp: new Date().toISOString()
    }
  });
}

// Usage in routes
export function handleError(error, res) {
  if (error.name === 'ValidationError') {
    throw new AppError(error.message, 400, 'VALIDATION_ERROR');
  }
  
  if (error.name === 'NotFoundError') {
    throw new AppError('Resource not found', 404, 'NOT_FOUND');
  }
  
  throw error;
}
```

### Async Error Handling

Handle async errors properly:

```javascript
// utils/async-handler.js
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Usage in routes
app.get('/api/content', asyncHandler(async (req, res) => {
  const content = await contentService.list(req.query);
  res.json(content);
}));
```

## Security Implementation

### Input Validation

Implement comprehensive input validation:

```javascript
// middleware/validation.js
import { body, param, query, validationResult } from 'express-validator';

export const validateContent = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be 1-200 characters'),
  
  body('type')
    .isIn(['page', 'post', 'fragment'])
    .withMessage('Type must be page, post, or fragment'),
  
  body('content')
    .optional()
    .isLength({ max: 50000 })
    .withMessage('Content must be less than 50,000 characters'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError(
        'Validation failed',
        400,
        'VALIDATION_ERROR',
        errors.array()
      );
    }
    next();
  }
];

export const validateId = [
  param('id')
    .isUUID()
    .withMessage('Invalid ID format'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Invalid ID', 400, 'INVALID_ID');
    }
    next();
  }
];
```

### Rate Limiting

Implement rate limiting for API protection:

```javascript
// middleware/rate-limit.js
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: {
      message: 'Too many requests, please try again later',
      code: 'RATE_LIMIT_EXCEEDED'
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});

export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Stricter limit for sensitive endpoints
  message: {
    error: {
      message: 'Too many requests for this endpoint',
      code: 'RATE_LIMIT_EXCEEDED'
    }
  }
});
```

## Data Management

### Database Abstraction

Create a clean database abstraction layer:

```javascript
// data/database.js
export class Database {
  constructor(config) {
    this.config = config;
    this.connection = null;
  }

  async connect() {
    // Implementation depends on database choice
    // SQLite, PostgreSQL, etc.
  }

  async query(table, options = {}) {
    const { limit = 20, offset = 0, where = {}, orderBy } = options;
    
    // Build and execute query
    // Return standardized format
    return {
      items: [], // Query results
      total: 0,  // Total count
      limit,
      offset
    };
  }

  async findById(table, id) {
    // Find single record by ID
  }

  async create(table, data) {
    // Create new record
  }

  async update(table, id, data) {
    // Update existing record
  }

  async delete(table, id) {
    // Delete record
  }

  async close() {
    // Close database connection
  }
}
```

### Caching Strategy

Implement efficient caching:

```javascript
// services/cache-service.js
export class CacheService {
  constructor() {
    this.cache = new Map();
    this.ttl = new Map();
  }

  set(key, value, ttlSeconds = 3600) {
    this.cache.set(key, value);
    this.ttl.set(key, Date.now() + (ttlSeconds * 1000));
  }

  get(key) {
    const expiry = this.ttl.get(key);
    
    if (!expiry || Date.now() > expiry) {
      this.cache.delete(key);
      this.ttl.delete(key);
      return null;
    }
    
    return this.cache.get(key);
  }

  delete(key) {
    this.cache.delete(key);
    this.ttl.delete(key);
  }

  clear() {
    this.cache.clear();
    this.ttl.clear();
  }

  // Wrapper for async operations
  async getOrSet(key, asyncFn, ttlSeconds = 3600) {
    let value = this.get(key);
    
    if (value === null) {
      value = await asyncFn();
      this.set(key, value, ttlSeconds);
    }
    
    return value;
  }
}
```

## Monitoring and Logging

### Structured Logging

Implement structured logging:

```javascript
// utils/logger.js
export class Logger {
  constructor(config) {
    this.level = config.level || 'info';
    this.format = config.format || 'json';
  }

  log(level, message, meta = {}) {
    if (!this.shouldLog(level)) return;
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...meta
    };
    
    if (this.format === 'json') {
      console.log(JSON.stringify(logEntry));
    } else {
      console.log(`[${logEntry.timestamp}] ${level.toUpperCase()}: ${message}`);
    }
  }

  info(message, meta) { this.log('info', message, meta); }
  warn(message, meta) { this.log('warn', message, meta); }
  error(message, meta) { this.log('error', message, meta); }
  debug(message, meta) { this.log('debug', message, meta); }

  shouldLog(level) {
    const levels = { error: 0, warn: 1, info: 2, debug: 3 };
    return levels[level] <= levels[this.level];
  }
}
```

### Health Checks

Implement health check endpoints:

```javascript
// routes/health.js
export const healthRoutes = {
  async check(req, res) {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      checks: {}
    };

    // Database check
    try {
      await database.query('SELECT 1');
      health.checks.database = 'healthy';
    } catch (error) {
      health.checks.database = 'unhealthy';
      health.status = 'unhealthy';
    }

    // External service check
    try {
      const response = await fetch(config.proxy.host, { 
        method: 'HEAD',
        timeout: 5000 
      });
      health.checks.proxy = response.ok ? 'healthy' : 'unhealthy';
    } catch (error) {
      health.checks.proxy = 'unhealthy';
    }

    const statusCode = health.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(health);
  }
};
```

---

## See Also

### Core Guidelines & Architecture
- **[Tech Stack Guidelines](tech-stack.md)** - Technology selection and implementation guidelines for EDS projects
- **[Security Checklist](security-checklist.md)** - Comprehensive security requirements and implementation guidelines
- **[App Flow Guidelines](app-flow.md)** - Application flow and user journey design patterns
- **[Frontend Guidelines](frontend-guidelines.md)** - Frontend development standards and best practices

### EDS Foundation & Development
- **[Design Philosophy Guide](../design-philosophy-guide.md)** - Understanding the philosophical principles behind EDS architecture decisions
- **[EDS Overview](../eds.md)** - Complete introduction to Edge Delivery Services architecture and core concepts
- **[Server README](../../Server-README.md)** - Development server setup and configuration for EDS block development and testing
- **[Performance Optimization](../performance-optimization.md)** - Techniques for optimizing EDS block performance and loading

### Development Standards & Patterns
- **[Block Architecture Standards](../block-architecture-standards.md)** - Comprehensive standards for EDS block development and architectural patterns
- **[EDS Architecture Standards](../eds-architecture-standards.md)** - Architectural patterns and standards for EDS-native block development
- **[JavaScript Patterns](../javascript-patterns.md)** - Reusable JavaScript patterns for EDS block development
- **[Error Handling Patterns](../error-handling-patterns.md)** - Comprehensive error handling strategies for EDS blocks

### Testing & Quality Assurance
- **[EDS Native Testing Standards](../eds-native-testing-standards.md)** - Testing standards specifically for EDS-native pattern components
- **[EDS Architecture and Testing Guide](../eds-architecture-and-testing-guide.md)** - Advanced testing workflows and file replacement strategies
- **[Debug Guide](../debug.md)** - Complete debugging policy and approval requirements for development troubleshooting
- **[Investigation](../investigation.md)** - Advanced investigation techniques and analysis methods

### Advanced Topics & Reference Materials
- **[EDS Appendix](../eds-appendix.md)** - Comprehensive development reference guide with patterns and best practices
- **[Instrumentation Guide](../instrumentation-how-it-works.md)** - Advanced instrumentation techniques and performance monitoring
- **[Browser Compatibility](../browser-compatibility.md)** - Ensuring cross-browser compatibility for EDS implementations
- **[Project Structure](../project-structure.md)** - Understanding the overall EDS project organization and file conventions

## Next Steps

### For Backend Developers & API Engineers
1. **Master the server architecture patterns** including Node.js development server setup and proxy configuration for EDS development
2. **Implement the API design principles** following RESTful patterns and EDS-compatible data structures for seamless frontend integration
3. **Apply the data layer patterns** including clean service architecture, validation, and database abstraction for maintainable backend code
4. **Follow security implementation guidelines** including input validation, rate limiting, and error handling for secure API development
5. **Establish monitoring and logging practices** using structured logging and health checks for reliable backend services

### For DevOps & Infrastructure Engineers
1. **Understand the configuration management patterns** including environment variables and application configuration for scalable deployments
2. **Implement the error handling strategies** including centralized error handling and async error management for robust applications
3. **Set up monitoring infrastructure** that supports the structured logging and health check patterns outlined
4. **Configure security measures** including rate limiting, input validation, and secure configuration management
5. **Create deployment procedures** that maintain the backend structure guidelines in production environments

### For QA Engineers & Test Specialists
1. **Learn the error handling patterns** to create comprehensive test scenarios that validate backend resilience and error recovery
2. **Understand the API design principles** to create effective integration tests that validate backend-frontend communication
3. **Test the security implementations** including input validation, rate limiting, and error handling for comprehensive security validation
4. **Validate the monitoring and logging** to ensure proper observability and debugging capabilities in backend services
5. **Create automated testing workflows** that can validate adherence to the backend structure guidelines

### For Team Leads & Project Managers
1. **Understand the backend architecture patterns** and how they support EDS development workflows and team productivity
2. **Plan development timelines** that account for proper backend structure implementation including security and monitoring
3. **Establish development standards** based on the comprehensive backend guidelines for consistent team practices
4. **Monitor code quality metrics** using the guidelines as benchmarks for backend development practices
5. **Create governance processes** that ensure ongoing compliance with backend structure and security standards

### For Security & Compliance Teams
1. **Review the security implementation patterns** including input validation, rate limiting, and error handling for comprehensive security coverage
2. **Assess the configuration management approach** to ensure secure handling of environment variables and sensitive configuration
3. **Evaluate the logging and monitoring strategies** to ensure they meet security and compliance requirements for audit trails
4. **Establish security guidelines** that complement the backend structure practices outlined in this document
5. **Monitor compliance** with the documented security practices and ensure they align with organizational security policies

### For System Administrators & Infrastructure Teams
1. **Understand the server architecture requirements** including Node.js setup, proxy configuration, and database management
2. **Configure monitoring systems** that support the structured logging and health check patterns outlined
3. **Implement the caching strategies** and database abstraction patterns for optimal backend performance
4. **Set up security infrastructure** including rate limiting, input validation, and secure configuration management
5. **Create maintenance procedures** for backend services, monitoring infrastructure, and security updates

### For AI Assistants & Automation
1. **Master the backend structure patterns** for creating well-architected backend services that support EDS development
2. **Understand the API design principles** and data management patterns for generating consistent and maintainable backend code
3. **Apply the security and error handling guidelines** when creating or reviewing backend code for EDS projects
4. **Follow the monitoring and logging standards** to create observable and debuggable backend services
5. **Implement the configuration management patterns** for creating scalable and maintainable backend applications