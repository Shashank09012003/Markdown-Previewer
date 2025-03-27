document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const clearBtn = document.getElementById('clearBtn');

    // Configure marked.js
    marked.setOptions({
        breaks: true,
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlightAuto(code).value;
        }
    });

    // Sample initial markdown
    const initialMarkdown = `# Welcome to Markdown Previewer!

## Try these markdown elements:

### Headers
**Bold Text**
*Italic Text*
~~Strikethrough~~

### Lists
1. Ordered List Item 1
2. Ordered List Item 2

- Unordered List Item
- Another Item

### Links
[Visit OpenAI](https://www.openai.com)

### Code
Inline \`code\` example

\`\`\`javascript
function greet(name) {
    console.log('Hello, ' + name + '!');
}
\`\`\`

### Blockquotes
> This is a blockquote
> It can span multiple lines

### Tables
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`;

    // Set initial content
    editor.value = initialMarkdown;
    updatePreview();

    // Update preview on input
    editor.addEventListener('input', debounce(updatePreview, 300));

    // Clear button functionality
    clearBtn.addEventListener('click', () => {
        editor.value = '';
        updatePreview();
        editor.focus();
    });

    // Preview update function
    function updatePreview() {
        const markdown = editor.value;
        const html = marked.parse(markdown);
        preview.innerHTML = html;
        
        // Apply syntax highlighting to code blocks
        preview.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }

    // Debounce function to limit preview updates
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});