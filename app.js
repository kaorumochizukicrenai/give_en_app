const screens = Array.from(document.querySelectorAll('.screen'));
const header = document.getElementById('global-header');
const footer = document.getElementById('global-footer');
const memberMenu = document.getElementById('member-menu');
const adminMenu = document.getElementById('admin-menu');
const modals = Array.from(document.querySelectorAll('.modal'));

const listConfigs = {
  'footer-ads': { type: 'footerAd', total: 12 },
  'member-notifications': { type: 'notification', total: 5 },
  'banner-ads': { type: 'banner', total: 5 },
  'recent-members': { type: 'memberTile', total: 8 },
  'recommended-members': { type: 'memberTile', total: 8 },
  'profile-favorites': { type: 'memberTile', total: 50 },
  'profile-1on1': { type: 'memberTile', total: 50 },
  'profile-follow': { type: 'memberTile', total: 50 },
  'profile-followers': { type: 'memberTile', total: 50 },
  'member-search-all': { type: 'memberTile', total: 50 },
  'member-search-recommend': { type: 'memberTile', total: 50 },
  'member-search-new': { type: 'memberTile', total: 50 },
  'stripe-history': { type: 'stripeRow', total: 50 },
  'invite-list': { type: 'inviteRow', total: 50 },
  'dm-list': { type: 'dmRow', total: 50 },
  'dm-blocked': { type: 'blockedRow', total: 50 },
  'dm-messages': { type: 'dmBubble', total: 12 },
  'dm-memo-items': { type: 'memoTitle', total: 8 },
  'memo-list': { type: 'memoTile', total: 50 },
  'memo-dialog-list': { type: 'memoTitle', total: 8 },
  'timeline-list': { type: 'timelineRow', total: 50 },
  'news-list': { type: 'newsRow', total: 50 },
  'promo-history': { type: 'promoRow', total: 50 },
  'banner-history': { type: 'bannerHistoryRow', total: 50 },
  'admin-tasks': { type: 'adminTask', total: 10 },
  'admin-members': { type: 'adminMemberRow', total: 50 },
  'admin-dm-list': { type: 'adminDmRow', total: 50 },
  'admin-dm-messages': { type: 'dmBubbleAdmin', total: 12 },
  'admin-join-list': { type: 'adminJoinRow', total: 50 },
  'admin-event-list': { type: 'adminEventRow', total: 50 },
  'admin-ad-list': { type: 'adminAdRow', total: 50 },
  'admin-verify-list': { type: 'adminVerifyRow', total: 50 },
  'admin-news-list': { type: 'adminNewsRow', total: 50 },
  'admin-report-list': { type: 'adminReportRow', total: 50 },
  'admin-invite-list': { type: 'adminInviteRow', total: 50 },
  'admin-log-list': { type: 'adminLogRow', total: 50 },
  'admin-payment-list': { type: 'adminPaymentRow', total: 50 }
};

let unpaidLock = false;

const createRow = {
  footerAd: (i) => `<a class="footer-ad" href="https://example.com" target="_blank" rel="noreferrer">フッター広告 ${i + 1}</a>`,
  notification: (i) => `<div class="table-row">通知 ${i + 1} ・種別ラベル</div>`,
  banner: (i) => `<a class="table-row" href="https://example.com" target="_blank" rel="noreferrer">バナー広告 ${i + 1}</a>`,
  memberTile: (i) => `
    <div class="card" data-action="open-modal" data-modal="profile-detail">
      <div class="avatar small">
        <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80" alt="member" />
        <span class="badge">★</span>
      </div>
      <p class="mt-2 font-semibold">会員 ${i + 1}</p>
      <p class="text-sm">30代 / 東京都 / IT</p>
    </div>
  `,
  stripeRow: (i) => `<div class="table-row">${i + 1}件目 | 2024/07/${(i % 28) + 1} | ¥400 | 完了</div>`,
  inviteRow: (i) => `<div class="table-row">作成日 2024/07/${(i % 28) + 1} | 有効期限 2024/07/${(i % 28) + 7} | GE-${1000 + i} | 未使用 <button class="icon-button" data-action="open-modal" data-modal="invite-delete"><i data-lucide="trash"></i></button></div>`,
  dmRow: (i) => `<div class="table-row" data-nav="dm-detail"><span>会員 ${i + 1}</span> / メッセージ冒頭3行 / <button class="icon-button" data-action="open-modal" data-modal="dm-settings-dialog"><i data-lucide="settings"></i></button></div>`,
  blockedRow: (i) => `<div class="table-row">会員 ${i + 1} <button class="icon-button" data-action="open-modal" data-modal="unblock-dialog"><i data-lucide="unlock"></i></button> <button class="icon-button" data-action="open-modal" data-modal="report-dialog"><i data-lucide="alert-triangle"></i></button></div>`,
  dmBubble: (i) => `<div class="dm-bubble ${i % 2 === 0 ? 'me' : ''}">メッセージ ${i + 1}</div>`,
  dmBubbleAdmin: (i) => `<div class="dm-bubble ${i % 2 === 0 ? 'me' : ''}">公式DM ${i + 1}</div>`,
  memoTitle: (i) => `<div class="table-row">メモ ${i + 1}</div>`,
  memoTile: (i) => `
    <div class="card" data-nav="memo-detail">
      <p class="font-semibold">メモタイトル ${i + 1}</p>
      <div class="avatar small mt-3">
        <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80" alt="member" />
        <span class="badge">★</span>
      </div>
      <button class="icon-button mt-3" data-action="open-modal" data-modal="memo-delete"><i data-lucide="trash"></i></button>
    </div>
  `,
  timelineRow: (i) => `<div class="table-row" data-action="open-modal" data-modal="post-detail">投稿者 ${i + 1} | サムネ 1:1 | 投稿タイトル | 投稿日 2024/07/${(i % 28) + 1}</div>`,
  newsRow: (i) => `<div class="table-row" data-action="open-modal" data-modal="notice-detail">お知らせ ${i + 1} | 投稿日 2024/07/${(i % 28) + 1} | 種別</div>`,
  promoRow: (i) => `<div class="table-row">申請 ${i + 1} | 申請日 2024/07/${(i % 28) + 1} | 承認待ち</div>`,
  bannerHistoryRow: (i) => `<div class="table-row">広告 ${i + 1} | 種別 バナー | 申請日 2024/07/${(i % 28) + 1} | 承認待ち</div>`,
  adminTask: (i) => `<div class="table-row">タスク ${i + 1} | 種別</div>`,
  adminMemberRow: (i) => `<div class="table-row" data-nav="admin-member-detail">会員 ${i + 1} | 東京都 | IT | 有効</div>`,
  adminDmRow: (i) => `<div class="table-row" data-nav="admin-dm-detail">会員 ${i + 1} | 最新メッセージ | 2024/07/${(i % 28) + 1}</div>`,
  adminJoinRow: (i) => `<div class="table-row" data-nav="admin-join-detail">申請日 2024/07/${(i % 28) + 1} | 申請者 ${i + 1} | 会社名 | ステータス</div>`,
  adminEventRow: (i) => `<div class="table-row" data-nav="admin-event-detail">申請日 2024/07/${(i % 28) + 1} | 申請者 ${i + 1} | イベントタイトル | ステータス</div>`,
  adminAdRow: (i) => `<div class="table-row" data-nav="admin-ad-detail">申請日 2024/07/${(i % 28) + 1} | 申請者 ${i + 1} | 広告種別 | ステータス</div>`,
  adminVerifyRow: (i) => `<div class="table-row" data-nav="admin-verify-detail">申請日 2024/07/${(i % 28) + 1} | 申請者 ${i + 1} | ステータス</div>`,
  adminNewsRow: (i) => `<div class="table-row" data-nav="admin-news-detail">お知らせ ${i + 1} | 投稿日 2024/07/${(i % 28) + 1} | 種別</div>`,
  adminReportRow: (i) => `<div class="table-row" data-nav="admin-report-detail">通報日 2024/07/${(i % 28) + 1} | 通報者 ${i + 1} | 対象会員 | 理由 | 状態</div>`,
  adminInviteRow: (i) => `<div class="table-row">発行日 2024/07/${(i % 28) + 1} | GE-${1000 + i} | 利用会員 | 利用日</div>`,
  adminLogRow: (i) => `<div class="table-row">管理者 ${i + 1} | 操作内容 | 2024/07/${(i % 28) + 1}</div>`,
  adminPaymentRow: (i) => `<div class="table-row">会員 ${i + 1} | 月額 | ¥400 | 2024/07/${(i % 28) + 1} | 完了</div>`
};

const renderList = (id, reset = false) => {
  const config = listConfigs[id];
  const container = document.getElementById(id);
  if (!config || !container) return;
  const pageSize = 30;
  const total = config.total;
  let visibleCount = Number(container.dataset.visible) || 0;
  if (reset || visibleCount === 0) {
    visibleCount = Math.min(pageSize, total);
  }
  const items = Array.from({ length: visibleCount }, (_, i) => createRow[config.type](i)).join('');
  container.innerHTML = items;
  container.dataset.visible = String(visibleCount);
  const loadMoreButton = document.querySelector(`[data-action="load-more"][data-target="${id}"]`);
  if (loadMoreButton) {
    loadMoreButton.classList.toggle('hidden', visibleCount >= total);
  }
};

const resetAllLists = () => {
  Object.keys(listConfigs).forEach((id) => renderList(id, true));
  lucide.createIcons();
};

const showScreen = (id) => {
  screens.forEach((screen) => {
    screen.classList.toggle('hidden', screen.dataset.screen !== id);
  });
  const activeScreen = screens.find((screen) => screen.dataset.screen === id);
  const role = activeScreen?.dataset.role;
  header.classList.toggle('hidden', role === 'public');
  footer.classList.toggle('hidden', role !== 'member');
  memberMenu.classList.add('hidden');
  adminMenu.classList.add('hidden');
  closeModals();
  resetAllLists();
  lucide.createIcons();
};

const openModal = (id) => {
  modals.forEach((modal) => {
    modal.classList.toggle('hidden', modal.dataset.modal !== id);
  });
  resetAllLists();
};

const closeModals = () => {
  modals.forEach((modal) => modal.classList.add('hidden'));
};

const setTabs = (group, tabId) => {
  const groupElement = document.querySelector(`[data-tab-group="${group}"]`);
  if (!groupElement) return;
  const groupButtons = groupElement.querySelectorAll('.tab');
  groupButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tabId);
  });
  const screen = groupElement.closest('.screen');
  const panels = screen ? screen.querySelectorAll('[data-tab-panel]') : [];
  panels.forEach((panel) => {
    panel.classList.toggle('hidden', panel.dataset.tabPanel !== tabId);
  });
  resetAllLists();
};

const handleNav = (event) => {
  const navTarget = event.target.closest('[data-nav]');
  if (!navTarget) return;
  const actionTarget = event.target.closest('[data-action]');
  if (actionTarget && actionTarget !== navTarget) return;
  const target = navTarget.dataset.nav;
  if (target === 'home') {
    const activeScreen = screens.find((screen) => !screen.classList.contains('hidden'));
    const role = activeScreen?.dataset.role === 'admin' ? 'admin-home' : 'member-home';
    showScreen(role);
    return;
  }
  if (unpaidLock && target !== 'payment-info' && target !== 'login-info') {
    openModal('unpaid');
    return;
  }
  showScreen(target);
};

const handleActions = (event) => {
  const actionEl = event.target.closest('[data-action]');
  if (!actionEl) return;
  const action = actionEl.dataset.action;
  if (action === 'open-modal') {
    openModal(actionEl.dataset.modal);
  }
  if (action === 'close-modal') {
    closeModals();
  }
  if (action === 'load-more') {
    const targetId = actionEl.dataset.target;
    const container = document.getElementById(targetId);
    if (!container) return;
    container.dataset.visible = listConfigs[targetId].total;
    renderList(targetId);
    lucide.createIcons();
  }
  if (action === 'open-menu') {
    const activeScreen = screens.find((screen) => !screen.classList.contains('hidden'));
    if (activeScreen?.dataset.role === 'admin') {
      adminMenu.classList.remove('hidden');
    } else {
      memberMenu.classList.remove('hidden');
    }
  }
  if (action === 'close-menu') {
    memberMenu.classList.add('hidden');
    adminMenu.classList.add('hidden');
  }
  if (action === 'toggle-dm-memo') {
    document.getElementById('dm-memo-list').classList.toggle('hidden');
    document.getElementById('dm-input-bar').classList.toggle('hidden');
  }
  if (action === 'open-dm-memo-edit') {
    document.getElementById('dm-memo-edit').classList.remove('hidden');
  }
  if (action === 'close-dm-memo-edit') {
    document.getElementById('dm-memo-edit').classList.add('hidden');
  }
};

const handleTabs = (event) => {
  const tabButton = event.target.closest('.tab');
  if (!tabButton) return;
  const group = tabButton.closest('[data-tab-group]').dataset.tabGroup;
  setTabs(group, tabButton.dataset.tab);
};

const handleToggle = (event) => {
  const toggleTarget = event.target.closest('[data-toggle]');
  if (!toggleTarget) return;
  const targetId = toggleTarget.dataset.toggle;
  const target = document.getElementById(targetId);
  if (target) {
    target.classList.toggle('hidden');
  }
};

const handleDev = (event) => {
  if (!event.target.closest('[data-dev-action]')) return;
};

const setupDevControls = () => {
  const devPanel = document.createElement('div');
  devPanel.className = 'dev-panel';
  devPanel.setAttribute('MA-dev', '');
  devPanel.innerHTML = `
    <button class="dev-button" data-action="toggle-unpaid">未払い状態切替</button>
    <button class="dev-button" data-nav="admin-home">管理者ホームへ</button>
    <button class="dev-button" data-nav="member-home">会員ホームへ</button>
  `;
  const memberHome = document.querySelector('[data-screen="member-home"]');
  if (memberHome) {
    memberHome.appendChild(devPanel);
  }
};

const handleExtraActions = (event) => {
  const action = event.target.closest('[data-action="toggle-unpaid"]');
  if (!action) return;
  unpaidLock = !unpaidLock;
};

resetAllLists();
setupDevControls();
showScreen('login');

window.addEventListener('click', (event) => {
  handleNav(event);
  handleActions(event);
  handleTabs(event);
  handleToggle(event);
  handleExtraActions(event);
});

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModals();
    }
  });
});
