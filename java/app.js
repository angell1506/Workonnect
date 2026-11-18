// DADOS FOCADOS EXCLUSIVAMENTE EM TRABALHOS DOMÉSTICOS / RENDA EXTRA
const professionalsData = [
  {
    id: 1,
    name: "Maria das Graças",
    category: "limpeza",
    rating: 5,
    location: "São Paulo - SP",
    keywords: ["diária", "faxina", "limpeza pesada", "organização"],
    desc: "Ofereço serviços de limpeza residencial completa para renda extra nos finais de semana e folgas."
  },
  {
    id: 2,
    name: "Luciana Alves",
    category: "passadoria",
    rating: 5,
    location: "São Paulo - SP",
    keywords: ["passar roupa", "passadoria", "organização de guarda-roupa"],
    desc: "Passo roupas por peça ou diária. Experiência com roupas delicadas e ternos."
  },
  {
    id: 3,
    name: "Joaquim Ramos",
    category: "jardim",
    rating: 4,
    location: "Guarulhos - SP",
    keywords: ["jardinagem", "corta grama", "poda", "quintal"],
    desc: "Realizo manutenção de jardins, poda de plantas e limpeza de quintais para reforçar a renda."
  },
  {
    id: 4,
    name: "Carlos Eduardo",
    category: "manutencao",
    rating: 5,
    location: "São Paulo - SP",
    keywords: ["marido de aluguel", "trocar torneira", "instalar chuveiro", "montagem de móveis"],
    desc: "Ajudo com pequenos reparos residenciais, troca de lâmpadas e montagem de móveis simples."
  }
];

// DADOS DOS TESTADORES / FEEDBACKS (Focados em serviços domésticos)
const reviewsData = [
  {
    author: "Sibelle Ramos",
    rating: 4,
    comment: "Achei a ideia excelente para encontrar pessoas do bairro para passar roupa! A busca por palavras-chave ajudou bastante a achar quem passa por diária."
  },
  {
    author: "Michel Leonardo",
    rating: 2,
    comment: "O app precisa de mais filtros por bairro para facilitar encontrar ajudantes domésticos bem perto de casa."
  },
  {
    author: "Matheus Miranda",
    rating: 3,
    comment: "Contratei ajuda para arrumar a fiação simples do quintal. O serviço funcionou, mas a pessoa demorou um pouco mais do que o previsto."
  }
];

// INTEGRANTES DA STARTUP (Slide 1)
const foundersData = [
  "Emanuely de Sousa",
  "Jean Gabriel",
  "Mateus Campos",
  "Nicolas Valentim",
  "Vitor do Amaral"
];

// MENSAGENS SIMULADAS DE TRABALHO DOMÉSTICO
let chatMessages = [
  { sender: "pro", text: "Olá! Sou a Maria das Graças. Trabalho com diárias de limpeza e organização da casa. Como posso te ajudar?" }
];

// TROCA DE ABAS
function switchTab(tabId, btnElement) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(`tab-${tabId}`).classList.add('active');
  if (btnElement) {
    btnElement.classList.add('active');
  }
}

function switchTabByName(tabId) {
  const buttons = document.querySelectorAll('.nav-btn');
  let targetBtn = null;
  if (tabId === 'search') targetBtn = buttons[1];

  switchTab(tabId, targetBtn);
}

// RENDERIZAR CARDS DOS AJUDANTES DOMÉSTICOS
function renderCards() {
  const grid = document.getElementById('professionals-grid');
  if (!grid) return;
  const searchText = document.getElementById('search-input').value.toLowerCase();
  const selectedCategory = document.getElementById('category-select').value;

  const filtered = professionalsData.filter(pro => {
    const matchesCategory = selectedCategory === 'todos' || pro.category === selectedCategory;
    const matchesSearch = pro.name.toLowerCase().includes(searchText) ||
      pro.keywords.some(kw => kw.toLowerCase().includes(searchText));
    
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = filtered.map(pro => `
    <div class="card">
      <h3>${pro.name}</h3>
      <div class="stars">${'★'.repeat(pro.rating)}${'☆'.repeat(5 - pro.rating)}</div>
      <p style="margin-bottom: 0.4rem;"><b>Local:</b> ${pro.location}</p>
      <p>${pro.desc}</p>
      <div class="keywords">
        ${pro.keywords.map(kw => `<span class="tag">#${kw}</span>`).join('')}
      </div>
      <button class="btn-primary" style="width: 100%; margin-top: 1.25rem;" onclick="openChat('${pro.name}')">Iniciar Chat</button>
    </div>
  `).join('');
}

// RENDERIZAR FEEDBACKS
function renderReviews() {
  const grid = document.getElementById('reviews-grid');
  if (!grid) return;
  grid.innerHTML = reviewsData.map(rev => `
    <div class="card">
      <h3>${rev.author}</h3>
      <div class="stars">${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}</div>
      <p><em>"${rev.comment}"</em></p>
    </div>
  `).join('');
}

// RENDERIZAR FUNDADORES
function renderFounders() {
  const list = document.getElementById('founders-list');
  if (!list) return;
  list.innerHTML = foundersData.map(name => `
    <div class="founder-badge">
      <i data-lucide="user"></i> ${name}
    </div>
  `).join('');
}

// RENDERIZAR CHAT
function renderChat() {
  const box = document.getElementById('chat-box');
  if (!box) return;
  box.innerHTML = chatMessages.map(msg => `
    <div class="chat-bubble ${msg.sender}">
      ${msg.text}
    </div>
  `).join('');
  box.scrollTop = box.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  chatMessages.push({ sender: 'user', text: text });
  input.value = '';
  renderChat();

  setTimeout(() => {
    chatMessages.push({ 
      sender: 'pro', 
      text: 'Perfeito! Qual seria o dia ideal para você e o tamanho do local para combinarmos o valor da diária?' 
    });
    renderChat();
  }, 1000);
}

function handleKeyPress(e) {
  if (e.key === 'Enter') sendMessage();
}

function openChat(proName) {
  document.getElementById('chat-header-title').innerText = `Conversando com: ${proName}`;
  const chatBtn = document.querySelectorAll('.nav-btn')[2];
  switchTab('chat', chatBtn);
}

// INICIALIZAÇÃO E CARREGAMENTO DE ÍCONES
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  renderReviews();
  renderFounders();
  renderChat();
  
  // Renderizar ícones do Lucide
  if (window.lucide) {
    lucide.createIcons();
  }
});