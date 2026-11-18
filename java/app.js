// DADOS DOS PROFISSIONAIS
const professionalsData = [
  {
    id: 1,
    name: "Carlos Silva",
    category: "reparos",
    rating: 5,
    location: "São Paulo - SP",
    keywords: ["eletricista", "fiação", "quadro de luz", "tomadas"],
    desc: "Eletricista residencial com verificação ativa na plataforma."
  },
  {
    id: 2,
    name: "Ana Souza",
    category: "aulas",
    rating: 5,
    location: "São Paulo - SP",
    keywords: ["matemática", "reforço", "física", "ensino fundamental"],
    desc: "Professora particular de exatas para ensino fundamental e médio."
  },
  {
    id: 3,
    name: "Roberto Oliveira",
    category: "cuidados",
    rating: 4,
    location: "Guarulhos - SP",
    keywords: ["barbeiro", "corte", "barba", "domicílio"],
    desc: "Atendimento de barbearia no conforto da sua casa."
  }
];

// DADOS DOS TESTADORES / FEEDBACKS (Retirados do slide do MVP)
const reviewsData = [
  {
    author: "Sibelle Ramos",
    rating: 4,
    comment: "Achei o aplicativo muito interessante, mas sinto que ele pode melhorar adicionando palavras-chave na aba de busca."
  },
  {
    author: "Michel Leonardo",
    rating: 2,
    comment: "O app precisa de atualizações para ser lançado ao público."
  },
  {
    author: "Matheus Miranda",
    rating: 3,
    comment: "Contratei o serviço do eletricista daqui, mas não soube muito bem realizar o serviço elétrico da minha casa. Pelo menos está funcionando."
  }
];

// INTEGRANTES DA STARTUP
const foundersData = [
  "Emanuely de Sousa",
  "Jean Gabriel",
  "Mateus Campos",
  "Nicolas Valentim",
  "Vitor do Amaral"
];

// HISTÓRICO DE MENSAGENS DO CHAT SIMULADO
let chatMessages = [
  { sender: "pro", text: "Olá! Sou o Carlos Silva. Como posso te ajudar com o serviço elétrico hoje?" }
];

// NAVEGAÇÃO ENTRE ABAS
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(`tab-${tabId}`).classList.add('active');
  event.target.classList.add('active');
}

// RENDERIZAÇÃO DOS PROFISSIONAIS (Com busca e palavra-chave)
function renderCards() {
  const grid = document.getElementById('professionals-grid');
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
      <p><b>Local:</b> ${pro.location}</p>
      <p style="margin-top: 0.5rem;">${pro.desc}</p>
      <div class="keywords">
        ${pro.keywords.map(kw => `<span class="tag">#${kw}</span>`).join('')}
      </div>
      <button class="btn-primary" style="width: 100%; margin-top: 1rem;" onclick="openChat('${pro.name}')">Iniciar Chat</button>
    </div>
  `).join('');
}

// RENDERIZAÇÃO DE FEEDBACKS
function renderReviews() {
  const grid = document.getElementById('reviews-grid');
  grid.innerHTML = reviewsData.map(rev => `
    <div class="card">
      <h3>${rev.author}</h3>
      <div class="stars">${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}</div>
      <p><em>"${rev.comment}"</em></p>
    </div>
  `).join('');
}

// RENDERIZAÇÃO DOS INTEGRANTES
function renderFounders() {
  const list = document.getElementById('founders-list');
  list.innerHTML = foundersData.map(name => `
    <div class="founder-badge">
      <i class="fa-solid fa-user"></i> ${name}
    </div>
  `).join('');
}

// LOGICA DO CHAT INTERATIVO
function renderChat() {
  const box = document.getElementById('chat-box');
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

  // Resposta automática simulada do backend/prestador
  setTimeout(() => {
    chatMessages.push({ 
      sender: 'pro', 
      text: 'Entendido! Poderia me passar mais detalhes do local para eu te enviar um orçamento prévio?' 
    });
    renderChat();
  }, 1000);
}

function handleKeyPress(e) {
  if (e.key === 'Enter') sendMessage();
}

function openChat(proName) {
  document.getElementById('chat-header-title').innerText = `Conversando com: ${proName}`;
  switchTab('chat');
}

// INICIALIZAÇÃO DA APLICAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  renderReviews();
  renderFounders();
  renderChat();
});