# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Created CLAUDE.md file with comprehensive guidance for Claude Code instances
  - Development commands (server, linting, testing)
  - Dual-directory architecture pattern explanation
  - Content-Driven Development (CDD) workflow
  - EDS block development patterns (5-step approach)
  - Content structure contract details
  - Three-phase page loading explanation
  - Auto-blocking concept
  - Jupyter notebook testing system
  - Code style guidelines (JavaScript, CSS, HTML)
  - Performance best practices
  - Accessibility standards
- Added agentsetup.sh script for multi-AI platform support
  - Creates GEMINI.md → CLAUDE.md symlink (Google Gemini compatibility)
  - Creates AGENTS.md → CLAUDE.md symlink (legacy compatibility)
  - Creates .agent/workflows → .claude/skills symlink (alternative AI assistants)
- Updated .gitignore to exclude AI setup symlinks (GEMINI.md, AGENTS.md, .agent/)
- Added Multi-AI Support documentation to README.md
  - Explains agentsetup.sh script functionality
  - Documents cross-platform AI assistant compatibility

### Changed
- Updated README.md to remove exaggeration statements
  - Removed words like "comprehensive", "revolutionary", "sophisticated", "perfect", "essential"
  - Changed to factual, professional language throughout
  - Maintained all informational content while improving tone
- Updated README.md with proper attribution for skills sources
  - Added links to Adobe's helix-website repository
  - Clarified skills from Adobe (6), Anthropic (8), and Custom (7)
- Removed duplicate Jupyter notebook information from README.md
  - Streamlined ipynb-viewer section from ~64 lines to 12 lines
  - Kept overview with links to detailed documentation
- Enhanced README.md with Multi-AI Support section
  - Documents symlink strategy for Google Gemini and other AI platforms
  - Explains legacy compatibility approach

### Removed
- Exaggerated language from README.md (approximately 45 instances)
- Duplicate ipynb/Jupyter content (~60 lines)
- AGENTS.md (content preserved in CLAUDE.md before deletion)
- test-markdown-verification.html (temporary test file)

## [1.0.0] - 2024-11-19

### Added
- Live reload server with automatic browser refresh on file changes
- Native testing framework (scripts/test-framework.js) - 115 lines
- Enhanced Jupyter integration with ipynb-helpers.js and overlay preview system
- Performance monitoring with instrumentation.js - 550 lines

### Changed
- Simplified architecture by removing custom markdown parser
- Expanded documentation from 27 files (5,000 lines) to 32 files (24,000+ lines)
- Enhanced cross-referencing and architectural patterns

## [0.9.0] - 2024-07-01

### Added
- Initial documentation framework (27 files, 5,000+ lines)
- Basic EDS block examples (accordion, cards, columns, counter, helloworld)
- ipynb-viewer block for interactive Jupyter notebook display
- Shoelace card component with glassmorphism design
- Development server (209 lines) with proxy fallback
- Build automation for complex components
- Custom utility scripts (5 scripts, 1,850 lines)
- Adobe EDS reference files (aem.js, scripts.js, delayed.js)

### Documentation
- EDS development guide (docs/for-ai/eds.md) - 1,937 lines
- Block architecture standards
- Testing and debugging guides
- Security checklist and guidelines
- Project management suite (PRD, tech stack, app flow)

### AI Integration
- 21+ skills from Adobe, Anthropic, and custom development
- 10 autonomous Claude agents
- 12 slash commands for common workflows
- Skill activation system with automatic context-aware triggers
- Cross-referenced documentation structure (48+ bidirectional links)

[Unreleased]: https://github.com/ddttom/webcomponents-with-eds/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ddttom/webcomponents-with-eds/compare/v0.9.0...v1.0.0
[0.9.0]: https://github.com/ddttom/webcomponents-with-eds/releases/tag/v0.9.0
