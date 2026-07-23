import sys
import re

file_path = 'C:/Users/James/Desktop/Codex Websites/Projekt clone/src/App.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find <main> block
main_start = content.find('<main>')
main_end = content.find('</main>') + len('</main>')

main_block = content[main_start:main_end]

# Modify main_block to use onOpenContact
main_block = main_block.replace('setIsContactModalOpen(true)', 'onOpenContact()')

# Create HomePage component at the end of the file
home_page_component = f'''

function HomePage({{ onOpenContact }}: {{ onOpenContact: () => void }}) {{
  return (
{main_block}
  );
}}
'''

# Remove main_block from the original content
routing_logic = '''
      {currentRoute === 'home' && <HomePage onOpenContact={() => setIsContactModalOpen(true)} />}
      {currentRoute === 'ratgeber' && <RatgeberPage onNavigate={setCurrentRoute} />}
      {currentRoute === 'beforeafter' && <BeforeAfterPage onNavigate={setCurrentRoute} />}
      {currentRoute === 'mobileview' && <MobileViewPage onNavigate={setCurrentRoute} />}
'''

content = content[:main_start] + routing_logic + content[main_end:]

# Add state for currentRoute
state_str = 'const [currentRoute, setCurrentRoute] = useState("home")'
content = content.replace('const [isContactModalOpen, setIsContactModalOpen] = useState(false)', 
                          'const [isContactModalOpen, setIsContactModalOpen] = useState(false)\\n  ' + state_str)

# Add imports for the new pages at the top
imports = '''import RatgeberPage from './pages/RatgeberPage'
import BeforeAfterPage from './pages/BeforeAfterPage'
import MobileViewPage from './pages/MobileViewPage'
'''

# Find the first import and add there
first_import_idx = content.find('import')
content = content[:first_import_idx] + imports + content[first_import_idx:]

content += home_page_component

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
