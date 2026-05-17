from PIL import Image

def find_bounding_box():
    img = Image.open("/Users/piotrjuskowiak/Desktop/Projekty/wreczyca_wielka/public/logo-new.png")
    img = img.convert("RGB")
    width, height = img.size
    
    # We look for pixels that are not white (i.e. at least one channel is significantly below 250)
    left = width
    right = 0
    top = height
    bottom = 0
    
    for y in range(height):
        for x in range(width):
            r, g, b = img.getpixel((x, y))
            if r < 250 or g < 250 or b < 250:
                if x < left: left = x
                if x > right: right = x
                if y < top: top = y
                if y > bottom: bottom = y
                
    print(f"Emblem bounding box: Left={left}, Right={right}, Top={top}, Bottom={bottom}")
    print(f"Dimensions: Width={right-left}, Height={bottom-top}")

find_bounding_box()
