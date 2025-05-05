
/**
 * Individual setting for the application.
 */
class Setting {

    /**
     * Constructor.
     * 
     * @param {number} id 
     * @param {string} name 
     * @param {string} phrase Phrase key with value defined depending on translations
     * @param {any} value 
     */
    constructor(id, name, phrase, value) {
        this.id = id;
        this.name = name;
        this.phrase = phrase;
        this.value = value;
    }

    /**
     * Get a deep copy of the current setting.
     * 
     * @returns {Settings} Returns deep copy.
     */
    clone() {
        var setting = new Setting();
        setting.id = this.id;
        setting.name = this.name;
        setting.phrase = this.phrase;
        setting.value = this.value;

        return setting;
    }

    update(value) {
        this.value = value;

        return this;
    }
}

/**
 * All settings for the application.
 */
class Settings {

    /**
     * Constructor.
     */
    constructor() {
        this.units = new Setting(1, 'units', 'models.Settings.units', 'mm');
        this.displayUnits = new Setting(2, 'displayUnits', 'models.Settings.displayUnits', 0);
        this.mmToPx = new Setting(3, 'mmToPx', 'models.Settings.mmToPx', 0.25);
        this.minCut = new Setting(4, 'minCut', 'models.Settings.minCut', 100);
        this.language = new Setting(5, 'language', 'models.Settings.language', navigator.language);
        this.lastUpdate = new Setting(6, 'lastUpdate', 'models.Settings.lastUpdate', new Date());
    }

    /**
     * Get a deep copy of the current settings.
     * 
     * @returns {Settings} Returns deep copy.
     */
    clone() {
        var settings = new Settings();
        settings.units = this.units.clone();
        settings.displayUnits = this.displayUnits.clone();
        settings.mmToPx = this.mmToPx.clone();
        settings.minCut = this.minCut.clone();
        settings.language = this.language.clone();
        settings.lastUpdate = this.lastUpdate.clone();

        return settings;
    }

    update(setting, value) {
        if (setting in this) {
            /*
            console.log('si, tiene la setting');
            console.log(this[setting]);
            */

            // this[setting].value = value;
            // this[setting].update(value);
            this[setting] = this[setting].update(value);
        }

        return this;
    }

}

export default Settings;