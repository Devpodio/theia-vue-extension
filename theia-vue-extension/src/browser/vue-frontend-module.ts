import { VueClientContribution } from './vue-client-contribution';
import { LanguageClientContribution } from "@theia/languages/lib/browser";
import { ContainerModule } from "inversify";
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { VueGrammarContribution } from './vue-grammar-contribution';

export default new ContainerModule(bind => {

    bind(VueClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toDynamicValue(ctx => ctx.container.get(VueClientContribution));

    bind(LanguageGrammarDefinitionContribution).to(VueGrammarContribution).inSingletonScope();
});