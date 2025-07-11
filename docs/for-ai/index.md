# EDS Documentation Index
## Comprehensive Navigation Guide for Adobe Edge Delivery Services Development

This index provides structured access to all documentation within the `docs/for-ai` directory, organized by development workflow and complexity patterns. The documentation supports both human developers and AI assistants working with Adobe Edge Delivery Services (EDS) applications.

---

## 📋 Quick Reference

### 🚀 New to EDS? Start Here!
- **[`getting-started-guide.md`](getting-started-guide.md)** - **Quick reference for progressive learning paths**
  - Role-based learning paths (New Developer, Experienced Developer, Architect)
  - Quick start by component type (Simple, Interactive, Performance-Critical)
  - Common scenarios and quick solutions
  - Progressive learning recommendations

### Essential Starting Points
- **New to EDS?** → Start with [`getting-started-guide.md`](getting-started-guide.md) then [`eds.md`](eds.md)
- **Building Components?** → See [Implementation Guides](#-implementation-guides)
- **Testing Components?** → Check [Testing and Debugging](#-testing-and-debugging)
- **Need Examples?** → Browse [Implementation Guides](#-implementation-guides)
- **Navigation Strategy?** → Review [`document-relationship-mapping.md`](document-relationship-mapping.md)

### Development Patterns
- **Simple Components** → [`implementation/raw-eds-blocks-guide.md`](implementation/raw-eds-blocks-guide.md)
- **Complex Components** → [`implementation/complex-eds-blocks-guide.md`](implementation/complex-eds-blocks-guide.md)
- **Architecture Decisions** → [`implementation/build-blocks-clarification.md`](implementation/build-blocks-clarification.md)

---

## 🔧 Implementation Guides

### Component Development Patterns
- **[`implementation/raw-eds-blocks-guide.md`](implementation/raw-eds-blocks-guide.md)**
  - Simple, EDS-native component development
  - Vanilla JavaScript and minimal dependencies
  - Additive enhancement patterns
  - Target: Developers building lightweight components

- **[`implementation/complex-eds-blocks-guide.md`](implementation/complex-eds-blocks-guide.md)**
  - Build-enhanced approach for sophisticated components
  - External library integration (Shoelace, Chart.js, etc.)
  - Modern development workflows with build processes
  - Target: Developers building advanced UI components

- **[`implementation/build-component-template.md`](implementation/build-component-template.md)**
  - Template and scaffolding for advanced build components
  - Vite configuration and deployment automation
  - Integration with external design systems
  - Target: Developers creating complex, library-dependent components

### Architecture and Design Philosophy
- **[`implementation/block-architecture-standards.md`](implementation/block-architecture-standards.md)**
  - Comprehensive dual-pattern architecture (EDS-Native vs Build-Enhanced)
  - File naming conventions and quality standards
  - Component complexity assessment guidelines
  - Target: All developers working with EDS blocks

- **[`implementation/eds-architecture-standards.md`](implementation/eds-architecture-standards.md)**
  - EDS-native development standards focusing on simplicity
  - Performance optimization and FOUC elimination
  - Vanilla JavaScript best practices
  - Target: Developers building simple, performant components

- **[`implementation/design-philosophy-guide.md`](implementation/design-philosophy-guide.md)**
  - Framework for choosing between simple and complex approaches
  - Balancing simplicity with sophistication
  - Component complexity assessment criteria
  - Target: Technical leads and architects

- **[`implementation/build-blocks-clarification.md`](implementation/build-blocks-clarification.md)**
  - Dual-directory architecture explanation (/build/ vs /blocks/)
  - Development workflow selection criteria
  - Build vs deployment environment clarification
  - Target: All developers, especially those new to the project structure

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
- **[`testing/eds-native-testing-standards.md`](testing/eds-native-testing-standards.md)**
  - Testing standards for EDS-Native pattern components
  - Test file structure and EDS integration patterns
  - Accessibility, performance, and cross-browser testing
  - Target: Developers implementing testing for simple components

- **[`testing/debug.md`](testing/debug.md)**
  - Debugging policies and standard approaches
  - File replacement workflows and safety protocols
  - Error handling and troubleshooting procedures
  - Target: All developers, essential for debugging workflows

### Advanced Debugging and Instrumentation
- **[`testing/eds-architecture-and-testing-guide.md`](testing/eds-architecture-and-testing-guide.md)**
  - Advanced debugging strategies and file replacement workflows
  - Performance instrumentation and monitoring techniques
  - Requires explicit user approval for core file modifications
  - Target: Senior developers and system architects

- **[`testing/instrumentation-how-it-works.md`](testing/instrumentation-how-it-works.md)**
  - Technical details of performance monitoring system
  - Function call tracking and execution timing
  - Memory usage analysis and optimization
  - Target: Performance engineers and senior developers

- **[`testing/investigation.md`](testing/investigation.md)**
  - Performance instrumentation investigation report
  - Comprehensive testing environment analysis
  - Server setup and file replacement workflows
  - Target: Technical leads conducting performance analysis

---

## 📚 Reference Documentation

### Navigation and Cross-Reference Guides
- **[`document-relationship-mapping.md`](document-relationship-mapping.md)**
  - Cross-reference analysis and bidirectional link strategy
  - User journey pathways and navigation flows
  - Document cluster relationships and strategic cross-references
  - Target: AI assistants and developers seeking optimal navigation paths

- **[`getting-started-guide.md`](getting-started-guide.md)**
  - Quick reference for progressive learning paths
  - Role-based navigation (New Developer, Experienced Developer, Architect)
  - Scenario-based quick solutions and learning recommendations
  - Target: All users seeking efficient entry points into the documentation

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
- **[`../server-README.md`](../server-README.md)**
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
2. [`implementation/raw-eds-blocks-guide.md`](implementation/raw-eds-blocks-guide.md) - Simple component development
3. [`../server-README.md`](../server-README.md) - Local development setup
4. [`guidelines/frontend-guidelines.md`](guidelines/frontend-guidelines.md) - Coding standards

### For Experienced Developers
1. [`implementation/block-architecture-standards.md`](implementation/block-architecture-standards.md) - Architecture patterns
2. [`implementation/complex-eds-blocks-guide.md`](implementation/complex-eds-blocks-guide.md) - Advanced components
3. [`testing/eds-native-testing-standards.md`](testing/eds-native-testing-standards.md) - Testing frameworks
4. [`testing/debug.md`](testing/debug.md) - Debugging workflows

### For Architects and Technical Leads
1. [`implementation/design-philosophy-guide.md`](implementation/design-philosophy-guide.md) - Design decisions
2. [`testing/eds-architecture-and-testing-guide.md`](testing/eds-architecture-and-testing-guide.md) - Advanced debugging
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
- [`implementation/design-philosophy-guide.md`](implementation/design-philosophy-guide.md) - Approach selection
- [`implementation/build-blocks-clarification.md`](implementation/build-blocks-clarification.md) - Architecture decisions

### Development Phase
- [`implementation/block-architecture-standards.md`](implementation/block-architecture-standards.md) - Standards and patterns
- [`implementation/raw-eds-blocks-guide.md`](implementation/raw-eds-blocks-guide.md) OR [`implementation/complex-eds-blocks-guide.md`](implementation/complex-eds-blocks-guide.md) - Implementation
- [`../server-README.md`](../server-README.md) - Local development

### Testing Phase
- [`testing/eds-native-testing-standards.md`](testing/eds-native-testing-standards.md) - Testing standards
- [`testing/debug.md`](testing/debug.md) - Debugging procedures
- [`testing/instrumentation-how-it-works.md`](testing/instrumentation-how-it-works.md) - Performance analysis

### Deployment Phase
- [`guidelines/backend-structure.md`](guidelines/backend-structure.md) - Deployment architecture
- [`guidelines/security-checklist.md`](guidelines/security-checklist.md) - Security validation
- [`testing/investigation.md`](testing/investigation.md) - Performance verification

---

## 🏷️ Documentation Categories

### **Implementation Guides** (7 documents)
Component development patterns, architecture standards, and practical implementation guides

### **Testing & Debugging** (5 documents)
Testing frameworks, debugging procedures, and performance analysis

### **Project Guidelines** (6 documents)
Project management, requirements, and organizational standards

### **Reference Materials** (3 documents)
Comprehensive references and detailed analysis documents

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
1. Review [`document-relationship-mapping.md`](document-relationship-mapping.md) for navigation strategy and cross-reference analysis
2. Use [`getting-started-guide.md`](getting-started-guide.md) for user journey pathways and progressive learning paths
3. Read [`eds.md`](eds.md) for comprehensive EDS understanding
4. Reference [`implementation/block-architecture-standards.md`](implementation/block-architecture-standards.md) for development patterns
5. Use [`testing/debug.md`](testing/debug.md) for troubleshooting workflows

### **For Human Developers**
1. Start with [`getting-started-guide.md`](getting-started-guide.md) for role-based learning paths
2. Follow with [`eds.md`](eds.md) for complete overview
3. Choose implementation guide based on component complexity
4. Set up local environment using [`../server-README.md`](../server-README.md)
5. Follow testing standards from [`testing/eds-native-testing-standards.md`](testing/eds-native-testing-standards.md)

### **For Project Teams**
1. Review [`guidelines/prd.md`](guidelines/prd.md) for project scope
2. Establish workflows using [`guidelines/app-flow.md`](guidelines/app-flow.md)
3. Implement security measures from [`guidelines/security-checklist.md`](guidelines/security-checklist.md)
4. Monitor performance using instrumentation guides

---

*This index serves as the central navigation hub for all EDS development documentation. Each document is designed to support specific aspects of the development workflow while maintaining consistency with Adobe Edge Delivery Services best practices and the project's philosophy of simplicity, performance, and maintainability.*