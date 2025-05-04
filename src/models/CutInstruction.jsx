
/**
 * Instruction for cutting a plaque.
 */
class CutInstruction {

    /**
     * Constructor.
     * 
     * @param {number} id 
     */
    constructor(id) {
        this.id = id;
        this.name = '';
        this.quantity = '';
        this.base = '';
        this.height = '';
        this.plaque = null;
    }

    /**
     * Get a deep copy of the current cut intruction.
     * 
     * @returns {CutInstruction} Returns deep copy.
     */
    clone() {
        var cutInstruction = new CutInstruction(this.id);
        cutInstruction.name = this.name;
        cutInstruction.quantity = this.quantity;
        cutInstruction.base = this.base;
        cutInstruction.height = this.height;
        cutInstruction.plaque = this.plaque;

        return cutInstruction;
    }

    /**
     * Update field by name.
     * 
     * @param {string} field Name of the field.
     * @param {any} value New value.
     */
    update(field, value) {
        if (field in this) {
            switch (field) {
                case 'name':
                    this.name = value;
                    break;
                case 'quantity':
                    this.quantity = parseInt(value);
                    break;
                case 'base':
                    this.base = parseInt(value);
                    break;
                case 'height':
                    this.height = parseInt(value);
                    break;
                case 'plaque':
                    this.plaque = value;
                    break;
                default:
                    throw new Error(`No update specification for field ${field}`);
            }
        }
    }

}

export default CutInstruction;