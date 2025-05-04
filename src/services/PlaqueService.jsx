import plaquesJSON from '../assets/data/plaques.json';
import Plaque from '../models/Plaque';

import MaterialService from './MaterialService';


const PlaqueService = {

    /**
     * Get all available plaques.
     * 
     * @returns {Array[Plaque]} List of plaques.
     */
    getAllPlaques() {
        var plaques = Plaque.parseList(plaquesJSON);

        for (var i = 0; i < plaques.length; i++) {
            var plaque = plaques[i];
            var material = MaterialService.getMaterialByName(plaque.material);
            plaque.material = material;
        }

        return plaques;
    },

    /**
     * Get all active plaques.
     * 
     * @returns {Array[Plaque]} List of active plaques.
     */
    getActivePlaques() {
        var plaques = PlaqueService.getAllPlaques();
        var active = plaques.filter((plaque) => {
            return plaque.active;
        });

        return active;
    },

    /**
     * Find plaque by name.
     * 
     * @param {string} name Name of the plaque.
     * @returns {Plaque} Parsed object.
     */
    getPlaqueByName(name) {
        var found = null;

        var matches = plaquesJSON.filter((plaque) => {
            return plaque.name === name;
        });

        if (matches.length > 0) {
            found = Plaque.parseOne(matches[0]);
        }

        return found;
    }
};

export default PlaqueService;