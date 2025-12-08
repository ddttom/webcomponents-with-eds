# Agents

Specialized agents for complex, multi-step tasks.

---

## For This Project (Adobe Edge Delivery Services)

This EDS project includes **6 universally applicable agents** optimized for vanilla JavaScript development.

### Recommended Agents for EDS Development

**Code Quality & Architecture:**
- **code-architecture-reviewer** - Review block implementations and architectural consistency
- **code-refactor-master** - Refactor blocks, scripts, and code organization
- **documentation-architect** - Document blocks, features, and development patterns

**Planning & Research:**
- **plan-reviewer** - Review implementation plans before starting work
- **refactor-planner** - Plan comprehensive code reorganization
- **web-research-specialist** - Research EDS patterns and best practices

### Removed Agents (Not Applicable to EDS)

The following agents were removed because they're designed for backend/full-stack projects:
- **auth-route-debugger** - JWT cookie authentication debugging (no auth in EDS)
- **auth-route-tester** - Authenticated endpoint testing (no backend APIs)
- **auto-error-resolver** - TypeScript compilation errors (EDS uses vanilla JS)
- **frontend-error-fixer** - React/TypeScript build errors (EDS uses vanilla JS)

**Why removed:** EDS is a static site architecture using vanilla JavaScript with no authentication system, no TypeScript, and no React/framework dependencies.

---

## What Are Agents?

Agents are autonomous Claude instances that handle specific complex tasks. Unlike skills (which provide inline guidance), agents:
- Run as separate sub-tasks
- Work autonomously with minimal supervision
- Have specialized tool access
- Return comprehensive reports when complete

**Key advantage:** Agents are **standalone** - just copy the `.md` file and use immediately!

---

## Available Agents (6)

### code-architecture-reviewer
**Purpose:** Review code for architectural consistency and best practices

**When to use:**
- After implementing a new feature
- Before merging significant changes
- When refactoring code
- To validate architectural decisions

**Integration:** ✅ Copy as-is

---

### code-refactor-master
**Purpose:** Plan and execute comprehensive refactoring

**When to use:**
- Reorganizing file structures
- Breaking down large components
- Updating import paths after moves
- Improving code maintainability

**Integration:** ✅ Copy as-is

---

### documentation-architect
**Purpose:** Create comprehensive documentation

**When to use:**
- Documenting new features
- Creating API documentation
- Writing developer guides
- Generating architectural overviews

**Integration:** ✅ Copy as-is

---

### frontend-error-fixer
**Purpose:** Debug and fix frontend errors

**When to use:**
- Browser console errors
- TypeScript compilation errors in frontend
- React errors
- Build failures

**Integration:** ⚠️ May reference screenshot paths - update if needed

---

### plan-reviewer
**Purpose:** Review development plans before implementation

**When to use:**
- Before starting complex features
- Validating architectural plans
- Identifying potential issues early
- Getting second opinion on approach

**Integration:** ✅ Copy as-is

---

### refactor-planner
**Purpose:** Create comprehensive refactoring strategies

**When to use:**
- Planning code reorganization
- Modernizing legacy code
- Breaking down large files
- Improving code structure

**Integration:** ✅ Copy as-is

---

### web-research-specialist
**Purpose:** Research technical issues online

**When to use:**
- Debugging obscure errors
- Finding solutions to problems
- Researching best practices
- Comparing implementation approaches

**Integration:** ✅ Copy as-is

---

## How to Use Agents

### In This Project

All agents in this project are ready to use immediately. Simply ask Claude:

```
Use the code-architecture-reviewer agent to review the carousel block
```

Or:

```
Use the web-research-specialist agent to find examples of accordion patterns in EDS
```

### Integration from Other Projects

If copying agents from other projects:

**Step 1: Copy the file**
```bash
cp source/.claude/agents/agent-name.md \\
   .claude/agents/
```

**Step 2: Verify compatibility**
- Check if agent requires TypeScript (EDS uses vanilla JS)
- Check if agent requires authentication (EDS has none)
- Check if agent is React/framework-specific (EDS is vanilla)

**Step 3: Use it**
Ask Claude: "Use the [agent-name] agent to [task]"

---

## When to Use Agents vs Skills

| Use Agents When... | Use Skills When... |
|-------------------|-------------------|
| Task requires multiple steps | Need inline guidance |
| Complex analysis needed | Checking best practices |
| Autonomous work preferred | Want to maintain control |
| Task has clear end goal | Ongoing development work |
| Example: "Review all controllers" | Example: "Creating a new route" |

**Both can work together:**
- Skill provides patterns during development
- Agent reviews the result when complete

---

## Agent Quick Reference

| Agent | Complexity | Use Case | Ready to Use |
|-------|-----------|----------|--------------|
| code-architecture-reviewer | Medium | Review block architecture | ✅ Yes |
| code-refactor-master | High | Refactor blocks and scripts | ✅ Yes |
| documentation-architect | Medium | Document features | ✅ Yes |
| plan-reviewer | Low | Review implementation plans | ✅ Yes |
| refactor-planner | Medium | Plan code reorganization | ✅ Yes |
| web-research-specialist | Low | Research EDS patterns | ✅ Yes |

---

## For Claude Code

**All agents in this EDS project are ready to use:**

1. **No configuration needed** - agents work immediately
2. **No TypeScript dependencies** - EDS uses vanilla JavaScript
3. **No authentication setup** - EDS is static site architecture
4. **Universal patterns** - all agents use project-agnostic approaches

**To use an agent:**
Simply respond to the user's request by invoking the appropriate agent with a clear task description.

---

## Creating Your Own Agents

Agents are markdown files with optional YAML frontmatter:

```markdown
# Agent Name

## Purpose
What this agent does

## Instructions
Step-by-step instructions for autonomous execution

## Tools Available
List of tools this agent can use

## Expected Output
What format to return results in
```

**Tips:**
- Be very specific in instructions
- Break complex tasks into numbered steps
- Specify exactly what to return
- Include examples of good output
- List available tools explicitly

---

## Troubleshooting

### Agent not found

**Check:**
```bash
# Is agent file present?
ls -la .claude/agents/[agent-name].md
```

### Agent fails with path errors

**Check for hardcoded paths:**
```bash
grep "~/\|/root/\|/Users/" .claude/agents/[agent-name].md
```

**Fix:**
```bash
sed -i 's|~/git/.*project|$CLAUDE_PROJECT_DIR|g' .claude/agents/[agent-name].md
```

---

## Next Steps

1. **Browse agents above** - Find ones useful for your work
2. **Copy what you need** - Just the .md file
3. **Ask Claude to use them** - "Use [agent] to [task]"
4. **Create your own** - Follow the pattern for your specific needs

**Questions?** See [CLAUDE_INTEGRATION_GUIDE.md](../../CLAUDE_INTEGRATION_GUIDE.md)
