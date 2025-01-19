class EnvService {
  public dataMode: 'EDIT' | 'PROD';
  public telegramUrl: string;
  public env: 'dev' | 'prod';
  constructor() {
    if (!process.env.REACT_APP_TELEGRAM_URL) throw new Error('REACT_APP_TELEGRAM_URL is undefined');

    this.dataMode = process.env.REACT_APP_DATA_MODE as 'EDIT' | 'PROD' || 'PROD';
    this.env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
    this.telegramUrl = process.env.REACT_APP_TELEGRAM_URL;
  }
}

export const envService = new EnvService();
