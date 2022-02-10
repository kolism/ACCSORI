# 🎀ACSSORI
 Stunning drop-In CSS styles for your site!
 
 *Note: this is a dark theme (purple/blue/gray color palette)*

 ### Demo
 See 🎀ACSSORI in action here:
 [Design Palette Demo](https://acssori.vercel.app)

 ### How to use this?
 In your HTML header tag, include a link to the acssori.min.css file (found in dist folder)

 ```html
 <head>
<link rel="stylesheet" type="text/css" href="acssori.min.css" media=”screen” />
</head>
```

### Development
  This project uses a GULP pipeline, which takes STYLUS files in the "src" folder and produces CSS files in the "dist" folder

  The build process can be ran by:
  ```sh
  npm run build
  ```

    Notes:
      - _base.styl is the main import for the configuration
      - any stylus file added to the src folder will be automatically picked up by GULP.
      - both minified and normal CSS files are generated from the STYLUS source


### Todo:
  - Expand input styles and docs
  - Expand color library and add docs
  - Spacing styles and docs
  - More utilities
  - More containment options