class EnvService {
  public dataMode: 'EDIT' | 'PROD';
  public env: 'dev' | 'prod';
  constructor() {
      this.dataMode = process.env.REACT_APP_DATA_MODE as 'EDIT' | 'PROD' || 'PROD';
      this.env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
  }
}

export const envService = new EnvService();
