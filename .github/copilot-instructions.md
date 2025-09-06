# ClearConnectionsContracting Repository

**ALWAYS follow these instructions first and fallback to additional search and context gathering ONLY if the information in these instructions is incomplete or found to be in error.**

## Repository Status

This repository is currently in an **early development stage** with minimal content. The repository contains only basic files and no established build system, dependencies, or application code yet.

## Working Effectively

### Repository Structure
- **Repository root**: `/home/runner/work/ClearConnectionsContracting/ClearConnectionsContracting`
- **Current contents**: 
  - `test.md` - A simple text file containing "test"
  - `.github/` - GitHub configuration directory (contains this instructions file)
  - `.git/` - Git version control directory

### Basic Operations
- **Clone and navigate to repository**:
  ```bash
  cd /home/runner/work/ClearConnectionsContracting/ClearConnectionsContracting
  ```

- **Check repository status**:
  ```bash
  git status
  ```

- **List repository contents**:
  ```bash
  ls -la
  ```

- **View current file contents**:
  ```bash
  cat test.md
  ```

### Current Capabilities and Limitations

**What WORKS**:
- Basic Git operations (status, commit, push, pull)
- File creation, editing, and management
- Directory navigation and file listing
- Text file operations

**What does NOT work yet**:
- No build system configured (no package.json, Makefile, etc.)
- No testing framework established
- No application code to run or test
- No dependencies to install
- No specific technology stack established

### Validation Steps

**ALWAYS perform these validation steps after making changes**:

1. **Verify Git status**:
   ```bash
   git status
   ```
   
2. **Check file integrity**:
   ```bash
   ls -la && file test.md
   ```

3. **Validate any new files created**:
   ```bash
   cat [filename] # for text files
   ls -la [directory] # for directories
   ```

## Development Guidelines

### When Adding New Code or Infrastructure

**Before adding build systems or dependencies**:
- Determine the technology stack (Node.js, Python, Go, etc.)
- Create appropriate configuration files (package.json, requirements.txt, go.mod, etc.)
- Add README.md with project description and setup instructions
- Establish testing framework
- Update these instructions with specific build, test, and run commands

### File Operations
- **Create new files**: Use standard text editors or echo commands
- **Edit existing files**: Use text editors or sed/awk for simple changes
- **Delete files**: Use `rm` command with caution

### Git Workflow
- **Check current branch**: `git branch`
- **Create feature branch**: `git checkout -b feature-name`
- **Stage changes**: `git add .`
- **Commit changes**: `git commit -m "descriptive message"`
- **Push changes**: `git push origin branch-name`

## Common Tasks

### Repository Inventory
```bash
# Current repository structure
ls -la
# Output:
# total 20
# drwxr-xr-x 4 runner docker 4096 [date] .
# drwxr-xr-x 3 runner docker 4096 [date] ..
# drwxr-xr-x 7 runner docker 4096 [date] .git
# drwxr-xr-x 2 runner docker 4096 [date] .github
# -rw-r--r-- 1 runner docker    5 [date] test.md
```

### View test.md contents
```bash
cat test.md
# Output: test
```

### Check Git status
```bash
git status
# Shows current branch and working tree status
```

## Future Development Framework

**When this repository grows**, update these instructions to include:

1. **Technology Stack Identification**:
   - Programming language(s) used
   - Framework(s) adopted
   - Database systems (if any)

2. **Build System Documentation**:
   - Installation commands for dependencies
   - Build commands with **exact timeouts**
   - **NEVER CANCEL** warnings for long-running builds
   - Expected build times with 50% buffer

3. **Testing Framework**:
   - Test execution commands
   - **NEVER CANCEL** warnings with timeout specifications
   - Expected test execution times

4. **Application Runtime**:
   - Commands to start/run the application
   - Port numbers and URLs for local development
   - Environment setup requirements

5. **Validation Scenarios**:
   - Specific user workflows to test
   - Manual testing procedures
   - Screenshot validation for UI changes

## Critical Reminders for Future Updates

- **NEVER CANCEL builds or long-running commands** - Always wait for completion
- **Set explicit timeouts** of 60+ minutes for build commands
- **Validate every command** before adding it to these instructions
- **Test complete user scenarios** after making changes
- **Document exact timing expectations** for all operations

## Current Working Commands Inventory

The following commands have been **validated to work** in the current repository state:

```bash
# Navigation and basic operations (all < 1 second)
cd /home/runner/work/ClearConnectionsContracting/ClearConnectionsContracting
pwd
ls -la
cat test.md
file test.md
wc -l test.md

# Git operations (all < 5 seconds)
git status
git branch
git log --oneline -10

# File operations (all < 1 second)
echo "content" > newfile.txt
mkdir new-directory
rm filename # (use with caution)
```

**No build, test, or application runtime commands are currently available** due to the minimal nature of this repository.