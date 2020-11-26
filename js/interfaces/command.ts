import { Message } from "discord.js";

export interface command {
    readonly cmnd_name: string;
    execute: (userInput: Message, args?: string[]) => void;
}
