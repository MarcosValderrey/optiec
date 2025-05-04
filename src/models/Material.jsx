
/**
 * Material surrounding an MDF plaque.
 */
class Material {

    /**
     * Constructor.
     */
    constructor() {
        this.id = null;
        this.active = null;
        this.name = null;
        this.description = null;
        this.image = null;
    }

    /**
     * Parse one material from backend response.
     * 
     * @param {object} jsonObject Raw object from backend.
     * @returns {Material} Parsed object.
     */
    static parseOne(jsonObject) {
        var material = new Material();

        if ('id' in jsonObject) {
            material.id = jsonObject['id'];
        }

        if ('active' in jsonObject) {
            material.active = jsonObject['active'];
        }

        if ('name' in jsonObject) {
            material.name = jsonObject['name'];
        }

        if ('description' in jsonObject) {
            material.description = jsonObject['description'];
        }

        if ('image' in jsonObject) {
            material.image = jsonObject['image'];
        }

        return material;
    }

    /**
     * Parse a list of materials from backend response.
     * 
     * @param {Array[object]} jsonList Raw list from backend.
     * @returns {Array[Material]} Parsed list.
     */
    static parseList(jsonList) {
        var materialList = [];

        for (var i = 0; i < jsonList.length; i++) {
            var material = Material.parseOne(jsonList[i]);
            materialList.push(material);
        }

        return materialList;
    }
}

export default Material;