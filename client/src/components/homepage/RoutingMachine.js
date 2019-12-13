import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    let leafletElement = L.marker([51.5, -0.09])
    .Routing.control({
      waypoints: [L.latLng(27.67, 85.316),L.latLng(27.68, 85.321)]
    })
    .addTo(map.leafletElement);
    

    leafletElement.on('routesfound', function(e) {
      var routes = e.routes;
      var summary = routes[0].summary;
      console.log('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime / 3600) +'hr'+Math.round(summary.totalTime % 3600 / 60) + ' minutes');
      console.log(routes);
    });  
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);


