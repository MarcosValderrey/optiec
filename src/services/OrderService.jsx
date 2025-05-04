
import CutResult from '../models/CutResult';
import Optimization from '../models/Optimization';
import Order from '../models/Order';
import Plaque from '../models/Plaque';


const OrderService = {

    /**
     * Optimize cuts for specific order.
     * 
     * @param {Order} order Order to optimize.
     * @returns {Order} Same order with optimization in place.
     */
    optimize(order) {
        console.log('OPTIMIZE ORDER');
        console.log(order);

        /*
        function createNewPlaque(width, height) {
            return {
                width,
                height,
                freeAreas: [
                    {
                        x: 0,
                        y: 0,
                        width: width,
                        height: height
                    }],
                cuts: []
            };
        }
        */

        function placePieceInPlaque(cutResult, piece) {
            for (let i = 0; i < cutResult.free.length; i++) {
                let area = cutResult.free[i];

                if (piece.width <= area.width && piece.height <= area.height) {

                    // Place cut
                    cutResult.cuts.push({
                        x: area.x,
                        y: area.y,
                        width: piece.width,
                        height: piece.height
                    });

                    // Split free area (guillotine split)
                    let right = {
                        x: area.x + piece.width,
                        y: area.y,
                        width: area.width - piece.width,
                        height: piece.height
                    };

                    let top = {
                        x: area.x,
                        y: area.y + piece.height,
                        width: area.width,
                        height: area.height - piece.height
                    };

                    // Remove used area and add splits back
                    cutResult.free.splice(i, 1);
                    if (right.width > 0 && right.height > 0) {
                        cutResult.free.push(right);
                    }
                    if (top.width > 0 && top.height > 0) {
                        cutResult.free.push(top);
                    }

                    return true;
                }
            }

            return false;
        }

        /**
         * Cut plaque according to cut instructions.
         * 
         * @param {*} plaque 
         * @param {*} cuts 
         * @returns 
         */
        function cutPlaque(plaque, cuts) {
            // Convert list into individual cuts
            var pieces = [];
            cuts.forEach(cut => {
                for (let i = 0; i < cut.quantity; i++) {
                    pieces.push({
                        width: cut.base,
                        height: cut.height
                    });
                }
            });

            // Sort by largest area first
            pieces.sort((a, b) => (b.width * b.height) - (a.width * a.height));

            var cutResults = [];

            // Initialize first plaque
            // var plaqueWidth = plaque.base;
            // var plaqueHeight = plaque.height;
            // var currentPlaque = createNewPlaque(plaqueWidth, plaqueHeight);
            // plaques.push(currentPlaque);

            var cutResult = new CutResult(1, plaque);
            cutResults.push(cutResult);

            pieces.forEach(piece => {
                let placed = false;
                for (let cutResult of cutResults) {
                    placed = placePieceInPlaque(cutResult, piece);
                    if (placed) {
                        break;
                    }
                }

                if (!placed) {
                    // Need new plaque
                    // let newPlaque = createNewPlaque(plaqueWidth, plaqueHeight);
                    // cutResults.push(newPlaque);
                    var newCutResult = new CutResult(1, plaque);
                    cutResults.push(newCutResult);

                    if (!placePieceInPlaque(newCutResult, piece)) {
                        throw new Error("Piece too big for plaque!");
                    }
                }
            });

            return cutResults;
        }

        var cutsByPlaque = order.separateCuts();
        var optimized = new Optimization();
        // order.optimized = [];

        // Cut each plaque
        for (var i = 0; i < order.plaques.length; i++) {
            var plaque = order.plaques[i];
            var cuts = cutsByPlaque[i];

            /*
            console.log('plaque');
            console.log(plaque);
            console.log('cuts');
            console.log(cuts);
            */

            var cutResults = cutPlaque(plaque, cuts);
            // console.log('cutResults');
            // console.log(cutResults);

            for (var j = 0; j < cutResults.length; j++) {
                optimized.cutResults.push(cutResults[j]);
            }

        }

        order.optimized = optimized;

        console.log('OPTIMIZED');
        console.log(optimized);

        return order;
    }

};

export default OrderService;