document.addEventListener("DOMContentLoaded", function() {
    const bigHeart = document.getElementById("big-heart");
    const message = document.getElementById("message");
    const container = document.querySelector(".container");
    
    // Configuración
    const totalHearts = 150;
    const heartColors = ["#FF0000", "#FF3366", "#FF6699", "#FF0066", "#FF0033"];
    const backgroundHeartsCount = 50;
    
    // Crear los corazones de fondo que explotan
    function createBackgroundHearts() {
        for (let i = 0; i < backgroundHeartsCount; i++) {
            createFloatingHeart();
        }
        
        // Crear nuevos corazones periódicamente
        setInterval(createFloatingHeart, 1000);
    }
    
    // Crear un corazón flotante que se mueve hacia arriba
    function createFloatingHeart() {
        const heart = document.createElement("div");
        heart.className = "background-heart";
        
        // Posición inicial
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 20 + 10;
        const duration = Math.random() * 6 + 4;
        const opacity = Math.random() * 0.5 + 0.2;
        
        // Propiedades CSS
        heart.style.left = `${startX}px`;
        heart.style.bottom = `-${size}px`;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.setProperty('--scale', Math.random() * 0.3 + 0.7);
        heart.style.setProperty('--opacity', opacity);
        heart.style.animation = `float-upward ${duration}s linear forwards`;
        
        // Color aleatorio
        const color = heartColors[Math.floor(Math.random() * heartColors.length)];
        heart.style.backgroundColor = color;
        
        // Antes y después también deben tener el mismo color
        heart.style.setProperty('--heart-color', color);
        
        // Añadir al DOM
        container.appendChild(heart);
        
        // Eliminar después de la animación
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
    
    // Crear el corazón grande a partir de mini corazones
    function createHearts() {
        // Limpiar corazones existentes
        bigHeart.innerHTML = "";
        
        // Crear puntos en forma de corazón
        const heartPoints = generateHeartShape(totalHearts);
        
        // Crear mini corazones
        for (let i = 0; i < totalHearts; i++) {
            const miniHeart = document.createElement("div");
            miniHeart.className = "mini-heart";
            
            // Seleccionar tipo de corazón aleatorio (1, 2 o 3)
            const heartType = Math.floor(Math.random() * 3) + 1;
            miniHeart.classList.add(`heart-type${heartType}`);
            
            // Posición aleatoria inicial (fuera de la vista)
            const randomX = Math.random() * window.innerWidth - window.innerWidth / 2;
            const randomY = Math.random() * window.innerHeight - window.innerHeight / 2;
            
            // Posición final (forma de corazón)
            const finalX = heartPoints[i].x;
            const finalY = heartPoints[i].y;
            
            // Tamaño aleatorio
            const randomSize = Math.random() * 5 + 5;
            
            // Color aleatorio (aplicado en CSS por tipo de corazón)
            const randomColor = heartColors[Math.floor(Math.random() * heartColors.length)];
            
            // Estilos adicionales para variedad
            if (heartType === 1) {
                miniHeart.style.backgroundColor = randomColor;
            }
            
            // Posición inicial
            miniHeart.style.left = `${randomX}px`;
            miniHeart.style.top = `${randomY}px`;
            
            // Añadir al contenedor
            bigHeart.appendChild(miniHeart);
            
            // Animación de entrada
            setTimeout(() => {
                miniHeart.style.transition = `all ${Math.random() * 2 + 1}s ease`;
                miniHeart.style.left = `${finalX}px`;
                miniHeart.style.top = `${finalY}px`;
                miniHeart.style.opacity = "1";
                
                // Añadir animación de pulso con retraso aleatorio
                setTimeout(() => {
                    miniHeart.style.animation = `pulse ${Math.random() * 2 + 1}s infinite, float ${Math.random() * 3 + 2}s infinite`;
                }, Math.random() * 3000);
                
            }, Math.random() * 2000);
        }
        
        // Mostrar mensaje después de la animación
        setTimeout(() => {
            message.classList.remove("hidden");
            message.classList.add("visible");
            message.style.animation = "heartBeat 1.3s infinite";
            
            // Animación de "explosión" de corazones al mostrar el mensaje
            setTimeout(() => {
                const miniHearts = document.querySelectorAll('.mini-heart');
                
                miniHearts.forEach(heart => {
                    // Parar animaciones actuales
                    heart.style.animation = '';
                    
                    // Variables para la explosión
                    const tx = (Math.random() - 0.5) * 500; // Distancia X aleatoria
                    const ty = (Math.random() - 0.5) * 500; // Distancia Y aleatoria
                    const delay = Math.random() * 1000; // Retraso aleatorio
                    
                    // Configurar variables CSS para la animación
                    heart.style.setProperty('--tx', `${tx}px`);
                    heart.style.setProperty('--ty', `${ty}px`);
                    
                    // Añadir animación de explosión con retraso
                    setTimeout(() => {
                        heart.style.animation = `explode ${Math.random() * 1 + 1}s forwards`;
                    }, delay);
                });
            }, 8000); // Explotar después de 8 segundos
            
        }, 3500);
    }
    
    // Generar puntos en forma de corazón
    function generateHeartShape(numPoints) {
        const points = [];
        const centerX = 0;
        const centerY = 0;
        const size = 100;
        
        for (let i = 0; i < numPoints; i++) {
            // Parámetro para ecuación de corazón (0 a 2π)
            const t = 2 * Math.PI * (i / numPoints);
            
            // Ecuación paramétrica de corazón
            const x = size * 16 * Math.pow(Math.sin(t), 3);
            const y = size * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * -0.7;
            
            points.push({
                x: x + centerX,
                y: y + centerY
            });
        }
        
        return points;
    }
    
    // Iniciar los efectos
    createBackgroundHearts();
    createHearts();
});