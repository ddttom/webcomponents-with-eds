# Claude Code Configuration for AllAboutV2

This directory contains Claude Code configuration, custom skills, and slash commands tailored for Adobe Edge Delivery Services (EDS) development.

## Directory Structure

```
.claude/
├── README.md                    # This file
├── commands/                    # Slash commands for common workflows
│   ├── new-block.md            # Create new EDS block with CDD
│   ├── start-cdd.md            # Start Content Driven Development
│   ├── test-block.md           # Test a specific block
│   ├── deploy-block.md         # Deploy build/ block to blocks/
│   ├── find-block-content.md   # Find pages using a block
│   ├── lint-all.md             # Run all linting checks
│   ├── check-block.md          # Architecture review of a block
│   ├── check-security.md       # Security validation
│   ├── review-docs.md          # Navigate EDS documentation
│   └── jupyter-notebook.md     # Create/edit Jupyter notebooks for testing
└── skills/                      # Extended capabilities
    ├── building-blocks/         # Create/modify EDS blocks
    ├── content-driven-development/  # CDD process orchestration
    ├── content-modeling/        # Design author-friendly content models
    ├── testing-blocks/          # Comprehensive block testing
    ├── jupyter-notebook-testing.md  # Interactive testing with Jupyter
    ├── block-collection-and-party/  # Find reference implementations
    ├── docs-search/             # Search aem.live documentation
    └── [other general skills]   # Canvas design, artifacts, etc.
```

## Quick Start

### For EDS Block Development

The recommended workflow follows Content Driven Development (CDD):

1. **Start a new block**:
   ```
   /new-block my-component
   ```
   This invokes the CDD process which guides you through content modeling, test content creation, and implementation.

2. **Or manually start CDD**:
   ```
   /start-cdd
   ```

3. **Test your block**:
   ```
   /test-block my-component
   ```

4. **Deploy to production** (for build-enhanced blocks):
   ```
   /deploy-block my-component
   ```

### For Interactive Testing

- **Create Jupyter notebook**: `/jupyter-notebook`
- **Test blocks interactively** with instant feedback in VS Code
- Generate styled HTML previews with live CSS reload

### For Code Quality

- **Lint all code**: `/lint-all`
- **Review block architecture**: `/check-block my-component`
- **Security audit**: `/check-security`

### For Learning & Navigation

- **Explore documentation**: `/review-docs`
- Then ask Claude to use the `docs-search` skill for specific topics

## Skills Overview

### EDS-Specific Skills

**Primary Workflow Skills** (invoke in this order):

1. **content-driven-development**
   - Orchestrates the entire development process
   - Ensures content exists before coding begins
   - Auto-invokes other skills at appropriate times
   - **When**: Starting any new block or major modification

2. **content-modeling**
   - Designs author-friendly content models
   - Auto-invoked by CDD skill when needed
   - **When**: Creating new blocks or changing content structure

3. **building-blocks**
   - Implements the actual block code (JS, CSS)
   - Auto-invoked by CDD skill during implementation phase
   - **When**: Only after content model is defined

4. **testing-blocks**
   - Comprehensive testing (unit, browser, linting, performance)
   - Auto-invoked by CDD skill after implementation
   - Can also be invoked manually for existing blocks
   - **When**: After implementation or for validation

**Support Skills**:

- **block-collection-and-party**: Find similar blocks for reference
- **docs-search**: Search official aem.live documentation
- **jupyter-notebook-testing**: Interactive testing with Jupyter notebooks

### General Skills

These skills are available but not EDS-specific:

- **artifacts-builder**: Create complex HTML artifacts with React/Tailwind
- **canvas-design**: Create visual designs and posters
- **algorithmic-art**: Generate p5.js algorithmic art
- **slack-gif-creator**: Create animated GIFs for Slack
- **theme-factory**: Apply themes to artifacts
- **webapp-testing**: Test local web applications with Playwright
- **skill-creator**: Create new custom skills
- **mcp-builder**: Build Model Context Protocol servers
- **internal-comms**: Write internal communications
- **brand-guidelines**: Apply Anthropic branding

## Slash Commands Reference

| Command | Purpose | Example |
|---------|---------|---------|
| `/new-block` | Create a new EDS block following Content Driven Development process | `/new-block hero` |
| `/start-cdd` | Start Content Driven Development process for creating or modifying blocks | `/start-cdd` |
| `/test-block` | Run tests for a specific EDS block | `/test-block hero` |
| `/deploy-block` | Deploy a block from build/ directory to blocks/ directory | `/deploy-block hero` |
| `/find-block-content` | Find pages in the site that use a specific block | `/find-block-content hero` |
| `/lint-all` | Run all linting checks (JavaScript and CSS) across the project | `/lint-all` |
| `/check-block` | Analyze a block and provide architecture review and improvement suggestions | `/check-block hero` |
| `/check-security` | Run security checklist validation based on EDS security guidelines | `/check-security` |
| `/review-docs` | Review and understand the EDS documentation structure in docs/for-AI | `/review-docs` |
| `/jupyter-notebook` | Create or edit Jupyter notebooks for testing EDS blocks interactively | `/jupyter-notebook` |

## Documentation

### Primary Documentation Location

**`docs/for-ai/`** - Comprehensive EDS development documentation (26 files)

Key documents:
- **index.md** - Complete navigation guide
- **getting-started-guide.md** - Role-based learning paths
- **eds.md** - Core EDS concepts (1,937 lines)
- **implementation/** - Block development guides
- **testing/** - Testing and debugging standards
- **guidelines/** - Project standards and architecture

### Quick Reference

See `docs/for-ai/index.md` for the complete documentation map, or use `/review-docs` to get oriented.

## Development Workflow

### EDS-Native Pattern (Simple Blocks)

For simple components (text blocks, banners, cards):

```
blocks/
└── my-block/
    ├── my-block.js      # Vanilla JavaScript
    ├── my-block.css     # Pure CSS
    ├── README.md        # Documentation
    └── test.html        # Test file
```

**Workflow**:
1. `/new-block my-block` → Creates structure
2. Edit files directly in blocks/
3. `/test-block my-block` → Validate
4. Commit and push

### Build-Enhanced Pattern (Complex Blocks)

For complex components (with external libraries like Shoelace, Chart.js):

```
build/my-block/          # Development
├── my-block.js          # Source with imports
├── my-block.css         # Full CSS
├── package.json         # Dependencies
├── vite.config.js       # Bundler config
└── dist/                # Build output

blocks/my-block/         # Deployment
├── my-block.js          # Bundled (from build)
├── my-block.css         # Stub file
└── README.md            # Documentation
```

**Workflow**:
1. `/new-block my-block` → Creates structure in build/
2. Develop in build/my-block/
3. `/test-block my-block` → Validate
4. `/deploy-block my-block` → Copy to blocks/
5. Commit and push

## Best Practices

### Content Driven Development (CDD)

**ALWAYS follow CDD when creating or modifying blocks:**

1. ✅ Content model first
2. ✅ Test content created before coding
3. ✅ Code against real content
4. ✅ Test with real content

**NEVER**:
- ❌ Start coding without test content
- ❌ Skip the content modeling phase
- ❌ Use placeholder/dummy data for development

### Code Quality

- **Linting**: Run `/lint-all` before committing
- **Testing**: Run `/test-block` after changes
- **Security**: Run `/check-security` periodically
- **Review**: Use `/check-block` for architecture validation

### Architecture

- **Simple blocks**: Use EDS-Native pattern (vanilla JS, no build)
- **Complex blocks**: Use Build-Enhanced pattern (with build process)
- **Decision guidance**: See `docs/for-ai/implementation/design-philosophy-guide.md`

## Integration with CLAUDE.md

This `.claude/` directory extends the guidance in `CLAUDE.md`:

- **CLAUDE.md**: Project-level conventions (code style, naming, architecture)
- **.claude/**: Claude Code-specific tools (skills, commands, workflows)
- **docs/for-ai/**: Comprehensive EDS development documentation

All three should be used together for effective AI-assisted development.

## Customization

### Adding New Commands

Create a new `.md` file in `.claude/commands/`:

```markdown
---
description: Short description of what this command does
---

Detailed instructions for Claude to follow when this command is invoked.
```

### Creating New Skills

Use the `skill-creator` skill:
```
@skill-creator
```

Then follow the prompts to create a custom skill for your specific needs.

## Support

- **Issues**: Report issues at https://github.com/anthropics/claude-code/issues
- **Documentation**: See `docs/for-ai/index.md` for complete EDS documentation
- **Help**: Type `/help` for Claude Code help

---

*This configuration is optimized for Adobe Edge Delivery Services (AEM EDS) development following Content Driven Development principles.*
