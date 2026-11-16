document.addEventListener("DOMContentLoaded", () => {
    const theme = ReadTheme();
    const button = document.getElementById("theme-button");

    if (theme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        button.textContent = "Light Theme";
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        button.textContent = "Dark Theme";
    }
});

function ChangeTheme() {
    const button = document.getElementById("theme-button");
    
    if (document.documentElement.getAttribute("data-theme") !== "light") {
        ApplyTheme("light");
        button.textContent = "Light Theme";
        localStorage.setItem("theme", "light");
    } else {
        ApplyTheme("dark");
        button.textContent = "Dark Theme";
        localStorage.setItem("theme", "dark");
    }
}

function ReadTheme() {
    try {
        return localStorage.getItem("theme");
    } catch (err) {
        return null;
    }
}

function ApplyTheme(theme) {
    
    if (!document.startViewTransition) {
        document.documentElement.setAttribute("data-theme", theme);
    } else {
        document.startViewTransition(() => document.documentElement.setAttribute("data-theme", theme));
    }
} 