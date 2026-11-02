# Southern Africa El Niño Observatory

A responsive web-based observatory prototype for regional climate, water, agriculture, ecosystem and groundwater intelligence across Southern Africa.

## Repository files

- `index.html` — page structure, navigation, dashboard content and external library references.
- `style.css` — responsive visual styling.
- `app.js` — MapLibre map setup, thematic map controls, Chart.js visualizations and dashboard interactions.

## Features included

- Regional overview and indicator cards.
- MapLibre GL JS map with OpenFreeMap basemap.
- Thematic map selector for climate stress, rainfall, temperature, soil moisture, vegetation, groundwater and agriculture.
- Water-balance and climate-signal charts.
- Country-level risk screening table.
- Preparedness and decision-support sections.

## Run locally

Open `index.html` in a modern browser. An internet connection is required to load MapLibre GL JS, Chart.js and OpenFreeMap tiles.

For local development, you may also run a simple static server from this folder, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a GitHub repository, for example `southern-africa-el-nino-observatory`.
2. Upload `index.html`, `style.css`, `app.js` and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then save.
6. Open the published Pages URL displayed in the GitHub Pages settings.

## Data and scientific status

This repository is a dashboard prototype. The thematic map currently visualizes a schematic Southern Africa extent; it does not display live gridded satellite observations. Chart values, KPI values and country-level screening values in the source dashboard are demonstration content and should not be presented as current verified conditions.

The interface is designed for future integration with Google Earth Engine, CHIRPS, ERA5-Land, MODIS/VIIRS, ESA WorldCover, JULES outputs and authenticated API services. Production deployment should replace demonstration values with quality-controlled observations and validated model outputs, and document uncertainty, provenance, units and update frequency.

Do not commit Earth Engine credentials, service-account keys, passwords or private API tokens to a public repository. Route privileged processing through a secured backend.
