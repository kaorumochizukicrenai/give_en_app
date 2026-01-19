const screens = Array.from(document.querySelectorAll('.screen'));
const overlay = document.getElementById('overlay');
const header = document.getElementById('global-header');
const footer = document.getElementById('member-footer');
const memberFooterAds = document.getElementById('footer-ads');
const bannerAds = document.getElementById('banner-ads');
const recentMembers = document.getElementById('recent-members');
const recommendedMembers = document.getElementById('recommended-members');

const dialogGeneric = document.getElementById('dialog-generic');
const dialogTitle = document.getElementById('dialog-title');
const dialogMessage = document.getElementById('dialog-message');
const dialogSearch = document.getElementById('dialog-search');
const dialogSort = document.getElementById('dialog-sort');
const dialogProfile = document.getElementById('dialog-profile');
const dialogMemoList = document.getElementById('dialog-memo-list');

const state = {
  activeScreen: 'screen-login',
  activeRole: 'member',
  pagination: {},
};

const dataSets = {
  members: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `会員 ${i + 1}`,
    age: `${20 + (i % 30)}代`,
    region: ['東京', '大阪', '福岡'][i % 3],
    industry: ['IT', '医療', '教育', '製造'][i % 4],
    avatar: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=120&q=80`,
    badge: '★',
  })),
  invites: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    created: `2024/07/${(i % 28) + 1}`,
    expires: `2024/08/${(i % 28) + 1}`,
    code: `INV-${1000 + i}`,
    used: i % 3 === 0 ? '使用済み' : '未使用',
  })),
  memos: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `メモタイトル ${i + 1}`,
    avatar: `https://images.unsplash.com/photo-${1500000000100 + i}?auto=format&fit=crop&w=120&q=80`,
  })),
  promos: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `投稿タイトル ${i + 1}`,
    date: `2024/07/${(i % 28) + 1}`,
    type: ['タイムライン', 'お知らせ', '宣伝', '広告'][i % 4],
    thumb: `https://images.unsplash.com/photo-${1500000000200 + i}?auto=format&fit=crop&w=120&q=80`,
  })),
};

const notices = [
  { title: 'DM', tag: '未読', text: '新しいDMが届きました。' },
  { title: 'イベント', tag: '開催', text: 'イベント掲載が承認されました。' },
  { title: '公式お知らせ', tag: '更新', text: '新規会員が追加されました。' },
  { title: '申請', tag: '承認', text: '広告申請が承認されました。' },
  { title: 'DM', tag: '返信', text: '返信が届いています。' },
];

const adminData = {
  members: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `会員 ${i + 1}`,
    region: ['東京', '大阪', '福岡'][i % 3],
    industry: ['IT', '医療', '教育'][i % 3],
    status: i % 2 === 0 ? '有効' : '停止',
  })),
  requests: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    date: `2024/07/${(i % 28) + 1}`,
    applicant: `申請者 ${i + 1}`,
    company: `会社 ${i + 1}`,
    code: `INV-${3000 + i}`,
    status: i % 2 === 0 ? '審査中' : '承認済み',
  })),
  events: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    date: `2024/07/${(i % 28) + 1}`,
    applicant: `申請者 ${i + 1}`,
    title: `イベント ${i + 1}`,
    status: i % 2 === 0 ? '審査中' : '承認済み',
  })),
  ads: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    date: `2024/07/${(i % 28) + 1}`,
    applicant: `申請者 ${i + 1}`,
    type: i % 2 === 0 ? 'バナー広告' : 'フッター広告',
    status: i % 2 === 0 ? '審査中' : '承認済み',
  })),
  verify: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    date: `2024/07/${(i % 28) + 1}`,
    applicant: `申請者 ${i + 1}`,
    status: i % 2 === 0 ? '審査中' : '承認済み',
  })),
  reports: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    date: `2024/07/${(i % 28) + 1}`,
    reporter: `通報者 ${i + 1}`,
    target: `対象 ${i + 1}`,
    reason: '迷惑行為',
    status: i % 2 === 0 ? '未対応' : '対応済み',
  })),
  inviteHistory: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    date: `2024/07/${(i % 28) + 1}`,
    code: `INV-${5000 + i}`,
    user: `会員 ${i + 1}`,
    usedDate: `2024/08/${(i % 28) + 1}`,
  })),
  usage: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    admin: `管理者 ${i + 1}`,
    action: '画面閲覧',
    date: `2024/07/${(i % 28) + 1} 10:${(i % 60).toString().padStart(2, '0')}`,
  })),
  payment: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    member: `会員 ${i + 1}`,
    type: i % 2 === 0 ? '月額更新費' : '従量課金',
    amount: `¥${(i + 1) * 100}`,
    date: `2024/07/${(i % 28) + 1}`,
    status: i % 2 === 0 ? '完了' : '未払い',
  })),
  news: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `お知らせ ${i + 1}`,
    date: `2024/07/${(i % 28) + 1}`,
    type: i % 2 === 0 ? '公式' : '新規入会',
  })),
  dm: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `会員 ${i + 1}`,
    preview: '最新メッセージの冒頭テキスト',
    time: `2024/07/${(i % 28) + 1}`,
  })),
};

const ads = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  image: `https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80&sig=${i}`,
  label: `広告 ${i + 1}`,
}));

const tabs = {
  login: 'login',
  profile: 'favorite',
  search: 'member-search',
  dm: 'dm',
  promo: 'timeline',
};

function showScreen(id, role = state.activeRole) {
  const nextScreen = document.getElementById(id);
  const previousScreen = document.querySelector('.screen.active');
  state.activeScreen = id;
  state.activeRole = role;
  screens.forEach((screen) => {
    if (screen.id === id) {
      screen.classList.remove('hidden');
      requestAnimationFrame(() => screen.classList.add('active'));
    } else if (screen.classList.contains('active')) {
      screen.classList.remove('active');
      setTimeout(() => {
        if (!screen.classList.contains('active') && screen.id !== id) {
          screen.classList.add('hidden');
        }
      }, 300);
    } else {
      screen.classList.add('hidden');
    }
  });
  const showHeader = id.startsWith('screen-admin') || id.startsWith('screen-member') || id.startsWith('screen-profile') || id.startsWith('screen-payment') || id.startsWith('screen-invite') || id.startsWith('screen-search') || id.startsWith('screen-dm') || id.startsWith('screen-memo') || id.startsWith('screen-promo') || id.startsWith('screen-login-settings') || id.startsWith('screen-terms');
  header.classList.toggle('hidden', !showHeader);
  footer.classList.toggle('hidden', !(showHeader && role === 'member' && !id.startsWith('screen-terms-admin') && !id.startsWith('screen-admin')));
  closeDialogs();
  resetPagination();
  if (nextScreen) {
    nextScreen.classList.add('active');
  }
}

function closeDialogs() {
  overlay.classList.add('hidden');
  overlay.querySelectorAll('.modal').forEach((modal) => modal.classList.add('hidden'));
}

function openDialog(dialog) {
  overlay.classList.remove('hidden');
  dialog.classList.remove('hidden');
  lucide.createIcons();
}

function resetPagination() {
  state.pagination = {};
  renderAllLists();
}

function paginate(listName, data, renderItem) {
  const page = state.pagination[listName] || 0;
  const start = 0;
  const end = Math.min((page + 1) * 30, data.length);
  return data.slice(start, end).map(renderItem).join('');
}

function renderMemberTile(member) {
  return `
    <button data-action="open-profile-dialog" class="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-4 text-left">
      <div class="relative">
        <img src="${member.avatar}" alt="${member.name}" class="h-24 w-full rounded-xl object-cover" />
        <span class="absolute -bottom-2 -right-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-white">${member.badge}</span>
      </div>
      <div class="mt-3 text-sm font-semibold">${member.name}</div>
      <div class="text-xs text-slate-500">${member.age} / ${member.region} / ${member.industry}</div>
    </button>
  `;
}

function renderInviteRow(invite) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-5">
      <div class="text-sm">${invite.created}</div>
      <div class="text-sm">${invite.expires}</div>
      <div class="text-sm font-semibold">${invite.code}</div>
      <div class="text-sm text-slate-500">${invite.used}</div>
      <button data-action="open-invite-delete" class="flex items-center justify-end text-rose-500"><i data-lucide="trash" class="h-4 w-4"></i></button>
    </div>
  `;
}

function renderMemoCard(memo) {
  return `
    <div class="rounded-2xl border border-slate-200 bg-white p-4">
      <div class="flex items-start justify-between">
        <button data-action="open-memo-detail" class="text-left text-sm font-semibold">${memo.title}</button>
        <button data-action="open-memo-delete" class="text-rose-500"><i data-lucide="trash" class="h-4 w-4"></i></button>
      </div>
      <button data-action="open-profile-dialog" class="mt-4 inline-flex">
        <img src="${memo.avatar}" alt="member" class="h-12 w-12 rounded-full object-cover" />
      </button>
    </div>
  `;
}

function renderMemberDm(row) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[56px_1fr_auto]">
      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80" alt="${row.name}" class="h-12 w-12 rounded-full object-cover" />
      <button data-action="open-dm-detail" class="text-left">
        <div class="text-sm font-semibold">${row.name}</div>
        <div class="text-xs text-slate-500">最新メッセージの冒頭テキスト</div>
        <div class="text-xs text-slate-500">さらに続くテキストが表示されます。</div>
      </button>
      <button data-action="open-dm-settings" class="rounded-xl border border-slate-200 px-3 py-2"><i data-lucide="settings" class="h-4 w-4"></i></button>
    </div>
  `;
}

function renderPromoRow(item) {
  return `
    <button data-action="open-member-promo-detail" class="grid min-w-full gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left md:grid-cols-[80px_1fr]">
      <img src="${item.thumb}" alt="${item.title}" class="h-20 w-20 rounded-xl object-cover" />
      <div>
        <div class="text-sm font-semibold">${item.title}</div>
        <div class="mt-1 text-xs text-slate-500">投稿日：${item.date}</div>
        <div class="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs">${item.type}</div>
      </div>
    </button>
  `;
}

function renderAdminRow(row) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-5">
      <div class="text-sm font-semibold">${row.name}</div>
      <div class="text-sm">${row.region}</div>
      <div class="text-sm">${row.industry}</div>
      <div class="text-sm text-slate-500">${row.status}</div>
      <button data-action="open-admin-member-detail" class="text-sm text-slate-600">詳細</button>
    </div>
  `;
}

function renderAdminRequest(row) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-5">
      <div class="text-sm">${row.date}</div>
      <div class="text-sm font-semibold">${row.applicant}</div>
      <div class="text-sm">${row.company}</div>
      <div class="text-sm text-slate-500">${row.status}</div>
      <button data-action="open-admin-request-detail" class="text-sm text-slate-600">詳細</button>
    </div>
  `;
}

function renderAdminEvent(row) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-5">
      <div class="text-sm">${row.date}</div>
      <div class="text-sm font-semibold">${row.applicant}</div>
      <div class="text-sm">${row.title}</div>
      <div class="text-sm text-slate-500">${row.status}</div>
      <button data-action="open-admin-event-detail" class="text-sm text-slate-600">詳細</button>
    </div>
  `;
}

function renderAdminAd(row) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-5">
      <div class="text-sm">${row.date}</div>
      <div class="text-sm font-semibold">${row.applicant}</div>
      <div class="text-sm">${row.type}</div>
      <div class="text-sm text-slate-500">${row.status}</div>
      <button data-action="open-admin-ad-detail" class="text-sm text-slate-600">詳細</button>
    </div>
  `;
}

function renderAdminVerify(row) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-4">
      <div class="text-sm">${row.date}</div>
      <div class="text-sm font-semibold">${row.applicant}</div>
      <div class="text-sm text-slate-500">${row.status}</div>
      <button data-action="open-admin-verify-detail" class="text-sm text-slate-600">詳細</button>
    </div>
  `;
}

function renderAdminReport(row) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-5">
      <div class="text-sm">${row.date}</div>
      <div class="text-sm">${row.reporter}</div>
      <div class="text-sm">${row.target}</div>
      <div class="text-sm">${row.reason}</div>
      <button data-action="open-admin-report-detail" class="text-sm text-slate-600">詳細</button>
    </div>
  `;
}

function renderAdminInviteHistory(row) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-4">
      <div class="text-sm">${row.date}</div>
      <div class="text-sm font-semibold">${row.code}</div>
      <div class="text-sm">${row.user}</div>
      <div class="text-sm">${row.usedDate}</div>
    </div>
  `;
}

function renderAdminUsage(row) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-3">
      <div class="text-sm font-semibold">${row.admin}</div>
      <div class="text-sm">${row.action}</div>
      <div class="text-sm">${row.date}</div>
    </div>
  `;
}

function renderAdminPayment(row) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-5">
      <div class="text-sm font-semibold">${row.member}</div>
      <div class="text-sm">${row.type}</div>
      <div class="text-sm">${row.amount}</div>
      <div class="text-sm">${row.date}</div>
      <div class="text-sm text-slate-500">${row.status}</div>
    </div>
  `;
}

function renderAdminNews(row) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-4">
      <div class="text-sm font-semibold">${row.title}</div>
      <div class="text-sm">${row.date}</div>
      <div class="text-sm">${row.type}</div>
      <button data-action="open-admin-news-detail" class="text-sm text-slate-600">詳細</button>
    </div>
  `;
}

function renderAdminDm(row) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-4">
      <div class="text-sm font-semibold">${row.name}</div>
      <div class="text-sm">${row.preview}</div>
      <div class="text-sm text-slate-500">${row.time}</div>
      <button data-action="open-admin-dm-message" class="text-sm text-slate-600">開く</button>
    </div>
  `;
}

function renderAllLists() {
  const profileList = document.getElementById('profile-list');
  if (profileList) {
    profileList.innerHTML = paginate('profile', dataSets.members, renderMemberTile);
  }

  const searchList = document.getElementById('search-list');
  if (searchList) {
    searchList.innerHTML = paginate('search', dataSets.members, renderMemberTile);
  }

  const inviteList = document.getElementById('invite-list');
  if (inviteList) {
    inviteList.innerHTML = paginate('invite', dataSets.invites, renderInviteRow);
  }

  const memoList = document.getElementById('memo-list');
  if (memoList) {
    memoList.innerHTML = paginate('memo', dataSets.memos, renderMemoCard);
  }

  const dmList = document.getElementById('dm-list');
  if (dmList) {
    dmList.innerHTML = paginate('dm', adminData.dm, renderMemberDm);
  }

  const promoList = document.getElementById('promo-list');
  if (promoList) {
    promoList.innerHTML = paginate('promo', dataSets.promos, renderPromoRow);
  }

  const adminMemberList = document.getElementById('admin-member-list');
  if (adminMemberList) {
    adminMemberList.innerHTML = paginate('admin-members', adminData.members, renderAdminRow);
  }

  const adminRequestList = document.getElementById('admin-request-list');
  if (adminRequestList) {
    adminRequestList.innerHTML = paginate('admin-requests', adminData.requests, renderAdminRequest);
  }

  const adminEventList = document.getElementById('admin-event-list');
  if (adminEventList) {
    adminEventList.innerHTML = paginate('admin-events', adminData.events, renderAdminEvent);
  }

  const adminAdList = document.getElementById('admin-ad-list');
  if (adminAdList) {
    adminAdList.innerHTML = paginate('admin-ads', adminData.ads, renderAdminAd);
  }

  const adminVerifyList = document.getElementById('admin-verify-list');
  if (adminVerifyList) {
    adminVerifyList.innerHTML = paginate('admin-verify', adminData.verify, renderAdminVerify);
  }

  const adminReportList = document.getElementById('admin-report-list');
  if (adminReportList) {
    adminReportList.innerHTML = paginate('admin-reports', adminData.reports, renderAdminReport);
  }

  const adminInviteHistoryList = document.getElementById('admin-invite-history-list');
  if (adminInviteHistoryList) {
    adminInviteHistoryList.innerHTML = paginate('admin-invite-history', adminData.inviteHistory, renderAdminInviteHistory);
  }

  const adminUsageList = document.getElementById('admin-usage-list');
  if (adminUsageList) {
    adminUsageList.innerHTML = paginate('admin-usage', adminData.usage, renderAdminUsage);
  }

  const adminPaymentList = document.getElementById('admin-payment-list');
  if (adminPaymentList) {
    adminPaymentList.innerHTML = paginate('admin-payment', adminData.payment, renderAdminPayment);
  }

  const adminNewsList = document.getElementById('admin-news-list');
  if (adminNewsList) {
    adminNewsList.innerHTML = paginate('admin-news', adminData.news, renderAdminNews);
  }

  const adminDmList = document.getElementById('admin-dm-list');
  if (adminDmList) {
    adminDmList.innerHTML = paginate('admin-dm', adminData.dm, renderAdminDm);
  }

  lucide.createIcons();
}

function renderHeaderAds() {
  startSlideshow(bannerAds, ads, renderAdSlide);
  startSlideshow(memberFooterAds, ads, renderAdSlide);
}

function renderHomeMembers() {
  const tiles = dataSets.members.slice(0, 8).map(renderMemberTile).join('');
  recentMembers.innerHTML = tiles;
  recommendedMembers.innerHTML = tiles;
}

function renderNoticeSlide(item) {
  return `
    <div class="rounded-2xl border border-slate-200 bg-white p-4">
      <div class="flex items-center justify-between">
        <span class="text-sm font-semibold">${item.title}</span>
        <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs">${item.tag}</span>
      </div>
      <p class="mt-2 text-sm text-slate-600">${item.text}</p>
    </div>
  `;
}

function renderAdSlide(item) {
  return `
    <button class="flex w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white/80 px-6 py-6">
      <img src="${item.image}" alt="${item.label}" class="h-28 w-full object-contain object-center" />
    </button>
  `;
}

function startSlideshow(container, items, renderer, interval = 4000) {
  if (!container) return;
  let index = 0;
  container.innerHTML = renderer(items[index]);
  setInterval(() => {
    index = (index + 1) % items.length;
    container.innerHTML = renderer(items[index]);
    lucide.createIcons();
  }, interval);
}

function showDialog(title, message, primaryText = 'OK') {
  dialogTitle.textContent = title;
  dialogMessage.textContent = message;
  const primaryButton = dialogGeneric.querySelector('[data-action="dialog-primary"]');
  primaryButton.textContent = primaryText;
  openDialog(dialogGeneric);
}

function openProfileDialog(isSelf) {
  const actions = document.getElementById('profile-actions');
  if (isSelf) {
    actions.classList.add('is-disabled');
  } else {
    actions.classList.remove('is-disabled');
  }
  openDialog(dialogProfile);
}

function setTab(group, value) {
  tabs[group] = value;
}

function updateTabs() {
  document.querySelectorAll('[data-action="login-tab"]').forEach((btn) => {
    const active = btn.dataset.tab === tabs.login;
    btn.classList.toggle('text-slate-900', active);
    btn.classList.toggle('text-slate-400', !active);
  });
  document.getElementById('login-tab-login').classList.toggle('hidden', tabs.login !== 'login');
  document.getElementById('login-tab-signup').classList.toggle('hidden', tabs.login !== 'signup');

  document.querySelectorAll('[data-action="profile-tab"]').forEach((btn) => {
    const active = btn.dataset.tab === tabs.profile;
    btn.classList.toggle('text-slate-900', active);
    btn.classList.toggle('text-slate-400', !active);
  });

  document.querySelectorAll('[data-action="search-tab"]').forEach((btn) => {
    const active = btn.dataset.tab === tabs.search;
    btn.classList.toggle('text-slate-900', active);
    btn.classList.toggle('text-slate-400', !active);
  });

  document.querySelectorAll('[data-action="dm-tab"]').forEach((btn) => {
    const active = btn.dataset.tab === tabs.dm;
    btn.classList.toggle('text-slate-900', active);
    btn.classList.toggle('text-slate-400', !active);
  });

  document.querySelectorAll('[data-action="promo-tab"]').forEach((btn) => {
    const active = btn.dataset.tab === tabs.promo;
    btn.classList.toggle('text-slate-900', active);
    btn.classList.toggle('text-slate-400', !active);
  });
}

function handleAction(action, target) {
  switch (action) {
    case 'login':
      showScreen('screen-member-home', 'member');
      break;
    case 'signup':
      showDialog('登録申請', '認証用のメールを送付しました', 'OK');
      break;
    case 'open-password-reset':
      showScreen('screen-password-reset-request', 'guest');
      break;
    case 'password-reset-submit':
      showScreen('screen-password-reset-done', 'guest');
      break;
    case 'back-to-login':
      showScreen('screen-login', 'guest');
      break;
    case 'open-profile':
      showScreen('screen-profile', 'member');
      break;
    case 'open-profile-edit':
      showScreen('screen-profile-edit', 'member');
      break;
    case 'open-profile-preview':
      openProfileDialog(true);
      break;
    case 'open-verify':
      showScreen('screen-verify', 'member');
      break;
    case 'submit-verify':
      showDialog('送信完了', '送信しました', 'OK');
      break;
    case 'open-payment-info':
      showScreen('screen-payment-info', 'member');
      break;
    case 'open-invite':
      showScreen('screen-invite', 'member');
      break;
    case 'open-search':
      showScreen('screen-search', 'member');
      break;
    case 'open-dm':
      showScreen('screen-dm', 'member');
      break;
    case 'open-memo':
      showScreen('screen-memo', 'member');
      break;
    case 'open-memo-detail':
      showScreen('screen-memo-detail', 'member');
      break;
    case 'open-promo':
      showScreen('screen-promo', 'member');
      break;
    case 'open-login-settings':
      showScreen('screen-login-settings', 'member');
      break;
    case 'open-terms-member':
      showScreen('screen-terms-member', 'member');
      break;
    case 'open-terms-admin':
      showScreen('screen-terms-admin', 'admin');
      break;
    case 'open-dm-memo':
      showScreen('screen-dm-memo-list', 'member');
      break;
    case 'create-dm-memo':
      showScreen('screen-dm-memo-edit', 'member');
      break;
    case 'back-dm-memo-list':
      showScreen('screen-dm-memo-list', 'member');
      break;
    case 'open-dm-settings':
      showDialog('設定', 'ブロック / 通報を選択してください', 'OK');
      break;
    case 'open-hamburger':
      overlay.classList.remove('hidden');
      document.getElementById(state.activeRole === 'admin' ? 'hamburger-admin' : 'hamburger-member').classList.remove('hidden');
      break;
    case 'close-hamburger':
      closeDialogs();
      break;
    case 'logout':
      showScreen('screen-login', 'guest');
      break;
    case 'open-search-dialog':
    case 'open-member-search':
    case 'open-invite-search':
    case 'open-memo-search':
    case 'open-dm-search':
    case 'open-promo-search':
    case 'open-admin-member-search':
    case 'open-admin-request-search':
    case 'open-admin-event-search':
    case 'open-admin-ad-search':
    case 'open-admin-news-search':
    case 'open-admin-invite-search':
    case 'open-admin-usage-search':
    case 'open-admin-payment-search':
    case 'open-admin-dm-search':
      openDialog(dialogSearch);
      break;
    case 'open-sort-dialog':
    case 'open-member-sort':
    case 'open-invite-sort':
    case 'open-memo-sort':
    case 'open-dm-sort':
    case 'open-promo-sort':
    case 'open-admin-member-sort':
    case 'open-admin-request-sort':
    case 'open-admin-event-sort':
    case 'open-admin-ad-sort':
    case 'open-admin-news-sort':
    case 'open-admin-invite-sort':
    case 'open-admin-usage-sort':
    case 'open-admin-payment-sort':
    case 'open-admin-dm-sort':
      openDialog(dialogSort);
      break;
    case 'open-invite-create':
      showDialog('招待コード新規作成', '新規で招待コードを作成しますか？', '作成する');
      break;
    case 'open-invite-delete':
      showDialog('招待コード削除', 'この招待コードを無効にしますか？', '削除する');
      break;
    case 'open-memo-delete':
      showDialog('メモ削除', '削除しますか？', '削除する');
      break;
    case 'open-admin-home':
      showScreen('screen-admin-home', 'admin');
      break;
    case 'open-admin-members':
      showScreen('screen-admin-members', 'admin');
      break;
    case 'open-admin-member-detail':
      showScreen('screen-admin-member-detail', 'admin');
      break;
    case 'open-admin-member-edit':
      showScreen('screen-admin-member-edit', 'admin');
      break;
    case 'open-admin-dm':
      showScreen('screen-admin-dm', 'admin');
      break;
    case 'open-admin-dm-message':
      showScreen('screen-admin-dm-message', 'admin');
      break;
    case 'open-admin-requests':
      showScreen('screen-admin-requests', 'admin');
      break;
    case 'open-admin-request-detail':
      showScreen('screen-admin-request-detail', 'admin');
      break;
    case 'open-admin-events':
      showScreen('screen-admin-events', 'admin');
      break;
    case 'open-admin-event-detail':
      showScreen('screen-admin-event-detail', 'admin');
      break;
    case 'open-admin-ads':
      showScreen('screen-admin-ads', 'admin');
      break;
    case 'open-admin-ad-detail':
      showScreen('screen-admin-ad-detail', 'admin');
      break;
    case 'open-admin-verify':
      showScreen('screen-admin-verify', 'admin');
      break;
    case 'open-admin-verify-detail':
      showScreen('screen-admin-verify-detail', 'admin');
      break;
    case 'open-admin-profile-fields':
      showScreen('screen-admin-profile-fields', 'admin');
      break;
    case 'open-admin-news':
      showScreen('screen-admin-news', 'admin');
      break;
    case 'open-admin-news-create':
      showScreen('screen-admin-news-create', 'admin');
      break;
    case 'open-admin-news-detail':
      showScreen('screen-admin-news-detail', 'admin');
      break;
    case 'open-admin-news-edit':
      showScreen('screen-admin-news-edit', 'admin');
      break;
    case 'open-admin-reports':
      showScreen('screen-admin-reports', 'admin');
      break;
    case 'open-admin-report-detail':
      showScreen('screen-admin-report-detail', 'admin');
      break;
    case 'open-admin-invite-history':
      showScreen('screen-admin-invite-history', 'admin');
      break;
    case 'open-admin-usage':
      showScreen('screen-admin-usage', 'admin');
      break;
    case 'open-admin-payment':
      showScreen('screen-admin-payment', 'admin');
      break;
    case 'open-admin-points':
      showScreen('screen-admin-points', 'admin');
      break;
    case 'open-approve-confirm':
      showDialog('承認確認', '承認しますか？', '承認する');
      break;
    case 'open-reject-confirm':
      showDialog('却下確認', '却下しますか？', '却下する');
      break;
    case 'open-stop-confirm':
      showDialog('停止確認', 'この会員を停止しますか？', '停止する');
      break;
    case 'open-resume-confirm':
      showDialog('停止解除確認', '停止を解除しますか？', '解除する');
      break;
    case 'open-delete-confirm':
      showDialog('削除確認', '削除しますか？', '削除する');
      break;
    case 'open-new-post':
      showDialog('新規申請', '新規投稿・広告申請画面へ移動します。', 'OK');
      break;
    case 'open-stripe':
      showDialog('Stripe', '別ウィンドウでStripe画面に移動します。', 'OK');
      break;
    case 'open-profile-dialog':
      openProfileDialog(false);
      break;
    case 'close-profile-dialog':
      closeDialogs();
      break;
    case 'open-memo-dialog':
      closeDialogs();
      openDialog(dialogMemoList);
      break;
    case 'close-memo-dialog':
      closeDialogs();
      break;
    case 'create-memo-from-dialog':
      closeDialogs();
      showScreen('screen-memo-detail', 'member');
      break;
    case 'open-member-promo-detail':
      showScreen('screen-promo-detail', 'member');
      break;
    case 'open-dm-detail':
      showScreen('screen-dm-detail', 'member');
      break;
    case 'open-external-link':
      showDialog('外部リンク', '別ウィンドウで開きます。', 'OK');
      break;
    case 'back':
    case 'back-to-home':
      showScreen(state.activeRole === 'admin' ? 'screen-admin-home' : 'screen-member-home', state.activeRole);
      break;
    case 'login-tab':
      setTab('login', target.dataset.tab);
      updateTabs();
      break;
    case 'profile-tab':
      setTab('profile', target.dataset.tab);
      updateTabs();
      break;
    case 'search-tab':
      setTab('search', target.dataset.tab);
      updateTabs();
      break;
    case 'dm-tab':
      setTab('dm', target.dataset.tab);
      updateTabs();
      break;
    case 'promo-tab':
      setTab('promo', target.dataset.tab);
      updateTabs();
      break;
    case 'load-more': {
      const listName = target.dataset.target;
      state.pagination[listName] = (state.pagination[listName] || 0) + 1;
      renderAllLists();
      break;
    }
    case 'dialog-close':
      closeDialogs();
      break;
    case 'dialog-primary':
      closeDialogs();
      break;
    case 'complete-tutorial':
      showScreen('screen-payment-setup', 'member');
      break;
    case 'next-tutorial':
      showScreen(target.dataset.next, 'member');
      break;
    case 'go-home':
      showScreen(state.activeRole === 'admin' ? 'screen-admin-home' : 'screen-member-home', state.activeRole);
      break;
    case 'open-admin-dm-settings':
      showDialog('設定', 'ブロック / 通報を選択してください', 'OK');
      break;
    default:
      break;
  }
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action]');
    if (target) {
      const action = target.dataset.action;
      handleAction(action, target);
    }

    const devToggle = event.target.closest('[data-dev]');
    if (devToggle) {
      const mapping = {
        'toggle-login-error': 'login-error',
        'toggle-signup-error': 'signup-error',
        'toggle-password-reset-error': 'password-reset-error',
        'toggle-password-request-error': 'password-request-error',
        'toggle-detail-error': 'detail-info-error',
        'toggle-profile-edit-error': 'profile-edit-error',
        'toggle-verify-error': 'verify-error',
        'toggle-admin-member-edit-error': 'admin-member-edit-error',
        'toggle-profile-field-error': 'profile-field-error',
        'toggle-admin-news-create-error': 'admin-news-create-error',
        'toggle-admin-news-edit-error': 'admin-news-edit-error',
        'toggle-admin-points-error': 'admin-points-error',
      };
      const id = mapping[devToggle.dataset.dev];
      if (id) {
        document.getElementById(id).classList.toggle('hidden');
      }
    }
  });
}

renderHeaderAds();
renderHomeMembers();
renderAllLists();
startSlideshow(document.getElementById('notice-slideshow'), notices, renderNoticeSlide, 3500);
updateTabs();
bindEvents();
showScreen(state.activeScreen, 'guest');
