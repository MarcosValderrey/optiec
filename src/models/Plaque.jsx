
/**
 * Medium density fiberboard.
 * It is a composite wood product made from wood fibers, resin and wax.
 */
class Plaque {

    /**
     * Constructor.
     */
    constructor() {
        this.id = null;
        this.active = null;
        this.name = null;
        this.description = null;
        this.brand = null;
        this.thickness = null;
        this.base = null;
        this.height = null;
        this.material = null;
        this.price = null;
    }

    /**
     * Parse plaque from backend response.
     * 
     * @param {object} jsonObject Raw object from backend.
     * @returns {Plaque} Parsed object.
     */
    static parseOne(jsonObject) {
        var plaque = new Plaque();

        if ('id' in jsonObject) {
            plaque.id = jsonObject['id'];
        }

        if ('active' in jsonObject) {
            plaque.active = jsonObject['active'];
        }

        if ('name' in jsonObject) {
            plaque.name = jsonObject['name'];
        }

        if ('description' in jsonObject) {
            plaque.description = jsonObject['description'];
        }

        if ('brand' in jsonObject) {
            plaque.brand = jsonObject['brand'];
        }

        if ('thickness' in jsonObject) {
            plaque.thickness = parseFloat(jsonObject['thickness']);
        }

        if ('base' in jsonObject) {
            plaque.base = parseFloat(jsonObject['base']);
        }

        if ('height' in jsonObject) {
            plaque.height = parseFloat(jsonObject['height']);
        }

        if ('material' in jsonObject) {
            plaque.material = jsonObject['material'];
        }

        if ('price' in jsonObject) {
            plaque.price = parseFloat(jsonObject['price']);
        }

        return plaque;
    }

    /**
     * Parse a list of plaques from backend response.
     * 
     * @param {Array[object]} jsonList Raw list from backend.
     * @returns {Array[Plaque]} Parsed list.
     */
    static parseList(jsonList) {
        var plaqueList = [];

        for (var i = 0; i < jsonList.length; i++) {
            var plaque = Plaque.parseOne(jsonList[i]);
            plaqueList.push(plaque);
        }

        return plaqueList;
    }

    /**
     * Get a deep copy of the current plaque.
     * 
     * @returns {Plaque} Returns deep copy.
     */
    clone() {
        var plaque = new Plaque();
        plaque.id = this.id;
        plaque.name = this.name;
        plaque.description = this.description;
        plaque.brand = this.brand;
        plaque.thickness = this.thickness;
        plaque.base = this.base;
        plaque.height = this.height;
        plaque.material = this.material;
        plaque.price = this.price;

        return plaque;
    }

}

export default Plaque;