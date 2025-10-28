export const loadTailwind = () => {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
  script.defer = true;
  document.head.appendChild(script);
};
