---
description: Run security checklist validation based on EDS security guidelines
---

You are performing a security review based on the comprehensive security checklist.

**Reference**: docs/for-ai/guidelines/security-checklist.md

Review the following areas:

## 1. Input Validation & Sanitization
- Check all form inputs for validation
- Verify XSS prevention measures
- Check for SQL injection risks (if applicable)
- Review URL parameter handling

## 2. Authentication & Authorization
- Review authentication implementation
- Check session management
- Verify CSRF protection
- Review API authentication

## 3. Data Protection
- Check for sensitive data in client-side code
- Verify HTTPS usage
- Review cookie security settings
- Check for exposed API keys or secrets

## 4. Content Security
- Review Content Security Policy headers
- Check for inline scripts (should be avoided)
- Verify resource integrity (SRI)
- Review CORS configuration

## 5. Dependencies
- Check for known vulnerabilities: `npm audit`
- Review external library usage
- Verify CDN resources are from trusted sources

## 6. EDS-Specific Security
- Check block isolation
- Review custom decoration functions
- Verify safe DOM manipulation
- Check for script injection risks

**Process**:

1. Run automated checks:
   ```bash
   npm audit
   npm run lint
   ```

2. Search codebase for common security issues:
   - innerHTML usage (potential XSS)
   - eval() usage (code injection)
   - Hardcoded credentials
   - Unsafe localStorage usage

3. Review configuration files:
   - Check .env files are in .gitignore
   - Review API endpoint configurations
   - Check CORS settings

4. Generate security report with:
   - 🔴 Critical issues (must fix immediately)
   - 🟡 Warnings (should address)
   - 🟢 Good practices found
   - Specific file:line references for each issue

5. Provide remediation guidance for each issue found

Ask user: "Would you like me to fix any of the security issues found?"
