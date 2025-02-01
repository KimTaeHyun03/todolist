/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';

clientsClaim();

// 기존 정적 파일 캐싱
precacheAndRoute(self.__WB_MANIFEST);

// ✅ 서버 API 요청(`/api/` 경로)를 서비스 워커 캐싱에서 제외하고, 항상 네트워크 요청
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'), // API 요청을 감지
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 10, // 10초 내에 응답 없으면 실패 처리
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }), // 최대 50개 응답 저장
    ],
  })
);

// ✅ 기존의 React App Shell-style 캐싱 유지 (index.html 요청 처리)
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  ({ request, url }) => {
    if (request.mode !== 'navigate') {
      return false;
    }
    if (url.pathname.startsWith('/_')) {
      return false;
    }
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// ✅ 이미지 파일 캐싱 설정
registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// ✅ 새로운 서비스 워커가 설치되었을 때 즉시 적용 (Skip Waiting)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ✅ 추가적인 서비스 워커 로직을 필요하면 여기에 작성