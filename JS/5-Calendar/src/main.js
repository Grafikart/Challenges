import {Events} from "./data.js";

/**
 * @typedef {{
 *     name: string,
 *     start: Date,
 *     end: Date,
 *     fullDay?: boolean,
 *     type?: string
 * }} CalendarEvent Évènement à placer dans le calendrier
 */

class Calendar {

    /**
     * @param {HTMLElement} root Element sur lequel on monte le calendrier
     * @param {CalendarEvent[]} events Liste des évènements à afficher
     * @param {number} month Mois du calendrier (0 pour Janvier)
     * @param {number} year Année du calendrier
     */
    constructor(root, events, month, year) {
        /**
         * Commencer le code ici
         */
    }
}

const c = new Calendar(
    document.getElementById('app'),
    Events,
    new Date().getMonth(),
    new Date().getFullYear()
)
