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

import { injectable, inject } from 'inversify';
import {
  BaseLanguageClientContribution, Workspace, Languages, LanguageClientFactory,
  ILanguageClient, Window, LanguageClientOptions, RevealOutputChannelOn
} from '@theia/languages/lib/browser';
import { ResourceProvider } from '@theia/core';
import { VUE_LANGUAGE_ID, VUE_LANGUAGE_NAME } from '../common';
import { VuePreferences } from './vue-preferences';

@injectable()
export class VueClientContribution extends BaseLanguageClientContribution {

  readonly id = VUE_LANGUAGE_ID;
  readonly name = VUE_LANGUAGE_NAME;

  constructor(
    @inject(Workspace) protected readonly workspace: Workspace,
    @inject(Languages) protected readonly languages: Languages,
    @inject(ResourceProvider) protected readonly resourceProvider: ResourceProvider,
    @inject(Window) protected readonly window: Window,
    @inject(VuePreferences) protected readonly preferences: VuePreferences,
    @inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory
  ) {
    super(workspace, languages, languageClientFactory);
  }

  get configurationSection() {
    return [this.id];
  }

  protected get globPatterns() {
    return ['**/*.vue'];
  }

  protected get documentSelector(): string[] {
    return [this.id];
  }
  protected onReady(languageClient: ILanguageClient): void {
    this.registerCustomClientNotificationHandlers(languageClient);
    super.onReady(languageClient);
  }
  protected registerCustomClientNotificationHandlers(client: ILanguageClient) {

    client.onNotification('$/displayInfo', (msg: string) => {
      this.window.showMessage(3, msg);
    });
    client.onNotification('$/displayWarning', (msg: string) => {
      this.window.showMessage(2, msg);
    });
    client.onNotification('$/displayError', (msg: string) => {
      this.window.showMessage(1, msg);
    });
  }
  protected createOptions(): LanguageClientOptions {
    const options = super.createOptions();
    if (typeof options.documentSelector === 'undefined' || !options.documentSelector.length) {
      options.documentSelector = this.documentSelector;
    }
    options.initializationOptions = {
      config: this.workspace.configurations!.getConfiguration()
    };

    options.synchronize = {
      configurationSection: ['vetur', 'emmet', 'html', 'javascript', 'typescript', 'prettier', 'stylusSupremacy'],
      fileEvents: this.workspace.createFileSystemWatcher!('{**/*.js,**/*.ts}', false, false, true)
    };
    options.revealOutputChannelOn = RevealOutputChannelOn.Never;
    return options;
  }
}
