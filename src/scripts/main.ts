import { captureAttribution, bindTracking, trackExperimentExposure } from './analytics';
import { initBooking } from './booking';
import { initUi } from './ui';

captureAttribution();
bindTracking();
initBooking();
initUi();
trackExperimentExposure();
