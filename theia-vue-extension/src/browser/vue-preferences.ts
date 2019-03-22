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

import { interfaces } from 'inversify';
import {
  createPreferenceProxy,
  PreferenceProxy,
  PreferenceService,
  PreferenceContribution,
  PreferenceSchema,
  PreferenceChangeEvent
} from '@theia/core/lib/browser/preferences';

interface FormatterConfiguration {

  prettier: object;

  /** Base directory of this build.  */
  prettyhtml: {
    printWidth: number,
    singleQuote: boolean,
    wrapAttributes: boolean,
    sortAttributes: boolean
  };

  /** List of commands for this build configuration.  */
  'js-beautify-html': object;
}

export const vuePreferenceSchema: PreferenceSchema = {
  'type': 'object',
  'properties': {
    'vue.format.enable': {
      'type': 'boolean',
      'default': true,
      'description': 'Enable/disable default Vue formatter'
    },
    'vetur.useWorkspaceDependencies': {
      'type': 'boolean',
      'default': false,
      'description': 'Use dependencies from workspace. Currently only for TypeScript.',
      'scope': 'application'
    },
    'vetur.completion.autoImport': {
      'type': 'boolean',
      'default': true,
      'description': 'Include completion for module export and auto import them'
    },
    'vetur.completion.useScaffoldSnippets': {
      'type': 'boolean',
      'default': true,
      'description': 'Enable/disable Vetur\'s built-in scaffolding snippets'
    },
    'vetur.completion.tagCasing': {
      'type': 'string',
      'default': 'kebab',
      'enum': [
        'initial',
        'kebab'
      ],
      'enumDescriptions': [
        'use the key in `components: {...}` as is for tag completion and do not force any casing',
        'kebab-case completion for <my-tag>'
      ],
      'description': 'Casing conversion for tag completion'
    },
    'vetur.validation.template': {
      'type': 'boolean',
      'default': true,
      'description': 'Validate vue-html in <template> using eslint-plugin-vue'
    },
    'vetur.validation.style': {
      'type': 'boolean',
      'default': true,
      'description': 'Validate css/scss/less/postcss in <style>'
    },
    'vetur.validation.script': {
      'type': 'boolean',
      'default': true,
      'description': 'Validate js/ts in <script>'
    },
    'vetur.format.options.tabSize': {
      'type': 'number',
      'default': 2,
      'description': 'Number of spaces per indentation level. Inherited by all formatters.'
    },
    'vetur.format.options.useTabs': {
      'type': 'boolean',
      'default': false,
      'description': 'Use tabs for indentation. Inherited by all formatters.'
    },
    'vetur.format.defaultFormatter.html': {
      'type': 'string',
      'default': 'prettyhtml',
      'enum': [
        'none',
        'prettyhtml',
        'js-beautify-html',
        'prettier'
      ],
      'enumDescriptions': [
        'disable formatting',
        'prettyhtml',
        'html formatter of js-beautify',
        'prettier'
      ],
      'description': 'Default formatter for <template> region'
    },
    'vetur.format.defaultFormatter.css': {
      'type': 'string',
      'default': 'prettier',
      'enum': [
        'none',
        'prettier'
      ],
      'enumDescriptions': [
        'disable formatting',
        'css formatter using css parser from prettier'
      ],
      'description': 'Default formatter for <style> region'
    },
    'vetur.format.defaultFormatter.postcss': {
      'type': 'string',
      'default': 'prettier',
      'enum': [
        'none',
        'prettier'
      ],
      'enumDescriptions': [
        'disable formatting',
        'postcss formatter using css parser from prettier'
      ],
      'description': 'Default formatter for <style lang="postcss"> region'
    },
    'vetur.format.defaultFormatter.scss': {
      'type': 'string',
      'default': 'prettier',
      'enum': [
        'none',
        'prettier'
      ],
      'enumDescriptions': [
        'disable formatting',
        'scss formatter using scss parser from prettier'
      ],
      'description': 'Default formatter for <style lang="scss"> region'
    },
    'vetur.format.defaultFormatter.less': {
      'type': 'string',
      'default': 'prettier',
      'enum': [
        'none',
        'prettier'
      ],
      'enumDescriptions': [
        'disable formatting',
        'less formatter using postcss parser from prettier'
      ],
      'description': 'Default formatter for <style lang="less"> region'
    },
    'vetur.format.defaultFormatter.stylus': {
      'type': 'string',
      'default': 'stylus-supremacy',
      'enum': [
        'none',
        'stylus-supremacy'
      ],
      'enumDescriptions': [
        'disable formatting',
        'stylus formatter from stylus-supremacy'
      ],
      'description': 'Default formatter for <style lang="stylus"> region'
    },
    'vetur.format.defaultFormatter.js': {
      'type': 'string',
      'default': 'prettier',
      'enum': [
        'none',
        'prettier',
        'prettier-eslint',
        'vscode-typescript'
      ],
      'enumDescriptions': [
        'disable formatting',
        'js formatter from prettier',
        'prettier-eslint',
        'js formatter from TypeScript'
      ],
      'description': 'Default formatter for <script> region'
    },
    'vetur.format.defaultFormatter.ts': {
      'type': 'string',
      'default': 'prettier',
      'enum': [
        'none',
        'prettier',
        'vscode-typescript'
      ],
      'enumDescriptions': [
        'disable formatting',
        'ts formatter using typescript parser from prettier',
        'ts formatter from TypeScript'
      ],
      'description': 'Default formatter for <script> region'
    },
    'vetur.format.defaultFormatterOptions': {
      'type': 'object',
      'properties': {
        'prettier': {
          'type': 'object',
          'description': 'Global prettier config used by prettier formatter. Used by `prettier` and `prettier-eslint`.\n\n' +
            'Vetur will prefer a prettier config file at home directory if one exists.',
          'properties': {}
        },
        'prettyhtml': {
          'type': 'object',
          'description': 'Options for prettyhtml',
          'properties': {
            'printWidth': {
              'type': 'number',
              'default': 100,
              'description': 'Maximum amount of characters allowed per line'
            },
            'singleQuote': {
              'type': 'boolean',
              'default': false,
              'description': 'Whether to use single quotes by default'
            },
            'wrapAttributes': {
              'type': 'boolean',
              'default': false,
              'description': 'Whether to wrap attributes'
            },
            'sortAttributes': {
              'type': 'boolean',
              'default': false,
              'description': 'Whether to sort attributes'
            }
          }
        },
        'js-beautify-html': {
          'type': 'object',
          'description': 'Options for js-beautify'
        }
      },
      'default': {
        'js-beautify-html': {
          'wrap_attributes': 'force-expand-multiline'
        },
        'prettyhtml': {
          'printWidth': 100,
          'singleQuote': false,
          'wrapAttributes': false,
          'sortAttributes': false
        }
      },
      'description': 'Options for all default formatters'
    },
    'vetur.format.styleInitialIndent': {
      'type': 'boolean',
      'default': false,
      'description': 'Whether to have initial indent for <style> region'
    },
    'vetur.format.scriptInitialIndent': {
      'type': 'boolean',
      'default': false,
      'description': 'Whether to have initial indent for <script> region'
    }
  }
};
export interface VueConfiguration {
  'vue.format.enable': boolean,
  'vetur.useWorkspaceDependencies': boolean,
  'vetur.completion.autoImport': boolean,
  'vetur.completion.useScaffoldSnippets': boolean,
  'vetur.completion.tagCasing': 'initial' | 'kebab',
  'vetur.validation.template': boolean,
  'vetur.validation.style': boolean,
  'vetur.validation.script': boolean,
  'vetur.format.options.tabSize': number,
  'vetur.format.options.useTabs': boolean,
  'vetur.format.defaultFormatter.html': 'none' | 'prettyhtml' | 'js-beautify-html' | 'prettier',
  'vetur.format.defaultFormatter.css': 'none' | 'prettier',
  'vetur.format.defaultFormatter.postcss': 'none' | 'prettier',
  'vetur.format.defaultFormatter.scss': 'none' | 'prettier',
  'vetur.format.defaultFormatter.less': 'none' | 'prettier',
  'vetur.format.defaultFormatter.stylus': 'none' | 'stylus-supremacy',
  'vetur.format.defaultFormatter.js': 'none' | 'prettier' | 'prettier-eslint' | 'vscode-typescript',
  'vetur.format.defaultFormatter.ts': 'none' | 'prettier' | 'vscode-typescript',
  'vetur.format.defaultFormatterOptions': FormatterConfiguration,
  'vetur.format.styleInitialIndent': boolean,
  'vetur.format.scriptInitialIndent': boolean,
  'vetur.trace.server': 'off' | 'messages' | 'verbose'
}
export type VuePreferenceChange = PreferenceChangeEvent<VueConfiguration>;

export const VuePreferences = Symbol('VuePreferences');
export type VuePreferences = PreferenceProxy<VueConfiguration>;

export function createVuePreferences(preferences: PreferenceService): VuePreferences {
  return createPreferenceProxy(preferences, vuePreferenceSchema);
}

export function bindVuePreferences(bind: interfaces.Bind): void {
  bind(VuePreferences).toDynamicValue(ctx => {
    const preferences = ctx.container.get<PreferenceService>(PreferenceService);
    return createVuePreferences(preferences);
  }).inSingletonScope();

  bind(PreferenceContribution).toConstantValue({ schema: vuePreferenceSchema });
}
