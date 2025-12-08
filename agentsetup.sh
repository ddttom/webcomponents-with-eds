#!/bin/bash

# agentsetup.sh
# Recreates symlinks for multi-AI environment setup

# 1. Symlink GEMINI.md to CLAUDE.md (Google Gemini compatibility)
if [ ! -L "GEMINI.md" ]; then
    echo "Creating symlink: GEMINI.md -> CLAUDE.md"
    ln -s CLAUDE.md GEMINI.md
else
    echo "Symlink GEMINI.md already exists."
fi

# 2. Symlink AGENTS.md to CLAUDE.md (legacy compatibility)
if [ ! -L "AGENTS.md" ]; then
    echo "Creating symlink: AGENTS.md -> CLAUDE.md"
    ln -s CLAUDE.md AGENTS.md
else
    echo "Symlink AGENTS.md already exists."
fi

# 3. Setup .agents/workflows symlink
# Ensure .agent directory exists
if [ ! -d ".agents" ]; then
    echo "Creating directory: .agents"
    mkdir -p .agents
fi

# Create symlink if it doesn't exist
if [ ! -L ".agents/workflows" ]; then
    echo "Creating symlink: .agents/workflows -> ../.claude/skills"
    # Note: Using relative path for symlink within .agent directory
    ln -s ../.claude/skills .agents/workflows
else
    echo "Symlink .agents/workflows already exists."
fi

echo "Agent setup complete."
