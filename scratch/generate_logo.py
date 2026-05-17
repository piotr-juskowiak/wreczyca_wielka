from PIL import Image, ImageDraw

def generate_logo():
    # Target size: 614x614 (matching the existing public/logo-new.png exactly)
    # Drawing at 4x resolution for perfect anti-aliasing and ultra-sharp edges
    scale = 4
    size = 614 * scale
    cx, cy = size // 2, size // 2
    
    # 1. Initialize Canvas
    logo_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    
    # Color Palette from the user's attachment
    green_color = "#139a43"
    blue_color = "#0073bc"
    yellow_color = "#fcd116"
    white_color = "#ffffff"
    
    # --- GREEN LAYER (OUTER GEAR) ---
    green_layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw_green = ImageDraw.Draw(green_layer)
    
    # Green ring: outer edge at radius 1008 (relative to 1228 center), width 192
    ring_radius = 1008
    ring_width = 192
    draw_green.ellipse(
        [cx - ring_radius, cy - ring_radius, cx + ring_radius, cy + ring_radius],
        outline=green_color,
        width=ring_width
    )
    
    # Green gear teeth (8 teeth rotated by 45 degrees)
    # A single tooth is a rounded rectangle that goes deep into the green ring
    tooth_w = 144
    tooth_h = 240
    tooth_top = cy - 1176
    tooth_bottom = tooth_top + tooth_h  # 1176 - 240 = 936 (starts inside the ring)
    
    for i in range(8):
        # Create a temporary layer for each tooth to rotate it cleanly
        tooth_layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        draw_tooth = ImageDraw.Draw(tooth_layer)
        
        # Draw rounded rectangle for the tooth
        draw_tooth.rounded_rectangle(
            [cx - tooth_w, tooth_top, cx + tooth_w, tooth_bottom],
            radius=35,
            fill=green_color
        )
        
        # Rotate the tooth layer around the center
        angle = -i * 45
        rotated_tooth = tooth_layer.rotate(angle, resample=Image.Resampling.BICUBIC, center=(cx, cy))
        
        # Paste it onto the main green layer
        green_layer = Image.alpha_composite(green_layer, rotated_tooth)
        
    # --- BLUE LAYER (WATER WHEEL / INNER CIRCLES) ---
    blue_layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw_blue = ImageDraw.Draw(blue_layer)
    
    # Outer blue ring: radius 730, width 67
    draw_blue.ellipse(
        [cx - 730, cy - 730, cx + 730, cy + 730],
        outline=blue_color,
        width=67
    )
    
    # Inner blue ring: radius 490, width 67
    draw_blue.ellipse(
        [cx - 490, cy - 490, cx + 490, cy + 490],
        outline=blue_color,
        width=67
    )
    
    # Blue cross (spokes): vertical and horizontal lines of width 67
    spoke_half = 33
    # Vertical spoke
    draw_blue.rectangle(
        [cx - spoke_half, cy - 730, cx + spoke_half, cy + 730],
        fill=blue_color
    )
    # Horizontal spoke
    draw_blue.rectangle(
        [cx - 730, cy - spoke_half, cx + 730, cy + spoke_half],
        fill=blue_color
    )
    
    # --- YELLOW LAYER (CENTER SUN RING) ---
    yellow_layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw_yellow = ImageDraw.Draw(yellow_layer)
    
    # Yellow outer ring (filled yellow first, then hollowed with white to hide blue spokes)
    yellow_outer = 278
    yellow_inner = 201
    
    draw_yellow.ellipse(
        [cx - yellow_outer, cy - yellow_outer, cx + yellow_outer, cy + yellow_outer],
        fill=yellow_color
    )
    draw_yellow.ellipse(
        [cx - yellow_inner, cy - yellow_inner, cx + yellow_inner, cy + yellow_inner],
        fill=white_color
    )
    
    # --- COMPOSE ALL LAYERS ---
    logo_img = Image.alpha_composite(logo_img, green_layer)
    logo_img = Image.alpha_composite(logo_img, blue_layer)
    logo_img = Image.alpha_composite(logo_img, yellow_layer)
    
    # --- SAVE AND DOWNSCALE ---
    # 1. Save standard high-resolution main logo (614x614)
    logo_final = logo_img.resize((614, 614), Image.Resampling.LANCZOS)
    logo_final.save("/Users/piotrjuskowiak/Desktop/Projekty/wreczyca_wielka/public/logo-new.png", format="PNG")
    print("Saved public/logo-new.png")
    
    # 2. Save Next.js app icon.png (512x512)
    icon_512 = logo_img.resize((512, 512), Image.Resampling.LANCZOS)
    icon_512.save("/Users/piotrjuskowiak/Desktop/Projekty/wreczyca_wielka/app/icon.png", format="PNG")
    print("Saved app/icon.png")
    
    # 3. Save Next.js app apple-icon.png (180x180)
    apple_180 = logo_img.resize((180, 180), Image.Resampling.LANCZOS)
    apple_180.save("/Users/piotrjuskowiak/Desktop/Projekty/wreczyca_wielka/app/apple-icon.png", format="PNG")
    apple_180.save("/Users/piotrjuskowiak/Desktop/Projekty/wreczyca_wielka/public/apple-icon.png", format="PNG")
    print("Saved app/apple-icon.png and public/apple-icon.png")
    
    # 4. Save favicon.ico
    logo_final.save(
        "/Users/piotrjuskowiak/Desktop/Projekty/wreczyca_wielka/public/favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print("Saved public/favicon.ico")

if __name__ == "__main__":
    generate_logo()
