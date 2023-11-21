---
layout: post
published: true
title: >-
  Blueprint 2023 data now available in the Blueprint Explorer
author: >-
  Hilary Morris, User Support & Communications for the Southeast Blueprint
hero:
  name: Explorer_SEBP2023.jpg
  alt: Screenshot of the Explorer showing a map of Southeast Blueprint 2023 in shades of purple above a gray basemap.
  caption: Now you can use the <a href="https://blueprint.geoplatform.gov/southeast/">Blueprint Explorer</a> viewer to discover the Blueprint priorities in areas new for 2023, like the Gulf marine environment and the U.S. Caribbean!
  headerClass: light-text
  float: right
---
The latest update to the Southeast Conservation Blueprint, version 2023, is now available in the Blueprint Explorer viewer! This easy-to-use mapping platform is designed to help you understand how your area of interest scores in the Blueprint, and why. It offers several different modes that allow you to summarize by a watershed or marine hexagon, drill into the data underlying a single point, and filter the Blueprint to narrow it down to the part you want to focus on. If you upload a shapefile, the automated reporting function will also generate a custom report for your area of interest. Now that the Explorer has caught up to Blueprint 2023, you can use these great features to discover the Blueprint priorities in new areas, like Puerto Rico, the U.S. Virgin Islands, and the offshore Gulf marine environment.<!--more-->

**Updated data and summary units**  
As part of this update, we changed the summary unit for marine areas from Outer Continental Shelf lease blocks to the 40 sq km hexagons used by EPA and the Gulf of Mexico Marine Assessment Program for Protected Species (GoMMAPPS). The previous lease blocks did not go far enough into the nearshore marine environment in the Gulf of Mexico to connect with the 12-digit HUCs used for inland areas, creating an unselectable "no-man's land" just offshore. In addition, lease blocks were not available for the U.S. Caribbean marine environment. These hexagons are consistent with the scale of the GOMMAPPS data used for the [Gulf marine mammals](https://secas-fws.hub.arcgis.com/maps/fws::gulf-marine-mammals-southeast-blueprint-indicator-2023/about) and [Gulf sea turtles](https://secas-fws.hub.arcgis.com/maps/fws::gulf-sea-turtles-southeast-blueprint-indicator-2023/about) indicators, and therefore align with the Blueprint data in the Gulf marine environment.

<figure>
  <img src="http://secassoutheast.org/images/Explorer_MarineHex.jpg" alt="Screenshot of Explorer with marine hexagon selected, showing a map of the Blueprint in shades of purple above a gray basemap, and a sidebar on the left indicating that 100% of the hexagon receives the highest score on the Gulf sea turtles indicator"/>
  <figcaption>The Explorer now uses hexagons as the summary unit in the offshore marine environment.</figcaption>
</figure>  

Several other datasets have been updated as well since the last time I blogged about the Explorer. Sea-level rise projections now feature the most recent [NOAA sea-level rise inundation data](https://coast.noaa.gov/digitalcoast/data/slr.html) from [NOAA's Sea Level Rise Viewer](https://coast.noaa.gov/slr/). The data on current urban areas now reflects the [2021 National Land Cover Database](https://www.mrlc.gov/data/nlcd-2021-land-cover-conus). And, perhaps most significantly, the Explorer now uses new future urban growth predictions--[FUTURES model projections for the contiguous United States](https://www.sciencebase.gov/catalog/item/63f50297d34efa0476b04cf7) developed by the NC State University [Center for Geospatial Analytics](https://cnr.ncsu.edu/geospatial/). These urbanization probability layers replace the previous SLEUTH data. The FUTURES data provide a more realistic picture of the likelihood of urbanization for any given point on the landscape, and better reflect the spatial patterns of how urban areas grow--not in consistent donuts around existing urban areas, but in more unpredictable ways based on changing road networks and other drivers of growth. Unfortunately, this model doesn't yet extend to the U.S. Caribbean, but the research team is already applying for funding and exploring approaches to expand their work to Puerto Rico and the U.S. Virgin Islands.

**Interface improvements**  
In addition to new data, SECAS staff have also refined several features based on feedback from a recent round of user testing conducted by members of the user support team. We met with ten key users and partners across four organizations who graciously shared their time to help improve the Explorer interface. Staff gave them a series of tasks, asked them to narrate their thought process, and observed where the testers found things easy or difficult to do. By identifying "pain points" where folks tend to get stuck, as well as the workflows that made intuitive sense, we identified several opportunities to improve the Explorer functionality.

You'll see new wording on the buttons for each mode, along with tooltips when you mouse over the button, to better clarify what each mode does.

The location search has moved from the introductory sidebar to the upper right of the map. This ensures the location search is accessible from all modes. It's also a more intuitive place to find a feature that controls the map view. We also improved the search widget so it covers a more comprehensive range of locations. You can search by place names, addresses, and even coordinates (latitude/longitude)!

We also moved out of the sidebar instructions on how to use the viewer. Those are now available from the top menu. We expanded the level of detail available in those instructions, and added screenshots. This makes the sidebar text shorter and easier to read, and provides a better step-by-step tutorial for those folks who like to read the directions before they try to assemble IKEA furniture--or use an online viewer.

<figure>
  <img src="http://secassoutheast.org/images/2023UserTestingFeatures.jpg" alt="Screenshot of Explorer with arrows drawn to new features"/>
  <figcaption>A recent round of user testing helped guide several interface improvements, including better wording and tooltips to describe each mode, moving instructions on how to use the viewer out of the sidebar, and moving the location search to the map and expanding its functionality.</figcaption>
</figure> 

Last, but certainly not least, you'll probably notice several changes to the pixel filtering mode, which was first released back in February of this year. The previous interaction required users to adjust slider bars to choose a range of values for the Blueprint, indicators, hubs and corridors and threat layers. The map would then update to show the part of the Blueprint that met those criteria. In user testing, it became clear that the slider bars confused many people, so we switched to a checkbox-style interaction that is more consistent with common practices for filtering search results on other platforms, like online shopping sites.

Now, you first click to activate a filter layer, and then check and uncheck the boxes to refine your filter criteria. This approach has several benefits:

1. You can filter by non-contiguous values, like just the low and high ends of an indicator (leaving out the classes in the middle).
2. It's much easier to see the range of values that are available to choose from for a particular filter.
3. Checkboxes make more sense than a range for indicators where the order of values isn't immediately obvious (it's fine when the range is 1 to 5 species, but it's less clear when the range is known grasslands to grassland geology).

Another change to pixel filtering in this update is that the filter options available to you will change based on the area covered by your map window. For example, if you zoom into the continental United States, the Caribbean indicators will disappear to unclutter the sidebar. Similarly, if you zoom into the Caribbean, the continental indicators will automatically hide themselves. We hope this will help keep pixel filtering relatively simple despite all the new indicators that we added for Blueprint 2023.

<figure>
  <img src="http://secassoutheast.org/images/FilteringScreenshot.jpg" alt="Screenshot of Explorer showing new filtering interaction, with the map zoomed into Puerto Rico and the U.S. Virign Islands, showing only the portion of the Blueprint that scores in the highest class of the Caribbean landscape condition indicator"/>
  <figcaption>The streamlined new look of filtering makes it even easier to find your piece of the Blueprint--in this case, the part of the Blueprint that scores in the highest class of the Caribbean landscape condition indicator.</figcaption>
</figure>

We hope you find these updates and improvements helpful! We'd love to know what you think. Feel free to share any feedback with me at [hilary_morris@fws.gov](mailto:hilary_morris@fws.gov). And as always, if you'd like any help using Southeast Blueprint 2023 in your work, user support staff are here to help--for free! You can find contact information for the user support team on the [SECAS staff page](https://secassoutheast.org/staff).

Last but definitely not least--huge thanks to Brendan Ward with [Astute Spruce](https://astutespruce.com/) for his oustanding work designing the Explorer and updating the data!
