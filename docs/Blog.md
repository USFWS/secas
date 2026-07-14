# Blog posts

All blog posts are authored using markdown. These are located in a folder that
indicates their publish status:

- `content/blog/published`: contains blog articles that are published and visible
  in the various list views (home page, blog page, blog year page), the search
  index, and at their direct URL.
- `content/blog/draft`: contains blog articles that are not currently
  published; these are not visible in any of the list views. See below for
  publishing workflow.

Blog markdown files follow a strict file naming convention:

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

Note that `published` does not actually change the publication status of the post;
that is controlled based on the folder where the blog markdown file is located.
The `published` entry serves as a signal for the intent that the post should be
published or not, in case it is accidentally placed in the wrong folder.

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

## Publishing workflow

### Content creation and editing via Github

In your browser, sign in to Github and navigate to the draft blog post
folder: `https://github.com/usfws/secas/tree/main/content/blog/draft`
Make sure you are on the `main` branch (see the dropdown toward the upper left).

Then click "Add new file" in the upper right to create a new file in the
`draft` folder. Name it according to the convention above. Add frontmatter
and content as specified above. If you are still working on the content, not a
problem, but please make sure the frontmatter is valid.

Click "Commit changes..." in the upper right, and then choose to commit changes
to the `main` branch.

Make sure to upload any new images or PDFs referenced by that post to the
`content/images` and `content/pdf` folders.

Once you are ready to publish that post, you simply need to move it to the published
folder. Navigate to the blog post file in Github. Click the pencil dropdown toward
the upper right side of the screen and choose "Edit file ... In Place".

Click in the input field containing the filename in the upper middle section of
the screen and move your cursor to the far left of that field. Hit your backspace
key. This will allow you to edit its parent folder. Change that from `draft/`
to `published/` and save changes. This blog post will now (after the frontend
is done rebuilding) show in all the normal list views and display a normal
blog post page.

### Local development using an offline clone of the repository

If you are working from a clone of the repository, you can use the user
interface preview server (see [Developing.md](./Developing.md)) to proof a new
blog post or edits to an existing blog post locally and sidestep the procedures
above.

Simply create a new blog markdown file in `content/blog/published` using the
naming convention above. Add any image or PDF files you reference in the blog
post to their respective folders. Your new post should show up in the blog
section of the home page and on the blog page in your preview server.

Ensure that the blog hero image and snippet display correctly in the list view.

Click on the post to navigate to it and verify that it displays correctly.

Once you are done, you can commit those changes directly to the `main` branch or
create a new branch and commit there. If you opt to use a new branch, push that
to github and create a Pull Request to merge that into `main`.

## Blog search index

The blog search tool uses a search index file built from all blog posts in the
`content/blog/published` folder, and indexes the blog title, author, and excerpt.
It does not index the entire blog post.

The search tool executes a fuzzy ordered text search against the search index.
That means if you type multiple words or fragments, you will get results back
that are most similar to that particular order of words or fragments.

## Blog RSS feed

The blog includes an RSS feed file created during the user interface build step.
This is an XML file that can be displayed in an RSS feed reader. It includes
the blog title, excerpt, author, and date. It is based on all blog posts in the
`content/blog/published` folder.
