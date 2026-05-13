# SECAS Projects data preparation

The SECAS boundary and SECAS states were prepared as part of the the
[Southeast Conservation Blueprint Explorer](https://github.com/astutespruce/secas-blueprint)
project and saved to:

- `data/boundaries/se_boundary.fgb`.
- `data/boundaries/states.fgb`

## Prepare other boundaries

Other boundaries can be created and added to the tileset if they are very
complex and / or do not render very well using the GeoJSON project boundary.

If necessary, these can be preprocessed using scripts added to this repository.
For example, `analysis/prep/extract_military_lands.py` processes the complex
mashup of boundaries for the military roundup project into a GIS file that can
be used as input for tiling.

Add code to `analysis/prep/create_tiles.py` to read in these other boundaries,
assign appropriate IDs, and merge them into the set of features that will be
converted to map tiles.

## Create tiles

Map tiles are created using the PMTiles format (no tile server required) using
`analysis/prep/create_tiles.py`. These tiles are saved to
`static/boundaries.pmtiles` where they are automatically served using the same
file hosting as the rest of the user interface of this application.

## Available boundaries in the tileset

These are based on the boundary IDs assiged in the above script:

- `secas`: the outer SECAS analysis boundary
- states by 2-letter abbreviation, e.g., `NC`
- other boundaries specifically added to the tileset, e.g., `military`
