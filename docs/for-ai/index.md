# EDS Documentation Index
## Comprehensive Navigation Guide for Adobe Edge Delivery Services Development

This index provides structured access to all documentation within the `docs/for-ai` directory, organized by development workflow and complexity patterns. The documentation supports both human developers and AI assistants working with Adobe Edge Delivery Services (EDS) applications.

---

## 📋 Quick Reference

### Essential Starting Points
- **New to EDS?** → Start with [`eds.md`](eds.md) - Complete developer guide
- **Building Components?** → See [Architecture Standards](#architecture-and-design-philosophy)
- **Testing Components?** → Check [Testing and Debugging](#testing-and-debugging)
- **Need Examples?** → Browse [Implementation Guides](#implementation-guides)

### Development Patterns
- **Simple Components** → [`raw-eds-blocks-guide.md`](raw-eds-blocks-guide.md)
- **Complex Components** → [`complex-eds-blocks-guide.md`](complex-eds-blocks-guide.md)
- **Architecture Decisions** → [`build_blocks_clarification.md`](build_blocks_clarification.md)

---

## 🏗️ Architecture and Design Philosophy

### Core Architecture Documents
- **[`EDS-Architecture-and-Testing-Guide.md`](EDS-Architecture-and-Testing-Guide.md)**
  - Advanced debugging strategies and file replacement workflows
  - Performance instrumentation and monitoring techniques
  - Requires explicit user approval for core file modifications
  - Target: Senior developers and system architects

- **[`block-architecture-standards.md`](block-architecture-standards.md)**
  - Comprehensive dual-pattern architecture (EDS-Native vs Build-Enhanced)
  - File naming conventions and quality standards
  - Component complexity assessment guidelines
  - Target: All developers working with EDS blocks

- **[`eds-architecture-standards.md`](eds-architecture-standards.md)**
  - EDS-native development standards focusing on simplicity
  - Performance optimization and FOUC elimination
  - Vanilla JavaScript best practices
  - Target: Developers building simple, performant components

### Design Philosophy and Decision Making
- **[`design-philosophy-guide.md`](design-philosophy-guide.md)**
  - Framework for choosing between simple and complex approaches
  - Balancing simplicity with sophistication
  - Component complexity assessment criteria
  - Target: Technical leads and architects

- **[`build_blocks_clarification.md`](build_blocks_clarification.md)**
  - Dual-directory architecture explanation (/build/ vs /blocks/)
  - Development workflow selection criteria
  - Build vs deployment environment clarification
  - Target: All developers, especially those new to the project structure

---

## 💻 Implementation Guides

### Component Development Patterns
- **[`raw-eds-blocks-guide.md`](raw-eds-blocks-guide.md)**
  - Simple, EDS-native component development
  - Vanilla JavaScript and minimal dependencies
  - Additive enhancement patterns
  - Target: Developers building lightweight components

- **[`complex-eds-blocks-guide.md`](complex-eds-blocks-guide.md)**
  - Build-enhanced approach for sophisticated components
  - External library integration (Shoelace, Chart.js, etc.)
  - Modern development workflows with build processes
  - Target: Developers building advanced UI components

- **[`build-component-template.md`](build-component-template.md)**
  - Template and scaffolding for advanced build components
  - Vite configuration and deployment automation
  - Integration with external design systems
  - Target: Developers creating complex, library-dependent components

### Comprehensive Development Guide
- **[`eds.md`](eds.md)**
  - Complete EDS development guide (1,937 lines)
  - Document transformation journey and content processing
  - Block development patterns and best practices
  - Performance optimization and Core Web Vitals
  - Target: All developers, comprehensive reference document

---

## 🧪 Testing and Debugging

### Testing Standards and Frameworks
- **[`eds-native-testing-standards.md`](eds-native-testing-standards.md)**
  - Testing standards for EDS-Native pattern components
  - Test file structure and EDS integration patterns
  - Accessibility, performance, and cross-browser testing
  - Target: Developers implementing testing for simple components

- **[`debug.md`](debug.md)**
  - Debugging policies and standard approaches
  - File replacement workflows and safety protocols
  - Error handling and troubleshooting procedures
  - Target: All developers, essential for debugging workflows

### Advanced Debugging and Instrumentation
- **[`Instrumentation - How it works.md`](Instrumentation%20-%20How%20it%20works.md)**
  - Technical details of performance monitoring system
  - Function call tracking and execution timing
  - Memory usage analysis and optimization
  - Target: Performance engineers and senior developers

- **[`investigation.md`](investigation.md)**
  - Performance instrumentation investigation report
  - Comprehensive testing environment analysis
  - Server setup and file replacement workflows
  - Target: Technical leads conducting performance analysis

---

## 📚 Reference Documentation

### Comprehensive References
- **[`eds-appendix.md`](eds-appendix.md)**
  - Comprehensive EDS development reference
  - Patterns, best practices, and implementation details
  - Code examples and architectural guidance
  - Target: All developers, comprehensive reference

- **[`eds-webcomponents-review.md`](eds-webcomponents-review.md)**
  - In-depth analysis of web components with EDS
  - Dual-directory architecture evaluation
  - Code quality assessment and best practices
  - Target: Architects and senior developers

### Development Environment
- **[`server-README.md`](server-README.md)**
  - Development server documentation and configuration
  - Local development workflow and proxy setup
  - File serving strategies and testing approaches
  - Target: All developers setting up local environments

---

## 📋 Project Guidelines

### Application Architecture
- **[`guidelines/app-flow.md`](guidelines/app-flow.md)**
  - Complete application flow for EDS applications
  - User journeys, conditional paths, and error handling
  - Content authoring and development workflows
  - Target: Product managers, architects, and senior developers

- **[`guidelines/backend-structure.md`](guidelines/backend-structure.md)**
  - EDS backend architecture and serverless functions
  - Content processing pipeline and API design
  - Performance optimization and security implementation
  - Target: Backend developers and system architects

- **[`guidelines/frontend-guidelines.md`](guidelines/frontend-guidelines.md)**
  - Coding standards and best practices for EDS frontend
  - HTML, CSS, and JavaScript guidelines
  - Performance, accessibility, and browser compatibility
  - Target: Frontend developers and code reviewers

### Project Management and Requirements
- **[`guidelines/prd.md`](guidelines/prd.md)**
  - Product Requirements Document for EDS applications
  - Objectives, features, and technical requirements
  - Implementation phases and success metrics
  - Target: Product managers, project leads, and stakeholders

- **[`guidelines/tech-stack.md`](guidelines/tech-stack.md)**
  - Technology stack document with minimal approach
  - Frontend technologies, development tools, and deployment
  - EDS-specific architecture and best practices
  - Target: Technical leads and architects

- **[`guidelines/security-checklist.md`](guidelines/security-checklist.md)**
  - Comprehensive security guidelines for EDS applications
  - Authentication, data protection, and vulnerability prevention
  - Monitoring, incident response, and compliance
  - Target: Security engineers and DevOps teams

---

## 🎯 Documentation by Target Audience

### For New Developers
1. [`eds.md`](eds.md) - Start here for comprehensive overview
2. [`raw-eds-blocks-guide.md`](raw-eds-blocks-guide.md) - Simple component development
3. [`server-README.md`](server-README.md) - Local development setup
4. [`guidelines/frontend-guidelines.md`](guidelines/frontend-guidelines.md) - Coding standards

### For Experienced Developers
1. [`block-architecture-standards.md`](block-architecture-standards.md) - Architecture patterns
2. [`complex-eds-blocks-guide.md`](complex-eds-blocks-guide.md) - Advanced components
3. [`eds-native-testing-standards.md`](eds-native-testing-standards.md) - Testing frameworks
4. [`debug.md`](debug.md) - Debugging workflows

### For Architects and Technical Leads
1. [`design-philosophy-guide.md`](design-philosophy-guide.md) - Design decisions
2. [`EDS-Architecture-and-Testing-Guide.md`](EDS-Architecture-and-Testing-Guide.md) - Advanced debugging
3. [`eds-webcomponents-review.md`](eds-webcomponents-review.md) - Architecture analysis
4. [`guidelines/backend-structure.md`](guidelines/backend-structure.md) - System architecture

### For Project Managers and Stakeholders
1. [`guidelines/prd.md`](guidelines/prd.md) - Project requirements
2. [`guidelines/app-flow.md`](guidelines/app-flow.md) - Application workflows
3. [`guidelines/tech-stack.md`](guidelines/tech-stack.md) - Technology decisions
4. [`guidelines/security-checklist.md`](guidelines/security-checklist.md) - Security requirements

---

## 🔄 Development Workflow Navigation

### Planning Phase
- [`guidelines/prd.md`](guidelines/prd.md) - Requirements and objectives
- [`design-philosophy-guide.md`](design-philosophy-guide.md) - Approach selection
- [`build_blocks_clarification.md`](build_blocks_clarification.md) - Architecture decisions

### Development Phase
- [`block-architecture-standards.md`](block-architecture-standards.md) - Standards and patterns
- [`raw-eds-blocks-guide.md`](raw-eds-blocks-guide.md) OR [`complex-eds-blocks-guide.md`](complex-eds-blocks-guide.md) - Implementation
- [`server-README.md`](server-README.md) - Local development

### Testing Phase
- [`eds-native-testing-standards.md`](eds-native-testing-standards.md) - Testing standards
- [`debug.md`](debug.md) - Debugging procedures
- [`Instrumentation - How it works.md`](Instrumentation%20-%20How%20it%20works.md) - Performance analysis

### Deployment Phase
- [`guidelines/backend-structure.md`](guidelines/backend-structure.md) - Deployment architecture
- [`guidelines/security-checklist.md`](guidelines/security-checklist.md) - Security validation
- [`investigation.md`](investigation.md) - Performance verification

---

## 🏷️ Documentation Categories

### **Architecture & Standards** (7 documents)
Core architectural patterns, design philosophy, and development standards

### **Implementation Guides** (4 documents)
Practical guides for building components and applications

### **Testing & Debugging** (4 documents)
Testing frameworks, debugging procedures, and performance analysis

### **Reference Materials** (3 documents)
Comprehensive references and detailed analysis documents

### **Project Guidelines** (6 documents)
Project management, requirements, and organizational standards

---

## 📖 Key Concepts Covered

### **EDS Core Concepts**
- Document-to-website transformation pipeline
- Block-based component architecture
- Content-first development approach
- Performance optimization (Core Web Vitals)

### **Development Patterns**
- **EDS-Native Pattern**: Simple vanilla JavaScript components
- **Build-Enhanced Pattern**: Complex components with external dependencies
- **Dual-Directory Architecture**: /build/ for development, /blocks/ for deployment

### **Technical Standards**
- Modern JavaScript (ES modules) without TypeScript
- Pure CSS without preprocessors
- Minimal dependencies and build steps
- Accessibility and performance focus

### **Testing & Quality**
- Comprehensive testing strategies
- Performance instrumentation
- Security best practices
- Code quality standards

---

## 🚀 Getting Started Recommendations

### **For AI Assistants**
1. Read [`eds.md`](eds.md) for comprehensive EDS understanding
2. Review [`block-architecture-standards.md`](block-architecture-standards.md) for development patterns
3. Reference [`guidelines/frontend-guidelines.md`](guidelines/frontend-guidelines.md) for coding standards
4. Use [`debug.md`](debug.md) for troubleshooting workflows

### **For Human Developers**
1. Start with [`eds.md`](eds.md) for complete overview
2. Choose implementation guide based on component complexity
3. Set up local environment using [`server-README.md`](server-README.md)
4. Follow testing standards from [`eds-native-testing-standards.md`](eds-native-testing-standards.md)

### **For Project Teams**
1. Review [`guidelines/prd.md`](guidelines/prd.md) for project scope
2. Establish workflows using [`guidelines/app-flow.md`](guidelines/app-flow.md)
3. Implement security measures from [`guidelines/security-checklist.md`](guidelines/security-checklist.md)
4. Monitor performance using instrumentation guides

---

*This index serves as the central navigation hub for all EDS development documentation. Each document is designed to support specific aspects of the development workflow while maintaining consistency with Adobe Edge Delivery Services best practices and the project's philosophy of simplicity, performance, and maintainability.*