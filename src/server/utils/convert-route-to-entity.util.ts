const mapping: Record<string, string> = {
  attendances: 'attendance',
  exits: 'exit',
  onboardings: 'onboarding',
  organizations: 'organization',
  payrolls: 'payroll',
  probations: 'probation',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
