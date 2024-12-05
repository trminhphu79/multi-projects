import { MICRO_SERVICE_NAMES } from '../microservice';

const MODULES_NAME = Object.freeze({
  AUTH: `${MICRO_SERVICE_NAMES.AUTH_SERVICE}/AUTH_MODULE`,
});

export const MESSAGE_PATTERN_AUTH = Object.freeze({
  CREATE: `${MODULES_NAME.AUTH}/create`,
  UPDATE: `${MODULES_NAME.AUTH}/update`,
  DELETE: `${MODULES_NAME.AUTH}/delete`,

  SIGN_IN: `${MODULES_NAME.AUTH}/sign-in`,
  REFRESH_TOKEN: `${MODULES_NAME.AUTH}/refresh-token`,
});