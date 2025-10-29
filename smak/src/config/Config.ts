const config = {
    // Debug (all false = production mode)
    hideDesktopPage: true,             // true = hide desktop page
    showDebugPages: true,               // true = show debug pages in /settings
    fakeUserLoggedIn: true,            // true = start app as logged in fake user
    fakeUserEnabled: true,              // true = Fake user for login/logout etc

    // Settings
    initialMapZoomLevel: 10,            // NEVER CHANGE THIS

    // Animations on login
    headerFooterAnimationDelay: 100,    // Delay before header/footer animation starts (ms)
    StartComponentAnimationDelay: 600,  // Delay before <Start> animation starts (ms)
    MapZoomAnimationDelay: 0,           // Delay before mapzoom starts (ms)
    MapZoomDuration: 5000,              // Map zoom animation duration (ms)
};

export default config;
