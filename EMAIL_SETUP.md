# Email Setup Guide - Getting Real Emails from Contact Form

## Overview
Your portfolio now sends **real emails** directly to your inbox when users submit feedback! This uses **EmailJS** - a free service that requires no backend server.

## Step-by-Step Setup

### **1. Create EmailJS Account**
- Visit: https://www.emailjs.com/
- Click "Create Account" or "Sign Up"
- Complete the registration (takes 2 minutes)

### **2. Get Your Public Key**
- After login, go to **Account** → **API Keys** tab
- Copy your **Public Key** (looks like a long string of characters)

### **3. Create Email Service**
- In dashboard, go to **Email Services** (left sidebar)
- Click **"Add Service"**
- Choose **Gmail** (or your preferred email provider)
- Select **Connect with Gmail**
- Follow the authorization process to connect your Gmail account
  - *Note: This is secure - EmailJS only gets permission to send emails*
- Copy the **Service ID** that appears after connection

### **4. Create Email Template**
- In dashboard, go to **Email Templates** (left sidebar)
- Click **"Create New Template"**
- Use these settings:

| Field | Value |
|-------|-------|
| **Template Name** | `Portfolio Contact` |
| **Service** | (select the Gmail service you created) |
| **To Email** | `{{to_email}}` |
| **From Name** | `Portfolio Website` |
| **Reply To** | `{{reply_to_email}}` |
| **Subject** | `New Message from {{from_name}}` |
| **Email Template (HTML)** | Replace with code below |

**Email Template HTML Code:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        .container { max-width: 600px; margin: 20px auto; background: white; 
                     padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { border-bottom: 3px solid #6366f1; padding-bottom: 15px; margin-bottom: 20px; }
        .header h1 { color: #6366f1; margin: 0; }
        .content { margin: 20px 0; }
        .label { color: #666; font-weight: bold; }
        .message { background: #f9f9f9; padding: 15px; border-left: 4px solid #ec4899; 
                   margin: 15px 0; }
        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; 
                  padding-top: 20px; border-top: 1px solid #eee; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📬 New Message Received!</h1>
        </div>
        <div class="content">
            <p><span class="label">From:</span> {{from_name}}</p>
            <p><span class="label">Email:</span> <a href="mailto:{{from_email}}">{{from_email}}</a></p>
            <div class="message">
                <p><strong>Message:</strong></p>
                <p>{{message}}</p>
            </div>
        </div>
        <div class="footer">
            <p>This message was sent from your portfolio website.</p>
            <p>Reply directly to {{from_email}} to respond to your visitor.</p>
        </div>
    </div>
</body>
</html>
```

- Click **"Save Template"**
- Copy the **Template ID** from the template list

### **5. Update Your Code**
Open `script.js` and find these 3 lines to replace:

**Line 1:** Find `emailjs.init("YOUR_PUBLIC_KEY");`
- Replace `YOUR_PUBLIC_KEY` with your Public Key from Step 2

**Line 2:** Find `to_email: 'your-email@gmail.com',`
- Replace with your actual Gmail address

**Line 3:** Find `emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID',`
- Replace `YOUR_SERVICE_ID` with Service ID from Step 3
- Replace `YOUR_TEMPLATE_ID` with Template ID from Step 4

### **Example (After Replacing):**
```javascript
emailjs.init("ab12cd34ef56gh78ij90kl12mn34op"); // Your public key

const templateParams = {
    to_email: 'sreenayak@gmail.com', // Your Gmail
    // ... rest of code
};

emailjs.send('service_xyz123abc', 'template_abc123xyz', templateParams)
```

## ✅ Testing

1. Save your changes
2. Open your portfolio in browser
3. Fill out the contact form with test data
4. Click "Send Message"
5. You should see ✨ "Message sent successfully!" notification
6. Check your Gmail inbox - **you'll see the email!** 🎉

## 📧 What Happens When Users Submit

- ✅ Form is validated on the client side
- ✅ Email is sent immediately to your Gmail
- ✅ User sees a success notification
- ✅ Visitor's email is saved so you can reply directly
- ✅ Professional HTML email template

## 🔒 Security & Limits

- **EmailJS Free Tier:** 200 emails/month
- **Your data is secure:** EmailJS only sends emails with your permission
- **No sensitive data stored:** Messages are not saved on any server
- **Privacy-friendly:** Complies with GDPR and privacy standards

## ❓ Troubleshooting

**Issue:** "Failed to send email" error
- ✅ Check your Public Key is correct
- ✅ Check Service ID and Template ID are correct
- ✅ Verify Gmail account is connected in EmailJS
- ✅ Check you haven't exceeded free tier limit (200/month)

**Issue:** Email goes to spam
- ✅ Set up SPF/DKIM records for your domain (optional)
- ✅ Verify sender email in Gmail settings
- ✅ Mark emails as "Not Spam" to teach Gmail filters

**Issue:** Can't see emails
- ✅ Check spam/junk folder
- ✅ Verify "to_email" matches your actual Gmail
- ✅ Check Gmail filters aren't hiding the emails

## 📞 Support

- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/contact/

---

**You're all set!** 🚀 Now you'll receive real emails from your portfolio visitors!
