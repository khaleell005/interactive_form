# NexaFlow — Interactive Signup Form

A dark-themed, responsive account registration form with real-time validation, password strength indicator, and smooth animations.

## Files

- `task2-interactive-form.html` — Main HTML file
- `style.css` — Styles and responsive layout
- `script.js` — Form validation and interactions

## Features

- **Real-time validation** — Name, email, phone, password, and confirm password
- **Password strength meter** — Visual 4-segment indicator (Weak → Strong)
- **Password visibility toggle** — Eye icon for password fields
- **Phone field** — Optional with country code selector
- **Success screen** — Animated confirmation on valid submission
- **Responsive** — Two-column layout collapses on mobile

## Usage

Open `task2-interactive-form.html` in a browser.

## Form Fields

| Field | Required | Validation |
|-------|----------|------------|
| Full Name | Yes | Min 2 characters |
| Email | Yes | Valid email format |
| Phone | No | 7-15 digits |
| Password | Yes | Min 8 chars, uppercase, number, or symbol |
| Confirm Password | Yes | Must match password |
| Terms | Yes | Must be checked |

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts: Syne, DM Sans
- No build tools or dependencies required
