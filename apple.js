// Проверяем, посещал ли пользователь страницу ранее
        if (!localStorage.getItem('hasVisitedBefore')) {
            // Первый визит - показываем уведомление
            document.getElementById('content').innerHTML = `
                <div class="notification">
                    <h1>СИСТЕМНОЕ УВЕДОМЛЕНИЕ</h1>
                    <div class="congrats-container">
                        <p class="congrats">ПОЗДРАВЛЯЕМ! ВЫ СТАЛИ ИГРОКОМ</p>
                    </div>
                    <button class="close-btn" onclick="redirectToQuest()">ПЕРЕЙТИ К КВЕСТУ</button>
                </div>
            `;
            
            // Проигрываем звук
            document.getElementById('notification-sound').play();
            
            // Помечаем, что пользователь уже посетил страницу
            localStorage.setItem('hasVisitedBefore', 'true');
        } else {
            // Повторный визит - показываем другое сообщение
            document.getElementById('content').innerHTML = `
                <div class="already-visited">
                    <p>Вы уже активировали свой игровой статус</p>
                    <a href="fitness-quest.html" class="redirect-btn">ПЕРЕЙТИ К КВЕСТУ</a>
                </div>
            `;
        }

        function redirectToQuest() {
            window.location.href = 'fitness-quest.html';
        }