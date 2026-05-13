from pathlib import Path
import subprocess

import geopandas as gp
import pandas as pd

data_dir = Path("data/boundaries")
tmp_dir = Path("/tmp")
out_dir = Path("static")

MINZOOM = 0
MAXZOOM = 8
SECAS_STATES = [
    "AL",
    "AR",
    "FL",
    "GA",
    "KY",
    "LA",
    "MS",
    "MO",
    "MS",
    "NC",
    "OK",
    "PR",
    "SC",
    "TN",
    "TX",
    "VA",
    "VI",
    "WV",
]

### Load boundary and states
bnd = (
    gp.read_file(data_dir / "se_boundary.fgb", columns=["geometry"], engine="pyogrio")
    .to_crs("EPSG:4326")
    .explode(ignore_index=True)
)
bnd["id"] = "secas"

state_list = ",".join(f"'{s}'" for s in SECAS_STATES)
states = (
    gp.read_file(
        data_dir / "states.fgb",
        columns=["id", "geometry"],
        where=f"id in ({state_list})",
        engine="pyogrio",
    )
    .to_crs("EPSG:4326")
    .explode(ignore_index=True)
)

df = pd.concat([bnd, states], ignore_index=True)

### Load other features
# NOTE: add each dataset here and assign or read ID

military = (
    gp.read_file(
        data_dir / "military.fgb", columns=[], use_arrow=True, engine="pyogrio"
    )
    .to_crs("EPSG:4326")
    .explode(ignore_index=True)
)
military["id"] = "military"

# merge all
df = pd.concat([df, military], ignore_index=True)


### Create tiles
infilename = tmp_dir / "boundaries.fgb"
df.to_file(infilename)
outfilename = out_dir / "boundaries.pmtiles"
ret = subprocess.run(
    ["tippecanoe", "-f", "-pg", "--no-simplification-of-shared-nodes"]
    + ["-l", "boundaries"]
    + ["-Z", str(MINZOOM), "-z", str(MAXZOOM)]
    + ["-o", f"{str(outfilename)}", str(infilename)]
)
ret.check_returncode()
