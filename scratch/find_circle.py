from PIL import Image

def find_circle():
    img = Image.open("/Users/piotrjuskowiak/Desktop/Projekty/wreczyca_wielka/public/logo-new.png")
    img = img.convert("RGB")
    width, height = img.size
    
    cy = height // 2
    
    # Scan from left edge to center
    left_edge = 0
    for x in range(width // 2):
        r, g, b = img.getpixel((x, cy))
        # Look for green or any non-white color (say R < 240, G < 240, B < 240)
        if r < 240 or g < 240 or b < 240:
            left_edge = x
            break
            
    # Scan from right edge to center
    right_edge = width - 1
    for x in range(width - 1, width // 2, -1):
        r, g, b = img.getpixel((x, cy))
        if r < 240 or g < 240 or b < 240:
            right_edge = x
            break
            
    print(f"Center horizontal line (y={cy}):")
    print(f"Left edge of emblem = {left_edge}")
    print(f"Right edge of emblem = {right_edge}")
    print(f"Calculated diameter = {right_edge - left_edge}")
    print(f"Calculated center X = {(right_edge + left_edge) // 2}")

find_circle()
