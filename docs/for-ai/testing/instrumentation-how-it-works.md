# How the JavaScript Performance Instrumentation System Works

**Related Documentation:** [Debug Guide](debug.md) | [EDS Architecture and Testing Guide](eds-architecture-and-testing-guide.md) | [Block Architecture Standards](../implementation/block-architecture-standards.md) | [EDS Native Testing Standards](eds-native-testing-standards.md)

## 🚨 **ADVANCED DEBUGGING POLICY NOTICE**

> **📋 Critical Requirement**: JavaScript performance instrumentation described in this document constitutes **advanced debugging that requires explicit user request** per the [debugging policy](debug.md#deep-debugging-request-policy).
>
> **⚠️ DO NOT IMPLEMENT** instrumentation workflows, create instrumented files, or deploy performance monitoring without explicit approval from the user.
>
> **This document covers:**
> - File replacement operations (require approval)
> - EDS core file instrumentation (require approval)  
> - Advanced performance monitoring (require approval)
> - Production-level debugging tools (require approval)
>
> See [debug.md](debug.md) for standard debugging approaches that do not require approval.

---

## Overview

This document provides a comprehensive technical explanation of the JavaScript performance instrumentation system implemented for the EDS (Edge Delivery Services) application. The system captures detailed performance metrics, function call traces, execution timing data, variable scope analysis, memory usage patterns, and program flow information during runtime execution.

**Prerequisites for implementation:**
- ✅ **Explicit user request received** for advanced debugging/instrumentation
- ✅ Understanding of [standard debugging approaches](debug.md#standard-debugging-workflow)
- ✅ Familiarity with [file replacement requirements](debug.md#file-replacement-testing-strategy)

## Architecture

### Core Components

```
┌─────────────────────────────────────────────────────────────┐
│                    Instrumentation System                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │ Function Wrapper│  │ Data Collector  │  │ Metrics Store│ │
│  │                 │  │                 │  │              │ │
│  │ • Entry/Exit    │  │ • Memory Monitor│  │ • Call Stack │ │
│  │ • Timing        │  │ • DOM Observer  │  │ • Exec Times │ │
│  │ • Parameters    │  │ • Error Handler │  │ • Variables  │ │
│  │ • Return Values │  │ • Resource Track│  │ • DOM Events │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### File Structure

> **📋 Policy Note**: Creating instrumented files requires explicit user approval.

```
scripts/
├── instrumentation.js           # Core instrumentation framework
├── aem-instrumented.js         # Instrumented AEM functions (development version)
├── scripts-instrumented.js     # Instrumented main application (development version)
└── delayed-instrumented.js     # Instrumented delayed functionality (development version)

blocks/columns/
├── columns.js                  # Original block file (temporarily replaced during testing)
└── columns-instrumented.js     # Instrumented version (copied over original for testing)

eds-test-instrumented.html      # Test page with instrumentation
```

**Important**: The `-instrumented.js` files are development versions that temporarily **replace** the original files during testing. EDS always loads the standard filenames (`columns.js`, `aem.js`, etc.), so instrumented versions must be copied over the originals and then restored.

## Core Instrumentation Framework

### PerformanceInstrumentation Class

The heart of the system is the `PerformanceInstrumentation` class located in [`scripts/instrumentation.js`](scripts/instrumentation.js):

```javascript
class PerformanceInstrumentation {
  constructor() {
    this.metrics = {
      functionCalls: new Map(),      // Function call records
      executionTimes: new Map(),     // Execution timing data
      callStack: [],                 // Current call stack
      memorySnapshots: [],           // Memory usage over time
      domEvents: [],                 // DOM manipulation events
      asyncOperations: new Map(),    // Async operation tracking
      errors: [],                    // Error records
      resourceLoading: [],           // Resource loading metrics
      variableChanges: new Map(),    // Variable state changes
      executionFlow: []              // Complete execution flow
    };
  }
}
```

### Function Instrumentation Process

> **⚠️ Advanced Operation**: Function instrumentation requires explicit user approval per debugging policy.

#### 1. Function Wrapping

The [`instrumentFunction()`](scripts/instrumentation.js:32) method wraps original functions with monitoring code:

```javascript
instrumentFunction(fn, functionName, context = 'global') {
  const self = this;
  
  return function instrumentedFunction(...args) {
    // Pre-execution monitoring
    const callId = generateUniqueId();
    const startTime = performance.now();
    const startMemory = getMemoryUsage();
    
    // Execute original function
    const result = fn.apply(this, args);
    
    // Post-execution monitoring
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    // Record metrics
    recordMetrics(callId, functionName, executionTime, ...);
    
    return result;
  };
}
```

#### 2. Call Stack Management

The system maintains a real-time call stack with depth tracking:

```javascript
// Function entry
this.callDepth++;
this.maxCallDepth = Math.max(this.maxCallDepth, this.callDepth);
this.metrics.callStack.push({
  callId: data.callId,
  functionName: data.functionName,
  startTime: data.startTime,
  depth: data.callDepth
});

// Function exit
this.callDepth--;
const stackIndex = this.metrics.callStack.findIndex(call => call.callId === data.callId);
if (stackIndex !== -1) {
  this.metrics.callStack.splice(stackIndex, 1);
}
```

#### 3. Asynchronous Function Handling

Special handling for Promise-based and async functions:

```javascript
async handleAsyncFunction(promise, callId, functionName, startTime, startMemory) {
  const asyncId = `async_${callId}`;
  
  // Track async operation start
  this.metrics.asyncOperations.set(asyncId, {
    callId, functionName, startTime, status: 'pending'
  });

  try {
    const result = await promise;
    // Record successful completion
    this.metrics.asyncOperations.set(asyncId, {
      ...previousData, status: 'resolved', result
    });
    return result;
  } catch (error) {
    // Record error
    this.metrics.asyncOperations.set(asyncId, {
      ...previousData, status: 'rejected', error: error.message
    });
    throw error;
  }
}
```

## Data Collection Mechanisms

### 1. Memory Monitoring

Continuous memory usage tracking using the Performance Memory API:

```javascript
initializeMemoryMonitoring() {
  const captureMemory = () => {
    this.metrics.memorySnapshots.push({
      timestamp: new Date().toISOString(),
      performanceTime: performance.now(),
      memory: {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      },
      callStackSize: this.metrics.callStack.length,
      activeAsyncOps: this.metrics.asyncOperations.size
    });
  };
  
  // Capture every 100ms
  setInterval(captureMemory, 100);
}
```

### 2. DOM Event Monitoring

Real-time DOM mutation and event tracking:

```javascript
initializeDOMMonitoring() {
  // Mutation Observer for DOM changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      this.metrics.domEvents.push({
        eventType: 'mutation',
        target: this.serializeDOMElement(mutation.target),
        details: {
          type: mutation.type,
          addedNodes: mutation.addedNodes.length,
          removedNodes: mutation.removedNodes.length,
          attributeName: mutation.attributeName
        },
        timestamp: new Date().toISOString(),
        performanceTime: performance.now(),
        callDepth: this.callDepth,
        currentFunction: this.getCurrentFunction()
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true, subtree: true, attributes: true,
    attributeOldValue: true, characterData: true
  });
}
```

### 3. Resource Loading Tracking

Performance Observer integration for resource monitoring:

```javascript
initializeResourceMonitoring() {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      this.metrics.resourceLoading.push({
        name: entry.name,
        type: entry.entryType,
        startTime: entry.startTime,
        duration: entry.duration,
        transferSize: entry.transferSize || 0,
        encodedBodySize: entry.encodedBodySize || 0,
        decodedBodySize: entry.decodedBodySize || 0,
        timestamp: new Date().toISOString()
      });
    });
  });
  
  observer.observe({ 
    entryTypes: ['resource', 'navigation', 'measure', 'mark'] 
  });
}
```

### 4. Error Tracking

Comprehensive error capture and context recording:

```javascript
initializeErrorMonitoring() {
  // Global error handler
  window.addEventListener('error', (event) => {
    this.recordError(event.error, 'window.error', null, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });
  
  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    this.recordError(event.reason, 'unhandledrejection', null);
  });
}

recordError(error, functionName, callId, additionalInfo = {}) {
  this.metrics.errors.push({
    error: {
      message: error.message || error,
      stack: error.stack || 'No stack trace available',
      name: error.name || 'Unknown'
    },
    functionName, callId,
    timestamp: new Date().toISOString(),
    performanceTime: performance.now(),
    callDepth: this.callDepth,
    callStack: [...this.metrics.callStack],
    additionalInfo
  });
}
```

## Data Serialization and Storage

### Value Serialization

Safe serialization of complex JavaScript values:

```javascript
serializeValue(value) {
  try {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'function') return `[Function: ${value.name || 'anonymous'}]`;
    if (value instanceof Element) return this.serializeDOMElement(value);
    if (value instanceof Error) return `[Error: ${value.message}]`;
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return `[Array(${value.length})]`;
      }
      return `[Object: ${Object.keys(value).slice(0, 5).join(', ')}...]`;
    }
    return String(value);
  } catch {
    return '[Unserializable]';
  }
}
```

### DOM Element Serialization

Compact representation of DOM elements:

```javascript
serializeDOMElement(element) {
  if (!element || typeof element.tagName === 'undefined') {
    return '[Non-DOM Element]';
  }
  
  const tag = element.tagName.toLowerCase();
  const id = element.id ? `#${element.id}` : '';
  const classes = element.className ? 
    `.${element.className.split(' ').join('.')}` : '';
  
  return `<${tag}${id}${classes}>`;
}
```

## Instrumented File Implementation

> **📋 Policy Reminder**: Creating instrumented files requires explicit user approval per debugging policy.

### File Replacement Strategy for Instrumentation

**Critical Understanding**: EDS dynamic loading requires exact filenames. Instrumented files are created as development versions that **temporarily replace** the original files during testing.

#### AEM Core Functions

The instrumented AEM functions are created in [`scripts/aem-instrumented.js`](scripts/aem-instrumented.js):

```javascript
// Original function implementation
function sampleRUMOriginal(checkpoint, data) {
  // ... original implementation
}

// Create instrumented version
const sampleRUM = instrumentation.instrumentFunction(
  sampleRUMOriginal, 'sampleRUM', 'aem'
);

// Export instrumented version
export { sampleRUM, /* other functions */ };
```

**Testing Process:**
```bash
# 1. Backup original
cp scripts/aem.js scripts/aem-backup.js

# 2. Replace with instrumented version
cp scripts/aem-instrumented.js scripts/aem.js

# 3. Test (EDS loads scripts/aem.js with instrumentation)
# 4. Restore original
cp scripts/aem-backup.js scripts/aem.js
```

#### Main Application Scripts

The main application instrumentation is created in [`scripts/scripts-instrumented.js`](scripts/scripts-instrumented.js):

```javascript
// Import instrumented AEM functions (when aem.js is replaced)
import {
  buildBlock, loadHeader, decorateButtons, /* ... */
} from './aem.js';  // Still imports from standard filename

// Instrument local functions
const buildHeroBlock = instrumentation.instrumentFunction(
  buildHeroBlockOriginal, 'buildHeroBlock', 'scripts'
);

const loadPage = instrumentation.instrumentFunction(
  loadPageOriginal, 'loadPage', 'scripts'
);

// Start instrumented page loading
loadPage();
```

#### Block-Level Instrumentation

Individual blocks like [`blocks/columns/columns-instrumented.js`](blocks/columns/columns-instrumented.js):

```javascript
import { instrumentation } from '../../scripts/instrumentation.js';

function decorateOriginal(block) {
  // Original block decoration logic
}

const decorate = instrumentation.instrumentFunction(
  decorateOriginal, 'decorate', 'columns-block'
);

export default decorate;
```

**Block Testing Process:**
```bash
# 1. Backup original block
cp blocks/columns/columns.js blocks/columns/columns-backup.js

# 2. Replace with instrumented version  
cp blocks/columns/columns-instrumented.js blocks/columns/columns.js

# 3. Test (EDS loads blocks/columns/columns.js with instrumentation)
# 4. Restore original
cp blocks/columns/columns-backup.js blocks/columns/columns.js
```

## Performance Impact Mitigation

### Minimal Overhead Design

1. **Lazy Evaluation**: Data serialization only occurs when needed
2. **Efficient Storage**: Use of Maps and optimized data structures
3. **Conditional Recording**: Recording can be disabled without code changes
4. **Batch Processing**: Memory snapshots and DOM events are batched

### Memory Management

```javascript
// Controlled memory usage
const MAX_SNAPSHOTS = 1000;
if (this.metrics.memorySnapshots.length > MAX_SNAPSHOTS) {
  this.metrics.memorySnapshots.shift(); // Remove oldest
}

// Efficient data structures
this.metrics.functionCalls = new Map(); // O(1) lookup
this.metrics.executionTimes = new Map(); // O(1) access
```

### Performance Monitoring Controls

```javascript
// Recording can be toggled
stopRecording() { this.isRecording = false; }
startRecording() { this.isRecording = true; }

// Early exit for disabled recording
if (!this.isRecording) {
  return fn.apply(this, args);
}
```

## Data Analysis and Reporting

### Report Generation

The [`generateReport()`](scripts/instrumentation.js:420) method creates comprehensive performance reports:

```javascript
generateReport() {
  const totalTime = performance.now() - this.startTime;
  
  // Calculate function statistics
  const functionStats = {};
  this.metrics.executionTimes.forEach((times, functionName) => {
    functionStats[functionName] = {
      callCount: times.length,
      totalTime: times.reduce((sum, time) => sum + time, 0),
      averageTime: times.reduce((sum, time) => sum + time, 0) / times.length,
      minTime: Math.min(...times),
      maxTime: Math.max(...times)
    };
  });

  return {
    summary: {
      totalExecutionTime: totalTime,
      totalFunctionCalls: /* calculated */,
      maxCallDepth: this.maxCallDepth,
      totalErrors: this.metrics.errors.length,
      /* ... other metrics */
    },
    functionStats,
    detailedMetrics: {
      functionCalls: Object.fromEntries(this.metrics.functionCalls),
      executionFlow: this.metrics.executionFlow,
      memorySnapshots: this.metrics.memorySnapshots,
      /* ... other detailed data */
    }
  };
}
```

### Browser Integration

The instrumented HTML page provides browser-accessible reporting:

```javascript
// Global access to instrumentation
window.instrumentation = instrumentation;

// Convenient report generation
window.getInstrumentationReport = () => {
  const report = window.instrumentation.generateReport();
  console.log('📈 Performance Instrumentation Report:', report);
  return report;
};

// Data export functionality
window.exportInstrumentationData = () => {
  const data = window.instrumentation.exportData();
  // Create downloadable JSON file
  const blob = new Blob([data], { type: 'application/json' });
  // ... download logic
};
```

## Integration with EDS Architecture

### Module System Compatibility

The instrumentation system maintains full compatibility with ES modules:

```javascript
// Proper module imports/exports
import { instrumentation } from './instrumentation.js';
export { instrumentedFunction };

// Dynamic imports for blocks
const mod = await import(`/blocks/${blockName}/${blockName}.js`);
```

### AEM Integration

Seamless integration with AEM's block loading system through file replacement:

```javascript
// Block loading with instrumentation
async function loadBlock(block) {
  const { blockName } = block.dataset;
  
  // EDS always loads the standard filename
  const mod = await import(`/blocks/${blockName}/${blockName}.js`);
  
  // During testing, this file contains instrumented code
  // (copied from blocks/blockName/blockName-instrumented.js)
  if (mod.default) {
    await mod.default(block); // Executes instrumented or original function
  }
}
```

**Key Points:**
- EDS dynamic imports always use standard filenames (`blocks/columns/columns.js`)
- Instrumentation works by temporarily replacing these standard files
- No changes to EDS core loading logic required
- Original files must be restored after testing

### Server-Side Considerations

The Node.js server serves standard filenames, which may contain instrumented code during testing:

```javascript
// Server serves standard files (may be temporarily replaced with instrumented versions)
app.get('/scripts/aem.js', (req, res) => {
  // During testing, this may be the instrumented version
  res.sendFile(path.join(__dirname, 'scripts/aem.js'));
});

app.get('/blocks/:blockName/:blockName.js', (req, res) => {
  const { blockName } = req.params;
  // During testing, this may be the instrumented version  
  res.sendFile(path.join(__dirname, 'blocks', blockName, `${blockName}.js`));
});
```

**File Replacement Workflow:**
1. Server continues serving standard filenames
2. During testing, standard files are temporarily replaced with instrumented versions
3. EDS loads instrumented code through normal pathways
4. Original files are restored after testing

## Usage and Deployment

> **📋 Policy Gate**: Verify explicit user approval before implementing any deployment procedures.

### Development Mode - File Replacement Workflow

1. **Create Instrumented Versions**: Develop `-instrumented.js` files with performance monitoring
2. **Backup Originals**: `cp scripts/aem.js scripts/aem-backup.js`
3. **Replace Files**: `cp scripts/aem-instrumented.js scripts/aem.js`
4. **Load Test Page**: Access `eds-test-instrumented.html` at `http://localhost:3000`
5. **Monitor Console**: Watch for instrumentation messages
6. **Generate Reports**: Use `window.getInstrumentationReport()`
7. **Export Data**: Use `window.exportInstrumentationData()`
8. **Restore Originals**: `cp scripts/aem-backup.js scripts/aem.js`

### Complete Testing Workflow

```bash
#!/bin/bash
# Instrumentation testing workflow

echo "🔧 Starting instrumentation testing..."

# Backup original files
cp scripts/aem.js scripts/aem-backup.js
cp scripts/scripts.js scripts/scripts-backup.js
cp blocks/columns/columns.js blocks/columns/columns-backup.js

# Deploy instrumented versions
cp scripts/aem-instrumented.js scripts/aem.js
cp scripts/scripts-instrumented.js scripts/scripts.js  
cp blocks/columns/columns-instrumented.js blocks/columns/columns.js

echo "✅ Instrumented files deployed"
echo "🌐 Test at: http://localhost:3000/eds-test-instrumented.html"
echo "📊 Use browser console: window.getInstrumentationReport()"
echo ""
echo "Press Enter when testing is complete..."
read -r

# Restore original files
cp scripts/aem-backup.js scripts/aem.js
cp scripts/scripts-backup.js scripts/scripts.js
cp blocks/columns/columns-backup.js blocks/columns/columns.js

# Clean up backups
rm scripts/aem-backup.js scripts/scripts-backup.js blocks/columns/columns-backup.js

echo "✅ Original files restored, instrumentation testing complete"
```

### Production Considerations

1. **Conditional Loading**: Load instrumentation only when needed
2. **Performance Impact**: Monitor overhead in production
3. **Data Privacy**: Ensure no sensitive data in exports
4. **Storage Limits**: Implement data rotation for long-running pages

## Advanced Features

> **⚠️ Advanced Operations**: All advanced features require explicit user approval.

### Custom Metrics

Extend the system with custom performance metrics:

```javascript
// Add custom metric tracking
instrumentation.recordCustomMetric = function(name, value, context) {
  if (!this.metrics.customMetrics) {
    this.metrics.customMetrics = new Map();
  }
  
  if (!this.metrics.customMetrics.has(name)) {
    this.metrics.customMetrics.set(name, []);
  }
  
  this.metrics.customMetrics.get(name).push({
    value, context,
    timestamp: new Date().toISOString(),
    performanceTime: performance.now()
  });
};
```

### Real-Time Monitoring

Implement live performance dashboards:

```javascript
// WebSocket integration for real-time data
const ws = new WebSocket('ws://localhost:8080/performance');
setInterval(() => {
  const currentMetrics = instrumentation.getCurrentMetrics();
  ws.send(JSON.stringify(currentMetrics));
}, 1000);
```

### Performance Alerting

Add threshold-based alerting:

```javascript
// Performance threshold monitoring
instrumentation.addPerformanceAlert = function(functionName, maxTime) {
  this.performanceAlerts = this.performanceAlerts || new Map();
  this.performanceAlerts.set(functionName, maxTime);
};

// Check thresholds on function exit
if (this.performanceAlerts && this.performanceAlerts.has(functionName)) {
  const threshold = this.performanceAlerts.get(functionName);
  if (executionTime > threshold) {
    console.warn(`⚠️ Performance Alert: ${functionName} took ${executionTime}ms (threshold: ${threshold}ms)`);
  }
}
```

## Conclusion

> **📋 Policy Compliance**: All instrumentation implementation requires explicit user request approval per the [debugging policy](debug.md#deep-debugging-request-policy).

This instrumentation system provides comprehensive visibility into JavaScript application performance with minimal impact on execution. The modular design allows for selective instrumentation, detailed analysis, and easy integration with existing EDS applications. The system captures all major performance indicators while maintaining the simplicity and performance focus required by modern web applications.

The implementation demonstrates how to effectively monitor complex JavaScript applications without disrupting their core functionality, providing valuable insights for performance optimization and debugging.

### Key Implementation Requirements

1. **Policy Compliance**: Explicit user approval required before implementation
2. **File Replacement Strategy**: Use copy/restore workflow, not permanent file renaming
3. **Backup Procedures**: Always backup original files before replacement
4. **Standard Filenames**: EDS loads standard names - instrumented code replaces temporarily
5. **Mandatory Restoration**: Original files must be restored after testing
6. **Performance Impact**: Monitor overhead and maintain acceptable performance
7. **Data Security**: Ensure no sensitive information in performance exports
8. **Integration**: Maintain full compatibility with EDS architecture
9. **Documentation**: Complete audit trail of all instrumentation activities

### File Replacement vs Rename Strategy

**❌ INCORRECT (File Renaming):**
- Creating permanently named `aem-instrumented.js` files
- Expecting EDS to load instrumented filenames directly
- Modifying EDS import paths

**✅ CORRECT (File Replacement):**
- Creating `-instrumented.js` development versions
- Temporarily copying over standard filenames during testing
- EDS loads standard filenames containing instrumented code
- Restoring original files after testing

---

## See Also

### Core Testing & Debugging
- **[Debug Guide](debug.md)** - Complete debugging policy and approval requirements for advanced debugging operations
- **[EDS Architecture and Testing Guide](eds-architecture-and-testing-guide.md)** - File replacement testing strategies and advanced testing workflows
- **[EDS Native Testing Standards](eds-native-testing-standards.md)** - Testing approaches specifically designed for EDS-native components
- **[Testing Strategies](testing-strategies.md)** - Comprehensive testing approaches for EDS blocks including unit tests and integration testing

### Architecture & Development Standards
- **[Block Architecture Standards](../implementation/block-architecture-standards.md)** - Standard development approaches and comprehensive standards for EDS block development
- **[EDS Architecture Standards](../implementation/eds-architecture-standards.md)** - Architectural patterns and standards for EDS-native block development
- **[EDS Overview](../eds.md)** - Complete introduction to Edge Delivery Services architecture and core concepts
- **[Design Philosophy Guide](../implementation/design-philosophy-guide.md)** - Understanding the philosophical principles behind EDS architecture decisions

### Implementation & Development
- **[Raw EDS Blocks Guide](../implementation/raw-eds-blocks-guide.md)** - Step-by-step guide for creating simple EDS blocks using vanilla JavaScript
- **[Complex EDS Blocks Guide](../implementation/complex-eds-blocks-guide.md)** - Advanced block development with build tools and external dependencies
- **[Build Blocks Clarification](../implementation/build-blocks-clarification.md)** - Understanding the dual-directory architecture and development workflows
- **[Project Structure](../project-structure.md)** - Understanding the overall EDS project organization and file conventions

### Development Environment & Tools
- **[Server README](../../server-README.md)** - Development server setup and configuration for EDS block development
- **[Performance Optimization](performance-optimization.md)** - Techniques for optimizing EDS block performance and loading
- **[Browser Compatibility](browser-compatibility.md)** - Ensuring cross-browser compatibility for EDS implementations
- **[Build Tools Configuration](build-tools-configuration.md)** - Advanced build tool setup and configuration

### Advanced Topics
- **[Investigation](investigation.md)** - Advanced investigation techniques and analysis methods
- **[JavaScript Patterns](javascript-patterns.md)** - Reusable JavaScript patterns for EDS block development
- **[Error Handling Patterns](error-handling-patterns.md)** - Comprehensive error handling strategies for EDS blocks
- **[Block Examples](block-examples.md)** - Real-world examples of successful EDS block implementations

## Next Steps

### For Performance Engineers & Analysts
1. **Master the policy requirements** by understanding when explicit approval is required for instrumentation
2. **Study the file replacement workflow** for safely deploying instrumented versions of EDS components
3. **Learn the instrumentation architecture** including function wrapping, data collection, and metrics storage
4. **Practice with non-critical components** before attempting instrumentation of core EDS files
5. **Implement automated testing scripts** following the patterns shown in this guide

### For QA Engineers & Testers
1. **Understand the advanced debugging policy** and when instrumentation requires explicit approval
2. **Master the backup and restoration procedures** for maintaining code integrity during testing
3. **Learn to interpret performance metrics** captured by the instrumentation system
4. **Create comprehensive test scenarios** that validate both functionality and performance impact
5. **Develop monitoring strategies** for tracking instrumentation overhead and system impact

### For DevOps & Build Engineers
1. **Understand the file replacement constraints** imposed by EDS dynamic loading architecture
2. **Implement CI/CD pipelines** that support the instrumentation testing workflow
3. **Create automated backup and restoration** procedures for safe instrumentation deployment
4. **Set up monitoring** for performance impact and system health during instrumented testing
5. **Design recovery procedures** for handling instrumentation failures and file corruption

### For Senior Developers & Architects
1. **Master the technical architecture** of the instrumentation system and its integration with EDS
2. **Understand the performance impact** of instrumentation on application execution and memory usage
3. **Design custom metrics** and extend the instrumentation system for specific monitoring needs
4. **Create team guidelines** for when to request instrumentation approval and how to use the system safely
5. **Establish governance processes** for managing instrumented testing workflows and data security

### For Team Leads & Project Managers
1. **Understand the approval requirements** for advanced debugging and instrumentation operations
2. **Plan testing timelines** that account for the file replacement workflow and restoration procedures
3. **Establish approval processes** for team members requesting advanced instrumentation capabilities
4. **Monitor the impact** of instrumentation testing on development velocity and system stability
5. **Create documentation standards** for recording instrumentation results and performance insights

### For Security & Compliance Teams
1. **Review the data collection mechanisms** to ensure compliance with privacy and security requirements
2. **Understand the file replacement workflow** and its implications for code integrity and audit trails
3. **Establish data handling procedures** for performance metrics and instrumentation exports
4. **Create security guidelines** for instrumentation deployment and data storage
5. **Monitor access controls** for advanced debugging capabilities and instrumentation tools

### For AI Assistants & Automation
1. **Understand the explicit approval requirement** for all instrumentation operations described in this guide
2. **Master the standard debugging approaches** that can be used without special approval
3. **Learn to identify** when advanced instrumentation is necessary vs. standard performance monitoring
4. **Implement safety checks** for file replacement operations and backup procedures
5. **Create clear documentation** that helps users understand when to request instrumentation approval