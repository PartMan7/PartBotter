import { FlatCache } from 'flat-cache';

import { fsPath } from '@/utils/fsPath';

type CacheTypes = {
	gameId: number;
};

const defaults: CacheTypes = {
	gameId: 0,
};

export type Cache<T> = {
	get(): T;
	set(arg: T): void;
};

export function usePersistedCache<T extends keyof CacheTypes>(cacheKey: T): Cache<CacheTypes[T]> {
	const cacheId = `cache-${cacheKey}.json`;
	const flatCache = new FlatCache({ cacheId: cacheId, cacheDir: fsPath('cache', 'flat-cache') });
	flatCache.load(cacheId);

	const get = (): CacheTypes[T] => {
		const stored = flatCache.get<CacheTypes[T]>('value');
		if (typeof stored === 'undefined') {
			flatCache.set('value', defaults[cacheKey]);
			return defaults[cacheKey];
		} else return stored;
	};
	const set = (value: CacheTypes[T]): void => {
		flatCache.set('value', value);
		flatCache.save();
	};

	return { get, set };
}
