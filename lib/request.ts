import axios from 'axios';

/**
 * 请求超时时间
 */
export const TIMEOUT = 60 * 1000;

/**
 * 用于在客户端请求后端
 */
export const request = axios.create({
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
