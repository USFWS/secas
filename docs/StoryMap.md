# SECAS Story Map

This interactive story map highlights several conservation projects that fall
under the Southeast Conservation Adaptation Strategy (SECAS).

## Technical architecture

The story map uses [Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js) for the map
engine. The map displays pre-rendered vector tiles for complex project boundaries,
and GeoJSON geometries representing simpler project boundaries. It displays
information and images rendered from markdown files in the sidebar.

## Development environment

Python and [tippecanoe](https://github.com/felt/tippecanoe) are used for
processing GIS data into map tiles in [PMTiles](https://docs.protomaps.com/pmtiles/)
format so they can be used directly in frontend without requiring a tile server.

It is only necessary to do this if the SECAS boundary or state boundaries change.

Install [uv](https://github.com/astral-sh/uv). Then set up a new virtual
environment:

```bash
uv venv .venv --python=3.12
```

Activate it for your shell, e.g., Fish:

```bash
source .venv/bin/activate.fish
```

Then install the dependencies specified in `pyproject.toml` (and frozen in `uv.lock`):

```bash
uv sync --frozen
```

See [analysis/prep/README.md](./analysis/prep/README.md) for more information
on the specific data processing steps.

## Content architecture

Each project displayed in the story map is organized into a dedicated folder
within `content/projects`. Within each project folder, there are 2 required files:

- `project.md`: project [markdown](https://www.markdownguide.org/) file
- `banner.jpg`: project photo that is 900 px wide and less than 640 px tall

Each project requires ONE of the following approaches for providing boundary information:

- `boundary.geojson`: project boundary polygon(s) in GeoJSON geometry format
- list of `boundary_ids` and bounding box in markdown frontmatter (described below)

The name of the project's folder is used to create a unique identifier for the
project. The name must be URL friendly.

### Project markdown file

The project markdown file is composed of 2 parts: frontmatter with project metadata
and the body of the markdown document, which is used as the project's description.

The frontmatter is composed of the following sections:

```markdown
---
title: "<project title, in quotes>"
latitude: <project representative point latitude>
longitude: <project representative point longitude>
boundary_ids: <optional: array of boundary IDs in quoted array, e.g., ["AL", "NC", "secas"] >
bounds: <optional: array of bounds in [xmin, ymin, xmax, ymax] order>
date: <project date>
location: "<location description used for internal data tracking, in quotes>"
photo_caption: "<photo caption text, in quotes; see format below>"
photo_url: "<optional: photo URL, in quotes>"
photo_position: "<optional: one of: top, center, bottom>"
---
```

The photo caption follows this general convention, and must include the words
"Photo: " preceding the text that will be linked by `photo_url`:

```
"<text description of photo>. Photo: <photo source name or copyright holder and any notes about license / use with permission>."
```

The photo position determines the position of the photo when displayed as a narrow
slice. `"top"` shows the top of the photo, `"center"` shows the center, and
`"bottom"` shows the bottom. The default is `"center"`.

If the project boundary is based on one or more boundaries in the tileset, those
can be referenced directly by providing those Ids in a list. For example:

```markdown
boundary_ids: ["AL", "MS"]
```

In this case, omit the `boundary.json` file.

When providing a list of `boundary_ids`, the `bounds` entry is required in the
frontmatter in order for the map to zoom to the extent of that project.

NOTE: this is intended for projects that are the full extent of states or
pre-tiled boundaries; it is not intended to represent projects that have smaller
boundaries _within_ those states.

Available boundary IDs in the tileset include:

- `secas`: the outer SECAS analysis boundary
- states by 2-letter abbreviation, e.g., `NC`
- other boundaries specifically added to the tileset, e.g., `military`

### Project photo

The banner photo should be resized before committing to the repository, with a
width of 900 px. After resizing, use [tinyjpg](https://tinyjpg.com/) to shrink
the JPG file further before adding to the repository; this will reduce the file
size by 10-15%.

### Project boundary (OPTIONAL)

This file can be omitted if using `boundary_ids` to refer to one or more features
in the tileset. Steps for creating the boundary tileset are described in
[analysis/prep/README.md](../analysis/prep/README.md).

The project boundary polygon(s) should be simplified to the degree possible
using [mapshaper](https://mapshaper.org/). Use mapshaper to specify the
coordinate precision of 5 decimal places on output
(enter `precision=0.00001 geojson-type=GeometryCollection` in
the options input field):

It should then be exported to GeoJSON geometry format (for a single geometry):

```json
{
    "type": "Polygon",
    "coordinates": [...]
}
```

The `GeometryCollection` exported by mapshaper is also fine.

If necessary, the boundary can be drawn by hand using [geojson.io](https://geojson.io/),
and then manually copy the `geometry` element.

## Managing content

### Updating content via Github user interface

For minor content edits and additions, it is possible to directly use the Github
user interface. All changes must be made on the `master` branch to be deployed
immediately.

Open the repository in a browser `https://github.com/<organization>/<repository>`
and make sure to select the `master` branch from the dropdown on the upper left.

The following are possible ways to edit content; see note about the automatic
build & deploy further below.

#### Editing an existing project

Navigate to `src/projects/<project ID>`.

Select `project.md` and click the Edit (pencil) icon in the upper right to edit
the file. Make your changes. Then click the "Commit changes" button on the
upper right.

#### Adding a new project from local directory

Create a local folder that uses a URL-safe name.

Assemble the files and content you will need for a new project (see above):

- `banner.jpg`
- `boundary.json`

Create and edit `project.md` as described above. You can create edit
`project.md` in your local text editor, but make sure that it saves with the
correct extension rather than `.txt` (extension may be hidden, depending on your
file browser).

It may be helpful to copy / paste the frontmatter from an existing project
(navigate to its `project.md` in Github) and modify as needed. Make sure to
view it in "Raw" mode using the button on the upper right before copying and
pasting.

Open the Github repository in your browser and navigate to `src/projects`.

Click "Add file" in the upper right and choose "Upload files". Drag and drop the
**folder** or use "choose your files" to choose the **folder** for the project,
**not** the individual files.

The user interface should then show a listing of files:

- `/<project ID>/banner.jpg`
- `/<project ID>/project.md`
- `/<project ID>/boundary.json`

Enter a commit message indicating you are adding this project. You can commit
directly to `master` if these files are ready, or you can choose to create a
branch and do a pull request with those changes later (not covered here).

#### Adding a new project from individual files

It is easier to create a new project using the folder method above.

Assemble `banner.jpg` and `boundary.json` as described above.

Open the Github repository in your browser and navigate to `src/projects`.

Click "Add file" in the upper right and choose "Create new file".

For the name of the file, enter the ID of the project followed by `/`. Example:
`my-project/`. The trailing slash is critical. **Do not** enter eny file contents.

As soon as you enter the trailing slash, Github will automatically add that to
the path where you are creating your file. Now enter `project.md` for your
filename, and enter the contents for `project.md` as described above.

Make sure that the `id` field in the frontmatter matches the project ID you used
when creating the project folder, for example, `my-project`.

Click the Commit changes button and enter a commit message (see above).

Now that the folder has been created, you can upload `banner.jpg` and `boundary.json`
to it. Click "Add file" and choose "Upload files" in the upper right, and select
those files **individually**. Then commit those.

Note that the project will appear as soon as the first build is complete, but
will show a broken project image, until the second build triggered by the commit
including `banner.jpg` is completed.

### Updating content using an offline clone of repository

Clone the repository to your local workstation using your Git tool of choice.
This will put the project in a local directory.

#### Editing content

Navigate to `src/projects/<project ID>` in your local clone. You can edit
`project.md` as needed, but make sure it is saved with a `.md` extension and
not `.txt` (which may be hidden in your file browser).

You can replace `banner.jpg` or `boundary.json` as needed.

Then using your Git tool of choice, commit the changed files and add an appropriate
commit message. You will likely commit directly to the `master` branch. Then
"push" (typically a button or step called exactly that) those changes to Github
using your Git tool.

Note: Github permissions to enable your account to push from your local clone
are outside these instructions and may require you to setup your Git tool with
your Github account in order to be authorized.

#### Adding a new project

Navigate to `src/projects` and create a new folder for your project ID. Make sure
it is URL-friendly.

In this folder, add:

- `banner.jpg`
- `boundary.json`
- `project.md`

as described above.

Then commit those 3 files using your Git tool and push those changes to Github
(described above).
