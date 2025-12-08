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

# 3. Setup .agent/workflows symlink
# Ensure .agent directory exists
if [ ! -d ".agent" ]; then
    echo "Creating directory: .agent"
    mkdir -p .agent
fi

# Create symlink if it doesn't exist
if [ ! -L ".agent/workflows" ]; then
    echo "Creating symlink: .agent/workflows -> ../.claude/skills"
    # Note: Using relative path for symlink within .agent directory
    ln -s ../.claude/skills .agent/workflows
else
    echo "Symlink .agent/workflows already exists."
fi

echo "Agent setup complete."
