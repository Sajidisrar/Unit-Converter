#!/bin/bash

echo "🔧 Setting up comprehensive linting for your project..."

# Install dependencies
echo "📦 Installing linting dependencies..."
npm install --save-dev husky lint-staged

# Initialize husky
echo "🐕 Setting up Husky for pre-commit hooks..."
npx husky install

# Make pre-commit hook executable
chmod +x .husky/pre-commit

# Test the linting setup
echo "🧪 Testing linting setup..."
npm run lint:check

if [ $? -eq 0 ]; then
    echo "✅ Linting setup completed successfully!"
    echo ""
    echo "📋 Available commands:"
    echo "  npm run lint          - Run ESLint on all files"
    echo "  npm run lint:fix      - Run ESLint and auto-fix issues"
    echo "  npm run lint:check    - Run ESLint with zero warnings allowed"
    echo "  npm run type-check    - Run TypeScript type checking"
    echo "  npm run check-all     - Run both type checking and linting"
    echo ""
    echo "🔧 VS Code Integration:"
    echo "  - Install ESLint extension for real-time linting"
    echo "  - Install Prettier extension for code formatting"
    echo "  - Settings are already configured in .vscode/settings.json"
    echo ""
    echo "🚀 Pre-commit hooks:"
    echo "  - Linting will run automatically before each commit"
    echo "  - Type checking will run automatically before each commit"
else
    echo "❌ Linting setup failed. Please check the errors above."
    exit 1
fi
