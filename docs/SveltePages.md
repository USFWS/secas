# Svelte pages

All pages constructed directly using Svelte are stored in `src/routes` per the
Svelte conventions. In general, each folder name containing a `+page.svelte`
file corresponds to a URL; for example, the About page is at the URL path
`/about` and is rendered from the file at `src/routes/about/+page.svelte`.

Some pages use dynamic route components, such as the year, month, day, and slug
of a blog article, which is rendered dynamically using
`src/routes/[year=int]/[month=int]/[day=int]/[slug]/+page.svelte`. Dynamic means
that a page is built from each file used as input; in this case from blog post
markdown files in `content/blog`. The page in `src/routes` above is the template
for rendering all blog articles.

Svelte pages can include Svelte components. These are generally stored in
`src/lib/components`. Think of these as building blocks for presenting different
types of data or code.

For more advanced editing of the Svelte pages and components, please contact
[Brendan @ Astute Spruce](mailto:bcward@astutespruce.com) for more assistance.
