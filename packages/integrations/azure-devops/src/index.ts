import { Client } from '@morten-olsen/ducktape-server';
import axios from 'axios';

export type ConfigType = {
  accessToken: string;
}

type ApiOptions = {
  baseURL: string;
  auth: {
    username: string;
    password: string;
  };
};

class AzureDevOpsClient extends Client<ConfigType> {
  private _apiOptions?: ApiOptions;

  async healthCheck() {
    return true;
  }

  async createConfig() {
    const answers = await this.prompt({
      type: 'input',
      name: 'accessToken',
      message: 'access token',
    });
    return answers;
  }

  async setup(config: ConfigType) {
    this._apiOptions = {
      baseURL: 'https://vsrm.dev.azure.com',
      auth: {
        username: 'hello@example.com',
        password: config.accessToken,
      },
    };
  }

  private get apiOptions() {
    if (!this._apiOptions) {
      throw new Error('Api options not initialized');
    }
    return this._apiOptions;
  }

  async getReleaseDefinitions(team: string, project: string) {
    const { data } = await axios.get(`/${team}/${project}/_apis/release/definitions?api-version=5.1`, this.apiOptions);
    return data && data.value && data.value.length > 0;
  }

  async getReleases(team: string, project: string, definition: number, environment: number) {
    const { data } = await axios.get(`/${team}/${project}/release/releases?api-version=5.12&definitionId=${definition}&definitionEnvironmentId=${environment}&$expand=environments,artifacts`, this.apiOptions);
    const raw = data.value
    const releases = raw.map((data: any) => {
      const env = data.environments.find((d: any) => d.definitionEnvironmentId === environment);
      return {
        id: env.release.id,
        name: env.release.id,
        releaser: env.releaseCreatedBy.displayName,
        status: env.status,
        version: data.artifacts[0].definitionReference.version.id,
        mergeVersion: data.artifacts[0].definitionReference.version.id.split('.').pop(),
      }
    });
    return releases;
  }
}

export default AzureDevOpsClient;