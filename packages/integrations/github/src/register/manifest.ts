const manifest = (codeUrl: string, hookUrl: string) => ({
  name: 'Ductape',
  url: codeUrl,
  hook_attributes: {
    url: hookUrl,
  },
  redirect_url: `${codeUrl}`,
  default_permissions: {
    issues: 'write',
    checks: 'write'
  },
  default_events: [
    'issues',
    'issue_comment',
    'check_suite',
    'check_run'
  ],
});

export default manifest;