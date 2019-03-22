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

import { TextmateRegistry, getEncodedLanguageId } from '@theia/monaco/lib/browser/textmate';

export function registerGrammars(registry: TextmateRegistry) {
  const postcssGrammar = require('../../../data/vue-postcss.json');
  registry.registerTextmateGrammarScope('source.css.postcss', {
    async getGrammarDefinition() {
      return {
        format: 'json',
        content: postcssGrammar
      };
    }
  });
  registry.mapLanguageIdToTextmateGrammar('vue-postcss', 'source.css.postcss');

  const htmlGrammar = require('../../../data/vue-html.tmLanguage.json');
  registry.registerTextmateGrammarScope('text.html.vue-html', {
    async getGrammarDefinition() {
      return {
        format: 'json',
        content: htmlGrammar
      };
    }
  });
  registry.registerGrammarConfiguration('vue-html', {
    embeddedLanguages: { 'source.js': getEncodedLanguageId('javascript') }
  });
  registry.mapLanguageIdToTextmateGrammar('vue-html', 'text.html.vue-html');

  const pugGrammar = require('../../../data/vue-pug.tmLanguage.json');
  registry.registerTextmateGrammarScope('text.pug.vue-pug', {
    async getGrammarDefinition() {
      return {
        format: 'json',
        content: pugGrammar
      };
    }
  });
  registry.registerGrammarConfiguration('vue-pug', {
    embeddedLanguages: { 'source.js': getEncodedLanguageId('javascript') }
  });
  registry.mapLanguageIdToTextmateGrammar('vue-pug', 'text.pug.vue-pug');
}
