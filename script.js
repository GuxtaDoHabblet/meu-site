const correctWord = "galego";
const secretResult = "Você acertou! O primeiro número é 8.";

function checkWord() {
    const userInput = document.getElementById("inputWord").value;

    const errorMessage = document.getElementById("errorMessage");
    const resultMessage = document.getElementById("result");
    const loadingMessage = document.getElementById("loadingMessage");

    // Esconder todas as mensagens atuais
    setVisible(errorMessage, false);
    setVisible(resultMessage, false);

    // Exibir mensagem de carregamento com fade-in
    setTimeout(() => {
        setVisible(loadingMessage, true);
    }, 600); // Tempo suficiente para as mensagens sumirem

    setTimeout(() => {
        // Esconder mensagem de carregamento com fade-out após 2 segundos
        setVisible(loadingMessage, false);

        setTimeout(() => {
            if (userInput === correctWord) {
                resultMessage.textContent = "BOUAA, " + secretResult;
                resultMessage.classList.remove("error");
                resultMessage.classList.add("correct"); // Adiciona a classe correta para mensagem verde
                setVisible(resultMessage, true);

                setTimeout(() => {
                    setVisible(resultMessage, false);
                }, 2000); // Mensagem verde desaparece após 2 segundos
            } else {
                setVisible(errorMessage, true); // Fade-in mensagem vermelha

                setTimeout(() => {
                    setVisible(errorMessage, false);
                }, 2000); // Mensagem vermelha desaparece após 2 segundos
            }
        }, 600); // Tempo suficiente para a transição da mensagem de carregamento
    }, 2000); // Tempo de exibição da mensagem de carregamento
}

function setVisible(element, isVisible) {
    if (isVisible) {
        element.classList.remove("hidden");
        element.classList.add("visible");
    } else {
        element.classList.remove("visible");
        element.classList.add("hidden");
    }
}

function togglePasswordVisibility() {
    const passwordField = document.getElementById("inputWord");
    const passwordBtn = document.getElementById("showPasswordBtn");

    const isPasswordVisible = passwordField.type === "text";

    if (isPasswordVisible) {
        passwordField.type = "password";
        passwordBtn.textContent = "Mostrar Senha";
    } else {
        passwordField.type = "text";
        passwordBtn.textContent = "Esconder Senha";
    }
}

document.getElementById("inputWord").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkWord();
    }
});

// Função para criar o efeito de movimento e perspectiva 3D a partir do centro com proximidade mais próxima
document.addEventListener("mousemove", function(event) {
    const input = document.getElementById("inputWord");
    const rect = input.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (event.clientX - centerX) / rect.width;
    const distanceY = (event.clientY - centerY) / rect.height;

    const maxDistance = 1; // Reduz a sensibilidade do efeito de proximidade
    const proximity = Math.max(0, maxDistance - Math.sqrt(distanceX * distanceX + distanceY * distanceY));

    const maxMove = 15; // Limite máximo de movimento
    const translateX = Math.min(maxMove, Math.max(-maxMove, distanceX * proximity * 20)); // Limita o movimento no eixo X
    const translateY = Math.min(maxMove, Math.max(-maxMove, distanceY * proximity * 20)); // Limita o movimento no eixo Y
    const rotateY = Math.min(maxMove, Math.max(-maxMove, distanceX * proximity * 15)); // Limita a rotação no eixo Y
    const rotateX = Math.min(maxMove, Math.max(-maxMove, -distanceY * proximity * 15)); // Limita a rotação no eixo X

    input.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// Restaura a posição original ao sair do campo de entrada
document.getElementById("inputWord").addEventListener("mouseleave", function(event) {
    event.target.style.transform = "translate(0, 0) rotateX(0deg) rotateY(0deg)";
});
