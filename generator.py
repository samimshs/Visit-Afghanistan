import os

# Directory containing your specific images (replace with correct path)
image_directory = "/Users/samisamim/Desktop/Coding Projects/Website/Motivational/"

# Loop through the files in the correct directory and generate HTML <img> tags
for image in os.listdir(image_directory):
    if image.endswith(".png") or image.endswith(".jpg") or image.endswith(".jpeg"):
        print(f'<img src="images/{image}" alt="{image}" class="image-class">')