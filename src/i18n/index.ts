import English from '@/i18n/english';
import Hindi from '@/i18n/hindi';
import { ChatError } from '@/utils/chatError';

import type { TranslatedText, TranslationFn, TranslationGroup } from '@/i18n/types';

export const LanguageMap = {
	english: English,
	hindi: Hindi,
};

export function applyVariables(text: string, variables: Record<string, string | number>): TranslatedText {
	return Object.entries(variables).reduce(
		(acc, [name, value]) => acc.replaceAll(`{{${name}}}`, value.toString()),
		text
	) as TranslatedText;
}

export function i18n(language: keyof typeof LanguageMap = 'english'): TranslationFn {
	const translations = LanguageMap[language] as TranslationGroup;
	const fallback = LanguageMap['english'] as TranslationGroup;
	return (lookup, variables = {}) => {
		const lookupPath = lookup.split('.');
		const base: string | string[] | undefined =
			// @ts-expect-error -- Not bothering to type this whole thing
			lookupPath.reduce((group, label) => group?.[label], translations) ??
			// @ts-expect-error -- Not bothering to type this whole thing
			lookupPath.reduce((group, label) => group?.[label], fallback);
		// @ts-expect-error -- Cannot translate the message for when translations are not found
		if (!base) throw new ChatError('Translations not found!');
		if (Array.isArray(base)) return applyVariables(base.random(), variables);
		return applyVariables(base, variables);
	};
}
