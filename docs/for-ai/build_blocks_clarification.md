# Build vs Blocks Directory Structure

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