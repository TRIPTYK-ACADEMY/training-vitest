import { randomUUID } from 'crypto';

enum Priority {
    HIGH,
    NORMAL,
    LOW
}

interface TodoList {
    name: string,
    todos: {
        priority: Priority,
        title: string
    }[]
}

export class TodoListService {
    private data: TodoList[] = [];

    public create(todoList: TodoList) {
        const createdTodoList = {
            ...todoList,
            createdAt: new Date(),
            id: randomUUID()
        }

        this.data.push(createdTodoList);

        return createdTodoList;
    }
}

if (import.meta.vitest) {
    const { test, expect, beforeEach, vi } = import.meta.vitest;
    
    let service: TodoListService;

    beforeEach(() => {
        vi.setSystemTime(new Date('2020-01-01'));
        service = new TodoListService();
    });

    test('Creating a TodoList should persists in the service', () => {
        service.create({
            name: 'Ranger ma chambre',
            todos: []
        });

        expect(service['data']).toStrictEqual([{
            name: 'Ranger ma chambre',
            id: expect.any(String),
            createdAt: new Date(),
            todos: []
        }]);
    });

    test('Created TodoList must return a created todoList with a  generated ID', () => {
        const result = service.create({
            name: 'Aimer ma maman',
            todos: []
        });

        expect(result).toMatchInlineSnapshot({
            id: expect.any(String)
        }, `
          {
            "createdAt": 2020-01-01T00:00:00.000Z,
            "id": Any<String>,
            "name": "Aimer ma maman",
            "todos": [],
          }
        `);
    });

    test('Created TodoList must have a createdAt property', () => {
        const result = service.create({
            name: 'CCI',
            todos: []
        });

        expect(result).toMatchSnapshot({
            id: expect.any(String)
        });
    });
}