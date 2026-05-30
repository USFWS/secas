# Image management

## Location, URLs, and Optimization

All images are stored in `content/images` or subfolders under there.

These images are all exposed in their raw form at `https://secassoutheast.org/images/<filename>`
for use in other platforms, like emails, etc.

Nearly all images used within the website, including in Svelte pages and pages
rendered from markdown, are processed through an optimization step that does
the following:

- pre-renders reduced sizes for responsive layouts: 3200, 1920, 720 pixels
- determines the max size an image could render (where possible) and renders to that size and no bigger
- creates JPG, WEBP, and AVIF alternatives; in general WEBP and AVIF are smaller sizes with better compression

Note that it will not increase the size of images; it will only render smaller versions
as needed.

These are rendered using a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture)
element which provides the alternative sizes to the browser, so that the browser
can pick the ideal image to load based on its viewport. That means that when
you are on a tiny screen mobile device, you only need to download a smaller image
and not the massive one more appropriate for a desktop computer.

Because these images are created at build type, they are considered throw-away
and you must not link to these versions from the outside because they will be
replaced by other ones in the future. These typically have a naming pattern
that includes `https://secassoutheast.org/_app/immutable/assets/<filename>.<hash>.<extension>`.
If it has `immutable` in it, don't use it! The immutable part is specific to
HTTP caching; the image itself will go away when the site is rebuilt.

However, you can get external friendly URLs by manually editing that URL to
`https://secassoutheast.org/images/<original filename>`.

## File names

Try to avoid spaces, parentheses, and other special characters in filenames.
Try to always use lowercase extensions of the standard form:
`.png`, `.jpg` (not `.jpeg`).

## Image types

Always start from PNG or JPG files. The optimization step will automatically
create more performant formats.

GIFs are not currently supported and in general are not great for accessibility,
so they are unlikely to be supported in the future.

## Pick the right dimensions

In general, the hero images used at the top of Svelte pages and parkdown pages
are pretty wide and short. 3200 x 1200 seems pretty resonable for these.

The hero images of blog posts render the full width of the page (~1000px). Using
small images or logos does not work very well for these; save those for within
the body of the blog post.

Most blog hero images are taller than they are wide. In general, 2000 x 3200
seems pretty reasonable, but their height vs width ratio can vary as needed
based on the source of the image.

## Minify before uploading to Github

Make it a general practice to always resize your image to no larger than roughly
2x the size you ultimately want it displayed; this allows it to have higher
resolution on supported devices without uploading giant files.

Always run the image through a minifier like [TinyPNG](https://tinypng.com/),
which can also handle JPGs, before uploading to Github. This can cut 50% or more
of the size of the image with no perceptible difference.
