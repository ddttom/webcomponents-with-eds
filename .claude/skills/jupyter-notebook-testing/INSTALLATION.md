# Jupyter Notebook Testing Installation

Complete installation and setup guide for testing EDS blocks with Jupyter notebooks.

## Prerequisites

- Node.js 18+ or 20+ (LTS recommended)
- Python 3.8+
- npm or yarn package manager
- VS Code (optional but recommended)

## One-Time Setup

### Step 1: Install jsdom

Required for virtual DOM in notebooks:

```bash
# Install as project dependency
npm install jsdom

# Verify installation
npm list jsdom
```

### Step 2: Install Jupyter

Choose one method:

**Using pip:**
```bash
pip3 install jupyter

# Verify
jupyter --version
```

**Using conda:**
```bash
conda install jupyter

# Verify
jupyter --version
```

**Using Homebrew (macOS):**
```bash
brew install jupyter

# Verify
jupyter --version
```

### Step 3: Install TSLab

TSLab provides the JavaScript kernel for Jupyter:

```bash
# Install globally
npm install -g tslab

# If permission issues, use npx
npx tslab install --python=python3

# Or install locally (preferred)
npm install --save-dev tslab
npx tslab install --python=python3
```

### Step 4: Register TSLab with Jupyter

```bash
# Register the kernel
tslab install --python=python3

# Verify registration
jupyter kernelspec list
```

**Expected output:**
```
Available kernels:
  jslab      /Users/you/.local/share/jupyter/kernels/jslab
  python3    /Users/you/.local/share/jupyter/kernels/python3
```

### Step 5: Install VS Code Jupyter Extension

**In VS Code:**
1. Open Extensions (Cmd+Shift+X / Ctrl+Shift+X)
2. Search for "Jupyter"
3. Install "Jupyter" by Microsoft

**Or via command line:**
```bash
code --install-extension ms-toolsai.jupyter
```

### Step 6: Restart VS Code

```bash
# Command Palette → "Developer: Reload Window"
# Or restart VS Code completely
```

## Verify Installation

### Test 1: Check Node.js

```bash
node -v
# Should output: v18.x.x or v20.x.x
```

### Test 2: Check Python

```bash
python3 --version
# Should output: Python 3.8.x or higher
```

### Test 3: Check Jupyter

```bash
jupyter --version
# Should output version information
```

### Test 4: Check TSLab

```bash
jupyter kernelspec list
# Should show jslab in the list
```

### Test 5: Check jsdom

```bash
npm list jsdom
# Should show jsdom installed
```

### Test 6: Create Test Notebook

In VS Code:
1. Command Palette → "Jupyter: Create New Blank Notebook"
2. Select "jslab" kernel
3. Add cell: `console.log('Hello from Jupyter!')`
4. Run cell (Shift+Enter)
5. Should output: `Hello from Jupyter!`

## Project Directory Structure

Create recommended structure:

```bash
# Create testing directory
mkdir -p ipynb-tests

# Verify project structure
tree -L 2 -I node_modules

# Expected:
# .
# ├── blocks/
# │   ├── accordion/
# │   └── ...
# ├── styles/
# │   ├── styles.css
# │   ├── fonts.css
# │   └── lazy-styles.css
# ├── ipynb-tests/         # Generated previews
# ├── test.ipynb           # Main test notebook
# ├── package.json
# └── node_modules/
```

## Environment Configuration

### package.json

Add jsdom dependency:

```json
{
  "dependencies": {
    "jsdom": "^23.0.0"
  },
  "devDependencies": {
    "tslab": "^1.0.24"
  }
}
```

### .gitignore

Add notebook outputs to `.gitignore`:

```gitignore
# Jupyter
.ipynb_checkpoints/
ipynb-tests/

# Keep test notebook but ignore outputs
test.ipynb
!test.ipynb  # Optional: commit the notebook structure
```

## VS Code Configuration

### Settings for Jupyter

Add to `.vscode/settings.json`:

```json
{
  "jupyter.widgetScriptSources": ["jsdelivr.com", "unpkg.com"],
  "jupyter.interactiveWindow.textEditor.executeSelection": true,
  "files.associations": {
    "*.ipynb": "jupyter-notebook"
  }
}
```

## Troubleshooting Installation

### Permission Errors

**Problem:** `EACCES` errors during global install.

**Solution:**
```bash
# Option 1: Use npx (no global install)
npx tslab install --python=python3

# Option 2: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH

# Add to ~/.bashrc or ~/.zshrc
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
```

### Python Not Found

**Problem:** `python3: command not found`

**Solution:**
```bash
# macOS
brew install python3

# Ubuntu/Debian
sudo apt-get install python3 python3-pip

# Verify
which python3
python3 --version
```

### Kernel Not Available

**Problem:** "jslab" kernel not showing in VS Code.

**Solution:**
1. Verify registration: `jupyter kernelspec list`
2. Restart VS Code completely (not just reload)
3. Check kernel location: `jupyter --paths`
4. Reinstall kernel: `tslab install --python=python3 --force`

### Module Import Errors

**Problem:** `Cannot find module 'jsdom'` in notebook.

**Solution:**
```bash
# Verify VS Code opened from project root
pwd

# Install jsdom if missing
npm install jsdom

# Check it's in package.json
cat package.json | grep jsdom
```

## Platform-Specific Notes

### macOS

```bash
# Install with Homebrew
brew install node python3 jupyter

# Install TSLab
npm install -g tslab
tslab install --python=python3

# No additional configuration needed
```

### Windows

```bash
# Use Node.js installer from nodejs.org
# Use Python installer from python.org

# Install Jupyter with pip
pip install jupyter

# Install TSLab
npm install -g tslab
tslab install --python=python3

# Use Git Bash or PowerShell
```

**Windows tips:**
- Use forward slashes in paths: `./blocks/accordion`
- Run VS Code as administrator if permission issues
- Use `python` instead of `python3` if that's your command

### Linux

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install nodejs npm python3 python3-pip

# Install Jupyter
pip3 install jupyter

# Install TSLab
sudo npm install -g tslab
tslab install --python=python3
```

## Updating Dependencies

### Update TSLab

```bash
npm update -g tslab
tslab install --python=python3 --force
```

### Update Jupyter

```bash
pip3 install --upgrade jupyter
```

### Update jsdom

```bash
npm update jsdom
```

## Uninstalling

### Remove TSLab Kernel

```bash
# Unregister kernel
jupyter kernelspec uninstall jslab

# Uninstall package
npm uninstall -g tslab
```

### Remove Jupyter

```bash
pip3 uninstall jupyter
```

### Clean Project

```bash
# Remove generated files
rm -rf ipynb-tests/
rm -rf .ipynb_checkpoints/

# Remove dependencies
rm -rf node_modules/
```

## Alternative: Docker Setup

For isolated environment:

```dockerfile
FROM node:20-alpine

RUN apk add --no-cache python3 py3-pip

RUN pip3 install jupyter
RUN npm install -g tslab
RUN tslab install --python=python3

WORKDIR /workspace

CMD ["jupyter", "notebook", "--ip=0.0.0.0", "--allow-root"]
```

```bash
# Build and run
docker build -t jupyter-eds .
docker run -p 8888:8888 -v $(pwd):/workspace jupyter-eds
```

## Next Steps

After installation:

1. ✅ Create first notebook: See main SKILL.md
2. ✅ Copy setup cell from template
3. ✅ Test with simple block
4. ✅ Generate HTML preview
5. ✅ Start developing!

## Getting Help

- TSLab docs: https://github.com/yunabe/tslab
- Jupyter docs: https://jupyter.org/documentation
- jsdom docs: https://github.com/jsdom/jsdom
- Node.js docs: https://nodejs.org/docs
