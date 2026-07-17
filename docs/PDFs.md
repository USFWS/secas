# PDF file management

All PDF files are stored in `content/pdf` or subdirectories.

These are exposed at `https://secassoutheast.org/<filename>`.

In code, these are referenced using the `asset` function:

```html
<a href={asset('/pdf/<filename>')} target="_blank">link name</a>
```

This provides the dynamic lookup to the PDF folder.
