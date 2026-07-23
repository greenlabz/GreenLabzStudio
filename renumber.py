import sys
import re

file_path = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    ('number="14"', 'number="15"'),
    ('number="13"', 'number="14"'),
    ('number="12"', 'number="13"'),
    ('number="11"', 'number="12"'),
    ('number="10"', 'number="11"'),
    ('number="09"', 'number="10"'),
    ('number="08"', 'number="09"'),
    ('number="07"', 'number="08"'),
    ('number="06"', 'number="07"'),
    ('number="05"', 'number="06"'),
    ('number="04.1"', 'number="05"'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
