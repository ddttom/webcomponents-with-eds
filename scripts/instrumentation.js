/**
 * Comprehensive JavaScript Instrumentation System
 * Captures performance metrics, function traces, and execution data
 */

class PerformanceInstrumentation {
  constructor() {
    this.metrics = {
      functionCalls: new Map(),
      executionTimes: new Map(),
      callStack: [],
      memorySnapshots: [],
      domEvents: [],
      asyncOperations: new Map(),
      errors: [],
      resourceLoading: [],
      variableChanges: new Map(),
      executionFlow: []
    };
    
    this.startTime = performance.now();
    this.callDepth = 0;
    this.maxCallDepth = 0;
    this.isRecording = true;
    
    // Initialize memory monitoring
    this.initializeMemoryMonitoring();
    
    // Initialize DOM monitoring
    this.initializeDOMMonitoring();
    
    // Initialize error monitoring
    this.initializeErrorMonitoring();
    
    // Initialize resource monitoring
    this.initializeResourceMonitoring();
  }

  /**
   * Wraps a function with comprehensive instrumentation
   */
  instrumentFunction(fn, functionName, context = 'global') {
    const self = this;
    
    return function instrumentedFunction(...args) {
      if (!self.isRecording) {
        return fn.apply(this, args);
      }

      const callId = `${functionName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const startTime = performance.now();
      const startMemory = self.getMemoryUsage();
      
      // Increment call depth
      self.callDepth++;
      self.maxCallDepth = Math.max(self.maxCallDepth, self.callDepth);
      
      // Record function entry
      const entryData = {
        callId,
        functionName,
        context,
        startTime,
        startMemory,
        callDepth: self.callDepth,
        arguments: self.serializeArguments(args),
        stackTrace: self.getStackTrace(),
        timestamp: new Date().toISOString()
      };
      
      self.recordFunctionEntry(entryData);
      
      let result;
      let error = null;
      
      try {
        // Execute the original function
        result = fn.apply(this, args);
        
        // Handle async functions
        if (result && typeof result.then === 'function') {
          return self.handleAsyncFunction(result, callId, functionName, startTime, startMemory);
        }
        
      } catch (err) {
        error = err;
        self.recordError(err, functionName, callId);
        throw err;
      } finally {
        // Record function exit for synchronous functions
        if (!result || typeof result.then !== 'function') {
          const endTime = performance.now();
          const endMemory = self.getMemoryUsage();
          
          self.recordFunctionExit({
            callId,
            functionName,
            context,
            endTime,
            endMemory,
            executionTime: endTime - startTime,
            memoryDelta: endMemory - startMemory,
            returnValue: self.serializeReturnValue(result),
            error: error ? error.message : null,
            callDepth: self.callDepth
          });
          
          self.callDepth--;
        }
      }
      
      return result;
    };
  }

  /**
   * Handles async function instrumentation
   */
  async handleAsyncFunction(promise, callId, functionName, startTime, startMemory) {
    const asyncId = `async_${callId}`;
    
    this.metrics.asyncOperations.set(asyncId, {
      callId,
      functionName,
      startTime,
      status: 'pending'
    });

    try {
      const result = await promise;
      const endTime = performance.now();
      const endMemory = this.getMemoryUsage();
      
      this.recordFunctionExit({
        callId,
        functionName,
        context: 'async',
        endTime,
        endMemory,
        executionTime: endTime - startTime,
        memoryDelta: endMemory - startMemory,
        returnValue: this.serializeReturnValue(result),
        error: null,
        callDepth: this.callDepth,
        isAsync: true
      });
      
      this.metrics.asyncOperations.set(asyncId, {
        callId,
        functionName,
        startTime,
        endTime,
        status: 'resolved',
        result: this.serializeReturnValue(result)
      });
      
      this.callDepth--;
      return result;
      
    } catch (error) {
      const endTime = performance.now();
      const endMemory = this.getMemoryUsage();
      
      this.recordError(error, functionName, callId);
      
      this.recordFunctionExit({
        callId,
        functionName,
        context: 'async',
        endTime,
        endMemory,
        executionTime: endTime - startTime,
        memoryDelta: endMemory - startMemory,
        returnValue: null,
        error: error.message,
        callDepth: this.callDepth,
        isAsync: true
      });
      
      this.metrics.asyncOperations.set(asyncId, {
        callId,
        functionName,
        startTime,
        endTime,
        status: 'rejected',
        error: error.message
      });
      
      this.callDepth--;
      throw error;
    }
  }

  /**
   * Records function entry
   */
  recordFunctionEntry(data) {
    this.metrics.executionFlow.push({
      type: 'function_entry',
      ...data
    });
    
    if (!this.metrics.functionCalls.has(data.functionName)) {
      this.metrics.functionCalls.set(data.functionName, []);
    }
    
    this.metrics.functionCalls.get(data.functionName).push({
      type: 'entry',
      ...data
    });
    
    this.metrics.callStack.push({
      callId: data.callId,
      functionName: data.functionName,
      startTime: data.startTime,
      depth: data.callDepth
    });
  }

  /**
   * Records function exit
   */
  recordFunctionExit(data) {
    this.metrics.executionFlow.push({
      type: 'function_exit',
      ...data
    });
    
    if (this.metrics.functionCalls.has(data.functionName)) {
      this.metrics.functionCalls.get(data.functionName).push({
        type: 'exit',
        ...data
      });
    }
    
    // Update execution times
    if (!this.metrics.executionTimes.has(data.functionName)) {
      this.metrics.executionTimes.set(data.functionName, []);
    }
    
    this.metrics.executionTimes.get(data.functionName).push(data.executionTime);
    
    // Remove from call stack
    const stackIndex = this.metrics.callStack.findIndex(call => call.callId === data.callId);
    if (stackIndex !== -1) {
      this.metrics.callStack.splice(stackIndex, 1);
    }
  }

  /**
   * Records variable state changes
   */
  recordVariableChange(variableName, oldValue, newValue, context, functionName) {
    if (!this.isRecording) return;
    
    const changeId = `${variableName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    if (!this.metrics.variableChanges.has(variableName)) {
      this.metrics.variableChanges.set(variableName, []);
    }
    
    this.metrics.variableChanges.get(variableName).push({
      changeId,
      variableName,
      oldValue: this.serializeValue(oldValue),
      newValue: this.serializeValue(newValue),
      context,
      functionName,
      timestamp: new Date().toISOString(),
      performanceTime: performance.now(),
      callDepth: this.callDepth
    });
  }

  /**
   * Initialize memory monitoring
   */
  initializeMemoryMonitoring() {
    const captureMemory = () => {
      if (!this.isRecording) return;
      
      this.metrics.memorySnapshots.push({
        timestamp: new Date().toISOString(),
        performanceTime: performance.now(),
        memory: this.getMemoryUsage(),
        callStackSize: this.metrics.callStack.length,
        activeAsyncOps: this.metrics.asyncOperations.size
      });
    };
    
    // Capture memory every 100ms
    setInterval(captureMemory, 100);
    
    // Capture memory on major events
    this.memoryCapture = captureMemory;
  }

  /**
   * Initialize DOM monitoring
   */
  initializeDOMMonitoring() {
    if (typeof document === 'undefined') return;
    
    const recordDOMEvent = (eventType, target, details = {}) => {
      if (!this.isRecording) return;
      
      this.metrics.domEvents.push({
        eventType,
        target: this.serializeDOMElement(target),
        details,
        timestamp: new Date().toISOString(),
        performanceTime: performance.now(),
        callDepth: this.callDepth,
        currentFunction: this.getCurrentFunction()
      });
    };

    // Monitor DOM mutations
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          recordDOMEvent('mutation', mutation.target, {
            type: mutation.type,
            addedNodes: mutation.addedNodes.length,
            removedNodes: mutation.removedNodes.length,
            attributeName: mutation.attributeName,
            oldValue: mutation.oldValue
          });
        });
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true
      });
    }

    // Monitor common DOM events
    const events = ['click', 'load', 'DOMContentLoaded', 'resize', 'scroll'];
    events.forEach(eventType => {
      document.addEventListener(eventType, (event) => {
        recordDOMEvent(eventType, event.target, {
          eventDetails: {
            type: event.type,
            bubbles: event.bubbles,
            cancelable: event.cancelable
          }
        });
      }, true);
    });
  }

  /**
   * Initialize error monitoring
   */
  initializeErrorMonitoring() {
    if (typeof window === 'undefined') return;
    
    window.addEventListener('error', (event) => {
      this.recordError(event.error, 'window.error', null, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      this.recordError(event.reason, 'unhandledrejection', null);
    });
  }

  /**
   * Initialize resource monitoring
   */
  initializeResourceMonitoring() {
    if (typeof PerformanceObserver === 'undefined') return;
    
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
    
    observer.observe({ entryTypes: ['resource', 'navigation', 'measure', 'mark'] });
  }

  /**
   * Records errors
   */
  recordError(error, functionName, callId, additionalInfo = {}) {
    this.metrics.errors.push({
      error: {
        message: error.message || error,
        stack: error.stack || 'No stack trace available',
        name: error.name || 'Unknown'
      },
      functionName,
      callId,
      timestamp: new Date().toISOString(),
      performanceTime: performance.now(),
      callDepth: this.callDepth,
      callStack: [...this.metrics.callStack],
      additionalInfo
    });
  }

  /**
   * Utility methods
   */
  getMemoryUsage() {
    if (typeof performance !== 'undefined' && performance.memory) {
      return {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      };
    }
    return { usedJSHeapSize: 0, totalJSHeapSize: 0, jsHeapSizeLimit: 0 };
  }

  getStackTrace() {
    const stack = new Error().stack;
    return stack ? stack.split('\n').slice(2, 8) : [];
  }

  getCurrentFunction() {
    return this.metrics.callStack.length > 0 
      ? this.metrics.callStack[this.metrics.callStack.length - 1].functionName 
      : 'unknown';
  }

  serializeArguments(args) {
    return Array.from(args).map(arg => this.serializeValue(arg));
  }

  serializeReturnValue(value) {
    return this.serializeValue(value);
  }

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
        return `[Object: ${Object.keys(value).slice(0, 5).join(', ')}${Object.keys(value).length > 5 ? '...' : ''}]`;
      }
      return String(value);
    } catch {
      return '[Unserializable]';
    }
  }

  serializeDOMElement(element) {
    if (!element || typeof element.tagName === 'undefined') return '[Non-DOM Element]';
    
    const tag = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : '';
    const classes = element.className ? `.${element.className.split(' ').join('.')}` : '';
    
    return `<${tag}${id}${classes}>`;
  }

  /**
   * Generate comprehensive report
   */
  generateReport() {
    const totalTime = performance.now() - this.startTime;
    
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
        totalFunctionCalls: Array.from(this.metrics.functionCalls.values()).reduce((sum, calls) => sum + calls.length, 0),
        maxCallDepth: this.maxCallDepth,
        totalErrors: this.metrics.errors.length,
        totalDOMEvents: this.metrics.domEvents.length,
        totalAsyncOperations: this.metrics.asyncOperations.size,
        memorySnapshots: this.metrics.memorySnapshots.length,
        resourcesLoaded: this.metrics.resourceLoading.length
      },
      functionStats,
      detailedMetrics: {
        functionCalls: Object.fromEntries(this.metrics.functionCalls),
        executionFlow: this.metrics.executionFlow,
        memorySnapshots: this.metrics.memorySnapshots,
        domEvents: this.metrics.domEvents,
        asyncOperations: Object.fromEntries(this.metrics.asyncOperations),
        errors: this.metrics.errors,
        resourceLoading: this.metrics.resourceLoading,
        variableChanges: Object.fromEntries(this.metrics.variableChanges)
      }
    };
  }

  /**
   * Export data for analysis
   */
  exportData() {
    return JSON.stringify(this.generateReport(), null, 2);
  }

  /**
   * Stop recording
   */
  stopRecording() {
    this.isRecording = false;
  }

  /**
   * Start recording
   */
  startRecording() {
    this.isRecording = true;
  }
}

// Create global instrumentation instance
const instrumentation = new PerformanceInstrumentation();

// Export for use in other modules
export { instrumentation, PerformanceInstrumentation };
