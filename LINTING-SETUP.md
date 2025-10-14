# 🔧 Linting Setup Guide

This project now has comprehensive linting setup that will catch issues automatically.

## 🚀 Quick Setup

Run the setup script to install all dependencies and configure linting:

```bash
./setup-linting.sh
```

## 📋 Available Commands

### Linting Commands
- `npm run lint` - Run ESLint on all files
- `npm run lint:fix` - Run ESLint and auto-fix issues  
- `npm run lint:check` - Run ESLint with zero warnings allowed
- `npm run type-check` - Run TypeScript type checking
- `npm run check-all` - Run both type checking and linting

### Development Commands
- `npm run dev` - Start development server (with Turbopack)
- `npm run build` - Build for production
- `npm run start` - Start production server

## 🔧 VS Code Integration

### Required Extensions
Install these VS Code extensions for the best experience:

1. **ESLint** (`ms-vscode.vscode-eslint`) - Real-time linting
2. **Prettier** (`esbenp.prettier-vscode`) - Code formatting
3. **TypeScript Importer** (`pmneo.tsimporter`) - Auto-import management

### Automatic Features
- ✅ **Real-time linting** - See errors as you type
- ✅ **Auto-fix on save** - Automatically fix fixable issues
- ✅ **Import organization** - Automatically organize imports
- ✅ **Format on save** - Automatically format code

## 🐕 Pre-commit Hooks

Husky is configured to run linting and type checking before each commit:

- **ESLint** - Catches code quality issues
- **TypeScript** - Catches type errors
- **Auto-fix** - Automatically fixes fixable issues

If linting fails, the commit will be blocked until issues are resolved.

## 📏 Linting Rules

### React/JSX Rules
- `react/no-unescaped-entities` - Prevents unescaped quotes/apostrophes
- `react/jsx-no-target-blank` - Prevents security issues with external links
- `react-hooks/exhaustive-deps` - Ensures proper hook dependencies

### TypeScript Rules
- `@typescript-eslint/no-explicit-any` - Prevents use of `any` type
- `@typescript-eslint/no-unused-vars` - Catches unused variables
- `@typescript-eslint/prefer-const` - Enforces const when possible

### General Code Quality
- `no-console` - Warns about console statements
- `no-debugger` - Prevents debugger statements
- `prefer-const` - Enforces const over let
- `no-var` - Prevents var usage

## 🛠️ Troubleshooting

### Common Issues

1. **"ESLint not found"**
   ```bash
   npm install
   ```

2. **"Husky not working"**
   ```bash
   npx husky install
   chmod +x .husky/pre-commit
   ```

3. **"TypeScript errors"**
   ```bash
   npm run type-check
   ```

4. **"Auto-fix not working in VS Code"**
   - Ensure ESLint extension is installed
   - Check `.vscode/settings.json` is present
   - Restart VS Code

### Manual Linting

If you need to run linting manually:

```bash
# Check all files
npm run lint:check

# Fix auto-fixable issues
npm run lint:fix

# Check specific file
npx eslint src/app/page.tsx

# Fix specific file
npx eslint src/app/page.tsx --fix
```

## 📁 File Structure

```
├── .vscode/
│   └── settings.json          # VS Code linting configuration
├── .husky/
│   └── pre-commit            # Pre-commit hook
├── eslint.config.mjs        # ESLint configuration
├── setup-linting.sh         # Setup script
└── LINTING-SETUP.md         # This guide
```

## 🎯 Benefits

- **Catch errors early** - Before they reach production
- **Consistent code style** - Automatic formatting
- **Better code quality** - Enforced best practices
- **Faster development** - Auto-fix saves time
- **Team consistency** - Same rules for everyone

## 🔄 Workflow

1. **Write code** - VS Code shows linting errors in real-time
2. **Save file** - Auto-fix runs automatically
3. **Commit code** - Pre-commit hooks run linting
4. **Deploy** - Only clean code reaches production

This setup ensures your code is always clean, consistent, and error-free! 🚀
