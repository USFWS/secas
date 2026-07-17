# Content management for the SECAS website

The SECAS website is composed of several different types of content, each of which
requires a different content management strategy.

All content, including code, content for individual pages and blog posts, images,
PDF files, etc is stored directly within this repository.

## CSS framework

This project uses [Tailwind](https://tailwindcss.com/docs) as the CSS framework
used throughout. This controls all styling. Tailwind classes can be used in
Svelte pages and markdown files.

The core styles are contained in `src/app.css`, including the website color palettes.

## Svelte pages

The core of this website is built using Svelte components and pages. These use
a mix of Javascript, HTML, and Svelte-specific markup to display pages in a
feature rich and visually engaging layout. These are typically the most advanced
pages to edit. However, basic edits can be performed directly using HTML, including
commenting or uncommenting blocks of code as needed. Lightweight text edits
should be straightfoward.

See [SveltePages.md](./SveltePages.md) for more information.

### Data loaded from CSV files

Some Svelte pages load data dynamically from CSV files to make it easier to
maintain information over time.

See [PagesWithCSVData.md](./PagesWithCSVData.md) for more information.

## Markdown pages

A small number of pages in the website are built from markdown files. These are
stored in `content/pages`. These pages are most appropriate for frequently-edited,
text and list heavy content, such as lists of organizations using the Blueprint.

The layouts available in these pages are limited unless you start using
more advanced HTML and CSS into the markdown, which sort of defeats the purpose
of using markdown. Therefore, we recommend using Svelte pages for developing
more advanced content-heavy, more complex layout pages, and reserve markdown
pages for text-heavy simple content.

See [MarkdownPages.md](./MarkdownPages.md) for more information.

## Blog posts

All blog posts are created using markdown stored in `content/blog` with files
named according to a strict, standardized convention.

See [Blog.md](./Blog.md) for more information.

## Image management

See [Images.md](./Images.md) for high level image management guidance.

## PDFs

See [PDFs.md](./PDFs.md) for high level PDF management guidance.

## Automatic rebuild

The website is configured to trigger an automatic rebuild whenever changes are
commited to the main branch. This happens when making commits directly on the main
branch, or after merging in a Pull Request from a different branch or fork.

The site is rebuilt using Github action to run the build step based on those
changes. It is a good idea to make sure that action succeeds; you can watch the
progress at `https://github.com/usfws/secas/actions` (or your own fork).

It will typically take less than fifteen minutes to rebuild and redeploy the website

Once the Github Action has completed, open the website to make sure the website
remains operational and the new changes appear correctly.
