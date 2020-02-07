
// GlBackgroundVideo: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './gl-background-video.core.js';
import { COMPONENTS } from './gl-background-video.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}
