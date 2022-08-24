import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'ganttchart',
  clientId: 'acheron'
};

export default keycloakConfig;