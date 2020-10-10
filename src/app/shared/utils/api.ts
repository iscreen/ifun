import { environment } from '../../../environments/environment';

export const API = {
  get Endpoint() {
    return `${environment.api.base}/${environment.api.version}`;
  },
  get Url() {
    return environment.api.base;
  }
};
