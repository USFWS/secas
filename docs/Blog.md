# Blog posts

All blog posts are authored using markdown. These are located in
`content/blog`.

These follow a strict file naming convention:

`YYYY-MM-DD-slug.md`

Where `YYYY` is the 4 digit year, `MM` is the 2 digit month, and `DD` is the 2
digit day corresponding to when the blog is expected to be published.

`slug` is a URL friendly set of words that helps uniquely identify the blog post.
It can be a mix of capitalization as needed. It must not contain special characters
like `&` or things break. See existing blogs for examples of the `slug`
component.

The website parses those components in various ways, such as grouping all posts
by year, so it is important to make sure you follow the standard correctly.

## Frontmatter

All blog posts must have the following frontmatter:

```markdown
---
published: <true|false>
title: <blog title>
author: <blog author and job title>
hero:
  name: <hero image filename relative to the content/images folder>
  alt: <hero image alt text>
  caption: <hero image caption, can include HTML>
---
```

`title` and `author` should be plain text and not include HTML.

## Content

In general, the body of the blog post is expected to be standard markdown, which
can include a limited amount of HTML. You can use Tailwind classes on HTML
elements as needed for more control over their styling, but this should generally
be kept to a minimum (mostly for image layouts).

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

### Excerpts

Blog posts use the `<!--more-->` marker to mark the end of the excerpt that is
included for that blog post in list views. This marker must be on its own line,
separated by a newline above and below from other content.

In general, you tailor the position of this marker to the height of the hero image.
If you have a taller hero image, you can have a longer excerpt, and if you have a
short hero image, stick to a shorter excerpt. In general, excerpts should be
brief introductory content to hook users into reading the whole post.

### Images

See [ImagesInMarkdown.md](./ImagesInMarkdown.md) for more information about how
to correctly enter images in Markdown.
