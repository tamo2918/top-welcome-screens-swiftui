/**
 * Metro module IDs for every local bitmap used by a replica. Loading these
 * before the router mounts keeps the authored timeline from outrunning a
 * first-use asset decode on cold launches and screenshot runs.
 */
export const WELCOME_ASSET_MODULES = [
  require('../../assets/welcome/duolingo/mascot-closed.png'),
  require('../../assets/welcome/duolingo/mascot.png'),
  require('../../assets/welcome/duolingo/splash-face-closed.png'),
  require('../../assets/welcome/duolingo/splash-face.png'),
  require('../../assets/welcome/duolingo/wordmark.png'),
  require('../../assets/welcome/strava/hero.png'),
  require('../../assets/welcome/strava/wordmark.png'),
  require('../../assets/welcome/myfitnesspal/card.png'),
  require('../../assets/welcome/myfitnesspal/next-card.png'),
  require('../../assets/welcome/myfitnesspal/wordmark.png'),
  require('../../assets/welcome/perplexity/brand-lockup.png'),
  require('../../assets/welcome/yazio/apples.png'),
  require('../../assets/welcome/yazio/calendar.png'),
  require('../../assets/welcome/yazio/carrot.png'),
  require('../../assets/welcome/yazio/chef-hat.png'),
  require('../../assets/welcome/yazio/clock.png'),
  require('../../assets/welcome/yazio/intro-mascot.png'),
  require('../../assets/welcome/yazio/wordmark.png'),
  require('../../assets/welcome/onx-hunt/brand-lockup.png'),
  require('../../assets/welcome/onx-hunt/terrain.png'),
  require('../../assets/welcome/speak-learn/avatar.png'),
  require('../../assets/welcome/speak-learn/hero.png'),
  require('../../assets/welcome/speak-learn/logo-mark.png'),
  require('../../assets/welcome/hallow/scene.png'),
  require('../../assets/welcome/scrl/mosaic.png'),
  require('../../assets/welcome/speak-language/lower-blur.png'),
] as const;
