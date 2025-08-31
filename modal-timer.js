// Открытие модального окна
document.getElementById('openModalBtn').addEventListener('click', function() {
	const modal = document.getElementById('myModal');
	modal.style.display = 'block';
});

// Закрытие модального окна
document.getElementById('modalClose').addEventListener('click', function() {
	document.getElementById('myModal').style.display = 'none';
});

// Перетаскивание модального окна
const modal = document.getElementById('myModal');
const header = document.getElementById('modalHeader');

let isDragging = false;
let offsetX, offsetY;
let startX, startY;

header.addEventListener('mousedown', function(e) {
	isDragging = true;
	
	// Фиксируем начальные координаты
	startX = e.clientX;
	startY = e.clientY;
	
	// Получаем текущие позиции окна
	const rect = modal.getBoundingClientRect();
	offsetX = startX - rect.left;
	offsetY = startY - rect.top;
	
	// Изменяем курсор
	modal.style.cursor = 'grabbing';
	header.style.cursor = 'grabbing';
	
	// Отменяем выделение текста при перетаскивании
	e.preventDefault();
});

document.addEventListener('mousemove', function(e) {
	if (!isDragging) return;
	
	// Вычисляем смещение курсора
	const dx = e.clientX - startX;
	const dy = e.clientY - startY;
	
	// Получаем текущие координаты окна
	const currentLeft = parseInt(modal.style.left) || 100;
	const currentTop = parseInt(modal.style.top) || 100;
	
	// Вычисляем новые координаты
	const newX = currentLeft + dx;
	const newY = currentTop + dy;
	
	// Получаем ширину окна
	const modalWidth = modal.offsetWidth;
	
	// Ограничиваем только по горизонтали (чтобы не выходило за экран)
	const windowWidth = window.innerWidth;
	const boundedX = Math.max(0, Math.min(newX, windowWidth - modalWidth));
	
	// Устанавливаем новые позиции
	modal.style.left = boundedX + 'px';
	modal.style.top = newY + 'px';
	
	// Обновляем начальные координаты для следующего движения
	startX = e.clientX;
	startY = e.clientY;
});

document.addEventListener('mouseup', function() {
	isDragging = false;
	modal.style.cursor = 'default';
	header.style.cursor = 'move';
});

// Автоматическая прокрутка страницы при перетаскивании к границам
document.addEventListener('mousemove', function(e) {
	if (!isDragging) return;
	
	const scrollSpeed = 20;
	const threshold = 50;
	
	// Прокрутка вниз, если курсор близко к нижней границе
	if (e.clientY > window.innerHeight - threshold) {
		window.scrollBy(0, scrollSpeed);
		startY += scrollSpeed; // Компенсируем прокрутку
	}
	// Прокрутка вверх, если курсор близко к верхней границе
	else if (e.clientY < threshold) {
		window.scrollBy(0, -scrollSpeed);
		startY -= scrollSpeed; // Компенсируем прокрутку
	}
});
