# ⚡ QUICK CONFIG - Where to Add Your EmailJS Keys

## 3 Things You Need to Store:

### 1. Public Key
- **Where to get:** EmailJS Dashboard → Account → API Keys
- **Where to put in code:** `script.js` line with `emailjs.init(...)`

```javascript
emailjs.init("PASTE_YOUR_PUBLIC_KEY_HERE");
```

---

### 2. Service ID  
- **Where to get:** EmailJS Dashboard → Email Services (after connecting Gmail)
- **Where to put in code:** `script.js` emailjs.send() call

```javascript
emailjs.send('PASTE_YOUR_SERVICE_ID_HERE', 'YOUR_TEMPLATE_ID', templateParams)
```

---

### 3. Template ID
- **Where to get:** EmailJS Dashboard → Email Templates (after creating template)
- **Where to put in code:** `script.js` emailjs.send() call

```javascript
emailjs.send('YOUR_SERVICE_ID', 'PASTE_YOUR_TEMPLATE_ID_HERE', templateParams)
```

---

### 4. Your Email Address
- **Where to put in code:** `script.js` line with `to_email:`

```javascript
to_email: 'your-actual-email@gmail.com', // Replace with your Gmail
```

---

## 📍 Exact Locations in script.js:

Search for these lines and replace the placeholder values:

1. **Line ~269:** `emailjs.init("YOUR_PUBLIC_KEY");`
2. **Line ~283:** `to_email: 'your-email@gmail.com',`
3. **Line ~292:** `emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)`

---

## ✅ Setup Checklist:

- [ ] Create EmailJS account at https://www.emailjs.com/
- [ ] Get Public Key from API Keys
- [ ] Connect Gmail account in Email Services
- [ ] Copy Service ID
- [ ] Create Email Template (use HTML template from EMAIL_SETUP.md)
- [ ] Copy Template ID
- [ ] Update script.js with all 3 IDs + your email
- [ ] Save and test on your portfolio
- [ ] Check Gmail inbox for test email

Done! 🎉
