from PIL import Image
img = Image.open(r'c:\Users\USER\Desktop\KPI\logo.png')
img = img.convert('RGBA')
img.thumbnail((200, 200), Image.LANCZOS)
img.save(r'c:\Users\USER\Desktop\KPI\logo.png', 'PNG', optimize=True)
import os
size = os.path.getsize(r'c:\Users\USER\Desktop\KPI\logo.png')
print(f'Done. Size: {size} bytes ({size//1024} KB)')
