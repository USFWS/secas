# Images

See [Images.md](./Images.md) for high-level guidance about images; this page is
focused on specifics for markdown files.

All images are stored in the `content/images` folder or subfolders.

Important: the hero image and images in the body of the markdown are processed
different, so the way you enter their path will differ. The hero image is
always assumed to be relative to the `content/images` folder, so you generally
only need to put in its filename (e.g., `my-file.png`).

In all cases, make sure that the capitalization of the filename exactly matches
the casing that you enter for the filename in markdown.

Images referenced in the body of markdown files need to follow a specific structure in
order to leverage optimization. These use the `<enhanced:img src="" />` image
tag to perform optimization of the image at build time, and render to a
responsive-friendly `<picture>` element with different sizes available.

IMPORTANT: the `<enhanced:img />` tag MUST be closed with the `/>` at the end; if
you close it with `>` only, you will cause errors and content to display incorrectly.

The URL of the image MUST be `$images/<filename>`; the `$images` prefix is a
dynamic lookup to the `content/images` folder. It needs to do this dynamic
lookup for the optimization process.

All images should be nested in `<figure>` elements with an associated caption:

```html
<figure>
	<enhanced:img src="$images/my-image.png" alt="brief alt text" />
	<figcaption>A great caption describing the image above.</figcaption>
</figure>
```

If necessary, you can add Tailwind classes to these elements as needed for more
control over display. For instance, if you want to use a centered image that is
not the full width of the page, you would do something like:

```html
<figure class="flex flex-col items-center">
	<enhanced:img src="$images/my-image.png" alt="brief alt text" class="max-w-[600px]" />
	<figcaption>A great caption describing the image above.</figcaption>
</figure>
```
