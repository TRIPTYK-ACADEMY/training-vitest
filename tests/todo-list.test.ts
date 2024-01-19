import { expect, test, vi } from 'vitest';
import { App } from '../src';

test('POST /todo-list should return 200 and the created todo-list', async () => {
    vi.setSystemTime(new Date('2020-01-01'));

    const app = new App();
    await app.start();

    const response = await fetch('http://localhost:8080/todo-list', {
        method: 'POST',
        body: JSON.stringify({
            name: 'Clean car',
            todos: []
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    expect(await response.json()).toMatchInlineSnapshot({
        id: expect.any(String)
    }, `
      {
        "createdAt": "2020-01-01T00:00:00.000Z",
        "id": Any<String>,
        "name": "Clean car",
        "todos": [],
      }
    `);

    await app.stop();
    vi.useRealTimers();
});