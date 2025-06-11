import { loadCSS,loadScript } from '../../scripts/aem.js';

export default async function decorate(block) {
    // Load Shoelace CSS
    await loadCSS('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/themes/light.css');
  
    // Load Shoelace JavaScr
    // ipt
    await loadScript('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/shoelace-autoloader.js', {
      type: 'module'
    });
    // Now you can use Shoelace components
    const button = document.createElement('sl-button');
    button.textContent = 'Click me';
    block.appendChild(button);
  }
  