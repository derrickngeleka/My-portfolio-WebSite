# My-portfolio-WebSite

## Contact form (Send Me a Message)

This site uses Netlify Forms for serverless form handling and a JavaScript fallback for local development.

### How it works
- The contact form in `assets/src/pages/contact.html` has `data-netlify="true"` and a hidden field `form-name=contact` so Netlify picks it up at build time.
- Spam protection via `netlify-honeypot="bot-field"`.
- Successful submissions redirect to `/thank-you.html`.
- If submission fails (e.g. running locally without Netlify), JavaScript falls back to opening the user’s email client with a prefilled message.

### Deploy to Netlify
1. Push this repository to GitHub.
2. In Netlify: New site from Git -> pick the repo -> deploy.
3. After deploy, go to Netlify Dashboard -> Forms -> `contact` to view submissions and set up notifications.

### Test locally (Netlify CLI)
Install Netlify CLI and run a local server that emulates Netlify’s form handling.

```bash
npm install -g netlify-cli
netlify login
netlify dev
```

Open the local URL printed in the terminal and submit the form.

### Without Netlify
If you don’t want to use Netlify forms, the current JS will still work by opening a `mailto:` link to `derrickngeleka77@gmail.com` with the subject and body pre-filled.
