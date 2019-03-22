/********************************************************************************
 * Copyright (C) 2019 Uni Sayo and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { injectable } from 'inversify';
import { IConnection, BaseLanguageServerContribution } from '@theia/languages/lib/node';
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
      __dirname + '/vue-starter.js',
      '--stdio'
    ];
    console.info('starting Vue language server');
    try {
      const serverConnection = await this.createProcessStreamConnectionAsync(command, args, this.getSpawnOptions());
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
    console.error('Error starting Vue language server.');
  }
}
