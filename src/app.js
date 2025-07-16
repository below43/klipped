// Klipped PWA - Native JavaScript Implementation
class KlippedApp {
  constructor() {
    this.editor = null;
    this.modal = null;
    this.infoButton = null;
    this.closeButton = null;
    this.storageKey = 'klipped';
    this.hasUsedAppKey = 'klipped-has-used';
    
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Get DOM elements
    this.editor = document.getElementById('editor');
    this.modal = document.getElementById('about-modal');
    this.infoButton = document.getElementById('info-button');
    this.closeButton = document.getElementById('close-modal');

    if (!this.editor || !this.modal || !this.infoButton || !this.closeButton) {
      console.error('Required DOM elements not found');
      return;
    }

    // Load saved content
    this.loadContent();

    // Setup event listeners
    this.setupEventListeners();

    // Setup PWA features
    this.setupPWA();

    // Update title initially
    this.updateTitle();
  }

  setupEventListeners() {
    // Editor content change
    this.editor.addEventListener('input', (e) => {
      this.saveContent(e.target.value);
      this.updateTitle(e.target.value);
    });

    // Info button click
    this.infoButton.addEventListener('click', () => {
      this.showModal();
    });

    // Close button click
    this.closeButton.addEventListener('click', () => {
      this.hideModal();
    });

    // Close modal on overlay click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.hideModal();
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('show')) {
        this.hideModal();
      }
      
      // Keyboard shortcuts
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'i':
            e.preventDefault();
            this.showModal();
            break;
          case 's':
            e.preventDefault();
            // Force save (already auto-saves, but good UX feedback)
            this.saveContent(this.editor.value);
            break;
          case 'e':
            e.preventDefault();
            this.exportText();
            break;
        }
      }
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      if (this.modal.classList.contains('show')) {
        this.hideModal();
      }
    });

    // Auto-save on page unload
    window.addEventListener('beforeunload', () => {
      this.saveContent(this.editor.value);
    });

    // Handle visibility change (mobile app switching)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.saveContent(this.editor.value);
      }
    });
  }

  loadContent() {
    const savedContent = localStorage.getItem(this.storageKey);
    const hasUsedApp = localStorage.getItem(this.hasUsedAppKey);
    
    if (savedContent) {
      this.editor.value = savedContent;
    } else if (!hasUsedApp) {
      // First time user - set welcome text as actual content
      const welcomeText = `Klipped is a simple, privacy-oriented scratchpad.

It's like the back of your hand. Write ideas down. Paste snippets of text. Delete when you're done. `;
      
      this.editor.value = welcomeText;
      this.saveContent(welcomeText);
      // Mark that the user has now used the app
      localStorage.setItem(this.hasUsedAppKey, 'true');
    }
    // If hasUsedApp is true but no content, leave textarea empty (user cleared it)
  }

  saveContent(content) {
    try {
      localStorage.setItem(this.storageKey, content);
      // Mark that the user has used the app whenever they save content
      localStorage.setItem(this.hasUsedAppKey, 'true');
    } catch (error) {
      console.error('Failed to save content:', error);
      
      // Handle quota exceeded error
      if (error.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded. Content may not be saved.');
        // Could show user notification here
      }
    }
  }

  updateTitle(content = null) {
    const text = content || this.editor.value || '';
    let title = text.trim().substring(0, 60);
    
    if (title.startsWith('"')) {
      title = title.substring(1);
    }
    
    if (!title) {
      document.title = 'Klipped';
    } else {
      document.title = `Klipped - ${title}...`;
    }
  }

  showModal() {
    this.modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus the close button for accessibility
    setTimeout(() => {
      this.closeButton.focus();
    }, 100);

    // Add to browser history so back button works
    if (window.history.state !== 'modal') {
      window.history.pushState('modal', '', window.location.href);
    }
  }

  hideModal() {
    this.modal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Focus the info button
    this.infoButton.focus();

    // Handle browser history
    if (window.history.state === 'modal') {
      window.history.back();
    }
  }

  setupPWA() {
    // Register service worker if available
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Handle app install prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      // Could show install button here
    });

    // Handle app installed
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
    });

    // Handle online/offline status
    window.addEventListener('online', () => {
      console.log('App is online');
    });

    window.addEventListener('offline', () => {
      console.log('App is offline');
    });
  }

  // Public methods for potential external use
  getText() {
    return this.editor.value;
  }

  setText(content) {
    this.editor.value = content;
    this.saveContent(content);
    this.updateTitle(content);
  }

  clearText() {
    this.setText('');
  }

  exportText() {
    const content = this.getText();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'klipped-export.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Initialize the app
const app = new KlippedApp();

// Make app available globally for debugging/extensions
window.KlippedApp = app;
