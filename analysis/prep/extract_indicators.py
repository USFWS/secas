import json
from pathlib import Path


import pandas as pd

src_dir = Path("source_data")

out_dir = Path("src/routes/blueprint-indicators")


sheets = ["Terrestrial", "Freshwater", "Coastal & Marine"]

out = {}

with pd.ExcelFile(src_dir / "Indicators_2025.xlsx", engine="calamine") as xlsx:
    for sheet in sheets:
        df = pd.read_excel(xlsx, sheet_name=sheet).rename(
            columns={
                "Indicator": "name",
                "Indicator descriptions": "description",
                "Hub Link": "url",
            }
        )[["name", "description", "url"]]

        out[sheet] = df.to_dict(orient="records")


with open(out_dir / "indicators.json", "w") as outfile:
    _ = outfile.write(json.dumps(out, ensure_ascii=False))
