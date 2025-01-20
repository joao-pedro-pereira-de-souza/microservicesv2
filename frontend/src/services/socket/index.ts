import { io, Socket } from "socket.io-client";
import type { DefaultEventsMap } from "@socket.io/component-emitter/lib/cjs/index.d.ts";
import { SocketTemplateService } from "./templates";

export class SocketService {
  constructor(
    private readonly baseIO: Socket<DefaultEventsMap, DefaultEventsMap>,
    public readonly template: SocketTemplateService
  ) {}

  static instance() {
    const domainApi =
      process.env.NEXT_PUBLIC_DOMAIN_URL_API ?? "http://localhost:2031";

    const socket = io(domainApi, {
      autoConnect: true,
      transports: ["websocket"],
      withCredentials: true,
      extraHeaders: {origin: "http://localhost:8080"}
    });
    const socketTemplateService = new SocketTemplateService(socket);

    return new SocketService(socket, socketTemplateService);
  }
}
