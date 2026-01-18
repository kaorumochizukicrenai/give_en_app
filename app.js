const screens = Array.from(document.querySelectorAll(".screen"));
const header = document.getElementById("global-header");
const footer = document.getElementById("global-footer");
const memberMenu = document.getElementById("member-menu");
const adminMenu = document.getElementById("admin-menu");
const dialogs = Array.from(document.querySelectorAll(".dialog"));
const overlays = Array.from(document.querySelectorAll(".overlay"));

const screenById = (id) => document.getElementById(id);

const showScreen = (id) => {
  screens.forEach((screen) => screen.classList.remove("active"));
  const target = screenById(id);
  if (target) {
    target.classList.add("active");
  }
  updateLayout(target);
  closeAllDialogs();
  closeMenus();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const updateLayout = (screen) => {
  const auth = screen?.dataset.auth;
  if (auth === "member") {
    header.classList.remove("hidden");
    footer.classList.remove("hidden");
  } else if (auth === "admin") {
    header.classList.remove("hidden");
    footer.classList.add("hidden");
  } else {
    header.classList.add("hidden");
    footer.classList.add("hidden");
  }
};

const closeMenus = () => {
  memberMenu.classList.add("hidden");
  adminMenu.classList.add("hidden");
};

const closeAllDialogs = () => {
  dialogs.forEach((dialog) => dialog.classList.add("hidden"));
};

const openDialog = (id) => {
  closeAllDialogs();
  const dialog = document.getElementById(id);
  if (dialog) {
    dialog.classList.remove("hidden");
  }
};

const toggleIndicator = (selector, key) => {
  const element = document.querySelector(`[data-${selector}="${key}"]`);
  if (element) {
    element.classList.toggle("hidden");
  }
};

const toggleLock = (key) => {
  const element = document.querySelector(`[data-lock="${key}"]`);
  if (element) {
    element.classList.toggle("hidden");
  }
};

const registerTabs = () => {
  document.querySelectorAll("[data-tab-group]").forEach((group) => {
    const tabs = group.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((btn) => btn.classList.remove("active"));
        tab.classList.add("active");
        const contentKey = tab.dataset.tab;
        const container = group.parentElement;
        container.querySelectorAll("[data-tab-content]").forEach((panel) => {
          panel.classList.toggle("hidden", panel.dataset.tabContent !== contentKey);
        });
      });
    });
  });
};

const actions = {
  "go-login": () => showScreen("screen-login"),
  "go-link-expired": () => showScreen("screen-link-expired"),
  "go-new-password": () => showScreen("screen-new-password"),
  "go-detail-register": () => showScreen("screen-detail-register"),
  "submit-detail-register": () => showScreen("screen-detail-complete"),
  "submit-new-password": () => showScreen("screen-new-password-complete"),
  "go-reset": () => showScreen("screen-password-reset"),
  "submit-reset": () => showScreen("screen-reset-complete"),
  login: () => showScreen("screen-tutorial"),
  "go-admin-login": () => showScreen("screen-admin-home"),
  "submit-register-request": () => showScreen("screen-register-request-complete"),
  "tutorial-next": () => showScreen("screen-tutorial-last"),
  "tutorial-complete": () => showScreen("screen-payment-setup"),
  "setup-payment": () => showScreen("screen-stripe-loading"),
  "go-member-home": () => showScreen("screen-member-home"),
  "go-home": () => showScreen(document.querySelector(".screen.active")?.dataset.auth === "admin" ? "screen-admin-home" : "screen-member-home"),
  "open-menu": () => {
    const current = document.querySelector(".screen.active")?.dataset.auth;
    if (current === "admin") {
      adminMenu.classList.remove("hidden");
    } else if (current === "member") {
      memberMenu.classList.remove("hidden");
    }
  },
  "close-menu": closeMenus,
  "go-profile": () => showScreen("screen-profile"),
  "go-profile-edit": () => showScreen("screen-profile-edit"),
  "go-identity": () => showScreen("screen-identity"),
  "go-favorites": () => showScreen("screen-favorites"),
  "go-1on1": () => showScreen("screen-1on1"),
  "go-following": () => showScreen("screen-following"),
  "go-followers": () => showScreen("screen-followers"),
  "go-payment": () => showScreen("screen-payment"),
  "go-payment-setup": () => showScreen("screen-payment-setup"),
  "go-charge": () => showScreen("screen-charge"),
  "go-stripe": () => showScreen("screen-stripe-loading"),
  "go-payment-history": () => showScreen("screen-payment-history"),
  "go-invite": () => showScreen("screen-invite"),
  "go-search-members": () => showScreen("screen-search-members"),
  "go-recommended": () => showScreen("screen-recommended"),
  "go-dm": () => showScreen("screen-dm"),
  "go-dm-detail": () => showScreen("screen-dm-detail"),
  "go-memo": () => showScreen("screen-memo"),
  "go-memo-detail": () => showScreen("screen-memo-detail"),
  "go-announcement": () => showScreen("screen-announcement"),
  "go-promotion-create": () => showScreen("screen-promotion-create"),
  "go-ad-create": () => showScreen("screen-ad-create"),
  "go-account": () => showScreen("screen-account"),
  "go-terms": () => showScreen("screen-terms"),
  "go-admin-home": () => showScreen("screen-admin-home"),
  "go-admin-members": () => showScreen("screen-admin-members"),
  "go-admin-member-edit": () => showScreen("screen-admin-member-edit"),
  "go-admin-member-history": () => showScreen("screen-admin-member-history"),
  "go-admin-dm": () => showScreen("screen-admin-dm"),
  "go-admin-dm-detail": () => showScreen("screen-admin-dm-detail"),
  "go-admin-approval": () => showScreen("screen-admin-approval"),
  "go-admin-event-approval": () => showScreen("screen-admin-event-approval"),
  "go-admin-ad-approval": () => showScreen("screen-admin-ad-approval"),
  "go-admin-identity-approval": () => showScreen("screen-admin-identity-approval"),
  "go-admin-profile-fields": () => showScreen("screen-admin-profile-fields"),
  "go-profile-field-create": () => showScreen("screen-admin-profile-field-create"),
  "go-admin-profile-fields": () => showScreen("screen-admin-profile-fields"),
  "go-profile-field-edit": () => showScreen("screen-admin-profile-field-edit"),
  "go-admin-notice": () => showScreen("screen-admin-notice"),
  "go-notice-create": () => showScreen("screen-admin-notice-create"),
  "go-notice-edit": () => showScreen("screen-admin-notice-edit"),
  "go-admin-report": () => showScreen("screen-admin-report"),
  "go-admin-invite-history": () => showScreen("screen-admin-invite-history"),
  "go-admin-usage": () => showScreen("screen-admin-usage"),
  "go-admin-payments": () => showScreen("screen-admin-payments"),
  "go-admin-ad-points": () => showScreen("screen-admin-ad-points"),
  "go-admin-terms": () => showScreen("screen-admin-terms"),
  "open-profile-preview": () => openDialog("dialog-profile"),
  "open-favorite-dialog": () => openDialog("dialog-favorite"),
  "open-member-search": () => openDialog("dialog-search-member"),
  "open-member-sort": () => openDialog("dialog-sort-member"),
  "open-payment-search": () => openDialog("dialog-payment-search"),
  "open-payment-sort": () => openDialog("dialog-payment-sort"),
  "open-receipt": () => openDialog("dialog-receipt"),
  "open-invite-create": () => openDialog("dialog-invite-create"),
  "open-invite-search": () => openDialog("dialog-invite-search"),
  "open-invite-sort": () => openDialog("dialog-invite-sort"),
  "open-invite-delete": () => openDialog("dialog-invite-delete"),
  "open-recommend-sort": () => openDialog("dialog-recommend-sort"),
  "open-newcomer-sort": () => openDialog("dialog-newcomer-sort"),
  "open-dm-search": () => openDialog("dialog-dm-search"),
  "open-dm-sort": () => openDialog("dialog-dm-sort"),
  "open-block-search": () => openDialog("dialog-block-search"),
  "open-block-sort": () => openDialog("dialog-block-sort"),
  "open-dm-settings": () => openDialog("dialog-dm-settings"),
  "open-memo-search": () => openDialog("dialog-memo-search"),
  "open-memo-sort": () => openDialog("dialog-memo-sort"),
  "open-memo-delete": () => openDialog("dialog-memo-delete"),
  "open-memo-dialog": () => openDialog("dialog-memo-list"),
  "open-memo-detail-dialog": () => openDialog("dialog-memo-detail"),
  "open-timeline-search": () => openDialog("dialog-timeline-search"),
  "open-logout": () => openDialog("dialog-logout"),
  "open-withdraw": () => openDialog("dialog-withdraw"),
  "open-admin-member-search": () => openDialog("dialog-admin-member-search"),
  "open-admin-member-sort": () => openDialog("dialog-admin-member-sort"),
  "open-admin-stop": () => openDialog("dialog-admin-stop"),
  "open-admin-history-search": () => openDialog("dialog-admin-history-search"),
  "open-admin-history-sort": () => openDialog("dialog-admin-history-sort"),
  "open-admin-dm-search": () => openDialog("dialog-admin-dm-search"),
  "open-admin-dm-sort": () => openDialog("dialog-admin-dm-sort"),
  "open-join-search": () => openDialog("dialog-join-search"),
  "open-join-sort": () => openDialog("dialog-join-sort"),
  "open-join-approve": () => openDialog("dialog-join-approve"),
  "open-event-search": () => openDialog("dialog-event-search"),
  "open-event-sort": () => openDialog("dialog-event-sort"),
  "open-event-approve": () => openDialog("dialog-event-approve"),
  "open-ad-search": () => openDialog("dialog-ad-search"),
  "open-ad-sort": () => openDialog("dialog-ad-sort"),
  "open-ad-approve": () => openDialog("dialog-ad-approve"),
  "open-identity-search": () => openDialog("dialog-identity-search"),
  "open-identity-sort": () => openDialog("dialog-identity-sort"),
  "open-identity-approve": () => openDialog("dialog-identity-approve"),
  "open-profile-field-delete": () => openDialog("dialog-profile-field-delete"),
  "open-notice-search": () => openDialog("dialog-notice-search"),
  "open-notice-sort": () => openDialog("dialog-notice-sort"),
  "open-report-search": () => openDialog("dialog-report-search"),
  "open-report-sort": () => openDialog("dialog-report-sort"),
  "open-report-stop": () => openDialog("dialog-report-stop"),
  "open-invite-history-search": () => openDialog("dialog-invite-history-search"),
  "open-invite-history-sort": () => openDialog("dialog-invite-history-sort"),
  "open-admin-usage-search": () => openDialog("dialog-admin-usage-search"),
  "open-admin-usage-sort": () => openDialog("dialog-admin-usage-sort"),
  "open-admin-payment-search": () => openDialog("dialog-admin-payment-search"),
  "open-admin-payment-sort": () => openDialog("dialog-admin-payment-sort"),
  "close-dialog": closeAllDialogs,
  "confirm-logout": () => window.location.reload(),
  "confirm-withdraw": () => window.location.reload(),
  "open-dm-memo": () => {
    document.querySelector("[data-dm-input]")?.classList.add("hidden");
    document.querySelector("[data-dm-memo]")?.classList.remove("hidden");
  },
  "close-dm-memo": () => {
    document.querySelector("[data-dm-input]")?.classList.remove("hidden");
    document.querySelector("[data-dm-memo]")?.classList.add("hidden");
  },
  "open-dm-memo-detail": () => {
    document.querySelector("[data-dm-memo]")?.classList.add("hidden");
    document.querySelector("[data-dm-memo-detail]")?.classList.remove("hidden");
  },
  "close-dm-memo-detail": () => {
    document.querySelector("[data-dm-memo]")?.classList.remove("hidden");
    document.querySelector("[data-dm-memo-detail]")?.classList.add("hidden");
  },
};

const setupActions = () => {
  document.body.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;
    if (actions[action]) {
      event.preventDefault();
      actions[action]();
    }
  });

  document.querySelectorAll("[data-toggle-error]").forEach((button) => {
    button.addEventListener("click", () => toggleIndicator("error", button.dataset.toggleError));
  });

  document.querySelectorAll("[data-toggle-success]").forEach((button) => {
    button.addEventListener("click", () => toggleIndicator("success", button.dataset.toggleSuccess));
  });

  document.querySelectorAll("[data-toggle-lock]").forEach((button) => {
    button.addEventListener("click", () => toggleLock(button.dataset.toggleLock));
  });
};

const listTemplates = {
  notifications: (i) => `
    <button class="list-item text-left" data-action="${i % 2 === 0 ? "go-dm" : "go-announcement"}">
      <div class="flex justify-between">
        <span class="badge">${i % 2 === 0 ? "DM" : "公式お知らせ"}</span>
        <span class="text-xs text-slate-400">${i + 1}分前</span>
      </div>
      <p>新着通知タイトル ${i + 1}</p>
    </button>
  `,
  "banner-ads": (i) => `
    <a class="carousel-item" href="https://example.com" target="_blank" rel="noopener">
      <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" alt="広告" />
      <div class="p-3 text-sm">バナー広告 ${i + 1}</div>
    </a>
  `,
  "footer-ads": (i) => `
    <a class="card-inner min-w-[200px]" href="https://example.com" target="_blank" rel="noopener">
      <p class="text-xs text-slate-400">フッター広告</p>
      <p class="text-sm">スポンサー ${i + 1}</p>
    </a>
  `,
  "recent-members": (i) => `
    <button class="list-item flex items-center gap-3 text-left" data-action="open-profile-preview">
      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="会員" class="h-12 w-12 rounded-full object-cover" />
      <div>
        <div class="font-medium">会員名 ${i + 1}</div>
        <div class="rating">★★★★☆</div>
      </div>
    </button>
  `,
  "member-quick-access": (i) => `
    <button class="menu-item">クイックアクセス ${i + 1}</button>
  `,
  "member-list": (i) => `
    <div class="list-item">
      <div class="flex flex-wrap justify-between gap-3">
        <div>
          <div class="font-semibold">会員名 ${i + 1}</div>
          <div class="text-sm text-slate-400">株式会社サンプル ${i + 1}</div>
          <div class="rating">★★★☆☆</div>
          <div class="text-xs text-slate-400">最終ログイン: ${2024 - (i % 3)}/0${(i % 9) + 1}/0${(i % 28) + 1}</div>
        </div>
        <div class="flex flex-wrap gap-2">
          <button class="chip" data-action="open-favorite-dialog">解除</button>
          <button class="chip" data-action="open-profile-preview">プロフィール詳細</button>
        </div>
      </div>
    </div>
  `,
  "payment-history": (i) => `
    <div class="list-item">
      <div class="flex justify-between flex-wrap gap-2">
        <div>
          <div class="font-semibold">支払日: 2024/0${(i % 9) + 1}/1${i % 9}</div>
          <div class="text-sm text-slate-400">支払種別: 更新費用</div>
          <div class="text-sm">金額: ¥${400 + (i % 5) * 100}</div>
        </div>
        <button class="chip" data-action="open-receipt">領収書</button>
      </div>
    </div>
  `,
  "invite-codes": (i) => `
    <div class="list-item">
      <div class="flex flex-wrap justify-between gap-2">
        <div>
          <div class="font-semibold">コード: INV-${1000 + i}</div>
          <div class="text-sm text-slate-400">使用状況: ${i % 2 === 0 ? "未使用" : "使用済み"}</div>
          <div class="text-sm text-slate-400">有効期限: 2024/0${(i % 9) + 1}/2${i % 8}</div>
        </div>
        <button class="chip" data-action="open-invite-delete">削除</button>
      </div>
    </div>
  `,
  "member-search": (i) => `
    <div class="list-item">
      <div class="flex flex-wrap justify-between gap-2">
        <div>
          <div class="font-semibold">会員名 ${i + 1}</div>
          <div class="text-sm text-slate-400">会社名 ${i + 1}</div>
          <div class="rating">★★★★☆</div>
          <div class="text-xs text-slate-400">最終ログイン: 2024/0${(i % 9) + 1}/0${(i % 28) + 1}</div>
        </div>
        <button class="chip" data-action="open-profile-preview">プロフィール詳細</button>
      </div>
    </div>
  `,
  "recommended-members": (i) => `
    <button class="list-item flex items-center gap-3 text-left" data-action="open-profile-preview">
      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80" alt="会員" class="h-12 w-12 rounded-full object-cover" />
      <div>
        <div class="font-semibold">おすすめ会員 ${i + 1}</div>
        <div class="rating">★★★★★</div>
      </div>
    </button>
  `,
  "new-members": (i) => `
    <button class="list-item flex items-center gap-3 text-left" data-action="open-profile-preview">
      <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" alt="会員" class="h-12 w-12 rounded-full object-cover" />
      <div>
        <div class="font-semibold">新規会員 ${i + 1}</div>
        <div class="rating">★★★☆☆</div>
      </div>
    </button>
  `,
  "dm-list": (i) => `
    <div class="list-item">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="会員" class="h-12 w-12 rounded-full object-cover" />
          <div>
            <div class="font-semibold">会員 ${i + 1}</div>
            <div class="text-xs text-slate-400">最新メッセージ ${i + 1}</div>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="icon-btn" data-action="open-dm-settings"><i data-lucide="settings"></i></button>
          <button class="chip" data-action="go-dm-detail">詳細</button>
        </div>
      </div>
    </div>
  `,
  "blocked-list": (i) => `
    <div class="list-item">
      <div class="flex justify-between items-center">
        <div>
          <div class="font-semibold">ブロック会員 ${i + 1}</div>
          <div class="text-xs text-slate-400">最終更新: 2024/0${(i % 9) + 1}/0${(i % 28) + 1}</div>
        </div>
        <div class="flex gap-2">
          <button class="chip">解除</button>
          <button class="chip">通報</button>
        </div>
      </div>
    </div>
  `,
  "dm-messages": (i) => `
    <div class="list-item ${i % 2 === 0 ? "bg-slate-900/70" : "bg-slate-800/70"}">
      <p>メッセージ内容 ${i + 1}</p>
    </div>
  `,
  "dm-memos": (i) => `
    <button class="chip w-full text-left" data-action="open-dm-memo-detail">メモ ${i + 1}</button>
  `,
  "memo-list": (i) => `
    <div class="list-item">
      <div class="flex justify-between">
        <div>
          <div class="font-semibold">メモタイトル ${i + 1}</div>
          <div class="text-xs text-slate-400">紐づけ会員: 会員 ${i + 1}</div>
        </div>
        <div class="flex gap-2">
          <button class="icon-btn" data-action="open-memo-delete"><i data-lucide="trash"></i></button>
          <button class="chip" data-action="go-memo-detail">詳細</button>
        </div>
      </div>
    </div>
  `,
  timeline: (i) => `
    <div class="list-item">
      <div class="font-semibold">投稿タイトル ${i + 1}</div>
      <p class="text-sm text-slate-300">投稿内容の抜粋が入ります。</p>
    </div>
  `,
  notices: (i) => `
    <div class="list-item">
      <div class="font-semibold">公式お知らせ ${i + 1}</div>
      <div class="text-xs text-slate-400">2024/0${(i % 9) + 1}/0${(i % 28) + 1}</div>
    </div>
  `,
  "promotion-history": (i) => `
    <div class="list-item">
      <div class="flex justify-between">
        <div>
          <div class="font-semibold">宣伝申請 ${i + 1}</div>
          <div class="text-xs text-slate-400">ステータス: ${i % 3 === 0 ? "承認待ち" : i % 3 === 1 ? "承認済み" : "拒否"}</div>
        </div>
      </div>
    </div>
  `,
  "ad-history": (i) => `
    <div class="list-item">
      <div class="flex justify-between">
        <div>
          <div class="font-semibold">広告申請 ${i + 1}</div>
          <div class="text-xs text-slate-400">ステータス: ${i % 3 === 0 ? "承認待ち" : i % 3 === 1 ? "承認済み" : "拒否"}</div>
        </div>
      </div>
    </div>
  `,
  "memo-dialog": (i) => `
    <button class="chip w-full text-left" data-action="open-memo-detail-dialog">メモ ${i + 1}</button>
  `,
  "admin-tasks": (i) => `
    <div class="list-item">
      <div class="font-semibold">タスク ${i + 1}</div>
      <div class="text-xs text-slate-400">種別: 承認対応</div>
    </div>
  `,
  "admin-quick-access": (i) => `
    <button class="menu-item">管理クイック ${i + 1}</button>
  `,
  "admin-member-list": (i) => `
    <div class="list-item">
      <div class="flex flex-wrap justify-between gap-2">
        <div>
          <div class="font-semibold">会員 ${i + 1}</div>
          <div class="text-sm text-slate-400">会社名 ${i + 1}</div>
          <div class="rating">★★★★☆</div>
          <div class="text-xs text-slate-400">ステータス: ${i % 4 === 0 ? "停止" : "有効"}</div>
        </div>
        <div class="flex flex-wrap gap-2">
          <button class="chip" data-action="go-admin-member-edit">編集</button>
          <button class="chip" data-action="open-admin-stop">停止</button>
          <button class="chip" data-action="go-admin-member-history">利用履歴</button>
        </div>
      </div>
    </div>
  `,
  "admin-usage-history": (i) => `
    <div class="list-item">
      <div class="font-semibold">2024/0${(i % 9) + 1}/0${(i % 28) + 1}</div>
      <div class="text-sm text-slate-400">操作内容 ${i + 1}</div>
    </div>
  `,
  "admin-dm-list": (i) => `
    <div class="list-item">
      <div class="flex justify-between items-center">
        <div>
          <div class="font-semibold">会員 ${i + 1}</div>
          <div class="text-xs text-slate-400">最新メッセージ ${i + 1}</div>
        </div>
        <button class="chip" data-action="go-admin-dm-detail">詳細</button>
      </div>
    </div>
  `,
  "admin-dm-messages": (i) => `
    <div class="list-item ${i % 2 === 0 ? "bg-slate-900/70" : "bg-slate-800/70"}">
      <p>公式DMメッセージ ${i + 1}</p>
    </div>
  `,
  "join-requests": (i) => `
    <div class="list-item">
      <div class="flex justify-between flex-wrap gap-2">
        <div>
          <div class="font-semibold">申請日: 2024/0${(i % 9) + 1}/0${(i % 28) + 1}</div>
          <div class="text-sm text-slate-400">会員名 ${i + 1}</div>
          <div class="text-xs text-slate-400">ステータス: 申請中</div>
        </div>
        <button class="chip" data-action="open-join-approve">承認/却下</button>
      </div>
    </div>
  `,
  "event-requests": (i) => `
    <div class="list-item">
      <div class="flex justify-between flex-wrap gap-2">
        <div>
          <div class="font-semibold">イベント申請 ${i + 1}</div>
          <div class="text-sm text-slate-400">会員名 ${i + 1}</div>
          <div class="text-xs text-slate-400">ステータス: 申請中</div>
        </div>
        <button class="chip" data-action="open-event-approve">承認/却下</button>
      </div>
    </div>
  `,
  "ad-requests": (i) => `
    <div class="list-item">
      <div class="flex justify-between flex-wrap gap-2">
        <div>
          <div class="font-semibold">広告申請 ${i + 1}</div>
          <div class="text-sm text-slate-400">会員名 ${i + 1}</div>
          <div class="text-xs text-slate-400">種別: バナー広告</div>
        </div>
        <button class="chip" data-action="open-ad-approve">承認/却下</button>
      </div>
    </div>
  `,
  "identity-requests": (i) => `
    <div class="list-item">
      <div class="flex justify-between flex-wrap gap-2">
        <div>
          <div class="font-semibold">本人確認申請 ${i + 1}</div>
          <div class="text-sm text-slate-400">書類種別: 運転免許証</div>
          <div class="text-xs text-slate-400">ステータス: 申請中</div>
        </div>
        <button class="chip" data-action="open-identity-approve">承認/却下</button>
      </div>
    </div>
  `,
  "profile-fields": (i) => `
    <div class="list-item flex justify-between items-center">
      <div>
        <div class="font-semibold">項目 ${i + 1}</div>
        <div class="text-xs text-slate-400">入力形式: ${i % 2 === 0 ? "input" : "textarea"}</div>
      </div>
      <div class="flex gap-2">
        <button class="chip" data-action="go-profile-field-edit">編集</button>
        <button class="chip" data-action="open-profile-field-delete">削除</button>
      </div>
    </div>
  `,
  "profile-summary": (i) => `
    <div class="list-item">
      <div class="text-sm text-slate-300">プロフィール項目 ${i + 1}</div>
      <div class="font-medium">入力値サンプル ${i + 1}</div>
    </div>
  `,
  "admin-notice": (i) => `
    <div class="list-item flex justify-between items-center">
      <div>
        <div class="font-semibold">お知らせ ${i + 1}</div>
        <div class="text-xs text-slate-400">投稿日: 2024/0${(i % 9) + 1}/0${(i % 28) + 1} / ステータス: 公開</div>
      </div>
      <button class="chip" data-action="go-notice-edit">編集</button>
    </div>
  `,
  reports: (i) => `
    <div class="list-item">
      <div class="flex justify-between flex-wrap gap-2">
        <div>
          <div class="font-semibold">通報日: 2024/0${(i % 9) + 1}/0${(i % 28) + 1}</div>
          <div class="text-sm text-slate-400">通報者: 会員 ${i + 1} / 対象: 会員 ${i + 2}</div>
          <div class="text-xs text-slate-400">理由: 不適切な投稿</div>
        </div>
        <button class="chip" data-action="open-report-stop">停止</button>
      </div>
    </div>
  `,
  "invite-history": (i) => `
    <div class="list-item">
      <div class="font-semibold">コード: INV-${2000 + i}</div>
      <div class="text-xs text-slate-400">作成者: 管理者${i % 3}</div>
      <div class="text-xs text-slate-400">使用状況: ${i % 2 === 0 ? "未使用" : "使用済み"}</div>
    </div>
  `,
  "admin-usage": (i) => `
    <div class="list-item">
      <div class="font-semibold">2024/0${(i % 9) + 1}/0${(i % 28) + 1}</div>
      <div class="text-sm text-slate-400">管理者: 管理者${i % 4}</div>
      <div class="text-xs text-slate-400">操作内容: 承認対応</div>
    </div>
  `,
  "admin-payments": (i) => `
    <div class="list-item">
      <div class="font-semibold">支払日: 2024/0${(i % 9) + 1}/0${(i % 28) + 1}</div>
      <div class="text-sm text-slate-400">会員名: 会員 ${i + 1}</div>
      <div class="text-xs text-slate-400">支払種別: 更新費用 / 金額: ¥${400 + (i % 5) * 100}</div>
      <div class="text-xs text-slate-400">決済方法: クレジットカード</div>
    </div>
  `,
};

const populateLists = () => {
  document.querySelectorAll("[MA-database]").forEach((list) => {
    const type = list.dataset.listType;
    const count = Number(list.dataset.max || list.dataset.count || 50);
    const template = listTemplates[type];
    if (!template) return;
    list.innerHTML = Array.from({ length: count }, (_, i) => template(i)).join("");
  });
};

const init = () => {
  populateLists();
  registerTabs();
  setupActions();
  showScreen("screen-login");
  lucide.createIcons();
};

init();
