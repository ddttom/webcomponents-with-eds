# Build vs Blocks Directory Structure

**Related Documentation:** [Complex EDS Blocks Guide](complex-eds-blocks-guide.md) | [EDS Architecture Standards](eds-architecture-standards.md) | [Design Philosophy Guide](design-philosophy-guide.md) | [Build Component Template](build-component-template.md)

## Overview

The repository uses a **dual-directory architecture** that separates development from deployment-ready files:

- **`/build/`** = Development workspace with modern tooling
- **`/blocks/`** = Production-ready files for EDS deployment

## Directory Relationship

### Scenario 1: Complex Component (Build + Blocks)
```
Repository Root
├── build/                          # 🔧 DEVELOPMENT WORKSPACE
│   └── {component-name}/
│       ├── {component-name}.js     # Source code with modern JS
│       ├── {component-name}.css    # Full CSS with comments  
│       ├── package.json            # Dependencies & build scripts
│       ├── vite.config.js          # Bundler configuration
│       ├── index.html              # Development test page
│       ├── DEV-README.md           # Developer documentation
│       ├── USER-README.md          # User-facing documentation
│       └── dist/                   # Build output (temporary)
│           └── {component-name}.js # Bundled file
│
└── blocks/                         # 📦 DEPLOYMENT ARTIFACTS
    └── {component-name}/
        ├── {component-name}.js     # Bundled, self-contained (from build)
        ├── {component-name}.css    # Stub file (styles in JS)
        ├── README.md               # Copied from USER-README.md
        ├── test.html               # EDS test file
        └── example.md              # Content author examples
```

### Scenario 2: Simple Component (Blocks Only)
```
Repository Root
└── blocks/                         # 📝 DIRECT DEVELOPMENT
    └── {component-name}/
        ├── {component-name}.js     # Source code (edit directly)
        ├── {component-name}.css    # Source styles (edit directly)
        ├── README.md               # Documentation
        ├── test.html               # Test file
        └── example.md              # Content author examples
        
    # No corresponding build/ folder exists
```

## Workflow Stages

### Stage 1: Development (`/build/`)
- **Purpose**: Modern development environment with hot reload, dependency management
- **Tools**: Vite bundler, npm scripts, ES modules, external libraries
- **Files**: Source code, development dependencies, build configurations
- **Command**: `npm run dev` (runs development server)

```bash
cd build/my-component
npm install          # Install dependencies
npm run dev         # Start development server with hot reload
```

### Stage 2: Build Process (`build/ → build/dist/`)
- **Purpose**: Bundle all dependencies into self-contained files
- **Process**: Vite bundles external libraries (like Shoelace) into single JS file
- **Output**: `dist/{component-name}.js` (temporary build artifact)

```bash
npm run build       # Bundles dependencies using Vite
```

### Stage 3: Deployment (`build/dist/ → blocks/`)
- **Purpose**: Copy production-ready files to EDS deployment directory
- **Process**: `deploy.js` script handles file copying and documentation
- **Result**: Clean, deployable files ready for EDS projects

```bash
npm run deploy      # Copies built files to ../../blocks/{component-name}/
```

### Stage 4: EDS Integration (`blocks/ → your-eds-project/`)
- **Purpose**: Integrate component into actual EDS project
- **Process**: Manual copy to maintain version control
- **Result**: Component available in your EDS website

```bash
cp -r blocks/my-component /path/to/your-eds-project/blocks/
cd /path/to/your-eds-project
git add blocks/my-component/
git commit -m "Add my-component block"
```

## Key Differences

### Build-Based vs Direct-Edit Comparison

| Aspect | Build-Based (`/build/` + `/blocks/`) | Direct-Edit (`/blocks/` only) |
|--------|--------------------------------------|-------------------------------|
| **Purpose** | Complex components with dependencies | Simple vanilla JS components |
| **Dependencies** | External libraries via npm | No external dependencies |
| **Development** | Modern tooling (Vite, hot reload) | Direct file editing |
| **File Size** | Bundled into single optimized file | Multiple source files |
| **CSS** | Bundled in JavaScript for performance | Separate CSS file |
| **Build Step** | Required (`npm run build`) | None needed |
| **Documentation** | DEV-README.md + USER-README.md | README.md only |
| **Source Control** | `/build/` is source, `/blocks/` is artifact | `/blocks/` is source |
| **Best For** | Shoelace components, complex UI | Text formatters, simple blocks |

### File Status by Scenario

| File Location | Build-Based Component | Direct-Edit Component |
|---------------|----------------------|----------------------|
| `build/{name}/` | ✅ Source files (edit here) | ❌ Folder doesn't exist |
| `blocks/{name}/` | ❌ Artifacts (don't edit) | ✅ Source files (edit here) |

## File Transformation Examples

### JavaScript Files
```javascript
// build/my-component/my-component.js (source)
import { SlCard } from '@shoelace-style/shoelace';
import styles from './my-component.css';

export default function decorate(block) {
  // Implementation with external dependencies
}
```

```javascript
// blocks/my-component/my-component.js (bundled)
// All Shoelace components bundled inline (~130KB)
// CSS styles injected as string
// Self-contained, no external dependencies
```

### CSS Files
```css
/* build/my-component/my-component.css (full source) */
.my-component {
  /* Detailed styles with comments */
  background: var(--primary-color);
  /* Development-friendly formatting */
}
```

```css
/* blocks/my-component/my-component.css (stub) */
/* Styles are bundled in the JavaScript file for performance */
/* This file exists for EDS compatibility but is essentially empty */
```

## When to Use Which Approach?

### Decision Logic

```
Does a build/{component-name}/ folder exist?
├── YES → Always develop in build/, deploy to blocks/
└── NO  → Edit directly in blocks/ (simple components)
```

### Two Development Patterns

#### Pattern 1: Complex Components (with `/build/` folder)
- **Use Case**: External dependencies, modern JavaScript, bundling needed
- **Examples**: Shoelace components, data tables, complex forms
- **Rule**: ❌ Never edit `/blocks/` directly ✅ Always develop in `/build/`

#### Pattern 2: Simple Components (no `/build/` folder)
- **Use Case**: Vanilla JavaScript, minimal CSS, no external dependencies  
- **Examples**: Basic text formatters, simple layouts, utility blocks
- **Rule**: ✅ Edit directly in `/blocks/` ❌ No build process needed

## Why This Architecture?

### Benefits of Build-Based Development
1. **Modern Tooling**: Hot reload, dependency management, bundling
2. **External Libraries**: Automatic bundling of Shoelace, etc.
3. **Performance**: Optimized, self-contained output files
4. **Type Safety**: Modern JavaScript features and validation

### Benefits of Direct Development
1. **Simplicity**: No build setup for basic components
2. **Speed**: Immediate changes without build steps
3. **EDS Native**: Works directly with EDS expectations
4. **Learning**: Easier for developers new to the system

### Decision Matrix

| Component Needs | Approach | Location |
|----------------|----------|----------|
| External libraries (Shoelace, etc.) | Build-based | `/build/` → `/blocks/` |
| Modern JS features (imports, etc.) | Build-based | `/build/` → `/blocks/` |
| Complex bundling requirements | Build-based | `/build/` → `/blocks/` |
| Vanilla JavaScript only | Direct edit | `/blocks/` only |
| Simple CSS styling | Direct edit | `/blocks/` only |
| Basic DOM manipulation | Direct edit | `/blocks/` only |

### Common Misunderstandings (Corrected)

❌ **Wrong**: "Never edit files in `/blocks/`"
✅ **Right**: "Check if `/build/{component}/` exists first - if not, edit `/blocks/` directly"

❌ **Wrong**: "All components need a build process"
✅ **Right**: "Only components with external dependencies or modern JS features need builds"

❌ **Wrong**: "The `/blocks/` directory is always just artifacts"
✅ **Right**: "Sometimes `/blocks/` contains source code (when no `/build/` folder exists)"

## Development Workflows

### Workflow A: Complex Component (Build-Based)

```bash
# 1. Check if build folder exists
ls build/my-component/         # If exists, use this workflow

# 2. Develop in build directory
cd build/my-component
npm install                    # Install dependencies
npm run dev                   # localhost:5174 with hot reload

# 3. Build and deploy
npm run build                 # Bundle dependencies
npm run deploy                # Copy to ../../blocks/my-component/

# 4. ⚠️ NEVER edit blocks/ directly when build/ exists
```

### Workflow B: Simple Component (Direct Edit)

```bash
# 1. Check if build folder exists
ls build/my-component/         # If NOT found, use this workflow

# 2. Edit directly in blocks
cd blocks/my-component
# Edit .js and .css files directly
# Test changes immediately in EDS

# 3. No build step needed - files are ready to use
```

### Component Examples

#### Build-Based Components (`/build/` folder required)
```javascript
// Needs external dependencies
import { SlCard, SlButton } from '@shoelace-style/shoelace';

// Uses modern JavaScript features  
const response = await fetch('/api/data');
const { data } = await response.json();

// Complex bundling requirements
export default function decorate(block) {
  // Advanced functionality
}
```

#### Direct-Edit Components (`/blocks/` only)
```javascript
// Simple vanilla JavaScript
export default function decorate(block) {
  const button = block.querySelector('button');
  button.addEventListener('click', () => {
    block.classList.toggle('active');
  });
}
```

### How to Decide?

**Choose Build-Based Development If:**
- ✅ Component uses external libraries (Shoelace, Chart.js, etc.)
- ✅ You need modern JavaScript features (async/await, imports)
- ✅ Component is complex and benefits from hot reload
- ✅ You want bundled, optimized output

**Choose Direct-Edit Development If:**
- ✅ Component uses only vanilla JavaScript
- ✅ Simple CSS styling without preprocessing
- ✅ Quick prototyping or learning EDS
- ✅ Component is straightforward and doesn't need tooling

## Documentation Standards

- **DEV-README.md** → Technical implementation details, build process
- **USER-README.md** → Content author instructions, usage examples  
- **README.md** (in blocks/) → Deployed user documentation (copied from USER-README.md)

## Practical Guidelines

### "I Want to Edit an Existing Component"

```bash
# Step 1: Check if build folder exists
ls build/my-component/

# If folder EXISTS:
# ✅ Edit files in build/my-component/
# ✅ Run npm run deploy to update blocks/
# ❌ Never edit blocks/my-component/ directly

# If folder DOES NOT EXIST:
# ✅ Edit files in blocks/my-component/ directly  
# ❌ Don't create a build folder unless adding dependencies
```

### "I Want to Create a New Component"

**Simple Component (recommended starting point):**
```bash
# 1. Create directly in blocks/
mkdir blocks/my-new-component
cd blocks/my-new-component

# 2. Create basic files
touch my-new-component.js my-new-component.css README.md

# 3. Edit files directly - no build step needed
```

**Complex Component (when you need external libraries):**
```bash
# 1. Create build workspace
mkdir build/my-new-component  
cd build/my-new-component

# 2. Set up build environment
npm init -y
npm install @shoelace-style/shoelace  # or other dependencies

# 3. Develop with tooling, deploy with npm run deploy
```

### Quick Reference Commands

```bash
# Check component type
ls build/my-component/ 2>/dev/null && echo "Build-based" || echo "Direct-edit"

# For build-based components
cd build/my-component && npm run dev      # Development
cd build/my-component && npm run deploy   # Deploy to blocks/

# For direct-edit components  
cd blocks/my-component                     # Edit directly
# No build step needed
```

This architecture ensures that developers have modern tools while EDS projects get optimized, self-contained components that work reliably in production.

## See Also

### Core Architecture & Implementation
- **[Complex EDS Blocks Guide](complex-eds-blocks-guide.md)** - Detailed implementation guide for build-based components with external dependencies
- **[EDS Architecture Standards](eds-architecture-standards.md)** - Architectural patterns and standards for EDS-native block development
- **[Design Philosophy Guide](design-philosophy-guide.md)** - Understanding the philosophical principles behind EDS dual-directory architecture
- **[Build Component Template](build-component-template.md)** - Template and scaffolding for creating new build-based EDS components

### Development Guides
- **[Raw EDS Blocks Guide](raw-eds-blocks-guide.md)** - Step-by-step guide for creating simple EDS blocks (direct-edit approach)
- **[Block Architecture Standards](block-architecture-standards.md)** - Comprehensive standards for EDS block development including naming conventions and file structure
- **[EDS Overview](../eds.md)** - Complete introduction to Edge Delivery Services architecture and core concepts
- **[Project Structure](../project-structure.md)** - Understanding the overall EDS project organization and file conventions
- **[CSS Naming Convention Style Guide](../guidelines/style-guide.md)** - CSS naming conventions and standards for EDS blocks and components

### Development Environment & Tools
- **[Server README](../../../Server-README.md)** - Development server setup and configuration for both build-based and direct-edit workflows
- **[Debug Guide](../testing/debug.md)** - Comprehensive debugging strategies for both build-based and direct-edit components
- **[Build Tools Configuration](build-tools-configuration.md)** - Advanced build tool setup and configuration for complex EDS blocks
- **[Deployment Strategies](deployment-strategies.md)** - Best practices for deploying both types of EDS blocks to production

### Testing & Quality Assurance
- **[Testing Strategies](testing-strategies.md)** - Testing approaches for both build-based and direct-edit components
- **[EDS Native Testing Standards](../testing/eds-native-testing-standards.md)** - Testing approaches specifically designed for EDS-native components
- **[Performance Optimization](performance-optimization.md)** - Techniques for optimizing both build-based and direct-edit components
- **[Browser Compatibility](browser-compatibility.md)** - Ensuring cross-browser compatibility for both development approaches

### Advanced Topics
- **[Web Components with EDS](web-components-with-eds.md)** - Integrating modern web components within both architectural approaches
- **[JavaScript Patterns](javascript-patterns.md)** - Reusable JavaScript patterns for both build-based and direct-edit development
- **[CSS Patterns](css-patterns.md)** - Common CSS patterns and styling approaches for both development types
- **[Block Examples](block-examples.md)** - Real-world examples of both build-based and direct-edit implementations

## Next Steps

### For New EDS Developers
1. **Understand the dual architecture** by reading this guide thoroughly to grasp when to use each approach
2. **Start with simple components** using the direct-edit approach in `/blocks/` following [Raw EDS Blocks Guide](raw-eds-blocks-guide.md)
3. **Learn the standards** from [Block Architecture Standards](block-architecture-standards.md) and [EDS Architecture Standards](eds-architecture-standards.md)
4. **Practice the decision logic** by creating a few simple components before attempting build-based development
5. **Set up your environment** using [Server README](../../../Server-README.md) for proper development workflow

### For Experienced Developers
1. **Master the decision matrix** to quickly determine which approach is appropriate for each component
2. **Explore build-based development** with [Complex EDS Blocks Guide](complex-eds-blocks-guide.md) when external dependencies are needed
3. **Understand the build process** by implementing the Vite configuration and deployment automation
4. **Create reusable templates** using [Build Component Template](build-component-template.md) for consistent development
5. **Optimize workflows** by understanding both development patterns and their trade-offs

### For Architects & Technical Leads
1. **Establish team guidelines** for when to use build-based vs. direct-edit approaches
2. **Create project standards** that incorporate both architectural patterns appropriately
3. **Design component libraries** that leverage the strengths of each approach
4. **Plan development workflows** that support both patterns efficiently
5. **Document decision criteria** for your team using the guidelines in this document

### For DevOps & Build Engineers
1. **Understand both deployment patterns** to create appropriate CI/CD pipelines
2. **Set up build environments** that support the dual-directory architecture
3. **Implement automated testing** for both build-based and direct-edit components
4. **Create deployment automation** that handles both types of components correctly
5. **Monitor build processes** and optimize for both development patterns

### For QA Engineers & Testers
1. **Learn both testing approaches** for build-based and direct-edit components
2. **Understand the file transformation process** to test components effectively
3. **Create test scenarios** that cover both development patterns
4. **Validate deployment processes** for both types of components
5. **Test integration workflows** from development to production for both approaches

### For Project Managers & Team Leads
1. **Understand the complexity trade-offs** between build-based and direct-edit approaches
2. **Plan project timelines** accounting for the different development patterns
3. **Allocate resources** appropriately based on component complexity requirements
4. **Communicate architectural decisions** to stakeholders using the decision matrix
5. **Track component inventory** to understand the distribution of build-based vs. direct-edit components

### For Content Authors & Editors
1. **Understand that both approaches** produce the same end-user experience in EDS
2. **Learn the documentation patterns** for both types of components
3. **Use component examples** regardless of the underlying development approach
4. **Provide feedback** on component usability for both development patterns
5. **Collaborate with developers** by understanding the architectural constraints and benefits