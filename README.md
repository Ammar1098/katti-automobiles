# Katti Automobiles — Website Setup Guide

A clean, mobile-first static website for car spare parts brokerage.
Built with pure HTML, CSS, and JavaScript — no frameworks, no build step.

---

## Files

```
index.html      — Homepage (hero, cars grid, banner, footer)
car.html        — Car model page (parts grid, order via modal)
style.css       — All styles
script.js       — Car data, parts data, modal, form, WhatsApp links
netlify.toml    — Netlify deploy config (optional for drag-and-drop)
README.md       — This file
```

---

## Step 1 — Change Your WhatsApp Number

Open **`script.js`** and find:

```js
whatsappNumber: '919999999999',
```

Replace `919999999999` with your actual number.
**Format:** `91` + your 10-digit mobile number (no spaces, no `+`)

**Example:** If your number is `98765 43210`, write: `919876543210`

Also update `phoneDisplay`:

```js
phoneDisplay: '+91 99999 99999',
```

Replace with your number in readable format, e.g. `+91 98765 43210`.

After updating `script.js`, **also find-and-replace** `919999999999`
in `index.html` and `car.html` (used in nav and footer links).
Use your text editor's Find & Replace (Ctrl+H) to do this quickly.

---

## Step 2 — Set Up Web3Forms (Get Email Notifications)

Web3Forms sends you an email every time a customer submits the order form.
It is **free** and requires no backend.

1. Go to **https://web3forms.com**
2. Enter your email address and click **"Create Access Key"**
3. Check your email and verify it
4. Copy the access key (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
5. Open `script.js` and find:

```js
web3formsKey: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE',
```

6. Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your key

> **Note:** If you skip this step, the order form will fail to submit,
> but customers will still see a WhatsApp fallback button to message you directly.

---

## Step 3 — Replace Placeholder Images with Real Photos

### Car card images (homepage grid)

Open `script.js` and find each car entry, e.g.:

```js
'tata-nexon': {
  ...
  cardImage: 'https://placehold.co/600x400/1a3a5f/f97316?text=Tata+Nexon',
  image:     'https://placehold.co/800x450/1a3a5f/f97316?text=Tata+Nexon',
},
```

- `cardImage` — shown on the homepage grid card (recommended: 600×400 px)
- `image` — shown as the banner on the car model page (recommended: 800×450 px)

Replace the `placehold.co` URLs with:
- A real photo path like `'images/tata-nexon.jpg'` (if you put photos in an `images/` folder)
- Or a direct photo URL

### Part images

In `script.js`, find the `PARTS` array and replace each `image` URL similarly.
Recommended size: 300×200 px.

---

## Step 4 — Deploy to Netlify

### Option A — Drag and Drop (easiest, no account linking needed)

1. Go to **https://app.netlify.com/drop**
2. Drag and drop your entire project folder onto the page
3. Netlify gives you a live URL in seconds (e.g. `https://random-name.netlify.app`)
4. To give it a custom name: go to **Site settings → Change site name**

### Option B — Git-based Deploy (auto-deploys on every update)

1. Push your project to a GitHub repository
2. Go to **https://app.netlify.com** → **"Add new site" → "Import an existing project"**
3. Connect GitHub and choose your repo
4. Leave build settings empty (no build command, publish directory = `.`)
5. Click **Deploy site**
6. Every time you push to GitHub, the site updates automatically

### Custom Domain (optional)

In Netlify: **Site settings → Domain management → Add custom domain**
Follow the instructions to point your domain's DNS to Netlify.

---

## Adding a New Car Model

1. Open `script.js`
2. Find the `CARS` object and copy an existing entry:

```js
'new-car-slug': {
  brand:     'Brand Name',
  model:     'Model Name',
  type:      'Type (e.g. Hatchback)',
  year:      '2020 – Present',
  desc:      'A short description of the car.',
  image:     'images/new-car.jpg',      // banner image on model page
  cardImage: 'images/new-car-card.jpg', // card image on homepage
},
```

3. Save the file. The new car will automatically appear on the homepage and get its own parts page at `car.html?model=new-car-slug`.

---

## Adding a New Spare Part

Parts are stored **per car** inside each car's entry in the `CARS` object.

1. Open `script.js`
2. Find the car you want to add the part to (e.g. `'tata-nexon'`)
3. Inside that car's `parts: [...]` array, add a new entry:

```js
{ id: 'new-part', name: 'New Part Name', image: 'https://example.com/part-image.jpg' },
```

4. Save. The part appears only on that car's page.

To add a part to **all cars**, add it to every car's `parts` array.

> **Generic images** that are shared across cars are stored in the `IMG` object
> at the top of `script.js` — use `IMG.bonnet`, `IMG.brakes`, etc. as shortcuts.

---

## Common Questions

**Q: How does a customer order a part?**
They click a car model on the homepage → see available parts → click "Request This Part" → fill in the form → you receive an email via Web3Forms. The WhatsApp float button is also always visible for direct messaging.

**Q: Can I take payments online?**
Not in the current setup. The form collects order details and you follow up by call/WhatsApp and arrange payment separately (UPI, cash, etc.).

**Q: How do I add more car models?**
See "Adding a New Car Model" above — it's a few lines in `script.js`.

**Q: Can I change the colors?**
Yes. Open `style.css` and look at the `:root { }` block at the top. The main colors are:
- `--accent` — the orange color (`#f97316`)
- `--bg-primary` — the dark background
Change these values to change the entire site's color scheme.

---

## Checklist Before Going Live

- [ ] WhatsApp number updated in `script.js`, `index.html`, `car.html`
- [ ] Phone number updated in `script.js`, `index.html`, `car.html`
- [ ] Web3Forms access key added to `script.js`
- [ ] Address updated in `script.js` and footers
- [ ] Real car and part images added (optional at launch, placeholders work fine)
- [ ] Site tested on mobile (Chrome DevTools → Toggle Device Toolbar)
- [ ] Deployed to Netlify and live URL shared
