import CutResult from './CutResult';
import Plaque from './Plaque';


/**
 * Optimized plaque cuts based on instructions.
 */
class Optimization {

    /**
     * Constructor.
     */
    constructor() {
        this.id = 1;
        this.cutResults = [];
    }

    /**
     * Get a deep copy of the current optimization.
     * 
     * @returns {Optimization} Returns deep copy.
     */
    clone() {
        var optimization = new Optimization();
        optimization.id = this.id;
        optimization.cutResults = this.cutResults.slice();

        return optimization;
    }

}

export default Optimization;