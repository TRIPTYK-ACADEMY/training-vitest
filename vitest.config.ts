/// <reference types="vitest" />
import { defineConfig  } from 'vite';

export default defineConfig({
    test: {
        include: ['tests/**/*.test.ts'],
        includeSource: ['src/**/*.ts'],
        pool: 'forks',
        poolOptions: {
            forks: {
                singleFork: true
            }
        }
    },
});