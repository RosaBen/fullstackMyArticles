const countClick = () => {
  const showResults = document.getElementById('article-count');
  if (!showResults) return;
  const articles = document.querySelectorAll('.article-card');
  const count = articles.length;
  if (count === 0) {
    showResults.textContent = `Aucun articles trouves`;
    showResults.classList.remove('bg-secondary');
    showResults.classList.add('bg-warning');
  } else {
    showResults.textContent = `${count} ${count > 1 ? 'articles trouves' : 'article trouve'}`;
    showResults.classList.remove('bg-secondary');
    showResults.classList.add('bg-success');
  }
};

const initializeCounter = () => {
  const countBtn = document.getElementById('count-articles');
  console.log('countBtn', countBtn);
  const showResults = document.getElementById('article-count');

  if (!countBtn || !showResults) return;

  countBtn.removeEventListener('click', countClick);

  countBtn.addEventListener('click', countClick);
};

export const initializeScripts = () => {
  initializeCounter();
};
