# Fix CSS Linting Errors

## **Problem**
VS Code is showing "Unknown at rule" errors for Tailwind CSS v4 directives like:
- `@custom-variant`
- `@theme`
- `@utility`
- `@apply`

## **Solution**

### **1. Restart VS Code**
1. Close VS Code completely
2. Reopen VS Code
3. Open the project folder: `client`

### **2. Install Tailwind CSS IntelliSense Extension**
1. Press `Ctrl+Shift+X` to open Extensions
2. Search for "Tailwind CSS IntelliSense"
3. Install the extension by Brad Cornes
4. Reload VS Code when prompted

### **3. Verify Settings Applied**
The following files have been created to fix the CSS errors:
- `.vscode/settings.json` - Disables CSS validation
- `.vscode/css_custom_data.json` - Defines Tailwind directives
- `.vscode/extensions.json` - Recommends Tailwind extension

### **4. Alternative: Manual Fix**
If errors persist, manually add this to your VS Code settings:

```json
{
  "css.validate": false,
  "css.lint.unknownAtRules": "ignore",
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### **5. Expected Result**
After following these steps:
- ✅ No more "Unknown at rule" errors
- ✅ Tailwind CSS IntelliSense working
- ✅ Proper syntax highlighting
- ✅ Autocomplete for Tailwind classes

## **Why This Happens**
Tailwind CSS v4 uses new directives (`@theme`, `@custom-variant`, `@utility`) that VS Code's default CSS language service doesn't recognize. The settings we've added tell VS Code to ignore these "unknown" directives and treat the files as Tailwind CSS.

## **If Errors Still Persist**
1. Check if Tailwind CSS IntelliSense extension is installed
2. Try opening the workspace file: `.vscode/workspace.code-workspace`
3. Reload VS Code window: `Ctrl+Shift+P` → "Developer: Reload Window" 