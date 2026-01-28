const screens = Array.from(document.querySelectorAll('.screen'));
const overlay = document.getElementById('overlay');
const header = document.getElementById('global-header');
const footer = document.getElementById('member-footer');
const memberFooterAds = document.getElementById('footer-ads');
const bannerAds = document.getElementById('banner-ads');
const recentMembers = document.getElementById('recent-members');
const recommendedMembers = document.getElementById('recommended-members');
const partnerServices = document.getElementById('partner-services');

const dialogGeneric = document.getElementById('dialog-generic');
const dialogTitle = document.getElementById('dialog-title');
const dialogMessage = document.getElementById('dialog-message');
const dialogSearch = document.getElementById('dialog-search');
const dialogSort = document.getElementById('dialog-sort');
const dialogProfile = document.getElementById('dialog-profile');
const dialogMemoList = document.getElementById('dialog-memo-list');
const dialogDmSettings = document.getElementById('dialog-dm-settings');
const dialogDmReport = document.getElementById('dialog-dm-report');
const dialogDmBlockConfirm = document.getElementById('dialog-dm-block-confirm');
const dialogDmUnblockConfirm = document.getElementById('dialog-dm-unblock-confirm');
const dmMemoListPanel = document.getElementById('dm-memo-list-panel');
const dmMemoDetailPanel = document.getElementById('dm-memo-detail-panel');

const inviteCode = 'give-A1b2C3d4';

const state = {
  activeScreen: 'screen-login',
  activeRole: 'member',
  pagination: {},
};

const avatarImages = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
];

const promoThumbs = [
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=120&q=80',
];

const promoBase = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `投稿タイトル ${i + 1}`,
  date: `2024/07/${(i % 28) + 1}`,
  thumb: promoThumbs[i % promoThumbs.length],
  authorName: `投稿者 ${i + 1}`,
  authorAvatar: avatarImages[i % avatarImages.length],
  badge: '★',
}));

const dataSets = {
  members: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `会員 ${i + 1}`,
    age: `${20 + (i % 30)}代`,
    gender: i % 2 === 0 ? '女性' : '男性',
    region: ['東京', '大阪', '福岡'][i % 3],
    industry: ['IT', '医療', '教育', '製造'][i % 4],
    avatar: avatarImages[i % avatarImages.length],
    badge: '★',
  })),
  invites: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    usedDate: `2024/07/${(i % 28) + 1}`,
    name: `利用者 ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: i % 2 === 0 ? '承認済み' : '未承認',
  })),
  memos: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `メモタイトル ${i + 1}`,
    avatar: avatarImages[(i + 2) % avatarImages.length],
  })),
  promoPromotion: promoBase.map((item) => ({
    ...item,
    detailTarget: 'promotion',
  })),
  promoNews: promoBase.map((item) => ({
    ...item,
    detailTarget: 'news',
  })),
  pointConsumption: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `ポイント消費 ${i + 1}`,
    amount: `-${(i + 1) * 50}pt`,
    date: `2024/07/${(i % 28) + 1}`,
    note: i % 2 === 0 ? '広告配信' : 'イベント申請',
  })),
  promoHistoryPromotion: promoBase.map((item, index) => ({
    ...item,
    detailTarget: 'promotion-history',
    status: index % 2 === 0 ? '承認済み' : '未承認',
    hidden: index % 3 === 0,
  })),
  promoHistoryAds: promoBase.map((item, index) => ({
    ...item,
    detailTarget: 'ads-history',
    status: index % 2 === 0 ? '承認済み' : '未承認',
    hidden: index % 4 === 0,
  })),
  partnerServices: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `提携サービス ${i + 1}`,
    image: promoThumbs[i % promoThumbs.length],
    url: `https://example.com/service/${i + 1}`,
  })),
};

const notices = [
  { title: 'DM', tag: '未読', text: '新しいDMが届きました。' },
  { title: 'イベント', tag: '開催', text: 'イベント掲載が承認されました。' },
  { title: '公式お知らせ', tag: '更新', text: '新規会員が追加されました。' },
  { title: '申請', tag: '承認', text: '広告申請が承認されました。' },
  { title: 'DM', tag: '返信', text: '返信が届いています。' },
];

const memberMessages = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  type: i % 2 === 0 ? 'in' : 'out',
  avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80',
  text: `メッセージ内容 ${i + 1}`,
  date: `2024/07/${(i % 28) + 1} 12:${(i % 60).toString().padStart(2, '0')}`,
  read: i % 3 === 0,
}));

const adminMessages = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  type: i % 2 === 0 ? 'in' : 'out',
  avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80',
  text: `公式メッセージ内容 ${i + 1}`,
}));

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

const ads = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80',
    label: '広告 1',
    url: 'https://example.com/ads/1',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1473181488821-2d23949a045a?auto=format&fit=crop&w=300&q=80',
    label: '広告 2',
    url: 'https://example.com/ads/2',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80',
    label: '広告 3',
    url: 'https://example.com/ads/3',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80',
    label: '広告 4',
    url: 'https://example.com/ads/4',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=300&q=80',
    label: '広告 5',
    url: 'https://example.com/ads/5',
  },
];

const tabs = {
  login: 'login',
  profile: 'favorite',
  search: 'member-search',
  dm: 'dm',
  promo: 'promotion',
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
  const showHeader = id.startsWith('screen-admin')
    || id.startsWith('screen-member')
    || id.startsWith('screen-profile')
    || id.startsWith('screen-payment')
    || id.startsWith('screen-point-consumption')
    || id.startsWith('screen-charge')
    || id.startsWith('screen-invite')
    || id.startsWith('screen-search')
    || id.startsWith('screen-dm')
    || id.startsWith('screen-memo')
    || id.startsWith('screen-promo')
    || id.startsWith('screen-login-settings')
    || id.startsWith('screen-terms')
    || id.startsWith('screen-partner')
    || id.startsWith('screen-verify');
  header.classList.toggle('hidden', !showHeader);
  footer.classList.toggle('hidden', !(showHeader && role === 'member' && !id.startsWith('screen-terms-admin') && !id.startsWith('screen-admin')));
  closeDialogs();
  resetPagination();
  if (nextScreen) {
    requestAnimationFrame(() => nextScreen.classList.add('active'));
  }
  if (id === 'screen-dm-detail' || id === 'screen-admin-dm-message') {
    setTimeout(() => {
      const container = id === 'screen-dm-detail'
        ? document.getElementById('member-dm-messages')
        : document.getElementById('admin-dm-messages');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 350);
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
    <button data-action="open-profile-dialog" class="member-tile flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-4 text-left">
      <div class="relative">
        <img src="${member.avatar}" alt="${member.name}" class="h-24 w-full rounded-xl object-cover" />
        <span class="absolute -bottom-2 -right-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-white">${member.badge}</span>
      </div>
      <div class="mt-3 text-sm font-semibold">${member.name}</div>
      <div class="text-xs text-slate-500">${member.age} / ${member.gender} / ${member.region}</div>
      <div class="text-xs text-slate-500">${member.industry}</div>
    </button>
  `;
}

function renderInviteRow(invite) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-4">
      <div class="text-sm">${invite.usedDate}</div>
      <div class="text-sm font-semibold">${invite.name}</div>
      <div class="text-sm">${invite.email}</div>
      <div class="text-sm text-slate-500">${invite.status}</div>
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
  const unreadLabel = row.id <= 5 ? '<div class="text-xs text-rose-500">未読メッセージあり</div>' : '';
  return `
    <div class="grid grid-cols-[56px_1fr_auto] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80" alt="${row.name}" class="h-12 w-12 rounded-full object-cover" />
      <button data-action="open-dm-detail" class="text-left">
        <div class="text-sm font-semibold">${row.name}</div>
        ${unreadLabel}
        <div class="text-xs text-slate-500">最新メッセージの冒頭テキスト</div>
        <div class="text-xs text-slate-500">さらに続くテキストが表示されます。</div>
      </button>
      <button data-action="open-dm-settings" class="rounded-xl border border-slate-200 px-3 py-2"><i data-lucide="settings" class="h-4 w-4"></i></button>
    </div>
  `;
}

function renderMemberDmSettings(row) {
  return `
    <div class="grid grid-cols-[56px_1fr_auto] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <img src="${row.avatar}" alt="${row.name}" class="h-12 w-12 rounded-full object-cover" />
      <div>
        <div class="text-sm font-semibold">${row.name}</div>
        <div class="text-xs text-slate-500">ブロック済み / ${row.age} / ${row.gender} / ${row.region}</div>
        <div class="text-xs text-slate-500">${row.industry}</div>
        <div class="text-xs text-slate-400">ブロック日：2024/07/${(row.id % 28) + 1}</div>
      </div>
      <div class="flex items-center gap-2">
        <button data-action="open-dm-unblock-confirm" class="rounded-xl border border-slate-200 px-3 py-2 text-slate-600"><i data-lucide="user-check" class="h-4 w-4"></i></button>
        <button data-action="open-dm-report" class="rounded-xl border border-slate-200 px-3 py-2 text-rose-500"><i data-lucide="flag" class="h-4 w-4"></i></button>
      </div>
    </div>
  `;
}

function renderPromoRow(item) {
  const isNews = item.detailTarget === 'news';
  const avatar = isNews ? 'logotest.png' : item.authorAvatar;
  const name = isNews ? 'Give縁公式' : item.authorName;
  const badge = isNews
    ? ''
    : `<span class="promo-avatar-badge promo-avatar-badge--small">${item.badge}</span>`;
  return `
    <button data-action="open-member-promo-detail" data-detail="${item.detailTarget}" class="promo-tile">
      <div class="promo-tile__media">
        <div class="promo-tile__media-frame">
          <img src="${item.thumb}" alt="${item.title}" class="promo-tile__media-img" />
        </div>
      </div>
      <div class="promo-tile__meta">
        <div class="promo-tile__avatar">
          <img src="${avatar}" alt="${name}" class="h-11 w-11 rounded-full object-cover" />
          ${badge}
        </div>
        <div>
          ${isNews ? `<div class="text-xs font-semibold text-slate-500">${name}</div>` : ''}
          <div class="text-sm font-semibold">${item.title}</div>
          <div class="mt-1 text-xs text-slate-500">投稿日：${item.date}</div>
        </div>
      </div>
    </button>
  `;
}

function renderPromoHistoryRow(item) {
  const statusLabel = item.status;
  const isApproved = statusLabel === '承認済み';
  const iconName = isApproved ? 'settings' : 'x-circle';
  const iconAction = isApproved ? 'open-promo-visibility-options' : 'open-promo-cancel-confirm';
  const hiddenLabel = item.hidden ? '非表示です' : '';
  return `
    <div class="promo-history-row">
      <button data-action="open-member-promo-detail" data-detail="${item.detailTarget}" class="contents">
        <img src="${item.thumb}" alt="${item.title}" class="promo-history-row__thumb" />
        <div>
          <div class="text-sm font-semibold">${item.title}</div>
          <div class="mt-1 text-xs text-slate-500">投稿日：${item.date}</div>
          <div class="mt-2 text-xs font-semibold text-slate-700">${statusLabel}</div>
          ${hiddenLabel ? `<div class="mt-1 text-xs text-rose-500">${hiddenLabel}</div>` : ''}
        </div>
      </button>
      <button data-action="${iconAction}" class="promo-history-row__action"><i data-lucide="${iconName}" class="h-4 w-4"></i></button>
    </div>
  `;
}

function renderPartnerServiceTile(item, index) {
  return `
    <button class="partner-tile" data-action="open-partner-service-link" data-url="${item.url}">
      <img src="${item.image}" alt="${item.name || `提携サービス ${index + 1}`}" class="partner-tile__image" />
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

function renderPointConsumption(row) {
  return `
    <div class="grid items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-4">
      <div class="text-sm">${row.date}</div>
      <div class="text-sm font-semibold">${row.title}</div>
      <div class="text-sm">${row.amount}</div>
      <div class="text-sm text-slate-500">${row.note}</div>
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
  const listMap = {
    'profile-favorite': [dataSets.members, renderMemberTile],
    'profile-1on1': [dataSets.members, renderMemberTile],
    'profile-follow': [dataSets.members, renderMemberTile],
    'profile-follower': [dataSets.members, renderMemberTile],
    'search-member': [dataSets.members, renderMemberTile],
    'search-recommended': [dataSets.members, renderMemberTile],
    'search-new': [dataSets.members, renderMemberTile],
    'invite': [dataSets.invites, renderInviteRow],
    'memo': [dataSets.memos, renderMemoCard],
    'dm-main': [adminData.dm, renderMemberDm],
    'dm-settings': [dataSets.members, renderMemberDmSettings],
    'promo-promotion': [dataSets.promoPromotion, renderPromoRow],
    'promo-news': [dataSets.promoNews, renderPromoRow],
    'promo-history': [dataSets.promoHistoryPromotion, renderPromoHistoryRow],
    'promo-ads-history': [dataSets.promoHistoryAds, renderPromoHistoryRow],
    'point-consumption': [dataSets.pointConsumption, renderPointConsumption],
    'partner-services': [dataSets.partnerServices, renderPartnerServiceTile],
    'admin-members': [adminData.members, renderAdminRow],
    'admin-requests': [adminData.requests, renderAdminRequest],
    'admin-events': [adminData.events, renderAdminEvent],
    'admin-ads': [adminData.ads, renderAdminAd],
    'admin-verify': [adminData.verify, renderAdminVerify],
    'admin-reports': [adminData.reports, renderAdminReport],
    'admin-invite-history': [adminData.inviteHistory, renderAdminInviteHistory],
    'admin-usage': [adminData.usage, renderAdminUsage],
    'admin-payment': [adminData.payment, renderAdminPayment],
    'admin-news': [adminData.news, renderAdminNews],
    'admin-dm': [adminData.dm, renderAdminDm],
  };

  document.querySelectorAll('[data-list]').forEach((element) => {
    const listName = element.dataset.list;
    const config = listMap[listName];
    if (!config) return;
    const [data, renderer] = config;
    element.innerHTML = paginate(listName, data, renderer);
  });

  renderDmMessages(document.getElementById('member-dm-messages'), memberMessages, 'member-dm-messages');
  renderDmMessages(document.getElementById('admin-dm-messages'), adminMessages, 'admin-dm-messages');

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
  if (partnerServices) {
    partnerServices.innerHTML = dataSets.partnerServices.slice(0, 10).map(renderPartnerServiceTile).join('');
  }
}

function renderInviteCode() {
  document.querySelectorAll('[data-invite-code]').forEach((element) => {
    element.dataset.code = inviteCode;
  });
  document.querySelectorAll('[data-invite-code-text]').forEach((element) => {
    element.textContent = inviteCode;
  });
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
    <button class="ad-slide-button" data-action="open-ad-link" data-url="${item.url}">
      <span class="ad-slide-frame">
        <img src="${item.image}" alt="${item.label}" class="ad-slide-image" />
      </span>
    </button>
  `;
}

function renderMessageItem(message) {
  if (message.type === 'out') {
    return `
      <div class="flex justify-end">
        <div class="flex flex-col items-end gap-1">
          <div class="rounded-2xl bg-slate-900 p-4 text-white shadow">${message.text}</div>
          <div class="text-xs text-slate-400">送信日：${message.date} / ${message.read ? '既読' : '未読'}</div>
        </div>
      </div>
    `;
  }
  return `
    <div class="flex gap-3">
      <button data-action="open-profile-dialog" class="shrink-0">
        <img src="${message.avatar}" alt="member" class="h-10 w-10 rounded-full" />
      </button>
      <div class="flex flex-col gap-1">
        <div class="rounded-2xl bg-white/90 p-4 shadow">${message.text}</div>
        <div class="text-xs text-slate-400">送信日：${message.date}</div>
      </div>
    </div>
  `;
}

function renderDmMessages(container, messages, listName) {
  if (!container) return;
  const page = state.pagination[listName] || 0;
  const showAll = page > 0;
  const items = showAll ? messages : messages.slice(messages.length - 30);
  const button = !showAll
    ? `<button data-action="load-more" data-target="${listName}" class="w-full rounded-xl border border-slate-300 px-4 py-3">次の30件を表示する</button>`
    : '';
  container.innerHTML = `${button}${items.map(renderMessageItem).join('')}`;
}

function startSlideshow(container, items, renderer, interval = 4000) {
  if (!container) return;
  let index = 0;
  container.innerHTML = `<div class="slide-item">${renderer(items[index])}</div>`;
  const initialSlide = container.querySelector('.slide-item');
  if (initialSlide) {
    requestAnimationFrame(() => initialSlide.classList.add('is-active'));
  }
  setInterval(() => {
    index = (index + 1) % items.length;
    container.innerHTML = `<div class="slide-item">${renderer(items[index])}</div>`;
    const slide = container.querySelector('.slide-item');
    if (slide) {
      requestAnimationFrame(() => slide.classList.add('is-active'));
    }
    lucide.createIcons();
  }, interval);
}

function showDialog(title, message, primaryText = 'OK', options = {}) {
  dialogTitle.textContent = title;
  dialogMessage.textContent = message;
  const primaryButton = dialogGeneric.querySelector('[data-action="dialog-primary"]');
  const secondaryButton = dialogGeneric.querySelector('[data-action="dialog-close"]');
  primaryButton.textContent = primaryText;
  dialogGeneric.dataset.nextAction = options.nextAction || '';
  if (options.secondary === false) {
    secondaryButton.classList.add('hidden');
  } else {
    secondaryButton.classList.remove('hidden');
  }
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

  toggleTabFrames('profile', tabs.profile);
  toggleTabFrames('search', tabs.search);
  toggleTabFrames('dm', tabs.dm);
  toggleTabFrames('promo', tabs.promo);
}

function toggleTabFrames(group, value) {
  document.querySelectorAll(`[data-tab-frame=\"${group}\"]`).forEach((frame) => {
    const isActive = frame.dataset.tabValue === value;
    if (isActive) {
      frame.classList.remove('is-active');
      requestAnimationFrame(() => frame.classList.add('is-active'));
    } else {
      frame.classList.remove('is-active');
    }
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
    case 'send-password-reset':
      showDialog('送信しました', '送信しました。メールをご確認ください', 'OK', { secondary: false, nextAction: 'reload' });
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
      showDialog('送信完了', '送信しました', 'OK', { secondary: false, nextAction: 'verify-complete' });
      break;
    case 'save-profile-edit':
      showDialog('変更しました', 'プロフィール情報を変更しました。', 'OK', { secondary: false });
      break;
    case 'open-payment-info':
      showScreen('screen-payment-info', 'member');
      break;
    case 'open-point-consumption':
      showScreen('screen-point-consumption', 'member');
      break;
    case 'open-charge':
      showScreen('screen-charge', 'member');
      break;
    case 'open-invite':
      showScreen('screen-invite', 'member');
      break;
    case 'open-search':
      showScreen('screen-search', 'member');
      break;
    case 'open-search-recent':
      setTab('search', 'member-search');
      resetPagination();
      updateTabs();
      showScreen('screen-search', 'member');
      break;
    case 'open-search-recommended':
      setTab('search', 'recommended');
      resetPagination();
      updateTabs();
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
    case 'open-memo-dialog':
      if (state.activeScreen === 'screen-memo' || state.activeScreen === 'screen-memo-detail') {
        closeDialogs();
      } else {
        openDialog(dialogMemoList);
      }
      break;
    case 'open-memo-detail-dialog':
      closeDialogs();
      openDialog(document.getElementById('dialog-memo-detail'));
      break;
    case 'open-ad-link':
      if (target.dataset.url) {
        window.open(target.dataset.url, '_blank', 'noopener');
      }
      break;
    case 'open-promo':
      showScreen('screen-promo', 'member');
      break;
    case 'open-partner-services':
      showScreen('screen-partner-services', 'member');
      break;
    case 'open-partner-service-link':
      if (target.dataset.url) {
        window.open(target.dataset.url, '_blank', 'noopener');
      }
      break;
    case 'open-login-settings':
      showScreen('screen-login-settings', 'member');
      break;
    case 'open-member-leave':
      openDialog(document.getElementById('dialog-member-leave-confirm'));
      break;
    case 'toggle-password-change': {
      const fields = document.getElementById('login-password-fields');
      if (fields) {
        fields.classList.toggle('hidden', !target.checked);
      }
      break;
    }
    case 'open-login-settings-confirm':
      openDialog(document.getElementById('dialog-login-settings-confirm'));
      break;
    case 'confirm-login-settings':
      closeDialogs();
      openDialog(document.getElementById('dialog-login-settings-complete'));
      break;
    case 'confirm-member-leave':
      window.location.reload();
      break;
    case 'open-terms-member':
      showScreen('screen-terms-member', 'member');
      break;
    case 'open-terms-admin':
      showScreen('screen-terms-admin', 'admin');
      break;
    case 'open-charge-confirm': {
      const amount = target.dataset.amount || '';
      const label = document.getElementById('charge-confirm-amount');
      if (label) {
        label.textContent = amount;
      }
      openDialog(document.getElementById('dialog-charge-confirm'));
      break;
    }
    case 'confirm-charge':
      closeDialogs();
      showScreen('screen-payment-info', 'member');
      break;
    case 'open-dm-memo':
      dmMemoListPanel?.classList.remove('hidden');
      dmMemoDetailPanel?.classList.add('hidden');
      break;
    case 'close-dm-memo-list':
      dmMemoListPanel?.classList.add('hidden');
      dmMemoDetailPanel?.classList.add('hidden');
      break;
    case 'open-dm-memo-detail':
      dmMemoDetailPanel?.classList.remove('hidden');
      break;
    case 'close-dm-memo-detail':
      dmMemoDetailPanel?.classList.add('hidden');
      break;
    case 'open-dm-settings':
      openDialog(dialogDmSettings);
      break;
    case 'open-dm-report':
      closeDialogs();
      openDialog(dialogDmReport);
      break;
    case 'open-dm-report-confirm':
      closeDialogs();
      openDialog(document.getElementById('dialog-dm-report-confirm'));
      break;
    case 'confirm-dm-report':
      closeDialogs();
      showScreen('screen-dm', 'member');
      break;
    case 'back-dm-report':
      closeDialogs();
      openDialog(dialogDmReport);
      break;
    case 'open-dm-block-confirm':
      closeDialogs();
      openDialog(dialogDmBlockConfirm);
      break;
    case 'confirm-dm-block':
      closeDialogs();
      showScreen('screen-dm', 'member');
      break;
    case 'open-dm-unblock-confirm':
      closeDialogs();
      openDialog(dialogDmUnblockConfirm);
      break;
    case 'open-hamburger':
      overlay.classList.remove('hidden');
      document.getElementById(state.activeRole === 'admin' ? 'hamburger-admin' : 'hamburger-member').classList.remove('hidden');
      break;
    case 'close-hamburger':
      closeDialogs();
      break;
    case 'logout':
      openDialog(document.getElementById('dialog-logout-confirm'));
      break;
    case 'confirm-logout':
      window.location.reload();
      break;
    case 'open-search-dialog':
    case 'open-member-search':
    case 'open-invite-search':
    case 'open-memo-search':
    case 'open-dm-search':
    case 'open-promo-search':
    case 'open-point-consumption-search':
    case 'open-partner-search':
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
    case 'open-point-consumption-sort':
    case 'open-partner-sort':
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
    case 'copy-invite-code': {
      const code = target.dataset.code || inviteCode;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
          showDialog('コピーしました', '招待コードをコピーしました。', 'OK', { secondary: false });
        });
      } else {
        showDialog('コピーに失敗しました', 'この環境ではコピーできません。', 'OK', { secondary: false });
      }
      break;
    }
    case 'open-detail-info-dev':
      showScreen('screen-detail-info', 'guest');
      break;
    case 'submit-detail-info':
      openDialog(document.getElementById('dialog-detail-info-confirm'));
      break;
    case 'confirm-detail-info':
      closeDialogs();
      showScreen('screen-register-complete', 'guest');
      break;
    case 'open-password-reset-dev':
      showScreen('screen-password-reset', 'guest');
      break;
    case 'open-tutorial-dev':
      showScreen('screen-tutorial-1', 'guest');
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
    case 'open-new-promo-post':
      showScreen('screen-promo-post', 'member');
      break;
    case 'submit-promo-post':
      openDialog(document.getElementById('dialog-promo-post-confirm'));
      break;
    case 'confirm-promo-post':
      closeDialogs();
      setTab('promo', 'history-promotion');
      resetPagination();
      updateTabs();
      showScreen('screen-promo', 'member');
      break;
    case 'open-new-ad-application':
      showScreen('screen-promo-ad-application', 'member');
      break;
    case 'submit-promo-ad':
      openDialog(document.getElementById('dialog-promo-ad-confirm'));
      break;
    case 'confirm-promo-ad':
      closeDialogs();
      setTab('promo', 'history-ads');
      resetPagination();
      updateTabs();
      showScreen('screen-promo', 'member');
      break;
    case 'open-stripe':
      showDialog('Stripe', '別ウィンドウでStripe画面に移動します。', 'OK');
      break;
    case 'open-profile-dialog':
      openProfileDialog(false);
      break;
    case 'toggle-profile-action': {
      const isActive = target.classList.toggle('is-active');
      target.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      break;
    }
    case 'close-profile-dialog':
      closeDialogs();
      break;
    case 'close-memo-dialog':
      closeDialogs();
      break;
    case 'create-memo-from-dialog':
      closeDialogs();
      openDialog(document.getElementById('dialog-memo-detail'));
      break;
    case 'open-member-promo-detail':
      switch (target.dataset.detail) {
        case 'promotion':
          showScreen('screen-promo-detail-promotion', 'member');
          break;
        case 'news':
          showScreen('screen-promo-detail-news', 'member');
          break;
        case 'promotion-history':
          showScreen('screen-promo-detail-history-promotion', 'member');
          break;
        case 'ads-history':
          showScreen('screen-promo-detail-history-ads', 'member');
          break;
        default:
          showScreen('screen-promo-detail-news', 'member');
          break;
      }
      break;
    case 'open-promo-cancel-confirm':
      openDialog(document.getElementById('dialog-promo-cancel-confirm'));
      break;
    case 'confirm-promo-cancel':
      closeDialogs();
      showScreen('screen-promo', 'member');
      break;
    case 'open-promo-visibility-options':
      openDialog(document.getElementById('dialog-promo-visibility-options'));
      break;
    case 'open-promo-visibility-confirm':
      closeDialogs();
      openDialog(document.getElementById('dialog-promo-visibility-confirm'));
      break;
    case 'confirm-promo-visibility':
      closeDialogs();
      showScreen('screen-promo', 'member');
      break;
    case 'open-promo-delete-confirm':
      closeDialogs();
      openDialog(document.getElementById('dialog-promo-delete-confirm'));
      break;
    case 'confirm-promo-delete':
      closeDialogs();
      showScreen('screen-promo', 'member');
      break;
    case 'open-dm-detail':
      showScreen('screen-dm-detail', 'member');
      break;
    case 'open-external-link':
      showDialog('外部リンク', '別ウィンドウで開きます。', 'OK');
      break;
    case 'scroll-top':
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;
    case 'back':
    case 'back-to-home':
      showScreen(state.activeRole === 'admin' ? 'screen-admin-home' : 'screen-member-home', state.activeRole);
      break;
    case 'login-tab':
      setTab('login', target.dataset.tab);
      resetPagination();
      updateTabs();
      break;
    case 'profile-tab':
      setTab('profile', target.dataset.tab);
      resetPagination();
      updateTabs();
      break;
    case 'search-tab':
      setTab('search', target.dataset.tab);
      resetPagination();
      updateTabs();
      break;
    case 'dm-tab':
      setTab('dm', target.dataset.tab);
      resetPagination();
      updateTabs();
      break;
    case 'promo-tab':
      setTab('promo', target.dataset.tab);
      resetPagination();
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
      {
        const nextAction = dialogGeneric.dataset.nextAction;
        closeDialogs();
        dialogGeneric.dataset.nextAction = '';
        if (nextAction === 'verify-complete') {
          showScreen('screen-profile', 'member');
        }
        if (nextAction === 'reload') {
          window.location.reload();
        }
      }
      break;
    case 'complete-tutorial':
      showScreen('screen-member-home', 'member');
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

  document.querySelectorAll('input[type="file"][data-preview-target]').forEach((input) => {
    input.addEventListener('change', (event) => {
      const file = event.target.files && event.target.files[0];
      const previewId = input.dataset.previewTarget;
      const errorId = input.dataset.errorTarget;
      const preview = document.getElementById(previewId);
      const error = document.getElementById(errorId);

      if (error) error.classList.add('hidden');
      if (preview) preview.classList.add('hidden');

      if (!file) {
        return;
      }

      const isValidType = ['image/png', 'image/jpeg'].includes(file.type);
      const isValidSize = file.size < 10 * 1024 * 1024;

      if (!isValidType || !isValidSize) {
        if (error) error.classList.remove('hidden');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (preview) {
          preview.src = reader.result;
          preview.classList.remove('hidden');
        }
      };
      reader.readAsDataURL(file);
    });
  });
}

const splash = document.getElementById('splash-screen');

renderHeaderAds();
renderHomeMembers();
renderAllLists();
renderInviteCode();
startSlideshow(document.getElementById('notice-slideshow'), notices, renderNoticeSlide, 3500);
updateTabs();
bindEvents();

setTimeout(() => {
  if (splash) {
    splash.classList.add('is-hidden');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 600);
  }
  showScreen(state.activeScreen, 'guest');
}, 2000);
