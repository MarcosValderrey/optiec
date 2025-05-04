import CutInstruction from '../models/CutInstruction';
import Order from '../models/Order';
import Plaque from '../models/Plaque';

import MaterialService from '../services/MaterialService';
import PlaqueService from '../services/PlaqueService';


/**
 * Util to create instances of different classes.
 */
class Factory {

    /**
     * Create an empty array of plaques.
     * 
     * @returns {Array[Plaque]} 
     */
    initialPlaques() {
        return [];
    }

    /**
     * Create array of plaques for the first class example.
     * 
     * @returns {Array[Plaque]} Array of plaques.
     */
    examplePlaques() {
        var plaques = [];

        /*
        var whitePlaque = PlaqueService.getPlaqueByName('mdf-arauco-blanco');
        whitePlaque.material = MaterialService.getMaterialByName(whitePlaque.material);
        plaques.push(whitePlaque);
        */

        var paraisoPlaque = PlaqueService.getPlaqueByName('mdf-arauco-paraiso');
        paraisoPlaque.material = MaterialService.getMaterialByName(paraisoPlaque.material);
        plaques.push(paraisoPlaque);

        var chapadurPlaque = PlaqueService.getPlaqueByName('chapadur-large');
        chapadurPlaque.material = MaterialService.getMaterialByName(chapadurPlaque.material);
        plaques.push(chapadurPlaque);

        return plaques;
    }

    /**
     * Create an empty order.
     * 
     * @returns {Order} New order.
     */
    initialOrder() {
        var order = new Order();
        order.plaques = [];

        var cut = new CutInstruction(1);
        order.cuts.push(cut);

        return order;
    }

    /**
     * Create order for first class example.
     * 
     * @returns {Order} New order.
     */
    exampleOrder() {
        var order = new Order();
        order.plaques = this.examplePlaques();

        var base = new CutInstruction(1);
        base.name = 'Techo y Piso';
        base.quantity = 2;
        base.base = 642;
        base.height = 500;
        base.plaque = order.plaques[0];
        order.cuts.push(base);

        var laterals = new CutInstruction(2);
        laterals.name = 'Laterales y Columnas';
        laterals.quantity = 4;
        laterals.base = 964;
        laterals.height = 482;
        laterals.plaque = order.plaques[0];
        order.cuts.push(laterals);

        var bottom = new CutInstruction(3);
        bottom.name = 'Fondo';
        bottom.quantity = 4;
        bottom.base = 1000;
        bottom.height = 642;
        bottom.plaque = order.plaques[1];
        order.cuts.push(bottom);

        var drawerCovers = new CutInstruction(4);
        drawerCovers.name = 'Tapas de Cajones';
        drawerCovers.quantity = 4;
        drawerCovers.base = 238;
        drawerCovers.height = 638;
        drawerCovers.plaque = order.plaques[0];
        order.cuts.push(drawerCovers);

        var drawerLaterals = new CutInstruction(5);
        drawerLaterals.name = 'Laterales de Cajones';
        drawerLaterals.quantity = 8;
        drawerLaterals.base = 450;
        drawerLaterals.height = 208;
        drawerLaterals.plaque = order.plaques[0];
        order.cuts.push(drawerLaterals);

        var drawerFront = new CutInstruction(6);
        drawerFront.name = 'Frente y Fondo de Cajones';
        drawerFront.quantity = 8;
        drawerFront.base = 544;
        drawerFront.height = 208;
        drawerFront.plaque = order.plaques[0];
        order.cuts.push(drawerFront);

        var drawerBottom = new CutInstruction(7);
        drawerBottom.name = 'Piso de Cajones';
        drawerBottom.quantity = 4;
        drawerBottom.base = 554;
        drawerBottom.height = 424;
        drawerBottom.plaque = order.plaques[1];
        order.cuts.push(drawerBottom);

        var plinthFront = new CutInstruction(8);
        plinthFront.name = 'Frente y Fondo de Zócalo';
        plinthFront.quantity = 2;
        plinthFront.base = 2000;
        plinthFront.height = 100;
        plinthFront.plaque = order.plaques[0];
        order.cuts.push(plinthFront);

        var plinthLaterals = new CutInstruction(9);
        plinthLaterals.name = 'Laterales y Apoyos de Zócalo';
        plinthLaterals.quantity = 2;
        plinthLaterals.base = 454;
        plinthLaterals.height = 100;
        plinthLaterals.plaque = order.plaques[0];
        order.cuts.push(plinthLaterals);

        return order;
    }

}

// Single instance
const factory = new Factory();

export default factory;