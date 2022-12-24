let favoritesCount = 0;

function handleFavorite() {
  const $cards = document.querySelector('.cards');
  const $counterFavorites = document.querySelector('.toy-counter__number') as HTMLElement;

  if ($cards instanceof HTMLElement) {
    $cards.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (target instanceof HTMLElement && target.closest('.card-of-toy') instanceof HTMLElement) {
        const closestCard = target.closest('.card-of-toy') as HTMLElement;
        if (closestCard.querySelector('.favorite') instanceof HTMLElement) {
          const closestCardFavorite = closestCard.querySelector('.favorite') as HTMLElement;
          if (closestCardFavorite.classList.contains('starred')) {
            closestCardFavorite.classList.remove('starred');
            favoritesCount--;
            $counterFavorites.innerText = `${favoritesCount}`;
          } else if (!closestCardFavorite.classList.contains('starred') && favoritesCount < 20) {
            closestCardFavorite.classList.add('starred');
            favoritesCount++;
            $counterFavorites.innerText = `${favoritesCount}`;
          } else {
            alert('Все слоты заняты!');
          }
        }
      }
    });
  }
}

export { handleFavorite };
