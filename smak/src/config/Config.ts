const config = {
    // Debug (all false = production mode)
    hideDesktopPage: false,             // true = hide desktop page
    showDebugPages: true,               // true = show debug pages in /settings
    fakeUserLoggedIn: false,            // true = start app as logged in fake user
    fakeUserEnabled: true,              // true = Fake user for login/logout etc

    // Settings
    initialMapZoomLevel: 10,            // NEVER CHANGE THIS

    // Animations on login
    headerFooterAnimationDelay: 400,    // Delay before animation starts (ms)
    StartComponentAnimationDelay: 500,  // Delay before animation starts (ms)
    MapZoomDuration: 2000,              // Map zoom animation duration (ms)

};

export default config;
