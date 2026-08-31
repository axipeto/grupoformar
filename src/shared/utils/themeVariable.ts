export function themeVariable(realm: string): string {
  if (!realm || realm === 'Uppersoft') {
    return 'grupoformar';
  }
  return realm;
}
