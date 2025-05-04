import materialsJSON from '../assets/data/materials.json';
import Material from '../models/Material';


const MaterialService = {

    /**
     * Get all available materials.
     * 
     * @returns {Array[Material]} List of materials.
     */
    getAllMaterials() {
        return Material.parseList(materialsJSON);
    },

    /**
     * Get all active materials.
     * 
     * @returns {Array[Material]} List of active materials.
     */
    getActiveMaterials() {
        var all = MaterialService.getAllMaterials();
        var active = all.filter((material) => {
            return material.active;
        });

        return active;
    },

    /**
     * Find material by name.
     * 
     * @param {string} name Name of the material.
     * @returns {Material} Parsed object.
     */
    getMaterialByName(name) {
        var found = null;

        var matches = materialsJSON.filter((material) => {
            return material.name === name;
        });

        if (matches.length > 0) {
            found = Material.parseOne(matches[0]);
        }

        return found;
    }
};

export default MaterialService;