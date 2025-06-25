import {
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
} from './aem-instrumented.js';

import { instrumentation } from './instrumentation.js';

// Original function implementations
function buildHeroBlockOriginal(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

async function loadFontsOriginal() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch {
    // do nothing
  }
}

function buildAutoBlocksOriginal(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

function decorateMainOriginal(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

async function loadEagerOriginal(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch {
    // do nothing
  }
}

async function loadLazyOriginal(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

function loadDelayedOriginal() {
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPageOriginal() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

// Create instrumented versions of all functions
const buildHeroBlock = instrumentation.instrumentFunction(buildHeroBlockOriginal, 'buildHeroBlock', 'scripts');
const loadFonts = instrumentation.instrumentFunction(loadFontsOriginal, 'loadFonts', 'scripts');
const buildAutoBlocks = instrumentation.instrumentFunction(buildAutoBlocksOriginal, 'buildAutoBlocks', 'scripts');
const decorateMain = instrumentation.instrumentFunction(decorateMainOriginal, 'decorateMain', 'scripts');
const loadEager = instrumentation.instrumentFunction(loadEagerOriginal, 'loadEager', 'scripts');
const loadLazy = instrumentation.instrumentFunction(loadLazyOriginal, 'loadLazy', 'scripts');
const loadDelayed = instrumentation.instrumentFunction(loadDelayedOriginal, 'loadDelayed', 'scripts');
const loadPage = instrumentation.instrumentFunction(loadPageOriginal, 'loadPage', 'scripts');

// Start the page loading process
loadPage();

// Export the decorateMain function for external use
export { decorateMain };
