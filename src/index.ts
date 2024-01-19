import Application from "koa";
import Router from "@koa/router";
import { Server } from 'http';
import { createTodoList } from "./todo-list/create";
import { koaBody } from 'koa-body';
import { TodoListService } from "./todo-list/service";

export class App {
    private _httpServer?: Server;

    public async start() {
        const koaServer = new Application();

        koaServer.use(koaBody())

        const router = new Router();
        router.get('/status', (ctx) => {
            ctx.body = {
                status: 'OK'
            }
        });

        const todoService = new TodoListService();
 
        router.post('/todo-list', (ctx) => createTodoList(ctx, todoService));
    
        koaServer.use(router.routes());
    
        await new Promise((res) => {
            this._httpServer = koaServer.listen(8080, () => res(undefined))
        });
    }

    public stop() {
        return new Promise((res) => this._httpServer?.close(res));
    }
}