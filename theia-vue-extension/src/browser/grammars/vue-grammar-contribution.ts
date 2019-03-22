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

import { LanguageGrammarDefinitionContribution, TextmateRegistry, getEncodedLanguageId } from '@theia/monaco/lib/browser/textmate';
import { injectable } from 'inversify';
import { VUE_LANGUAGE_ID } from '../../common';
import { registerLanguageConfigurations, registerLanguage } from './languages';
import { registerGrammars } from './grammars';

@injectable()
export class VueGrammarContribution implements LanguageGrammarDefinitionContribution {

  readonly scopeName = 'source.vue';
  readonly vueId = VUE_LANGUAGE_ID;

  registerTextmateLanguage(registry: TextmateRegistry) {
    this.registerVue();

    const grammar = require('../../../data/vue-generated.json');
    registry.registerTextmateGrammarScope(this.scopeName, {
      async getGrammarDefinition() {
        return {
          format: 'json',
          content: grammar
        };
      }
    });
    registry.registerGrammarConfiguration(this.vueId, {
      embeddedLanguages: {
        'text.html.basic': getEncodedLanguageId('html'),
        'text.html.vue-html': getEncodedLanguageId('vue-html'),
        'text.pug': getEncodedLanguageId('jade'),
        'text.pug.vue-pug': getEncodedLanguageId('vue-pug'),
        'source.css': getEncodedLanguageId('css'),
        'source.css.scss': getEncodedLanguageId('scss'),
        'source.css.less': getEncodedLanguageId('less'),
        'source.css.postcss': getEncodedLanguageId('vue-postcss'),
        'source.sass': getEncodedLanguageId('sass'),
        'source.js': getEncodedLanguageId('javascript'),
        'source.ts': getEncodedLanguageId('typescript'),
        'source.coffee': getEncodedLanguageId('coffeescript'),
        'text.html.markdown': getEncodedLanguageId('markdown'),
        'source.yaml': getEncodedLanguageId('yaml'),
        'source.json': getEncodedLanguageId('json')
      }
    });
    registry.mapLanguageIdToTextmateGrammar(this.vueId, this.scopeName);
    registerGrammars(registry);
  }
  protected registerVue() {
    monaco.languages.register({
      id: this.vueId,
      extensions: ['.vue'],
      aliases: ['Vue', 'vue']
    });
    registerLanguage();
    const configuration = require('../../../languages/vue-language-configuration.json');
    monaco.languages.onLanguage(this.vueId, () => {
      registerLanguageConfigurations();
      monaco.languages.setLanguageConfiguration(this.vueId, configuration);
    });
  }
}
