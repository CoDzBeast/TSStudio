# Image Organization System

## Overview

This document explains the new image organization system implemented for the T & S Studio website. The goal is to make it easier for stylists to upload new photos and for developers to manage image assets.

## New Folder Structure

```
src/
├── assets/
│   └── images/
│       ├── hero/
│       │   └── homepage.jpg
│       ├── about/
│       │   ├── cover1.png
│       │   └── cover2.jpg
│       └── gallery/
│           ├── image1.png
│           ├── image2.png
│           ├── image3.png
│           ├── image4.png
│           ├── image5.png
│           ├── image6.jpg
│           ├── image7.jpg
│           ├── image8.jpg
│           └── image9.jpg
```

## Benefits of This Structure

1. **Clear Organization**: Images are grouped by website section, making it easy to find where to add new photos
2. **Stylist-Friendly**: Stylists can easily identify where to upload new portfolio images
3. **Scalable**: New sections can be added following the same pattern
4. **Maintainable**: Developers can quickly locate and update image references

## How to Add New Images

### For Stylists (Portfolio Photos)

1. Navigate to `src/assets/images/gallery/`
2. Add new images following the naming pattern (image10.jpg, image11.jpg, etc.)
3. Use JPG or PNG format
4. Keep file sizes under 2MB for optimal website performance

### For Developers

When adding new sections or features that require images:
1. Create a new folder under `src/assets/images/` with a descriptive name
2. Place relevant images in that folder
3. Update component files with the new image paths

## Image Path References

All image paths in the components now use the new structure:
- Hero images: `/src/assets/images/hero/`
- About images: `/src/assets/images/about/`
- Gallery images: `/src/assets/images/gallery/`

## Support Files

- `src/assets/images/README.md` - Detailed guide for image management
- `src/assets/images/STYLIST_INSTRUCTIONS.txt` - Quick instructions for stylists

## Questions or Issues

Contact the development team for any questions about the image organization system.