module.exports = {
  version: "5.0",
  title: "Voicebox",
  description: "Open-source voice cloning and text-to-speech studio.",
  menu: async (kernel, info) => {
    const installed = info.exists("app") && info.exists("app/backend/env")
    const running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js")
    }

    const apiEndpoint = (local) => {
      if (local && local.apiUrl) {
        return `${local.apiUrl}/docs`
      }
      return "http://127.0.0.1:17493/docs"
    }

    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js"
      }]
    }

    if (installed) {
      if (running.start) {
        const local = info.local("start.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Voicebox",
            href: local.url
          }, {
            icon: "fa-solid fa-book",
            text: "Open API Docs",
            href: apiEndpoint(local)
          }, {
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js"
          }]
        }
        if (local && local.apiUrl) {
          return [{
            default: true,
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js"
          }, {
            icon: "fa-solid fa-book",
            text: "Open API Docs",
            href: apiEndpoint(local)
          }]
        }
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Terminal",
          href: "start.js"
        }]
      } else if (running.update) {
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Updating",
          href: "update.js"
        }]
      } else if (running.reset) {
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Resetting",
          href: "reset.js"
        }]
      }

      return [{
        default: true,
        icon: "fa-solid fa-power-off",
        text: "Start",
        href: "start.js"
      }, {
        icon: "fa-solid fa-book",
        text: "Open API Docs",
        href: "http://127.0.0.1:17493/docs"
      }, {
        icon: "fa-solid fa-plug",
        text: "Update",
        href: "update.js"
      }, {
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js"
      }, {
        icon: "fa-regular fa-circle-xmark",
        text: "Reset",
        href: "reset.js"
      }]
    }

    return [{
      default: true,
      icon: "fa-solid fa-plug",
      text: "Install",
      href: "install.js"
    }]
  }
}
