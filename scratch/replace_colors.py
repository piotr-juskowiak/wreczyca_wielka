import os

def replace_colors_in_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Define color mappings (keys in lowercase, values to replace)
    # We will do case-insensitive replacements for hex codes.
    replacements = {
        "#3a5a40": "#107c35",
        "#a3b18a": "#72c38f",
        "#dad7cd": "#cbd5e1",
        "#344e41": "#0f172a",
        "#f1f3ef": "#f1f5f9",
        "#588157": "#139a43",
        "#0d1c12": "#082310",
        "#2f4834": "#0b5e28",
    }

    original_content = content
    for old, new in replacements.items():
        # Replace lowercase
        content = content.replace(old.lower(), new)
        # Replace uppercase
        content = content.replace(old.upper(), new)

    if content != original_content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated colors in: {file_path}")

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        # Skip node_modules and .next
        if "node_modules" in root or ".next" in root:
            continue
        for file in files:
            if file.endswith((".tsx", ".ts", ".css", ".js")):
                file_path = os.path.join(root, file)
                replace_colors_in_file(file_path)

if __name__ == "__main__":
    project_dir = "/Users/piotrjuskowiak/Desktop/Projekty/wreczyca_wielka"
    print("Starting global color rebranding...")
    process_directory(os.path.join(project_dir, "components"))
    process_directory(os.path.join(project_dir, "app"))
    print("Color rebranding completed successfully!")
