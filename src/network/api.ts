import { request, get, post } from '@/network/request';

/*
 * adminLogin
 */
export function adminLogin(account: string, password: string): Promise<any> {
  return post({
    url: 'api/private/v1/login',
    data: { account, password }
  });
}
