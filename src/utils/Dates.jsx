
/**
 * Util functions for date formatting.
 */
class DateUtils {

    /**
     * Format date like YYYY-MM-DD HH:mm:ss.
     * 
     * @param {Date} date Date to format.
     * @returns Formatted date.
     */
    static formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const formatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return formatted;
    }

}

export default DateUtils;