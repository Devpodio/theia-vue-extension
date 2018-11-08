import { injectable } from "inversify";
import { IConnection, BaseLanguageServerContribution } from "@theia/languages/lib/node";
import { VUE_LANGUAGE_ID, VUE_LANGUAGE_NAME } from '../common';
import { resolve } from 'path';

@injectable()
export class VueContribution extends BaseLanguageServerContribution {

    readonly id = VUE_LANGUAGE_ID;
    readonly name = VUE_LANGUAGE_NAME;

    start(clientConnection: IConnection): void {
        const command = 'node';
        const args: string[] = [
            resolve(__dirname, './vue-starter'),
            '--stdio'
        ];
        try {
            const serverConnection = this.createProcessStreamConnection(command, args);
            serverConnection.reader.onError(err => {
                console.log(err)
            })
            this.forward(clientConnection, serverConnection);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    protected onDidFailSpawnProcess(error: Error): void {
        super.onDidFailSpawnProcess(error);
        console.error("Error starting vue language server.");
    }
}