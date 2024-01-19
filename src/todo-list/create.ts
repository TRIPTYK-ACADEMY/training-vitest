import { RouterContext } from "@koa/router";
import { TodoListService } from "./service";

export function createTodoList(ctx: RouterContext, service: TodoListService) {
    const body = ctx.request.body;

    const todo = service.create(body);

    ctx.body = todo;
}

if (import.meta.vitest) {
    const { test, vi, expect } = await import('vitest');

    test('ctx.body should be a todoList object returned by the service', async () => {
        const ctx = {
            // utilisé en sortie
            body: {},
            request: {
                body: {
                    // utilisé en entrée
                    name: 'truc'
                }
            }
        };

        const fakeService = {
            create: vi.fn(() => ({
                name: 'todolist'
            }))
        };

        
        expect(fakeService.create).toBeCalledTimes(0);
        createTodoList(ctx as never, fakeService as never);
        expect(fakeService.create).toBeCalledTimes(1);
        expect(fakeService.create).toBeCalledWith(
            {
                name: 'truc'
            }
        );

        expect(ctx.body).toStrictEqual({
            name: 'todolist'
        });
    })
}