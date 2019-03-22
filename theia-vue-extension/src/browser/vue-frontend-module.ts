/********************************************************************************
 * Copyright (C) 2018 Uni Sayo and others.
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

import { VueClientContribution } from './vue-client-contribution';
import { LanguageClientContribution } from '@theia/languages/lib/browser';
import { ContainerModule, interfaces } from 'inversify';
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { VueGrammarContribution } from './grammars/vue-grammar-contribution';
import { VueCallHierarchyService } from './vue-calhierarchy-service';
import { CallHierarchyService } from '@theia/callhierarchy/lib/browser/callhierarchy-service';
import { bindVuePreferences } from './vue-preferences';

export default new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => {
  bindVuePreferences(bind);

  bind(VueClientContribution).toSelf().inSingletonScope();
  bind(LanguageClientContribution).toService(VueClientContribution);

  bind(VueCallHierarchyService).toSelf().inSingletonScope();
  bind(CallHierarchyService).toService(VueCallHierarchyService);

  bind(LanguageGrammarDefinitionContribution).to(VueGrammarContribution).inSingletonScope();
});
