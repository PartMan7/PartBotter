export function escapeRegEx(input: string): string {
	return input.replace(/\W/g, '\\$&');
}
