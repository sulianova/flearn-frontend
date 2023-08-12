class EnvService {
  public dataMode: 'EDIT' | 'PROD';
  constructor() {
      this.dataMode = process.env.REACT_APP_DATA_MODE as 'EDIT' | 'PROD' || 'PROD';
  }
}

export const envService = new EnvService();
