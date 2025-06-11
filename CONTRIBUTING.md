# Contributing to Web Components with Adobe Edge Delivery Services

Thank you for your interest in contributing to this project! We welcome contributions that align with our core principles of simplicity, performance, and modern web standards.

## 🎯 Project Philosophy

This project intentionally maintains simplicity and performance through:

- **No TypeScript**: We use modern JavaScript with ES modules for clarity and reduced build complexity
- **No Preprocessors**: Pure CSS and vanilla JavaScript only
- **Framework-free**: Vanilla JavaScript with modern web APIs
- **Performance-first**: Every change should maintain or improve performance
- **Security-focused**: Proper application hardening without heavy dependencies

## 🚀 Getting Started

### Prerequisites

- Node.js (for linting and development tools)
- Modern browser for testing
- Basic understanding of Adobe Edge Delivery Services
- Familiarity with ES6+ JavaScript features

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/ddttom/webcomponents-with-eds.git
   cd webcomponents-with-eds
   ```

3. Install development dependencies:
   ```bash
   npm install
   ```

4. Run linting to ensure code quality:
   ```bash
   npm run lint
   ```

## 📝 Development Guidelines

### Code Style

#### JavaScript
- Use ES modules (`import`/`export`)
- Follow modern JavaScript practices (ES6+)
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Prefer `const` over `let`, avoid `var`
- Use template literals for string interpolation

```javascript
/**
 * Fetches slide data from the query index endpoint
 * @param {string} endpoint - The API endpoint URL
 * @returns {Promise<Object>} The slide data
 */
export async function fetchSlideData(endpoint) {
  const response = await fetch(endpoint);
  return response.json();
}
```

#### CSS
- Use modern CSS features (Grid, Flexbox, Custom Properties)
- Follow mobile-first responsive design
- Use semantic class names
- Avoid deep nesting (max 3 levels)
- Group related properties together

```css
.slide-builder {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.slide-builder__item {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
}
```

#### HTML
- Use semantic HTML elements
- Ensure accessibility with proper ARIA attributes
- Follow progressive enhancement principles
- Keep markup clean and minimal

### File Organization

```
blocks/
└── component-name/
    ├── component-name.js    # Main logic
    ├── component-name.css   # Styles
    └── README.md           # Documentation
```

### Performance Requirements

All contributions must maintain performance standards:

- **Lazy Loading**: Images and content should load on-demand
- **Minimal DOM Manipulation**: Batch updates and avoid layout thrashing
- **Efficient Event Handling**: Use event delegation where appropriate
- **Progressive Enhancement**: Core functionality works without JavaScript

### Testing

- Test across modern browsers (Chrome, Firefox, Safari, Edge)
- Verify mobile responsiveness
- Check accessibility with screen readers
- Validate performance with Lighthouse
- Test with slow network conditions

## 🔍 Code Review Process

### Before Submitting

1. **Lint your code**: `npm run lint`
2. **Test thoroughly**: Verify functionality across devices
3. **Document changes**: Update README files if needed
4. **Check performance**: Ensure no regressions
5. **Validate accessibility**: Test with keyboard navigation

### Pull Request Guidelines

1. **Clear Title**: Describe what the PR accomplishes
2. **Detailed Description**: Explain the changes and reasoning
3. **Link Issues**: Reference related issues or discussions
4. **Screenshots**: Include visual changes if applicable
5. **Testing Notes**: Describe how you tested the changes

#### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Performance improvement
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Tested on desktop browsers
- [ ] Tested on mobile devices
- [ ] Verified accessibility
- [ ] Checked performance impact

## Screenshots
(If applicable)
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear Title**: Summarize the issue
2. **Steps to Reproduce**: Detailed reproduction steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, device, screen size
6. **Screenshots**: Visual evidence if applicable

## 💡 Feature Requests

For new features:

1. **Use Case**: Explain the problem you're solving
2. **Proposed Solution**: Describe your suggested approach
3. **Alternatives**: Consider other possible solutions
4. **Impact**: How does this align with project goals?

## 📚 Documentation

- Update README files for new components
- Include JSDoc comments for public APIs
- Add inline comments for complex logic
- Update this CONTRIBUTING guide if processes change

## 🔒 Security

- Follow secure coding practices
- Validate all user inputs
- Use Content Security Policy headers
- Report security issues privately (see SECURITY.md)

## 📋 Commit Guidelines

Use conventional commit format:

```
type(scope): description

feat(slide-builder): add lazy loading for images
fix(css): resolve mobile layout issue
docs(readme): update installation instructions
perf(core): optimize DOM queries
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Testing changes

## 🤝 Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)

## ❓ Questions?

- Open a GitHub Discussion for general questions
- Create an issue for bug reports or feature requests
- Check existing documentation first

## 🎉 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Project documentation

Thank you for helping make this project better! 🚀
