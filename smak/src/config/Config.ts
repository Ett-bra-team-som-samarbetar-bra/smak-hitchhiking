const config = {
  // Debug (all false = production mode)
  hideDesktopPage: false, // true = hide desktop page
  showDebugPages: true, // true = show debug page in header
  fakeUserLoggedIn: false, // true = start app as logged in fake user
  fakeUserEnabled: false, // true = Mock login/logout etc that will always work

  // Settings
  initialMapZoomLevel: 10, // NEVER CHANGE THIS

  // Animations
  enableGlobeAnimation: true, // Globe spin animation on login page
  globeAnimationSpeed: 0.02, // Speed of spin animation
  headerFooterAnimationDelay: 100, // Delay before header/footer animation starts (ms)
  StartComponentAnimationDelay: 600, // Delay before <Start> animation starts (ms)
  MapZoomAnimationDelay: 0, // Delay before mapzoom starts (ms)
  MapZoomAnimationDuration: 5000, // Map zoom animation duration (ms)
};

export default config;
