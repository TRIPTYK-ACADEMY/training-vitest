import { test, expect, beforeEach } from 'vitest';
import { App } from '../src';

beforeEach(async () => {
    const app = new App();
    await app.start();
    return () => app.stop();
})

test('Application should return 200 OK on GET /status', async () => {
    const response = await fetch('http://localhost:8080/status');

    expect(response.status).toStrictEqual(200);
    expect(await response.json()).toStrictEqual({
        status: 'OK'
    });
});

test('Application should return 404 on unknown route', async () => {
    const response = await fetch('http://localhost:8080/skdfjklsdjflksd');
    expect(response.status).toStrictEqual(404);
})