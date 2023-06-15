let scrollInProgress = false;

    webgazer.setGazeListener((data, elapsedTime) => {
      console.log('to aqui')
      if (data == null) {
        return;
      }

      const x = data.x; // posição horizontal do olhar
      const y = data.y; // posição vertical do olhar

      const scrollIndicator = document.getElementById('scroll-indicator');
      const gazeIndicator = document.getElementById('gaze-indicator');

      // Atualiza a posição do indicador de olhar
      gazeIndicator.style.left = x + 'px';
      gazeIndicator.style.top = y + 'px';

      // Verifica se o usuário está olhando para o scroll-indicator e se o scroll não está em andamento
      // console.log('loop')
      // if (isLookingAtElement(scrollIndicator, x, y) && !scrollInProgress) {
      //   console.log('is looking')
      //   scrollInProgress = true;
      //   smoothScroll();
      // }
    });

    // Solicita permissão para acessar a câmera e inicia a calibragem
    webgazer
      .setGazeListener(function(data) {
        if (data == null) {
          return;
        }
  
        const x = data.x; // posição horizontal do olhar
        const y = data.y; // posição vertical do olhar
  
        const scrollIndicator = document.getElementById('scroll-indicator');
        // const gazeIndicator = document.getElementById('gaze-indicator');
  
        // Atualiza a posição do indicador de olhar
        // gazeIndicator.style.left = x + 'px';
        // gazeIndicator.style.top = y + 'px';
  
        // Verifica se o usuário está olhando para o scroll-indicator e se o scroll não está em andamento
        
        if (isLookingAtElement(scrollIndicator, x, y) && !scrollInProgress) {
          console.log('is looking')
          smoothScroll();
        }
      })
      .begin();

    // webgazer.showPredictionPoints(false);

    // Função para verificar se o usuário está olhando para um elemento
    function isLookingAtElement(element, x, y) {
      const rect = element.getBoundingClientRect();

      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    }

    // Função para rolagem suave da página
    function smoothScroll() {
     
      const scrollStep = 10; // Quantidade de pixels a serem rolados por etapa
      const scrollInterval = 50; // Intervalo de tempo entre as etapas de rolagem (em milissegundos)
      const scrollDuration = 1000; // Duração total do scroll (em milissegundos)

      if (!scrollInProgress) {
        scrollInProgress = true;

        let scrollAmount = 0;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollStepCount = Math.ceil(scrollDuration / scrollInterval);

        const scrollIntervalId = setInterval(() => {
          scrollAmount += scrollStep;
          window.scrollBy(0, scrollStep);

          if (scrollAmount >= scrollHeight || scrollAmount >= scrollStepCount * scrollStep) {
            clearInterval(scrollIntervalId);
            scrollInProgress = false;
          }
        }, scrollInterval);
      }

    }

    // Função para cálculo de interpolação suave
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }