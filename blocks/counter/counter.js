/*
 * Counter Block
 * A simple counter component using web components
 */

// Configuration object for the counter block
const COUNTER_CONFIG = {
  CLASS_NAMES: {
    COUNTER: 'counter-component',
    BUTTON: 'counter-button',
    DISPLAY: 'counter-display',
  },
  ARIA_LABELS: {
    INCREMENT: 'Increment counter',
    DECREMENT: 'Decrement counter',
    DISPLAY: 'Current count',
  },
  ERROR_MESSAGES: {
    INVALID_INITIAL: 'Invalid initial value provided',
  },
};

// Define the Counter Web Component
class CounterElement extends HTMLElement {
  constructor() {
    super();
    this.count = parseInt(this.getAttribute('initial-value') || '0', 10);
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const { shadowRoot } = this;
    shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --counter-button-bg: var(--color-primary, #007bff);
          --counter-button-color: var(--color-text-inverse, #ffffff);
          --counter-display-bg: var(--color-background, #f8f9fa);
          --counter-display-color: var(--color-text, #212529);
        }
        
        .counter-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          font-family: var(--font-family-base, system-ui);
        }
        
        .counter-button {
          background: var(--counter-button-bg);
          color: var(--counter-button-color);
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 1rem;
          transition: opacity 0.2s;
        }
        
        .counter-button:hover {
          opacity: 0.9;
        }
        
        .counter-button:focus-visible {
          outline: 2px solid var(--counter-button-bg);
          outline-offset: 2px;
        }
        
        .counter-display {
          background: var(--counter-display-bg);
          color: var(--counter-display-color);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          min-width: 3rem;
          text-align: center;
          font-size: 1.25rem;
          font-weight: bold;
        }
      </style>
      
      <div class="counter-wrapper">
        <button class="counter-button" aria-label="${COUNTER_CONFIG.ARIA_LABELS.DECREMENT}">-</button>
        <div class="counter-display" aria-label="${COUNTER_CONFIG.ARIA_LABELS.DISPLAY}">${this.count}</div>
        <button class="counter-button" aria-label="${COUNTER_CONFIG.ARIA_LABELS.INCREMENT}">+</button>
      </div>
    `;
  }

  setupEventListeners() {
    const { shadowRoot } = this;
    const incrementButton = shadowRoot.querySelector('.counter-button:last-child');
    const decrementButton = shadowRoot.querySelector('.counter-button:first-child');
    const display = shadowRoot.querySelector('.counter-display');

    incrementButton.addEventListener('click', () => {
      this.count += 1;
      display.textContent = this.count;
      this.dispatchEvent(new CustomEvent('count-change', { detail: { count: this.count } }));
    });

    decrementButton.addEventListener('click', () => {
      this.count -= 1;
      display.textContent = this.count;
      this.dispatchEvent(new CustomEvent('count-change', { detail: { count: this.count } }));
    });
  }
}

// Register the web component
customElements.define('counter-element', CounterElement);

/**
 * Decorates the counter block
 * @param {HTMLElement} block - The block element
 */
export default function decorate(block) {
  try {
    // Get initial value from the first cell of the table
    const cells = Array.from(block.children);
    const initialValue = cells[0]?.textContent.trim();
    
    // Create and configure counter before clearing block
    const counter = document.createElement('counter-element');
    
    if (initialValue) {
      const parsedValue = parseInt(initialValue, 10);
      if (Number.isNaN(parsedValue)) {
        throw new Error(COUNTER_CONFIG.ERROR_MESSAGES.INVALID_INITIAL);
      }
      // Set the initial value attribute
      counter.setAttribute('initial-value', parsedValue.toString());
      
      // Force a re-render of the counter with the new value
      counter.count = parsedValue;
      if (counter.shadowRoot) {
        const display = counter.shadowRoot.querySelector('.counter-display');
        if (display) {
          display.textContent = parsedValue.toString();
        }
      }
    }

    // Clear the block and append the counter
    block.textContent = '';
    block.appendChild(counter);

    // Add event listener for count changes
    counter.addEventListener('count-change', (event) => {
      // eslint-disable-next-line no-console
      console.log('Count changed:', event.detail.count);
    });

  } catch (error) {
     
    console.error('Error initializing counter:', error);
    block.textContent = error.message;
  }
} 
