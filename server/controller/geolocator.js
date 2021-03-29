const parseKML = require('parse-kml');
const KML_FILE = "server/kml/FullStackTest_DeliveryAreas.kml";
const MapQuest = require('@mapquest/geocoding');
const MapClient = new MapQuest({
    key: 'mLsRm6TFfd9Vd2U0rYyd4SGIR1oqE8B1'
});
const checkIfInPolygin = require('robust-point-in-polygon');

async function getOutlets(kmlFile = KML_FILE) {
    let rawKML = (await parseKML.toJson(kmlFile)).features;
    return rawKML
}

async function findClosestOutlet(address) {
    let outlets = await getOutlets();
    let userCoordinates = await MapClient.forward(address);
    let found = null;
    outlets.filter(i => i.geometry.type === 'Polygon').forEach(outlet => {
        let isInsidePolygon = checkIfInPolygin(
            outlet.geometry.coordinates[0],
            userCoordinates.geometry.coordinates
        );
        if (isInsidePolygon !== 1) {
            found = outlet
        }
    });
    if (found != null) {
        return found.properties.name;
    }
    return 'not found';

}


module.exports = {
    findClosestOutlet,
    getOutlets
}