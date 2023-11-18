"""
Processes OSM data to extract bus stop information in Yangon.

Data source:
    https://download.geofabrik.de/asia/myanmar.html
"""

import sys
import osmium as osm
import json
from tqdm import tqdm

class BusStopHandler(osm.SimpleHandler):
    def __init__(self, bbox, pbar):
        osm.SimpleHandler.__init__(self)
        self.bbox = bbox
        self.bus_stops = []
        self.pbar = pbar

    def node(self, n):
        # Update progress bar for each node
        self.pbar.update(1)
        if 'highway' in n.tags and n.tags['highway'] == 'bus_stop':
            if (self.bbox[0] <= n.location.lat <= self.bbox[2] and
                self.bbox[1] <= n.location.lon <= self.bbox[3]):
                bus_stop_info = {
                    'id': n.id,
                    'latitude': n.location.lat,
                    'longitude': n.location.lon,
                    'name': n.tags.get('name', 'N/A')
                }
                self.bus_stops.append(bus_stop_info)

def main(osm_file):
    # Yangon bounding box: (min_lat, min_lon, max_lat, max_lon)
    yangon_bbox = (16.587593, 95.967204, 17.090266, 96.368538)

    # Set up a dummy progress bar (we don't know total nodes in advance)
    with tqdm(desc="Analyzing OSM Data", unit='nodes') as pbar:
        handler = BusStopHandler(yangon_bbox, pbar)
        handler.apply_file(osm_file, locations=True)

    print(f"Total bus stops found in Yangon: {len(handler.bus_stops)}")

    # Export to JSON
    with open('bus_stops.json', 'w') as outfile:
        json.dump(handler.bus_stops, outfile, indent=4, ensure_ascii=False)

    print("Bus stop data exported to bus_stops.json")

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python script.py <osmfile>")
        sys.exit(1)
    main(sys.argv[1])
