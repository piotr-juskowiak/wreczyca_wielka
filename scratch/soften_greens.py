import os

def replace_colors_in_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Define color mappings for softening the greens
    replacements = {
        "#107c35": "#2c5e3b",  # Temporary primary green -> Soft premium forest green
        "#72c38f": "#5cb87e",  # Temporary sage -> Softer calming sage
        "#139a43": "#2e854b",  # Temporary vibrant green -> Soft accent green
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
        print(f"Softened greens in: {file_path}")

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
    print("Starting global green-softening sweep...")
    process_directory(os.path.join(project_dir, "components"))
    process_directory(os.path.join(project_dir, "app"))
    print("Green softening sweep completed successfully!")
