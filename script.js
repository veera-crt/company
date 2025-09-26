// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")

    // Animate hamburger bars
    const bars = hamburger.querySelectorAll(".bar")
    if (hamburger.classList.contains("active")) {
      bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
      bars[1].style.opacity = "0"
      bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
    } else {
      bars[0].style.transform = "none"
      bars[1].style.opacity = "1"
      bars[2].style.transform = "none"
    }
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")

      // Reset hamburger animation
      const bars = hamburger.querySelectorAll(".bar")
      bars[0].style.transform = "none"
      bars[1].style.opacity = "1"
      bars[2].style.transform = "none"
    })
  })

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")

      // Reset hamburger animation
      const bars = hamburger.querySelectorAll(".bar")
      bars[0].style.transform = "none"
      bars[1].style.opacity = "1"
      bars[2].style.transform = "none"
    }
  })

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")

      // Reset hamburger animation
      const bars = hamburger.querySelectorAll(".bar")
      bars[0].style.transform = "none"
      bars[1].style.opacity = "1"
      bars[2].style.transform = "none"
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  let ticking = false

  function updateNavbar() {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(30, 58, 138, 0.95)"
      navbar.style.backdropFilter = "blur(10px)"
      navbar.classList.add("scrolled")
    } else {
      navbar.style.background = "#1e3a8a"
      navbar.style.backdropFilter = "none"
      navbar.classList.remove("scrolled")
    }
    ticking = false
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar)
      ticking = true
    }
  })

  // Product tabs functionality
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      button.classList.add("active")
      document.getElementById(targetTab).classList.add("active")
    })
  })

  // Form handling
  const form = document.getElementById("early-access-form")
  const successMessage = document.getElementById("form-success")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(form)
      const data = {}

      // Convert FormData to regular object
      for (const [key, value] of formData.entries()) {
        if (data[key]) {
          // Handle multiple values (like checkboxes)
          if (Array.isArray(data[key])) {
            data[key].push(value)
          } else {
            data[key] = [data[key], value]
          }
        } else {
          data[key] = value
        }
      }

      // Basic validation
      if (!data.fullName || !data.email) {
        alert("Please fill in all required fields.")
        return
      }

      if (!validateEmail(data.email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Check if at least one interest is selected
      if (!data.interests) {
        alert("Please select at least one Cybvars module that interests you.")
        return
      }

      // Simulate form submission
      console.log("Form submitted with data:", data)

      // Hide form and show success message
      form.style.display = "none"
      successMessage.style.display = "block"

      // In a real application, you would send this data to your server
      // fetch('/api/early-access', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(data)
      // });
    })
  }
})

// Form validation and submission (for future use)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Animation on scroll (simple implementation)
function animateOnScroll() {
  const elements = document.querySelectorAll(".product-card, .feature-item, .integration-item")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }
  })
}

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
  // Set initial state for animation
  document.querySelectorAll(".product-card, .feature-item, .integration-item").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })

  // Trigger animations on scroll
  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on load
})
