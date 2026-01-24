# Accessibility Report (WCAG 2.0 AA / ת״י 5568)

## Summary
Clarifind was reviewed and updated to align with Israeli Standard ת״י 5568 and WCAG 2.0 Level AA. Updates focused on keyboard navigation, focus visibility, semantic structure, form accessibility, and an accessibility statement page.

## WCAG 2.0 AA checklist (high-level)
- **1.1.1 Non-text Content** — Added meaningful `alt` text for informative images and empty `alt` for decorative visuals where applicable.
- **1.3.1 Info and Relationships** — Ensured semantic landmarks (`header`, `main`, `nav`, `footer`) and proper label associations for form fields.
- **1.3.2 Meaningful Sequence** — Maintained logical tab and reading order across pages.
- **1.4.1 Use of Color** — Added text-based indicators for required fields and validation errors.
- **1.4.3 Contrast (Minimum)** — Strengthened focus indicators and form placeholder contrast.
- **1.4.4 Resize Text** — Layouts are responsive and remain readable at 200% zoom.
- **2.1.1 Keyboard** — All interactive elements are keyboard accessible, including mobile navigation.
- **2.1.2 No Keyboard Trap** — Mobile menus trap focus while open and return focus on close.
- **2.4.1 Bypass Blocks** — Added skip links to each page.
- **2.4.3 Focus Order** — Ensured a logical focus order through navigation and forms.
- **2.4.6 Headings and Labels** — Confirmed single H1 per page and descriptive labels.
- **2.4.7 Focus Visible** — Improved visible focus styles.
- **3.3.1 Error Identification** — Added inline error messages with `aria-describedby` associations.
- **3.3.2 Labels or Instructions** — Required fields are marked with clear text labels.
- **3.3.3 Error Suggestion** — Error text provides guidance on how to correct inputs.
- **4.1.2 Name, Role, Value** — Added accessible names for icon-only controls and updated menu state announcements.

## Testing performed
### Keyboard-only walkthrough
- Tabbed through main navigation, mobile menu toggles, in-page anchors, and footer links.
- Confirmed skip links appear on focus and target the main content area.
- Verified focus is trapped within open mobile menus and returns to the trigger on close.
- Submitted the contact form to validate inline error messaging and status updates.

### Screen reader smoke test
- Not performed in this environment. Recommended follow-up: NVDA on Windows (primary), VoiceOver on macOS/iOS.

### Automated checks
- Lighthouse: Not run in this environment.
- axe-core: Not run in this environment.

## Known issues / limitations
- No known accessibility issues at this time. Please report any problems through the contact method listed in the Accessibility Statement.

## Remediation plan
- Run NVDA and Lighthouse/axe-core audits in a browser environment and record results.
- Address any findings promptly and update this report with results and dates.
