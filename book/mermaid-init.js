(() => {
    const darkThemes = ['ayu', 'navy', 'coal'];
    const lightThemes = ['light', 'rust'];

    const classList = document.getElementsByTagName('html')[0].classList;

    let lastThemeWasLight = true;
    for (const cssClass of classList) {
        if (darkThemes.includes(cssClass)) {
            lastThemeWasLight = false;
            break;
        }
    }

    // Light: 'base' theme with the book palette. Dark: built-in dark theme.
    // Individual diagrams colour their nodes with classDef (see the palette in the style guide),
    // which works in both modes.
    const theme = lastThemeWasLight ? 'base' : 'dark';
    mermaid.initialize({
        startOnLoad: true,
        theme,
        themeVariables: lastThemeWasLight ? {
            fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
            fontSize: '16px',
            primaryColor: '#E3F2FD',
            primaryBorderColor: '#1E88E5',
            primaryTextColor: '#0D253F',
            lineColor: '#5C6B7A',
            secondaryColor: '#E0F2F1',
            tertiaryColor: '#F5F7F8',
            actorBkg: '#FFFFFF',
            actorBorder: '#78909C',
            actorTextColor: '#0D253F',
            actorLineColor: '#B0BEC5',
            signalColor: '#37474F',
            signalTextColor: '#0D253F',
            noteBkgColor: '#FFFFFF',
            noteBorderColor: '#B0BEC5',
            noteTextColor: '#0D253F',
        } : {},
        flowchart: { curve: 'basis', htmlLabels: true, padding: 14, nodeSpacing: 40, rankSpacing: 50 },
        sequence: { mirrorActors: false, actorMargin: 60, messageMargin: 36 },
    });

    // Simplest way to make mermaid re-render the diagrams in the new theme is via refreshing the page

    for (const darkTheme of darkThemes) {
        document.getElementById(darkTheme).addEventListener('click', () => {
            if (lastThemeWasLight) {
                window.location.reload();
            }
        });
    }

    for (const lightTheme of lightThemes) {
        document.getElementById(lightTheme).addEventListener('click', () => {
            if (!lastThemeWasLight) {
                window.location.reload();
            }
        });
    }
})();
