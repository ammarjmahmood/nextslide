#!/usr/bin/env python3
"""Generate simple placeholder icons for the Chrome extension"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename, active=False):
    # Create image with gradient background
    img = Image.new('RGB', (size, size), color='white')
    draw = ImageDraw.Draw(img)
    
    # Background color (purple for inactive, green for active)
    if active:
        color = (16, 185, 129)  # Green
    else:
        color = (102, 126, 234)  # Purple
    
    # Draw filled circle background
    draw.ellipse([0, 0, size, size], fill=color)
    
    # Draw microphone shape (simplified)
    mic_width = size // 4
    mic_height = size // 3
    mic_x = (size - mic_width) // 2
    mic_y = size // 4
    
    # Microphone body (white)
    draw.rounded_rectangle(
        [mic_x, mic_y, mic_x + mic_width, mic_y + mic_height],
        radius=mic_width // 2,
        fill='white'
    )
    
    # Microphone stand
    stand_y = mic_y + mic_height
    draw.line([size // 2, stand_y, size // 2, stand_y + size // 8], fill='white', width=2)
    draw.line([size // 2 - size // 8, stand_y + size // 8, size // 2 + size // 8, stand_y + size // 8], fill='white', width=2)
    
    # Draw arrow (right)
    arrow_y = size * 2 // 3
    arrow_size = size // 6
    points = [
        (size // 2 + arrow_size // 2, arrow_y),
        (size // 2 + arrow_size, arrow_y - arrow_size // 3),
        (size // 2 + arrow_size, arrow_y + arrow_size // 3)
    ]
    draw.polygon(points, fill='white')
    
    img.save(filename)
    print(f"Created {filename}")

# Create icons directory if it doesn't exist
os.makedirs('icons', exist_ok=True)

# Generate inactive icons
create_icon(128, 'icons/icon128.png', active=False)
create_icon(48, 'icons/icon48.png', active=False)
create_icon(16, 'icons/icon16.png', active=False)

# Generate active icons
create_icon(128, 'icons/icon-active128.png', active=True)
create_icon(48, 'icons/icon-active48.png', active=True)
create_icon(16, 'icons/icon-active16.png', active=True)

print("All icons generated successfully!")
