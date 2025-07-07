#!/bin/bash

set -e  # Terminate the script on error

echo "🔧 Installing dependecies..."
npm install

echo "🧹 Cleaning up old directories..."
rm -rf dist

echo "🔨 Compiling with tsc..."
npx tsc --project tsconfig.build.json


echo "✅ Build done successfully!"
