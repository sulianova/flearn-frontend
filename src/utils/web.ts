type TBrowserAgent =
  | 'TIKTOK'
  | 'OTHER';

const tiktokRegex = /bytedance/i;

export function getBrowserAgent(): TBrowserAgent {
  const agent = window.navigator.userAgent;
  if (tiktokRegex.test(agent)) {
    return 'TIKTOK';
  } else {
    // return 'TIKTOK';
    return 'OTHER';
  }
}
