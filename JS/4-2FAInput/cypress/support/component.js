import '../../src/source.js'

/**
 * Commande personnalisée pour monter le custom element pour les tests
 */
Cypress.Commands.add('mount', (props) => {
    return cy.then(() => {
        const root = document.querySelector('body')
        const attrs = Object.keys(props).map(key => `${key}="${props[key]}"`).join(' ')
        root.innerHTML = `<h1>Entrez votre code d'authentification</h1><form action="" method="get">
            <code-input
                ${attrs}
            ></code-input>
            <button type="submit">Envoyer</button>
        </form>`
    })
})

Cypress.Commands.add(
    'paste',
    {
        prevSubject: true,
    },
    (subject, pastePayload) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
        const pasteEvent = Object.assign(new Event('paste', {bubbles: true, cancelable: true}), {
            clipboardData: {
                getData: (type = 'text') => pastePayload,
            },
        });
        subject[0].dispatchEvent(pasteEvent);

        return subject;
    }
);
