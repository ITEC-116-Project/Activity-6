# Image Setup Guide

The application now uses local JPG/JPEG images instead of URLs. Follow this structure:

## Folder Structure

Place all your images in: `frontend/public/assets/`

```
frontend/
├── public/
│   └── assets/
│       ├── movie1.jpg          (Main poster for movie 1)
│       ├── movie1-1.jpg        (Gallery image 1 for movie 1)
│       ├── movie1-2.jpg        (Gallery image 2 for movie 1)
│       ├── movie1-3.jpg        (Gallery image 3 for movie 1)
│       ├── movie1-4.jpg        (Gallery image 4 for movie 1)
│       │
│       ├── movie2.jpg          (Main poster for movie 2)
│       ├── movie2-1.jpg        (Gallery image 1 for movie 2)
│       ├── movie2-2.jpg        (Gallery image 2 for movie 2)
│       ├── movie2-3.jpg        (Gallery image 3 for movie 2)
│       ├── movie2-4.jpg        (Gallery image 4 for movie 2)
│       │
│       ├── movie3.jpg
│       ├── movie3-1.jpg
│       ├── movie3-2.jpg
│       ├── movie3-3.jpg
│       ├── movie3-4.jpg
│       │
│       ├── movie4.jpg
│       ├── movie4-1.jpg
│       ├── movie4-2.jpg
│       ├── movie4-3.jpg
│       ├── movie4-4.jpg
│       │
│       ├── movie5.jpg
│       ├── movie5-1.jpg
│       ├── movie5-2.jpg
│       ├── movie5-3.jpg
│       ├── movie5-4.jpg
│       │
│       ├── movie6.jpg
│       ├── movie6-1.jpg
│       ├── movie6-2.jpg
│       ├── movie6-3.jpg
│       ├── movie6-4.jpg
│       │
│       └── default.jpg         (Default image shown if no poster specified)
```

## Adding Images

1. **Create the assets folder** if it doesn't exist:
   - `frontend/public/assets/`

2. **Place your JPG/JPEG files** in this folder with the naming pattern shown above

3. **Update movie images** in two ways:

   ### Option A: Through the App UI
   - Click the Edit button (pencil icon) on any movie
   - In the "Poster image" field, enter: `/assets/filename.jpg`
   - Example: `/assets/movie1.jpg`

   ### Option B: Edit the code directly
   - All movie data is in: `frontend/src/pages/mainPage.jsx`
   - Movie posters: Lines 66-119
   - Gallery images: Lines 130-167

## File Naming Convention

- **Main Posters**: `/assets/movieX.jpg` (where X = movie ID 1-6)
- **Gallery Images**: `/assets/movieX-Y.jpg` (where X = movie ID, Y = gallery image 1-4)
- **Default**: `/assets/default.jpg` (shown when no poster is specified)

## Image Format

- Format: **JPG or JPEG**
- Recommended sizes:
  - **Posters**: 400 x 600 pixels (or similar aspect ratio 2:3)
  - **Gallery Images**: 600 x 400 pixels (or similar aspect ratio 3:2)
- Maximum file size: No limit, but recommended under 500KB per image for best performance

## Notes

- The app will work fine even if some image files don't exist (it will show a broken image placeholder)
- You can change image paths at any time without rebuilding the app
- Changes take effect immediately in your browser (may need to refresh)
- All data (including image references) is saved in localStorage
