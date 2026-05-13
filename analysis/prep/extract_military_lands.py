from pathlib import Path

import geopandas as gp
import numpy as np
from pyogrio import read_dataframe, write_dataframe
import shapely
from tqdm import tqdm

src_dir = Path("source_data")
out_dir = Path("data/boundaries")


print("Reading data")
df = (
    read_dataframe(
        src_dir / "CombineShapefiles_WithBuffers.shp",
        where="name='military'",
        use_arrow=True,
    )
    .to_crs("EPSG:5070")
    .explode(ignore_index=True)
)

# buffer to remove previous inset buffers
df["geometry"] = shapely.buffer(shapely.force_2d(df.geometry.values), 0.26)
df["km2"] = df.geometry.area / 1e6
df = df.sort_values(by="km2", ascending=False).reset_index(drop=True)

# sort by descending area and then clip out each
out = None
for geom in tqdm(df.geometry.values, desc="Processing features"):
    if out is None:
        out = np.array([geom])
        continue

    shapely.prepare(out)
    ix = shapely.intersects(out, geom)
    if ix.any():
        # clip this out of preceding
        clipped = shapely.difference(out[ix], geom, grid_size=0.1)
        clipped = shapely.get_parts(shapely.get_parts(clipped))
        clipped = clipped[shapely.get_type_id(clipped) == 3]

        if len(clipped):
            out = np.append(out[~ix], clipped)

    out = np.append(out, [geom])

# note: polygons are not necessarily valid; they may overlap.  Making them valid
# makes a big mess (drops polygons) so we don't do it.

df = gp.GeoDataFrame(
    {"id": "military", "geometry": shapely.multipolygons([out])},
    geometry="geometry",
    crs="EPSG:5070",
).to_crs("EPSG:4326")


write_dataframe(df, out_dir / "military.fgb")
