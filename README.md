# first-hello

A one-page site for a first, honest, low-pressure "hi" — built with
Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Customize everything from one file

Edit `lib/config.ts`:

```ts
export const SITE_CONFIG = {
  HER_NAME: "there",
  MY_NAME: "Vj",
  INTRO_MESSAGE: "I have absolutely no idea how to start this...",
  CONTACT_LINK: "",
  INSTAGRAM_LINK: "",
  WHATSAPP_LINK: "",
  ACCENT_COLOR: "#ff5c86",
  ACCENT_COLOR_SOFT: "#ff9db8",
  BACKGROUND_COLOR: "#08060a",
};
```

- Set `HER_NAME` and leave at least one of `CONTACT_LINK` /
  `INSTAGRAM_LINK` / `WHATSAPP_LINK` filled in, or the "Let's Talk"
  button on the final section won't render.
- `ACCENT_COLOR` / `ACCENT_COLOR_SOFT` are wired through
  `app/globals.css` (`--accent`, `--accent-soft`) — change them there
  if you want the glow/gradient to follow a different palette.

## Fonts

This build ships with a local system-font stack (serif display +
system-ui body) so it compiles with zero network calls. If you want
the original editorial pairing (Fraunces + Inter) and have internet
access at build time, `app/layout.tsx` has the exact snippet to drop
in — it's commented right above the component.

## Structure

```
app/                  layout + single page route
components/            shared UI (cursor glow, particles, toasts, etc.)
components/sections/   the 11 sections, in scroll order
lib/config.ts          the only file you should need to edit
```

## Build for production

```bash
npm run build
npm run start
```


## Backend setup

1. Create a Supabase project.
2. Run `supabase-schema.sql` in the Supabase SQL editor.
3. Add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_PASSWORD` to Netlify environment variables.
4. Deploy the project to Netlify.
5. Open `/admin` on the deployed site to view submitted messages.

The service-role key is only used server-side and must never be exposed in client-side code.
