/********************************************************************************
 * Copyright (C) 2018 Uni Sayo and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
********************************************************************************/

import { injectable } from "inversify";
import { IConnection, BaseLanguageServerContribution } from "@theia/languages/lib/node";
import { VUE_LANGUAGE_ID, VUE_LANGUAGE_NAME } from '../common';
import { SpawnOptions } from 'child_process';
import { ProcessErrorEvent } from '@theia/process/lib/node/process';

@injectable()
export class VueContribution extends BaseLanguageServerContribution {

    readonly id = VUE_LANGUAGE_ID;
    readonly name = VUE_LANGUAGE_NAME;

    async start(clientConnection: IConnection): Promise<void> {
        const command = 'node';
        const args: string[] = [
            __dirname + "/vue-starter.js",
            '--stdio'
        ];
        try {
            const serverConnection = await  this.createProcessStreamConnectionAsync(command, args, this.getSpawnOptions());
            this.forward(clientConnection, serverConnection);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    protected getSpawnOptions(): SpawnOptions | undefined {
        return undefined;
    }

    protected onDidFailSpawnProcess(error: ProcessErrorEvent): void {
        super.onDidFailSpawnProcess(error);
        console.error("Error starting Vue language server.");
    }
}