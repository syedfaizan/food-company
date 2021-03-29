const { getOutlets, findClosestOutlet } = require('./geolocator');


describe("Test the Outlet finder controller", () => {
    it("getOutlets should return a promise list of outlets", () => {
        let outlets = getOutlets();
        expect(outlets).toBeTruthy()
    })
    it("findClosestOutlet should return the nearest outlet", () => {
        let sampleAddress = "Stumpergasse 51, 1060 Vienna"
        let sampleOutlet = "au_vienna_schoenbrunnerstr";
        let outlet = findClosestOutlet(sampleAddress);
        expect(outlet).toBeTruthy()
    })

    it("findClosestOutlet should return the 'not found' for places far off", () => {
        let sampleAddress = "Bahnhofplatz 1, Linz, Austria"
        let sampleOutlet = "au_vienna_schoenbrunnerstr";
        let outlet = findClosestOutlet(sampleAddress);
        expect(outlet).toBeTruthy()
    })
});
