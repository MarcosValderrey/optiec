import Plaque from './Plaque';


/**
 * Plaque after being cut by optimizer.
 */
class CutResult {

    /**
     * Constructor.
     * 
     * @param {number} id 
     * @param {Plaque} plaque Plaque to use as base.
     */
    constructor(id, plaque) {
        this.id = id;
        this.plaque = plaque;
        this.width = plaque.base;
        this.height = plaque.height;
        this.free = [
            {
                x: 0.0,
                y: 0.0,
                width: this.width,
                height: this.height
            }
        ];
        this.cuts = [];
    }

    /**
     * Get a deep copy of the current cut result.
     * 
     * @returns {CutResult} Returns deep copy.
     */
    clone() {
        var cutResult = new CutResult(this.id, this.plaque);
        cutResult.id = this.id;
        cutResult.plaque = this.plaque;
        cutResult.free = this.free.slice();
        cutResult.cuts = this.cuts.slice();

        return cutResult;
    }

}

export default CutResult;