document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const selecionarForma = document.getElementById('selecionarForma');
    const parametrosDiv = document.getElementById('parametros');
    const resultadoTexto = document.getElementById('resultadoTexto');
    const shapeVisualization = document.getElementById('shapeVisualization');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Ícones para cada forma geométrica
    const shapeIcons = {
        quadrado: 'fas fa-square',
        retangulo: 'fas fa-rectangle-landscape',
        triangulo: 'fas fa-triangle',
        circulo: 'fas fa-circle',
        trapezio: 'fas fa-shapes',
        paralelogramo: 'fas fa-shapes',
        losango: 'fas fa-diamond',
        esfera: 'fas fa-globe',
        cilindro: 'fas fa-cylinder',
        cone: 'fas fa-cone',
        prisma_base_triangular: 'fas fa-gem',
        prisma_base_quadrangular: 'fas fa-cube',
        prisma_base_pentagonal: 'fas fa-gem',
        prisma_base_hexagonal: 'fas fa-honeycomb',
        cubo: 'fas fa-cube',
        paralelepipedo: 'fas fa-box',
        piramide_base_triangular: 'fas fa-gem',
        piramide_base_quadrangular: 'fas fa-pyramid',
        piramide_base_pentagonal: 'fas fa-gem',
        piramide_base_hexagonal: 'fas fa-honeycomb'
    };
    
    // Dark mode toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Verificar preferência de dark mode
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    
    // Evento para mudança de forma geométrica
    selecionarForma.addEventListener('change', function() {
        const formaSelecionada = selecionarForma.value;
        
        // Limpar campos anteriores
        parametrosDiv.innerHTML = '';
        
        // Atualizar visualização da forma
        updateShapeVisualization(formaSelecionada);
        
        // Se nenhuma forma selecionada, mostrar placeholder
        if (!formaSelecionada) {
            resultadoTexto.innerHTML = `
                <div class="resultado-placeholder">
                    <i class="fas fa-calculator"></i>
                    <p>Selecione uma forma geométrica para começar</p>
                </div>
            `;
            return;
        }
        
        // Criar campos de entrada baseado na forma selecionada
        switch (formaSelecionada) {
            // Formas Planas
            case 'quadrado': criarCampo('Lado', 'lado'); break;
            case 'retangulo': criarCampo('Base', 'base'); criarCampo('Altura', 'altura'); break;
            case 'triangulo': criarCampo('Base', 'base'); criarCampo('Altura', 'altura'); break;
            case 'circulo': criarCampo('Raio', 'raio'); break;
            case 'trapezio': criarCampo('Base Maior', 'baseMaior'); criarCampo('Base Menor', 'baseMenor'); criarCampo('Altura', 'altura'); break;
            case 'paralelogramo': criarCampo('Base', 'base'); criarCampo('Altura', 'altura'); break;
            case 'losango': criarCampo('Diagonal Maior', 'diagonalMaior'); criarCampo('Diagonal Menor', 'diagonalMenor'); break;
            
            // Corpos Redondos
            case 'esfera': criarCampo('Raio', 'raio'); break;
            case 'cilindro': criarCampo('Raio', 'raio'); criarCampo('Altura', 'altura'); break;
            case 'cone': criarCampo('Raio', 'raio'); criarCampo('Altura', 'altura'); criarCampo('Geratriz', 'geratriz', true); break;
            
            // Prismas
            case 'prisma_base_triangular': criarCampo('Área da Base', 'areaBase'); criarCampo('Perímetro da Base', 'perimetroBase'); criarCampo('Altura', 'altura'); break;
            case 'prisma_base_quadrangular': criarCampo('Lado da Base', 'ladoBase'); criarCampo('Altura', 'altura'); break;
            case 'prisma_base_pentagonal': criarCampo('Área da Base', 'areaBase'); criarCampo('Perímetro da Base', 'perimetroBase'); criarCampo('Altura', 'altura'); break;
            case 'prisma_base_hexagonal': criarCampo('Lado da Base', 'ladoBase'); criarCampo('Apotema da Base', 'apotemaBase'); criarCampo('Altura', 'altura'); break;
            case 'cubo': criarCampo('Aresta', 'aresta'); break;
            case 'paralelepipedo': criarCampo('Comprimento', 'comprimento'); criarCampo('Largura', 'largura'); criarCampo('Altura', 'altura'); break;
            
            // Pirâmides
            case 'piramide_base_triangular': criarCampo('Área da Base', 'areaBase'); criarCampo('Perímetro da Base', 'perimetroBase'); criarCampo('Altura', 'altura'); criarCampo('Apótema da Pirâmide', 'apotemaPiramide', true); break;
            case 'piramide_base_quadrangular': criarCampo('Lado da Base', 'ladoBase'); criarCampo('Altura', 'altura'); criarCampo('Apótema da Pirâmide', 'apotemaPiramide', true); break;
            case 'piramide_base_pentagonal': criarCampo('Área da Base', 'areaBase'); criarCampo('Perímetro da Base', 'perimetroBase'); criarCampo('Altura', 'altura'); criarCampo('Apótema da Pirâmide', 'apotemaPiramide', true); break;
            case 'piramide_base_hexagonal': criarCampo('Lado da Base', 'ladoBase'); criarCampo('Apotema da Base', 'apotemaBase'); criarCampo('Altura', 'altura'); criarCampo('Apótema da Pirâmide', 'apotemaPiramide', true); break;
        }
        
        // Adicionar botão calcular
        criarBotaoCalcular();
    });
    
    // Função para atualizar a visualização da forma
    function updateShapeVisualization(forma) {
        if (!forma) {
            shapeVisualization.innerHTML = '<i class="fas fa-question"></i>';
            shapeVisualization.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
            shapeVisualization.style.borderRadius = '20px';
            shapeVisualization.style.clipPath = '';
            return;
        }
        
        shapeVisualization.innerHTML = `<i class="${shapeIcons[forma] || 'fas fa-shapes'}"></i>`;
        
        // Efeitos especiais para algumas formas
        switch(forma) {
            case 'esfera':
                shapeVisualization.style.borderRadius = '50%';
                shapeVisualization.style.clipPath = '';
                break;
            case 'cilindro':
                shapeVisualization.style.borderRadius = '50% / 10%';
                shapeVisualization.style.clipPath = '';
                break;
            case 'cone':
                shapeVisualization.style.borderRadius = '50% 50% 0 0';
                shapeVisualization.style.clipPath = 'circle(50% at 50% 30%)';
                break;
            case 'triangulo':
                shapeVisualization.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                break;
            case 'trapezio':
                shapeVisualization.style.clipPath = 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)';
                break;
            default:
                shapeVisualization.style.borderRadius = '20px';
                shapeVisualization.style.clipPath = '';
        }
    }
    
    // Função para criar campos de entrada
    function criarCampo(labelText, inputId, opcional = false) {
        const div = document.createElement('div');
        div.className = 'input-group';
        
        const label = document.createElement('label');
        label.textContent = labelText + (opcional ? ' (Opcional)' : '');
        label.htmlFor = inputId;
        
        const input = document.createElement('input');
        input.type = 'number';
        input.id = inputId;
        input.placeholder = `Digite o ${labelText.toLowerCase()}`;
        input.step = 'any';
        input.min = '0';
        input.className = 'input-field';
        
        div.appendChild(label);
        div.appendChild(input);
        parametrosDiv.appendChild(div);
    }
    
    // Função para criar botão de calcular
    function criarBotaoCalcular() {
        const button = document.createElement('button');
        button.id = 'botaoCalcular';
        button.innerHTML = '<i class="fas fa-calculator"></i> Calcular';
        
        button.addEventListener('click', calcularResultado);
        parametrosDiv.appendChild(button);
    }
    
    // Função principal de cálculo
    function calcularResultado() {
        const forma = selecionarForma.value;
        
        // Animação de loading
        resultadoTexto.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i>
                <p style="margin-top: 10px;">Calculando...</p>
            </div>
        `;
        
        // Pequeno delay para mostrar a animação
        setTimeout(() => {
            let resultadoHTML = '';
            
            switch (forma) {
                // Formas Planas
                case 'quadrado': {
                    const lado = parseFloat(document.getElementById('lado').value);
                    if (!isNaN(lado) && lado > 0) {
                        const area = lado * lado;
                        const perimetro = 4 * lado;
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área:</span>
                                <span class="resultado-valor">${area.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Perímetro:</span>
                                <span class="resultado-valor">${perimetro.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'retangulo': {
                    const base = parseFloat(document.getElementById('base').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    if (!isNaN(base) && !isNaN(altura) && base > 0 && altura > 0) {
                        const area = base * altura;
                        const perimetro = 2 * (base + altura);
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área:</span>
                                <span class="resultado-valor">${area.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Perímetro:</span>
                                <span class="resultado-valor">${perimetro.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'triangulo': {
                    const base = parseFloat(document.getElementById('base').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    if (!isNaN(base) && !isNaN(altura) && base > 0 && altura > 0) {
                        const area = (base * altura) / 2;
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área:</span>
                                <span class="resultado-valor">${area.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'circulo': {
                    const raio = parseFloat(document.getElementById('raio').value);
                    if (!isNaN(raio) && raio > 0) {
                        const area = Math.PI * raio * raio;
                        const circunferencia = 2 * Math.PI * raio;
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área:</span>
                                <span class="resultado-valor">${area.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Circunferência:</span>
                                <span class="resultado-valor">${circunferencia.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'trapezio': {
                    const baseMaior = parseFloat(document.getElementById('baseMaior').value);
                    const baseMenor = parseFloat(document.getElementById('baseMenor').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    if (!isNaN(baseMaior) && !isNaN(baseMenor) && !isNaN(altura) && baseMaior > 0 && baseMenor > 0 && altura > 0) {
                        const area = ((baseMaior + baseMenor) * altura) / 2;
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área:</span>
                                <span class="resultado-valor">${area.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'paralelogramo': {
                    const base = parseFloat(document.getElementById('base').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    if (!isNaN(base) && !isNaN(altura) && base > 0 && altura > 0) {
                        const area = base * altura;
                        const perimetro = 2 * (base + altura);
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área:</span>
                                <span class="resultado-valor">${area.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Perímetro:</span>
                                <span class="resultado-valor">${perimetro.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'losango': {
                    const diagonalMaior = parseFloat(document.getElementById('diagonalMaior').value);
                    const diagonalMenor = parseFloat(document.getElementById('diagonalMenor').value);
                    if (!isNaN(diagonalMaior) && !isNaN(diagonalMenor) && diagonalMaior > 0 && diagonalMenor > 0) {
                        const area = (diagonalMaior * diagonalMenor) / 2;
                        const lado = Math.sqrt(Math.pow(diagonalMaior/2, 2) + Math.pow(diagonalMenor/2, 2));
                        const perimetro = 4 * lado;
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área:</span>
                                <span class="resultado-valor">${area.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Perímetro:</span>
                                <span class="resultado-valor">${perimetro.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }

                // Corpos Redondos
                case 'esfera': {
                    const raio = parseFloat(document.getElementById('raio').value);
                    if (!isNaN(raio) && raio > 0) {
                        const area = 4 * Math.PI * Math.pow(raio, 2);
                        const volume = (4/3) * Math.PI * Math.pow(raio, 3);
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área da Superfície:</span>
                                <span class="resultado-valor">${area.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Volume:</span>
                                <span class="resultado-valor">${volume.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'cilindro': {
                    const raio = parseFloat(document.getElementById('raio').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    if (!isNaN(raio) && !isNaN(altura) && raio > 0 && altura > 0) {
                        const areaLateral = 2 * Math.PI * raio * altura;
                        const areaTotal = 2 * Math.PI * raio * (raio + altura);
                        const volume = Math.PI * Math.pow(raio, 2) * altura;
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área Lateral:</span>
                                <span class="resultado-valor">${areaLateral.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Total:</span>
                                <span class="resultado-valor">${areaTotal.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Volume:</span>
                                <span class="resultado-valor">${volume.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'cone': {
                    const raio = parseFloat(document.getElementById('raio').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    const geratrizInput = document.getElementById('geratriz');
                    const geratriz = geratrizInput ? parseFloat(geratrizInput.value) : NaN;
                    
                    if (!isNaN(raio) && !isNaN(altura) && raio > 0 && altura > 0) {
                        const volume = (1/3) * Math.PI * Math.pow(raio, 2) * altura;
                        
                        let g = geratriz;
                        if (isNaN(g) || g <= 0) {
                            g = Math.sqrt(Math.pow(raio, 2) + Math.pow(altura, 2));
                        }
                        
                        const areaLateral = Math.PI * raio * g;
                        const areaTotal = Math.PI * raio * (raio + g);
                        
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área Lateral:</span>
                                <span class="resultado-valor">${areaLateral.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Total:</span>
                                <span class="resultado-valor">${areaTotal.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Volume:</span>
                                <span class="resultado-valor">${volume.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }

                // Prismas
                case 'prisma_base_triangular': {
                    const areaBase = parseFloat(document.getElementById('areaBase').value);
                    const perimetroBase = parseFloat(document.getElementById('perimetroBase').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    if (!isNaN(areaBase) && !isNaN(perimetroBase) && !isNaN(altura) && areaBase > 0 && perimetroBase > 0 && altura > 0) {
                        const areaLateral = perimetroBase * altura;
                        const areaTotal = 2 * areaBase + areaLateral;
                        const volume = areaBase * altura;
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área Lateral:</span>
                                <span class="resultado-valor">${areaLateral.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Total:</span>
                                <span class="resultado-valor">${areaTotal.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Volume:</span>
                                <span class="resultado-valor">${volume.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'prisma_base_quadrangular': {
                    const ladoBase = parseFloat(document.getElementById('ladoBase').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    if (!isNaN(ladoBase) && !isNaN(altura) && ladoBase > 0 && altura > 0) {
                        const areaBase = ladoBase * ladoBase;
                        const perimetroBase = 4 * ladoBase;
                        const areaLateral = perimetroBase * altura;
                        const areaTotal = 2 * areaBase + areaLateral;
                        const volume = areaBase * altura;
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área da Base:</span>
                                <span class="resultado-valor">${areaBase.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Lateral:</span>
                                <span class="resultado-valor">${areaLateral.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Total:</span>
                                <span class="resultado-valor">${areaTotal.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Volume:</span>
                                <span class="resultado-valor">${volume.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'prisma_base_pentagonal': {
                    const areaBase = parseFloat(document.getElementById('areaBase').value);
                    const perimetroBase = parseFloat(document.getElementById('perimetroBase').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    if (!isNaN(areaBase) && !isNaN(perimetroBase) && !isNaN(altura) && areaBase > 0 && perimetroBase > 0 && altura > 0) {
                        const areaLateral = perimetroBase * altura;
                        const areaTotal = 2 * areaBase + areaLateral;
                        const volume = areaBase * altura;
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área Lateral:</span>
                                <span class="resultado-valor">${areaLateral.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Total:</span>
                                <span class="resultado-valor">${areaTotal.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Volume:</span>
                                <span class="resultado-valor">${volume.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'prisma_base_hexagonal': {
                    const ladoBase = parseFloat(document.getElementById('ladoBase').value);
                    const apotemaBase = parseFloat(document.getElementById('apotemaBase').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    if (!isNaN(ladoBase) && !isNaN(apotemaBase) && !isNaN(altura) && ladoBase > 0 && apotemaBase > 0 && altura > 0) {
                        const perimetroBase = 6 * ladoBase;
                        const areaBase = (perimetroBase * apotemaBase) / 2;
                        const areaLateral = perimetroBase * altura;
                        const areaTotal = 2 * areaBase + areaLateral;
                        const volume = areaBase * altura;
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área da Base:</span>
                                <span class="resultado-valor">${areaBase.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Lateral:</span>
                                <span class="resultado-valor">${areaLateral.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Total:</span>
                                <span class="resultado-valor">${areaTotal.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Volume:</span>
                                <span class="resultado-valor">${volume.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'cubo': {
                    const aresta = parseFloat(document.getElementById('aresta').value);
                    if (!isNaN(aresta) && aresta > 0) {
                        const area = 6 * Math.pow(aresta, 2);
                        const volume = Math.pow(aresta, 3);
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área Total:</span>
                                <span class="resultado-valor">${area.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Volume:</span>
                                <span class="resultado-valor">${volume.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'paralelepipedo': {
                    const comprimento = parseFloat(document.getElementById('comprimento').value);
                    const largura = parseFloat(document.getElementById('largura').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    if (!isNaN(comprimento) && !isNaN(largura) && !isNaN(altura) && comprimento > 0 && largura > 0 && altura > 0) {
                        const area = 2 * (comprimento * largura + comprimento * altura + largura * altura);
                        const volume = comprimento * largura * altura;
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área Total:</span>
                                <span class="resultado-valor">${area.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Volume:</span>
                                <span class="resultado-valor">${volume.toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }

                // Pirâmides
                case 'piramide_base_triangular': {
                    const areaBase = parseFloat(document.getElementById('areaBase').value);
                    const perimetroBase = parseFloat(document.getElementById('perimetroBase').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    const apotemaPiramideInput = document.getElementById('apotemaPiramide');
                    const apotemaPiramide = apotemaPiramideInput ? parseFloat(apotemaPiramideInput.value) : NaN;
                    
                    if (!isNaN(areaBase) && !isNaN(perimetroBase) && !isNaN(altura) && areaBase > 0 && perimetroBase > 0 && altura > 0) {
                        const volume = (1/3) * areaBase * altura;
                        
                        let areaLateral = 'Cálculo requer apótema da pirâmide';
                        let areaTotal = 'Cálculo requer apótema da pirâmide';
                        
                        if (!isNaN(apotemaPiramide) && apotemaPiramide > 0) {
                            areaLateral = (perimetroBase * apotemaPiramide) / 2;
                            areaTotal = areaBase + areaLateral;
                        }
                        
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Volume:</span>
                                <span class="resultado-valor">${volume.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Lateral:</span>
                                <span class="resultado-valor">${!isNaN(apotemaPiramide) ? areaLateral.toFixed(2) : areaLateral}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Total:</span>
                                <span class="resultado-valor">${!isNaN(apotemaPiramide) ? areaTotal.toFixed(2) : areaTotal}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'piramide_base_quadrangular': {
                    const ladoBase = parseFloat(document.getElementById('ladoBase').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    const apotemaPiramideInput = document.getElementById('apotemaPiramide');
                    const apotemaPiramide = apotemaPiramideInput ? parseFloat(apotemaPiramideInput.value) : NaN;
                    
                    if (!isNaN(ladoBase) && !isNaN(altura) && ladoBase > 0 && altura > 0) {
                        const areaBase = ladoBase * ladoBase;
                        const volume = (1/3) * areaBase * altura;
                        
                        let areaLateral = 'Cálculo requer apótema da pirâmide';
                        let areaTotal = 'Cálculo requer apótema da pirâmide';
                        
                        if (!isNaN(apotemaPiramide) && apotemaPiramide > 0) {
                            const perimetroBase = 4 * ladoBase;
                            areaLateral = (perimetroBase * apotemaPiramide) / 2;
                            areaTotal = areaBase + areaLateral;
                        }
                        
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área da Base:</span>
                                <span class="resultado-valor">${areaBase.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Volume:</span>
                                <span class="resultado-valor">${volume.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Lateral:</span>
                                <span class="resultado-valor">${!isNaN(apotemaPiramide) ? areaLateral.toFixed(2) : areaLateral}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Total:</span>
                                <span class="resultado-valor">${!isNaN(apotemaPiramide) ? areaTotal.toFixed(2) : areaTotal}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'piramide_base_pentagonal': {
                    const areaBase = parseFloat(document.getElementById('areaBase').value);
                    const perimetroBase = parseFloat(document.getElementById('perimetroBase').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    const apotemaPiramideInput = document.getElementById('apotemaPiramide');
                    const apotemaPiramide = apotemaPiramideInput ? parseFloat(apotemaPiramideInput.value) : NaN;
                    
                    if (!isNaN(areaBase) && !isNaN(perimetroBase) && !isNaN(altura) && areaBase > 0 && perimetroBase > 0 && altura > 0) {
                        const volume = (1/3) * areaBase * altura;
                        
                        let areaLateral = 'Cálculo requer apótema da pirâmide';
                        let areaTotal = 'Cálculo requer apótema da pirâmide';
                        
                        if (!isNaN(apotemaPiramide) && apotemaPiramide > 0) {
                            areaLateral = (perimetroBase * apotemaPiramide) / 2;
                            areaTotal = areaBase + areaLateral;
                        }
                        
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Volume:</span>
                                <span class="resultado-valor">${volume.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Lateral:</span>
                                <span class="resultado-valor">${!isNaN(apotemaPiramide) ? areaLateral.toFixed(2) : areaLateral}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Total:</span>
                                <span class="resultado-valor">${!isNaN(apotemaPiramide) ? areaTotal.toFixed(2) : areaTotal}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }
                
                case 'piramide_base_hexagonal': {
                    const ladoBase = parseFloat(document.getElementById('ladoBase').value);
                    const apotemaBase = parseFloat(document.getElementById('apotemaBase').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    const apotemaPiramideInput = document.getElementById('apotemaPiramide');
                    const apotemaPiramide = apotemaPiramideInput ? parseFloat(apotemaPiramideInput.value) : NaN;
                    
                    if (!isNaN(ladoBase) && !isNaN(apotemaBase) && !isNaN(altura) && ladoBase > 0 && apotemaBase > 0 && altura > 0) {
                        const perimetroBase = 6 * ladoBase;
                        const areaBase = (perimetroBase * apotemaBase) / 2;
                        const volume = (1/3) * areaBase * altura;
                        
                        let areaLateral = 'Cálculo requer apótema da pirâmide';
                        let areaTotal = 'Cálculo requer apótema da pirâmide';
                        
                        if (!isNaN(apotemaPiramide) && apotemaPiramide > 0) {
                            areaLateral = (perimetroBase * apotemaPiramide) / 2;
                            areaTotal = areaBase + areaLateral;
                        }
                        
                        resultadoHTML = `
                            <div class="resultado-item">
                                <span class="resultado-label">Área da Base:</span>
                                <span class="resultado-valor">${areaBase.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Volume:</span>
                                <span class="resultado-valor">${volume.toFixed(2)}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Lateral:</span>
                                <span class="resultado-valor">${!isNaN(apotemaPiramide) ? areaLateral.toFixed(2) : areaLateral}</span>
                            </div>
                            <div class="resultado-item">
                                <span class="resultado-label">Área Total:</span>
                                <span class="resultado-valor">${!isNaN(apotemaPiramide) ? areaTotal.toFixed(2) : areaTotal}</span>
                            </div>`;
                    } else {
                        resultadoHTML = '<div class="erro">Para de ser mobile, e coloca um valor válido</div>';
                    }
                    break;
                }

                default:
                    resultadoHTML = '<div class="erro">Selecione uma forma geométrica válida.</div>';
            }
            
            resultadoTexto.innerHTML = `
                <div class="resultado-content">
                    ${resultadoHTML}
                </div>
            `;
        }, 500);
    }
});