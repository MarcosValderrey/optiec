import Cut from './CutInstruction';
import Plaque from './Plaque';


class Order {

    /**
     * Constructor.
     */
    constructor() {
        this.id = 1;
        this.plaques = [];
        this.cuts = [];
        this.optimized = null;
    }

    /**
     * Get a deep copy of the current order.
     * 
     * @returns {Order} Returns deep copy.
     */
    clone() {
        var order = new Order();
        order.id = this.id;
        order.plaques = this.plaques.slice();
        order.cuts = this.cuts.slice();

        return order;
    }

    /**
     * Add a new plaque to the list.
     * 
     * @param {Plaque} plaque Plaque to add to list.
     * @returns {Order} Returns reference to this instance for chaining.
     */
    addPlaque(plaque) {
        this.plaques.push(plaque);

        return this;
    }

    /**
     * Remove an existing plaque from the list.
     * 
     * @param {number} id Plaque ID inside plaques list.
     * @returns {Order} Returns reference to this instance for chaining. 
     */
    removePlaque(id) {
        var updatedPlaques = [];
        for (var i = 0; i < this.plaques.length; i++) {
            if (this.plaques[i].id == id) {
                continue;
            }

            updatedPlaques.push(this.plaques[i]);
        }

        this.plaques = updatedPlaques;

        return this;
    }

    /**
     * Add a new empty cut to the list.
     * 
     * @returns {Order} Returns reference to this instance for chaining.
     */
    addCut() {
        const nextId = this.cuts.length + 1;
        const cut = new Cut(nextId);

        this.cuts.push(cut);

        return this;
    }

    /**
     * Remove cut from the list by id.
     * 
     * @param {number} id Cut ID inside cuts list.
     * @returns {Order} Returns reference to this instance for chaining.
     */
    removeCut(id) {
        // Clear row if there is only one
        if (this.cuts.length === 1) {
            this.cuts = [];
            this.addCut();

            return this;
        }

        var updatedCuts = [];
        for (var i = 0; i < this.cuts.length; i++) {
            if (this.cuts[i].id === id) {
                continue;
            }

            updatedCuts.push(this.cuts[i]);
        }

        for (var i = 0; i < updatedCuts.length; i++) {
            updatedCuts[i].id = i + 1;
        }

        this.cuts = updatedCuts;

        return this;
    }

    /**
     * Update cut.
     * 
     * @param {*} id 
     * @param {*} field 
     * @param {*} value 
     * @returns {Order} Returns reference to this instance for chaining.
     */
    updateCut(id, field, value) {
        var found = this.cuts.find((cut) => cut.id === id);
        if (!found) {
            return this;
        }

        found.update(field, value);

        return this;
    }

    /**
     * Remove all requested cuts.
     * 
     * @returns {Order} Returns reference to this instance for chaining.
     */
    reset() {
        this.cuts = [];

        this.addCut();

        return this;
    }

    /**
     * Split cuts depending on which plaques they need.
     * 
     * @returns {Array[Array[Cut]]} Cuts separated by plaque usage.
     */
    separateCuts() {
        var cutsByPlaque = [];

        for (var i = 0; i < this.plaques.length; i++) {
            var plaque = this.plaques[i];
            var cuts = [];

            for (var j = 0; j < this.cuts.length; j++) {
                var cut = this.cuts[j];
                if (cut.plaque.id === plaque.id) {
                    cuts.push(cut);
                }
            }

            cutsByPlaque.push(cuts);
        }

        return cutsByPlaque;
    }

    /**
     * Get summary for order.
     * 
     * @returns Summary for order (probably as a string).
     */
    summary() {
        var orderSummary = 'order: ';

        if (this.cuts.length > 1) {
            orderSummary += this.cuts.length + ' cuts';
        } else {
            orderSummary += this.cuts.length + ' cut';
        }

        // return orderSummary;

        return this.cuts;
    }
}

export default Order;