# Claude Skills Gap Analysis
## What's Missing If docs/for-AI Is Removed

**Created**: 2025-11-05
**Purpose**: Analyze what needs to be added to `.claude/skills/` to make them self-contained if `docs/for-ai/` directory is removed.

---

## Executive Summary

Currently, the `.claude/skills/` directory contains **workflow orchestrators** that reference comprehensive documentation in `docs/for-ai/`. If the documentation directory were removed, the skills would need to be substantially expanded to include the knowledge they currently reference.

**Current State**:
- **Skills**: Lightweight process guides that orchestrate workflows
- **Documentation**: Comprehensive implementation knowledge and standards
- **Relationship**: Skills reference and depend on documentation

**Gap**: ~90% of implementation knowledge lives in docs, not in skills

---

## Current Skill Coverage

### Existing EDS Skills

| Skill | Lines | Purpose | Dependency on docs/for-ai |
|-------|-------|---------|---------------------------|
| **content-driven-development** | ~200 | Orchestrates CDD workflow | HIGH - References content modeling concepts |
| **content-modeling** | ~235 | Designs content models | MEDIUM - References canonical models (in resources/) |
| **building-blocks** | ~200 | Implements blocks | CRITICAL - References js-guidelines.md, css-guidelines.md |
| **testing-blocks** | Unknown | Tests blocks | CRITICAL - References testing standards |
| **block-collection-and-party** | Unknown | Finds reference blocks | LOW - Standalone |
| **docs-search** | Unknown | Searches aem.live docs | LOW - External reference |

### What Skills Currently Have

✅ **Process workflows** - Step-by-step instructions for tasks
✅ **Orchestration logic** - When to invoke other skills
✅ **Prerequisites and validation** - Checks before proceeding
✅ **Integration patterns** - How skills work together

### What Skills Currently DON'T Have, but are present in docs/for-ai

❌ **Implementation knowledge** - How to actually write EDS code
❌ **Architecture standards** - Pattern selection criteria and standards
❌ **Code examples** - Real implementation patterns
❌ **Testing standards** - Comprehensive testing approaches
❌ **Security guidelines** - Security best practices
❌ **Performance optimization** - Core Web Vitals optimization
❌ **EDS fundamentals** - How document→HTML transformation works

---

## Documentation Content Breakdown

### Core Knowledge (docs/for-ai/)

| Document | Lines | Content Type | Critical Knowledge |
|----------|-------|--------------|-------------------|
| **eds.md** | 1,937 | Foundational | Document transformation, table→div, core philosophy |
| **block-architecture-standards.md** | 1,982 | Implementation | Pattern selection, common standards, CSS, testing |
| **raw-eds-blocks-guide.md** | ~1,000 | Implementation | Simple block development patterns |
| **complex-eds-blocks-guide.md** | ~1,000 | Implementation | Build-enhanced development patterns |
| **build-component-template.md** | ~500 | Templates | Vite config, deployment automation |
| **design-philosophy-guide.md** | ~800 | Architecture | Decision frameworks, complexity assessment |
| **build-blocks-clarification.md** | ~500 | Architecture | Dual-directory pattern explanation |

### Guidelines (docs/for-ai/guidelines/)

| Document | Lines | Content Type | Critical Knowledge |
|----------|-------|--------------|-------------------|
| **frontend-guidelines.md** | ~800 | Standards | JS/CSS/Component patterns and best practices |
| **backend-structure.md** | ~600 | Architecture | Serverless functions, API design, caching |
| **security-checklist.md** | ~500 | Standards | Authentication, XSS, CSRF, vulnerability prevention |
| **tech-stack.md** | ~400 | Standards | Technology decisions and rationale |
| **app-flow.md** | ~600 | Architecture | User journeys, conditional paths, error handling |
| **prd.md** | ~400 | Planning | Product requirements and success metrics |
| **style-guide.md** | ~300 | Standards | CSS naming conventions (BEM-like) |

### Testing (docs/for-ai/testing/)

| Document | Lines | Content Type | Critical Knowledge |
|----------|-------|--------------|-------------------|
| **eds-native-testing-standards.md** | ~600 | Standards | Testing patterns, file structure, integration |
| **debug.md** | ~400 | Process | Debugging workflows, file replacement safety |
| **EDS-Architecture-and-Testing-Guide.md** | ~800 | Advanced | Performance instrumentation, debugging strategies |
| **instrumentation-how-it-works.md** | ~400 | Technical | Performance monitoring implementation |
| **investigation.md** | ~300 | Analysis | Performance testing environment analysis |

### Reference (docs/for-ai/)

| Document | Lines | Content Type | Critical Knowledge |
|----------|-------|--------------|-------------------|
| **eds-appendix.md** | ~1,000 | Reference | Comprehensive patterns and examples |
| **eds-webcomponents-review.md** | ~600 | Analysis | Architecture evaluation and best practices |
| **getting-started-guide.md** | ~300 | Navigation | Role-based learning paths |
| **document-relationship-mapping.md** | ~400 | Navigation | Cross-reference strategy |
| **navigation-flows.md** | ~200 | Navigation | User journey pathways |

**Total Documentation**: ~17,000 lines of implementation knowledge

---

## Gap Analysis by Skill

### 1. building-blocks Skill

**Current State**: 200 lines of workflow orchestration

**Missing Critical Content**:

#### From raw-eds-blocks-guide.md (~1,000 lines)
- ✅ **Complete EDS-native implementation patterns**
  - Vanilla JavaScript best practices
  - DOM manipulation patterns
  - Block decoration examples
  - FOUC elimination techniques
  - Performance optimization patterns

#### From complex-eds-blocks-guide.md (~1,000 lines)
- ✅ **Build-enhanced development patterns**
  - Vite configuration
  - External library integration (Shoelace, Chart.js)
  - CSS-in-JS patterns
  - Build process workflows
  - Deployment automation

#### From block-architecture-standards.md (~2,000 lines)
- ✅ **Pattern selection criteria**
  - When to use EDS-Native vs Build-Enhanced
  - Complexity assessment framework
  - Multi-component assembly patterns

- ✅ **Common standards**
  - Error handling patterns with examples
  - Accessibility standards (WCAG compliance)
  - Performance standards (Core Web Vitals)
  - Testing standards and checklists

- ✅ **CSS standards**
  - BEM-like scoped naming conventions
  - Performance CSS patterns
  - Responsive design patterns
  - Custom property usage

#### From frontend-guidelines.md (~800 lines)
- ✅ **Component structure patterns**
  - Modern JavaScript with ES modules
  - Async/await patterns
  - Event handling best practices
  - Cleanup functions

- ✅ **Code examples**
  - Real implementation patterns
  - Error handling examples
  - DOM manipulation examples

#### From resources/ (referenced but not included)
- ✅ **js-guidelines.md** - Detailed JavaScript standards
- ✅ **css-guidelines.md** - Detailed CSS standards
- ✅ **canonical-models.md** - Content model patterns
- ✅ **advanced-scenarios.md** - Complex implementation patterns

**Estimated Addition**: +5,000 lines to be self-contained

---

### 2. content-modeling Skill

**Current State**: 235 lines with references to resources/

**Missing Critical Content**:

#### Complete canonical models documentation
- ✅ **Standalone model** - Full patterns and examples
- ✅ **Collection model** - Full patterns and examples
- ✅ **Configuration model** - Full patterns and examples
- ✅ **Auto-blocked model** - Full patterns and examples

#### Advanced scenarios
- ✅ **Supporting multiple models for one block**
- ✅ **Progressive enhancement patterns**
- ✅ **Complex nesting strategies**
- ✅ **Migration patterns**

#### Integration with EDS concepts
- ✅ **Table→div transformation details**
- ✅ **Semantic formatting patterns**
- ✅ **Authoring tool compatibility**

**Estimated Addition**: +1,500 lines to be self-contained

---

### 3. testing-blocks Skill

**Current State**: Unknown (not fully reviewed)

**Missing Critical Content**:

#### From eds-native-testing-standards.md (~600 lines)
- ✅ **Testing framework patterns**
  - Unit testing for utilities
  - Browser testing with Playwright
  - Test file structure
  - EDS integration testing

- ✅ **Accessibility testing**
  - Keyboard navigation validation
  - Screen reader testing
  - ARIA attribute verification

- ✅ **Performance testing**
  - Core Web Vitals validation
  - Loading performance
  - Runtime performance

#### From debug.md (~400 lines)
- ✅ **Debugging workflows**
  - File replacement procedures
  - Safety protocols
  - Error troubleshooting
  - Common issues and solutions

#### From EDS-Architecture-and-Testing-Guide.md (~800 lines)
- ✅ **Advanced debugging strategies**
  - Performance instrumentation
  - File replacement workflows
  - Core file modification protocols

#### From instrumentation-how-it-works.md (~400 lines)
- ✅ **Performance monitoring**
  - Function call tracking
  - Execution timing
  - Memory usage analysis

**Estimated Addition**: +2,200 lines to be self-contained

---

### 4. content-driven-development Skill

**Current State**: ~200 lines of workflow orchestration

**Missing Critical Content**:

#### From eds.md (1,937 lines)
- ✅ **EDS fundamentals**
  - Document transformation journey
  - How tables become divs
  - Server-side processing
  - Markdown conversion
  - Content-first philosophy

#### From design-philosophy-guide.md (~800 lines)
- ✅ **Decision frameworks**
  - Balancing simplicity vs sophistication
  - Component complexity assessment
  - Architecture decision criteria

#### From app-flow.md (~600 lines)
- ✅ **Application workflows**
  - User journeys
  - Conditional paths
  - Error handling flows
  - Content authoring workflows

**Estimated Addition**: +3,300 lines to be self-contained

---

## New Skills Needed

If docs/for-ai/ is removed, these new skills should be created:

### 1. eds-fundamentals Skill

**Purpose**: Provide foundational EDS knowledge

**Content Source**: eds.md (1,937 lines) + eds-appendix.md (1,000 lines)

**Should Include**:
- Complete document transformation journey
- Table→div transformation details
- Server-side processing explanation
- Content-first philosophy
- Development requirements and constraints
- Block decoration lifecycle
- Performance optimization fundamentals

**Estimated Size**: ~3,000 lines

---

### 2. architecture-standards Skill

**Purpose**: Provide comprehensive architecture guidance

**Content Source**: block-architecture-standards.md (1,982 lines) + design-philosophy-guide.md (800 lines)

**Should Include**:
- Pattern selection criteria (EDS-Native vs Build-Enhanced)
- Common standards (error handling, accessibility, performance)
- CSS architecture and standards
- JavaScript architecture patterns
- Testing standards and checklists
- Quality assurance processes
- Decision frameworks

**Estimated Size**: ~3,000 lines

---

### 3. security-and-guidelines Skill

**Purpose**: Provide security and code standards

**Content Source**: security-checklist.md (500 lines) + frontend-guidelines.md (800 lines) + backend-structure.md (600 lines)

**Should Include**:
- Comprehensive security checklist
- Frontend development guidelines
- Backend architecture standards
- API design patterns
- Authentication and authorization
- XSS/CSRF prevention
- Dependency security

**Estimated Size**: ~2,000 lines

---

### 4. implementation-patterns Skill

**Purpose**: Provide detailed implementation patterns and examples

**Content Source**: raw-eds-blocks-guide.md (1,000 lines) + complex-eds-blocks-guide.md (1,000 lines) + build-component-template.md (500 lines)

**Should Include**:
- Complete simple block implementation patterns
- Complete complex block implementation patterns
- Build configuration templates
- Deployment automation
- Real code examples
- Common patterns and anti-patterns

**Estimated Size**: ~2,500 lines

---

### 5. debugging-and-performance Skill

**Purpose**: Provide debugging and performance optimization guidance

**Content Source**: debug.md (400 lines) + EDS-Architecture-and-Testing-Guide.md (800 lines) + instrumentation-how-it-works.md (400 lines)

**Should Include**:
- Debugging workflows and procedures
- Performance instrumentation
- Core Web Vitals optimization
- File replacement safety protocols
- Performance monitoring techniques
- Common debugging scenarios

**Estimated Size**: ~1,600 lines

---

## Summary: What Needs to Be Added

### Option 1: Expand Existing Skills

| Skill | Current | Needs Adding | Total |
|-------|---------|--------------|-------|
| building-blocks | ~200 | +5,000 | ~5,200 |
| content-modeling | ~235 | +1,500 | ~1,735 |
| testing-blocks | ~300 | +2,200 | ~2,500 |
| content-driven-development | ~200 | +3,300 | ~3,500 |

**Total**: Expand 4 skills by ~12,000 lines

### Option 2: Create New Comprehensive Skills

| New Skill | Content | Lines |
|-----------|---------|-------|
| eds-fundamentals | Core EDS knowledge | ~3,000 |
| architecture-standards | Patterns and standards | ~3,000 |
| security-and-guidelines | Security and code standards | ~2,000 |
| implementation-patterns | Detailed implementation | ~2,500 |
| debugging-and-performance | Debug and optimize | ~1,600 |

**Total**: Create 5 new skills with ~12,100 lines

### Option 3: Hybrid Approach (Recommended)

**Keep Current Skills** for workflow orchestration:
- content-driven-development (orchestrator)
- content-modeling (lightweight)
- building-blocks (orchestrator)
- testing-blocks (orchestrator)

**Add New Knowledge Skills**:
1. **eds-fundamentals** (~3,000 lines)
   - Core concepts, transformation, philosophy
   - Auto-invoked by CDD skill when explaining EDS concepts

2. **architecture-guide** (~3,000 lines)
   - Pattern selection, standards, decision frameworks
   - Invoked when making architecture decisions

3. **implementation-reference** (~2,500 lines)
   - Complete code patterns and examples
   - Invoked by building-blocks during implementation

4. **testing-reference** (~2,000 lines)
   - Complete testing standards and patterns
   - Invoked by testing-blocks during testing

5. **security-guide** (~1,500 lines)
   - Security checklist and guidelines
   - Invoked via /check-security command

**Benefits**:
- Maintains workflow orchestration in existing skills
- Adds comprehensive knowledge in focused reference skills
- Allows both to evolve independently
- Better aligns with skill invocation patterns

**Total**: Keep 4 orchestrators (~800 lines) + Add 5 reference skills (~12,000 lines)

---

## Resource Files Missing from Skills

Several skills reference `resources/` subdirectories that don't exist in the repository:

### building-blocks Skill References:
- ❌ `resources/js-guidelines.md` - Detailed JavaScript standards
- ❌ `resources/css-guidelines.md` - Detailed CSS standards

These resources exist WITHIN the skill directory but contain critical implementation knowledge.

### content-modeling Skill References:
- ❌ `resources/canonical-models.md` - The 4 canonical model types
- ❌ `resources/advanced-scenarios.md` - Complex patterns

**Solution**: Either:
1. Create these resource files with content from docs/for-ai/
2. Embed this content directly into skill SKILL.md files
3. Reference the new knowledge skills instead

---

## Recommendations

### Immediate Actions (If Removing docs/for-AI)

1. **Create 5 new reference skills** using Option 3 (Hybrid Approach):
   - eds-fundamentals
   - architecture-guide
   - implementation-reference
   - testing-reference
   - security-guide

2. **Populate resource files** in existing skills:
   - building-blocks/resources/js-guidelines.md
   - building-blocks/resources/css-guidelines.md
   - content-modeling/resources/canonical-models.md
   - content-modeling/resources/advanced-scenarios.md

3. **Update skill invocation patterns**:
   - CDD skill invokes eds-fundamentals when needed
   - building-blocks invokes implementation-reference
   - testing-blocks invokes testing-reference
   - Commands invoke appropriate reference skills

4. **Add cross-references**:
   - Each orchestrator skill references appropriate knowledge skills
   - Knowledge skills reference each other for comprehensive coverage

### Long-term Considerations

**If Keeping docs/for-AI** (Recommended):
- Current setup works well
- Skills orchestrate workflows
- Documentation provides comprehensive knowledge
- Slash commands bridge the gap
- AI can reference either as needed

**If Removing docs/for-AI**:
- Requires ~12,000 lines of skill content
- More maintenance overhead (knowledge in two places)
- Skills become heavyweight
- Harder to navigate and update
- Consider keeping docs and using skills as orchestrators

---

## Conclusion

The `.claude/skills/` directory is currently designed as a **workflow orchestration layer** that references comprehensive documentation in `docs/for-ai/`. This is actually a **good architectural pattern**:

**Benefits of Current Approach**:
- ✅ Separation of concerns (process vs knowledge)
- ✅ Documentation serves both humans and AI
- ✅ Easier to maintain and update
- ✅ Skills remain focused and lightweight
- ✅ Knowledge is consolidated in one place

**To Make Skills Self-Contained**:
- Would require ~12,000 additional lines across 5 new skills
- Duplicates knowledge from docs/for-ai/
- Increases maintenance burden
- Makes skills harder to navigate

**Recommendation**: **Keep both** docs/for-ai/ and .claude/skills/:
- docs/for-ai/ = Comprehensive knowledge base
- .claude/skills/ = Workflow orchestrators
- .claude/commands/ = Quick access via slash commands
- All three work together for optimal AI-assisted development

The current architecture is sound. The addition of slash commands (completed earlier) bridges the gap and makes the system more accessible without requiring massive duplication of content.
