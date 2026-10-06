import { captureAttribution, bindTracking, trackExperimentExposure } from './analytics';
import { initBooking } from './booking';
import { initUi } from './ui';
import { initConsent } from './consent';

captureAttribution();
bindTracking();
initBooking();
initUi();
initConsent();
trackExperimentExposure();
