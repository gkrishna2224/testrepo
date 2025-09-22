# Krishnamoorthi G - Portfolio Website

A modern, responsive portfolio website showcasing my skills, projects, and experience as a Full Stack Developer.

## 🌟 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Smooth scrolling, mobile navigation, contact form
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Friendly**: Properly structured HTML with meta tags
- **Dark Mode**: Toggle between light and dark themes
- **Contact Integration**: Direct email integration through contact form

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with Flexbox and Grid
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)
- **Animations**: CSS animations and transitions
- **Responsive**: Mobile-first approach

## 📁 Project Structure

```
testrepo/
├── index.html          # Main HTML file
├── style.css           # Main stylesheet
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/gkrishna2224/testrepo.git
   ```

2. **Navigate to project directory**
   ```bash
   cd testrepo
   ```

3. **Open in browser**
   - Simply open `index.html` in your preferred web browser
   - Or use a local server for development:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

4. **View the website**
   - Open `http://localhost:8000` in your browser

## 📱 Sections

- **Home**: Hero section with introduction and call-to-action
- **About**: Personal information and statistics
- **Skills**: Technical skills organized by category
- **Projects**: Featured projects with descriptions and links
- **Contact**: Contact form and personal information

## 🎨 Customization

### Colors
The website uses a gradient color scheme. You can customize the colors by modifying the CSS variables:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --background-light: #f8f9fa;
  --text-dark: #333;
  --text-light: #666;
}
```

### Content
1. **Personal Information**: Update the content in `index.html`
2. **Skills**: Modify the skills section to reflect your technologies
3. **Projects**: Add your own projects with descriptions and links
4. **Contact**: Update contact information and social links

### Images
- Replace placeholder icons with your actual profile picture
- Add project screenshots to enhance visual appeal

## 📧 Contact Integration

The contact form is integrated with a mailto link that opens the user's default email client. To set up a backend for form submissions, you can:

1. **Use a form service** (Netlify Forms, Formspree)
2. **Implement a backend** (Node.js, PHP)
3. **Use serverless functions** (Vercel, Netlify Functions)

## 🌐 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository settings
3. Enable GitHub Pages from the main branch
4. Your site will be available at `https://yourusername.github.io/testrepo`

### Netlify
1. Connect your GitHub repository to Netlify
2. Deploy automatically on every push
3. Get a custom domain and HTTPS

### Vercel
1. Import your GitHub repository to Vercel
2. Automatic deployments on every commit
3. Custom domain support

## 📈 Performance Optimization

- **Images**: Optimize images using tools like TinyPNG
- **CSS**: Minify CSS for production
- **JavaScript**: Minify and bundle JS files
- **Fonts**: Use font-display: swap for better loading
- **Lazy Loading**: Implement lazy loading for images

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Krishnamoorthi G**
- GitHub: [@gkrishna2224](https://github.com/gkrishna2224)
- Email: krishnamoorthyganesangks@gmail.com
- Location: Salem, TN, India

---

⭐ **If you found this helpful, please give it a star!** ⭐

## 🔮 Future Enhancements

- [ ] Add a blog section
- [ ] Implement dark/light theme toggle
- [ ] Add more interactive animations
- [ ] Include a skills proficiency chart
- [ ] Add testimonials section
- [ ] Implement a CMS for easy content updates
- [ ] Add multi-language support
- [ ] Include a downloadable resume
- [ ] Add project filtering functionality
- [ ] Implement a contact form backend