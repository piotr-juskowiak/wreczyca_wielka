from PIL import Image, ImageDraw

def process_logo():
    input_path = "/Users/piotrjuskowiak/Desktop/Projekty/wreczyca_wielka/public/logo-new.png"
    
    # Open the JPEG disguised as PNG
    img = Image.open(input_path).convert("RGB")
    width, height = img.size
    
    cy = height // 2
    cx = width // 2
    
    # 1. Scan horizontally to find boundaries of the circle
    left_edge = 0
    for x in range(width // 2):
        r, g, b = img.getpixel((x, cy))
        if r < 240 or g < 240 or b < 240:
            left_edge = x
            break
            
    right_edge = width - 1
    for x in range(width - 1, width // 2, -1):
        r, g, b = img.getpixel((x, cy))
        if r < 240 or g < 240 or b < 240:
            right_edge = x
            break
            
    # 2. Scan vertically to find boundaries
    top_edge = 0
    for y in range(height // 2):
        r, g, b = img.getpixel((cx, y))
        if r < 240 or g < 240 or b < 240:
            top_edge = y
            break
            
    bottom_edge = height - 1
    for y in range(height - 1, height // 2, -1):
        r, g, b = img.getpixel((cx, y))
        if r < 240 or g < 240 or b < 240:
            bottom_edge = y
            break
            
    # Calculate exact circle center and diameter
    centerX = (right_edge + left_edge) // 2
    centerY = (bottom_edge + top_edge) // 2
    diameter = max(right_edge - left_edge, bottom_edge - top_edge)
    radius = diameter // 2
    
    print(f"Detected Emblem center: ({centerX}, {centerY}), diameter: {diameter}, radius: {radius}")
    
    # Crop the logo to the circular bounds. We inset the mask slightly (by 3 pixels) 
    # to completely eliminate any remaining white compression artifacts or edges.
    inset_radius = radius - 3
    
    # 3. Create transparency mask (anti-aliased circular mask)
    # To get high quality anti-aliasing, we draw the mask at 4x resolution and then downscale
    scale = 4
    mask_large = Image.new("L", (width * scale, height * scale), 0)
    draw = ImageDraw.Draw(mask_large)
    
    large_cx = centerX * scale
    large_cy = centerY * scale
    large_r = inset_radius * scale
    
    draw.ellipse(
        (large_cx - large_r, large_cy - large_r, large_cx + large_r, large_cy + large_r),
        fill=255
    )
    
    # Downscale the mask to match the original size with anti-aliasing
    mask = mask_large.resize((width, height), Image.Resampling.LANCZOS)
    
    # 4. Create RGBA image and apply the mask
    rgba_img = img.copy()
    rgba_img.putalpha(mask)
    
    # Now, let's crop the image to the bounding box of the circular crest
    # so there is no unnecessary empty whitespace around it, making it look 
    # perfectly centered and filled!
    crop_box = (
        centerX - radius,
        centerY - radius,
        centerX + radius,
        centerY + radius
    )
    cropped_logo = rgba_img.crop(crop_box)
    
    # 5. Overwrite the main public/logo-new.png with the transparent, perfectly centered logo!
    # Yes, we save it as a true PNG.
    cropped_logo.save(input_path, format="PNG")
    print(f"Updated main logo '{input_path}' as transparent PNG.")
    
    # 6. Save favicon/icons for Next.js App Router
    # High-resolution transparent icon for app/icon.png (512x512)
    icon_512 = cropped_logo.resize((512, 512), Image.Resampling.LANCZOS)
    icon_512.save("/Users/piotrjuskowiak/Desktop/Projekty/wreczyca_wielka/app/icon.png", format="PNG")
    print("Created transparent app/icon.png (512x512)")
    
    # iOS homescreen icon for app/apple-icon.png (180x180)
    apple_180 = cropped_logo.resize((180, 180), Image.Resampling.LANCZOS)
    apple_180.save("/Users/piotrjuskowiak/Desktop/Projekty/wreczyca_wielka/app/apple-icon.png", format="PNG")
    print("Created transparent app/apple-icon.png (180x180)")
    
    # Public apple-icon.png (180x180)
    apple_180.save("/Users/piotrjuskowiak/Desktop/Projekty/wreczyca_wielka/public/apple-icon.png", format="PNG")
    print("Created transparent public/apple-icon.png (180x180)")
    
    # 7. Create a backward-compatible multi-size public/favicon.ico
    # standard favicon.ico size formats: 16x16, 32x32, 48x48
    cropped_logo.save(
        "/Users/piotrjuskowiak/Desktop/Projekty/wreczyca_wielka/public/favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print("Created multi-size transparent public/favicon.ico")

if __name__ == "__main__":
    process_logo()
