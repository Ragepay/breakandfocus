import { beforeAll, afterAll, jest } from "@jest/globals";
import Server from "../../src/config/server";
import MemoryStorage from "../../src/storage/memory.storage";
import mongoose from "mongoose";

let server: Server;

beforeAll(async () => {
  jest.spyOn(console, 'log').mockImplementation(() => { });
  jest.spyOn(console, 'error').mockImplementation(() => { });
  MemoryStorage.deleteLoginAttempts('admin@admin.com');
  server = new Server({ listen: false });
  await new Promise((resolve) => setTimeout(resolve, 300));
});

afterAll(async () => {
  await mongoose.disconnect();
  jest.restoreAllMocks();
});

export const getApp = () => server.app;
