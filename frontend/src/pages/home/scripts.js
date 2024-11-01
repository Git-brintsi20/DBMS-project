export function slide(sliderRef, direction) {
  if (!sliderRef.current) return;

  const slider = sliderRef.current;
  const bookCardWidth = slider.querySelector('.book-card').offsetWidth;

  const scrollAmount = direction * bookCardWidth;

  slider.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
}
