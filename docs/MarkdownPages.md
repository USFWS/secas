# Markdown pages

Markdown pages are created from markdown files stored in `content/pages`. These
are intended for text-heavy, frequently-updated pages within simple layouts.
These require specific route handlers (of the same name) to be created for them
under `src/routes` which load and parse the markdown and load the hero image.

## Frontmatter

Each markdown page needs to have the following frontmatter declared at the top
of the file:

```markdown
---
title: title of the page
description: simple description of the page
hero:
  name: path to the hero image displayed at the top of the page
  alt: alt text for hero image
  caption: caption for hero image; can include HTML in order to use links for photo credits
---
```

## Content

The body of the markdown files is basic markdown, with the exception of images.

### Relative URLs

All URLs within the site in the body of the markdown file, including to PDF files,
should use absolute paths without the domain name:

```markdown
[my file link](/pdf/my_file.pdf)
[contact staff](/staff/)
```

These are automatically resolved at build time.

Note the trailing slash `/` is included for all page URLs. This isn't strictly
required, because the site will automatically redirect to the URL with the
trailing slash, but including it here saves one redirect in the browser.

IMPORTANT: URLs in the frontmatter must be absolute URLs because those are not
processed at build time. Confusing, I know!

### Images

Please see [ImagesInMarkdown.md](./ImagesInMarkdown.md) for detailed information
about how to structure images in markdown files.
