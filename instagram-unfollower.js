(() => { "use strict"; if (location.hostname !== "www.instagram.com") { alert("Open https://www.instagram.com first, then paste this script again."); return; } const APP_ID = "iu-app"; const VERSION = "1.0"; const CLEANUP_EVENT = "iu-cleanup"; const STYLE_ID = "iu-style"; const STORAGE_KEY = "iu_state_v3"; const CHECKPOINT_KEY = "iu_scan_v1"; const CHECKPOINT_TTL = 24 * 60 * 60 * 1000; const IG_HEADERS = { "x-ig-app-id": "936619743392459", "x-requested-with": "XMLHttpRequest" }; const DEFAULT_TIMINGS = { scanDelayMin: 1000, scanDelayMax: 1300, scanPauseEveryPages: 7, scanPauseMs: 10000, usersPerRequest: 50, unfollowDelayMin: 4000, unfollowDelayMax: 4800, unfollowPauseEvery: 5, unfollowPauseMs: 300000 }; const SCAN_MICRO_DELAY_MIN = 500; const SCAN_MICRO_DELAY_MAX = 2000; const SCAN_PAUSE_JITTER_MS = 5000; const PROGRESS_TITLE_ID = "iu-progress-title"; const PANEL_WIDTH = 520; const PANEL_MARGIN = 18; const MAX_RETRIES = 3; const I18N = { en: { title: "Instagram Unfollower", subtitle: "See who doesn't follow you back", welcomeTitle: "Ready when you are", welcomeBody: "We'll compare the people you follow with your followers. Nothing is changed on your account during the scan.", scanBtn: "Scan now", scanning: "Scanning", loadingFollowing: "Loading the people you follow", loadingFollowers: "Loading your followers", paused: "Paused", pause: "Pause", resume: "Resume", cancel: "Cancel", ofTotal: "{current} of {total}", ofUnknown: "{current} so far", scanCompletedToast: "{count} non-followers found", scanFailed: "Scan failed", retry: "Try again", goBack: "Back to results", search: "Search by name or username", filterVerified: "Verified", filterPrivate: "Private", filterNoAvatar: "No profile picture", filterShowHidden: "Hidden users", foundCount: "{count} non-followers", foundOne: "1 non-follower", foundNone: "Nice — everyone you follow follows you back.", noMatches: "No users match your filters.", hide: "Hide", unhide: "Unhide", hideTooltip: "Hide from this list", unhideTooltip: "Show again", openProfile: "Open profile", copy: "Copy", copyAll: "Copy all", copiedToast: "Copied {count} usernames", selectAll: "Select all", selectNone: "Clear", selectedCount: "{count} selected", unfollow: "Unfollow", unfollowConfirmTitle: "Unfollow {count} users?", unfollowConfirmBody: "This will run slowly to protect your account from rate limiting. You can pause at any time, but already-completed unfollows cannot be reversed from this tool.", unfollowConfirmBtn: "Yes, unfollow {count}", unfollowing: "Unfollowing", currently: "Currently", nextActionIn: "Next action in {seconds}s", cooldownIn: "Cooldown — {seconds}s", scanPause: "Long pause — {seconds}s", unfollowDoneTitle: "Done", unfollowDoneBody: "{ok} unfollowed, {fail} failed", unfollowBlocked: "Instagram blocked this action, so {count} remaining users were skipped. Wait a few hours before trying again.", settings: "Settings", settingsTitle: "Timing settings", settingsBody: "Lower delays make Instagram more likely to throttle or block your account. Keep these conservative.", minScanDelay: "Min scan delay (ms)", maxScanDelay: "Max scan delay (ms)", scanPauseEvery: "Long pause every N pages", scanPauseLength: "Long pause length (ms)", usersPerRequest: "Users requested per page", minUnfollowDelay: "Min unfollow delay (ms)", maxUnfollowDelay: "Max unfollow delay (ms)", unfollowPauseEvery: "Cooldown every N unfollows", unfollowPauseLength: "Cooldown length (ms)", restoreDefaults: "Restore defaults", save: "Save", saved: "Settings saved", cookieMissing: "Could not read your login cookie. Make sure you are signed in.", csrfMissing: "Could not read csrftoken cookie.", requestFailed: "Request failed: {status}", tooManyRequests: "Instagram is rate-limiting requests. Try again later or increase delays in settings.", sessionExpired: "Instagram signed you out. Sign in again, paste the script again and press Resume. The scan continues where it stopped.", scanBlocked: "Instagram temporarily refused list requests for this account. Wait a few hours, paste the script again and press Resume.", networkError: "The connection dropped. Check the network and press Resume.", keepTabVisible: "Keep this tab in front. Chrome slows background tabs down to one step per minute.", resumeScan: "Resume scan", startOver: "Start over", resumeHint: "A previous scan stopped at {loaded} of {total} followers. Continue from there instead of starting again.", resumeHintUnknown: "A previous scan stopped partway. Continue from there instead of starting again.", partialTitle: "Follower list incomplete", partialBody: "{loaded} of {total} followers were loaded. Results and unfollowing stay unavailable until the full list is checked. Your progress is saved.", partialBodyUnknown: "{loaded} followers were loaded before the scan stopped. Results and unfollowing stay unavailable until the full list is checked. Your progress is saved.", incompleteList: "Instagram returned an incomplete list ({loaded} of {total}). No non-follower results can be confirmed. Your progress is saved; wait before resuming.", limitedList: "Instagram is limiting this list. No non-follower results can be confirmed. Wait before trying again.", scanNotice: "Large accounts can take 20 minutes or more. Instagram may still interrupt a scan. If it does, wait before resuming; repeating the scan immediately can prolong restrictions.", scanWorkingHint: "This can take a little while. Keep this tab open while we check everything for you.", close: "Close", langSwitch: "Switch to Turkish", minimize: "Minimize", expand: "Expand", langCode: "TR", pillScanning: "Scanning {current}/{total}", pillUnfollowing: "Unfollowing {current}/{total}", pillResults: "{count} non-followers", pillIdle: "Open" }, tr: { title: "Instagram Takip Etmeyenler", subtitle: "Seni geri takip etmeyenleri gör", welcomeTitle: "Hazır olduğunda başlat", welcomeBody: "Takip ettiklerin ve takipçilerin karşılaştırılır. Tarama sırasında hesabında hiçbir şey değişmez.", scanBtn: "Taramayı başlat", scanning: "Taranıyor", loadingFollowing: "Takip ettiklerin yükleniyor", loadingFollowers: "Takipçilerin yükleniyor", paused: "Duraklatıldı", pause: "Duraklat", resume: "Devam et", cancel: "İptal", ofTotal: "{current} / {total}", ofUnknown: "Şu ana kadar {current}", scanCompletedToast: "{count} takip etmeyen bulundu", scanFailed: "Tarama başarısız", retry: "Tekrar dene", goBack: "Sonuçlara dön", search: "İsim veya kullanıcı adı ara", filterVerified: "Onaylı", filterPrivate: "Gizli", filterNoAvatar: "Profil resmi yok", filterShowHidden: "Gizlenen kullanıcılar", foundCount: "{count} takip etmeyen", foundOne: "1 takip etmeyen", foundNone: "Harika — takip ettiğin herkes seni takip ediyor.", noMatches: "Filtrelerinle eşleşen kullanıcı yok.", hide: "Gizle", unhide: "Göster", hideTooltip: "Bu listeden gizle", unhideTooltip: "Tekrar göster", openProfile: "Profili aç", copy: "Kopyala", copyAll: "Tümünü kopyala", copiedToast: "{count} kullanıcı adı kopyalandı", selectAll: "Tümünü seç", selectNone: "Temizle", selectedCount: "{count} seçili", unfollow: "Takibi bırak", unfollowConfirmTitle: "{count} kullanıcının takibi bırakılsın mı?", unfollowConfirmBody: "Hesabını korumak için işlem yavaş çalışır. İstediğin zaman duraklatabilirsin, ama tamamlanan işlemler bu araçtan geri alınamaz.", unfollowConfirmBtn: "Evet, {count} kişiyi bırak", unfollowing: "Takip bırakılıyor", currently: "Şu an", nextActionIn: "Sonraki işlem {seconds} sn sonra", cooldownIn: "Mola — {seconds} sn", scanPause: "Uzun mola — {seconds} sn", unfollowDoneTitle: "Tamamlandı", unfollowDoneBody: "{ok} başarılı, {fail} başarısız", unfollowBlocked: "Instagram bu işlemi engelledi, kalan {count} kişi atlandı. Tekrar denemeden önce birkaç saat bekle.", settings: "Ayarlar", settingsTitle: "Hız ayarları", settingsBody: "Düşük gecikmeler Instagram'ın hesabını kısıtlamasına neden olabilir. Yavaş tut.", minScanDelay: "Min tarama gecikmesi (ms)", maxScanDelay: "Maks tarama gecikmesi (ms)", scanPauseEvery: "Her N sayfada uzun mola", scanPauseLength: "Uzun mola süresi (ms)", usersPerRequest: "Sayfa başına istenen kullanıcı", minUnfollowDelay: "Min takip bırakma gecikmesi (ms)", maxUnfollowDelay: "Maks takip bırakma gecikmesi (ms)", unfollowPauseEvery: "Her N takip bırakmada mola", unfollowPauseLength: "Mola süresi (ms)", restoreDefaults: "Varsayılana dön", save: "Kaydet", saved: "Ayarlar kaydedildi", cookieMissing: "Giriş çerezi okunamadı. Giriş yaptığından emin ol.", csrfMissing: "csrftoken çerezi okunamadı.", requestFailed: "İstek başarısız: {status}", tooManyRequests: "Instagram istekleri kısıtlıyor. Sonra dene veya ayarlardan gecikmeleri artır.", sessionExpired: "Instagram oturumunu kapattı. Tekrar giriş yap, kodu yeniden yapıştır ve Devam et'e bas. Tarama kaldığı yerden sürer.", scanBlocked: "Instagram bu hesap için liste isteklerini geçici olarak reddetti. Birkaç saat bekle, kodu yeniden yapıştır ve Devam et'e bas.", networkError: "Bağlantı koptu. Ağı kontrol et ve Devam et'e bas.", keepTabVisible: "Bu sekmeyi önde tut. Chrome arka plandaki sekmeleri dakikada bir adıma yavaşlatır.", resumeScan: "Taramaya devam et", startOver: "Baştan başla", resumeHint: "Önceki tarama {total} takipçinin {loaded} tanesinde durdu. Baştan başlamak yerine oradan devam edebilirsin.", resumeHintUnknown: "Önceki tarama yarıda kaldı. Baştan başlamak yerine oradan devam edebilirsin.", partialTitle: "Takipçi listesi eksik", partialBody: "{total} takipçinin {loaded} tanesi yüklendi. Listenin tamamı kontrol edilene kadar sonuçlar ve takip bırakma kapalı. İlerlemen kaydedildi.", partialBodyUnknown: "Tarama durmadan önce {loaded} takipçi yüklendi. Listenin tamamı kontrol edilene kadar sonuçlar ve takip bırakma kapalı. İlerlemen kaydedildi.", incompleteList: "Instagram eksik liste döndürdü ({loaded} / {total}). Geri takip etmeyenler henüz doğrulanamadı. İlerlemen kaydedildi; devam etmeden önce bekle.", limitedList: "Instagram bu listeyi kısıtlıyor. Geri takip etmeyenler henüz doğrulanamadı. Tekrar denemeden önce bekle.", scanNotice: "Büyük hesaplarda tarama 20 dakika veya daha uzun sürebilir. Instagram yine de taramayı kesebilir. Böyle olursa devam etmeden önce bekle; hemen tekrarlamak kısıtlamayı uzatabilir.", scanWorkingHint: "Bu işlem biraz zaman alabilir. Pencereyi açık tut, senin için kontrol ediyoruz.", close: "Kapat", langSwitch: "İngilizce'ye geç", minimize: "Küçült", expand: "Aç", langCode: "EN", pillScanning: "Taranıyor {current}/{total}", pillUnfollowing: "Bırakılıyor {current}/{total}", pillResults: "{count} takip etmeyen", pillIdle: "Aç" } }; const SVG = { minimize: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="3" y="7.25" width="10" height="1.5" rx="0.75" fill="currentColor"/></svg>', close: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>', gear: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm6.7 2.5a6.7 6.7 0 0 0-.1-1.1l1.4-1.1-1.5-2.6-1.7.7a6.6 6.6 0 0 0-1.9-1.1L10.5 1h-3l-.4 1.8a6.6 6.6 0 0 0-1.9 1.1l-1.7-.7L1.9 5.8 3.3 6.9a6.7 6.7 0 0 0 0 2.2L1.9 10.2l1.5 2.6 1.7-.7a6.6 6.6 0 0 0 1.9 1.1L7.5 15h3l.4-1.8a6.6 6.6 0 0 0 1.9-1.1l1.7.7 1.5-2.6-1.4-1.1c.1-.4.1-.7.1-1.1z"/></svg>', open: '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M6 3h7v7M13 3L6.5 9.5M9 13H3V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>', sparkle: '<svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true"><path fill="currentColor" d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6L12 2zm6 11l1 2.8L22 17l-3 .8L18 21l-1-3.2L14 17l3-1.2 1-2.8z"/></svg>', alert: '<svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true"><path fill="currentColor" d="M12 2 1 21h22L12 2zm0 6 7.5 13h-15L12 8zm-1 4v4h2v-4h-2zm0 5v2h2v-2h-2z"/></svg>', check: '<svg viewBox="0 0 16 16" width="36" height="36" aria-hidden="true"><path fill="currentColor" d="M14 4.5L6 12.5l-4-4L3 7.5l3 3 7-7z"/></svg>' }; const persisted = loadStored(); const state = { mode: "idle", scanPaused: false, scanCancelled: false, unfollowPaused: false, unfollowBlocked: 0, progress: { current: 0, total: 0, label: "scanning", note: "" }, waitUntil: 0, waitReason: "", users: [], followingCount: 0, followersCount: 0, selected: new Set(), hidden: new Set(persisted.hidden || []), log: [], search: "", filters: persisted.filters || { verified: true, private: true, noAvatar: true, showHidden: false }, timings: loadTimings(persisted.timings), panelPos: persisted.panelPos || null, minimized: Boolean(persisted.minimized), language: persisted.language === "tr" || persisted.language === "en" ? persisted.language : (String(navigator.language || "").toLowerCase().startsWith("tr") ? "tr" : "en"), error: "", checkpoint: loadCheckpoint(), partial: false, coverage: "" }; let countdownTimer = null; let toastTimer = null; let dialogCounter = 0; let closeActiveDialog = null; let wakeSleep = null; let destroyed = false; let activeRequest = null; function loadTimings(saved = {}) { const timings = { ...DEFAULT_TIMINGS }; for (const key of Object.keys(timings)) { if (Number.isFinite(saved?.[key]) && saved[key] >= 0) timings[key] = saved[key]; } const scanKeys = ["scanDelayMin", "scanDelayMax", "scanPauseEveryPages", "scanPauseMs"]; const oldPresets = [ [700, 1500, 5, 8000], [1500, 3000, 5, 20000], [1500, 3300, 7, 10000] ]; if (oldPresets.some((preset) => scanKeys.every((key, index) => saved?.[key] === preset[index]))) { for (const key of scanKeys) timings[key] = DEFAULT_TIMINGS[key]; } const oldUnfollowPreset = [5000, 9000, 5, 300000]; const unfollowKeys = ["unfollowDelayMin", "unfollowDelayMax", "unfollowPauseEvery", "unfollowPauseMs"]; if (unfollowKeys.every((key, index) => saved?.[key] === oldUnfollowPreset[index])) { for (const key of unfollowKeys) timings[key] = DEFAULT_TIMINGS[key]; } timings.usersPerRequest = Math.min(200, Math.max(1, Math.round(timings.usersPerRequest))); return timings; } function loadStored() { try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : {}; } catch { return {}; } } function createCheckpoint(viewerId) { return { viewerId: String(viewerId), savedAt: Date.now(), following: [], followingCursor: "", followingDone: false, followerIds: [], followersCursor: "", followersDone: false, stopReason: "" }; } function loadCheckpoint() { try { const raw = localStorage.getItem(CHECKPOINT_KEY); if (!raw) return null; const parsed = JSON.parse(raw); if (!parsed || typeof parsed !== "object" || !parsed.viewerId) return null; if (!Array.isArray(parsed.following) || !Array.isArray(parsed.followerIds)) return null; if (Date.now() - Number(parsed.savedAt || 0) > CHECKPOINT_TTL) return null; if (parsed.followingDone && parsed.followersDone) return null; if (!parsed.following.length && !parsed.followerIds.length) return null; return { ...createCheckpoint(parsed.viewerId), ...parsed }; } catch { return null; } } function saveCheckpoint(checkpoint) { if (!checkpoint) return; checkpoint.savedAt = Date.now(); try { localStorage.setItem(CHECKPOINT_KEY, JSON.stringify(checkpoint)); } catch { } } function clearCheckpoint() { state.checkpoint = null; state.partial = false; try { localStorage.removeItem(CHECKPOINT_KEY); } catch { } } function resumeHintText(checkpoint) { const loaded = checkpoint.followerIds.length; if (checkpoint.followersTotal) { return t("resumeHint", { loaded: formatCount(loaded), total: formatCount(checkpoint.followersTotal) }); } return t("resumeHintUnknown"); } function formatCount(value) { const number = Number(value) || 0; try { return number.toLocaleString(state.language === "tr" ? "tr-TR" : "en-US"); } catch { return String(number); } } function persist() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ hidden: [...state.hidden], timings: state.timings, filters: state.filters, panelPos: state.panelPos, minimized: state.minimized, language: state.language })); } catch { } } function t(key, vars) { const dict = I18N[state.language] || I18N.en; const template = dict[key] ?? I18N.en[key] ?? key; if (!vars) return template; return template.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? ""); } function cleanupExisting() { document.dispatchEvent(new Event(CLEANUP_EVENT)); if (typeof window.__iuCleanup === "function") { try { window.__iuCleanup(); } catch {   } } document.getElementById(APP_ID)?.remove(); document.getElementById(STYLE_ID)?.remove(); } function injectStyles() { const style = document.createElement("style"); style.id = STYLE_ID; style.textContent = CSS; document.head.appendChild(style); } function mount() { const root = document.createElement("div"); root.id = APP_ID; document.body.appendChild(root); window.__iuCleanup = unmount; document.addEventListener(CLEANUP_EVENT, unmount); document.addEventListener("visibilitychange", onVisibilityChange); renderShell(); } function unmount() { if (destroyed) return; destroyed = true; state.scanCancelled = true; state.unfollowCancelled = true; state.scanPaused = false; state.unfollowPaused = false; activeRequest?.abort(); wakeUp(); stopCountdown(); document.removeEventListener(CLEANUP_EVENT, unmount); document.removeEventListener("visibilitychange", onVisibilityChange); closeActiveDialog?.(); if (toastTimer) { clearTimeout(toastTimer); toastTimer = null; } document.getElementById(APP_ID)?.remove(); document.getElementById(STYLE_ID)?.remove(); if (window.__iuCleanup === unmount) window.__iuCleanup = null; } function renderShell() { const root = document.getElementById(APP_ID); if (!root) return; if (state.minimized) { root.innerHTML = ` <button class="iu-pill" data-action="expand" type="button" aria-label="${escapeAttr(t("expand"))}"> <span class="iu-pill-dot ${pillStateClass()}"></span> <span data-pill-label>${escapeHTML(pillLabel())}</span> </button> `; root.querySelector("[data-action='expand']")?.addEventListener("click", () => setMinimized(false)); applyPanelPosition(); return; } root.innerHTML = ` <section class="iu-panel" role="dialog" aria-label="${escapeAttr(t("title"))}"> <header class="iu-header" data-drag> <div class="iu-brand"> <span class="iu-brand-dot"></span> <div class="iu-brand-text"> <strong>${escapeHTML(t("title"))}</strong> <span data-subtitle>v${VERSION} · ${escapeHTML(t("subtitle"))}</span> </div> </div> <div class="iu-header-actions"> <button type="button" data-action="settings" aria-label="${escapeAttr(t("settings"))}" title="${escapeAttr(t("settings"))}">${SVG.gear}</button> <button type="button" data-action="language" aria-label="${escapeAttr(t("langSwitch"))}" title="${escapeAttr(t("langSwitch"))}"><span data-lang aria-hidden="true">${escapeHTML(t("langCode"))}</span></button> <button type="button" data-action="minimize" aria-label="${escapeAttr(t("minimize"))}" title="${escapeAttr(t("minimize"))}">${SVG.minimize}</button> <button type="button" data-action="close" aria-label="${escapeAttr(t("close"))}" title="${escapeAttr(t("close"))}">${SVG.close}</button> </div> </header> <div class="iu-body" data-body></div> </section> `; bindHeader(root); bindDrag(root.querySelector("[data-drag]")); applyPanelPosition(); renderBody(); } function bindHeader(root) { root.querySelector("[data-action='close']")?.addEventListener("click", () => unmount()); root.querySelector("[data-action='minimize']")?.addEventListener("click", () => setMinimized(true)); root.querySelector("[data-action='settings']")?.addEventListener("click", showSettings); root.querySelector("[data-action='language']")?.addEventListener("click", toggleLanguage); } function applyPanelPosition() { const root = document.getElementById(APP_ID); if (!root) return; const node = root.querySelector(".iu-panel") || root.querySelector(".iu-pill"); if (!node) return; const isPill = node.classList.contains("iu-pill"); const pos = state.panelPos; if (!isPill && pos && Number.isFinite(pos.x) && Number.isFinite(pos.y)) { const max = panelBounds(node); node.style.left = clamp(pos.x, 0, max.x) + "px"; node.style.top = clamp(pos.y, 0, max.y) + "px"; node.style.right = "auto"; node.style.bottom = "auto"; node.style.transform = "none"; } else if (isPill) { node.style.left = "auto"; node.style.top = "auto"; node.style.right = PANEL_MARGIN + "px"; node.style.bottom = PANEL_MARGIN + "px"; node.style.transform = "none"; } else { node.style.left = "50%"; node.style.top = "50%"; node.style.right = "auto"; node.style.bottom = "auto"; node.style.transform = "translate(-50%, -50%)"; } } function panelBounds(node) { const rect = node.getBoundingClientRect(); return { x: Math.max(0, window.innerWidth - rect.width), y: Math.max(0, window.innerHeight - rect.height) }; } function bindDrag(handle) { if (!handle) return; const panel = handle.closest(".iu-panel"); if (!panel) return; let startX = 0; let startY = 0; let originX = 0; let originY = 0; let dragging = false; handle.addEventListener("pointerdown", (event) => { if (event.target.closest("button")) return; dragging = true; const rect = panel.getBoundingClientRect(); originX = rect.left; originY = rect.top; startX = event.clientX; startY = event.clientY; panel.style.left = originX + "px"; panel.style.top = originY + "px"; panel.style.right = "auto"; panel.style.bottom = "auto"; panel.style.transform = "none"; handle.setPointerCapture(event.pointerId); handle.classList.add("iu-dragging"); }); handle.addEventListener("pointermove", (event) => { if (!dragging) return; const max = panelBounds(panel); const x = clamp(originX + (event.clientX - startX), 0, max.x); const y = clamp(originY + (event.clientY - startY), 0, max.y); panel.style.left = x + "px"; panel.style.top = y + "px"; }); const stop = (event) => { if (!dragging) return; dragging = false; handle.releasePointerCapture?.(event.pointerId); handle.classList.remove("iu-dragging"); const rect = panel.getBoundingClientRect(); state.panelPos = { x: rect.left, y: rect.top }; persist(); }; handle.addEventListener("pointerup", stop); handle.addEventListener("pointercancel", stop); } function setMinimized(value) { state.minimized = Boolean(value); persist(); renderShell(); } function pillLabel() { if (state.mode === "scanning") { return t("pillScanning", { current: formatCount(state.progress.current), total: state.progress.total ? formatCount(state.progress.total) : "?" }); } if (state.mode === "unfollowing") { return t("pillUnfollowing", { current: state.progress.current, total: state.progress.total }); } if (state.mode === "results" && state.users.length) { if (state.partial) return t("partialTitle"); return t("pillResults", { count: state.users.filter((u) => u.follows_viewer === false && !state.hidden.has(u.id)).length }); } return t("pillIdle"); } function pillStateClass() { if (state.mode === "scanning" || state.mode === "unfollowing") return "iu-pill-dot--active"; if (state.error) return "iu-pill-dot--error"; return ""; } function renderBody() { const body = document.querySelector(`#${APP_ID} [data-body]`); if (!body) return; if (state.mode === "scanning") { body.innerHTML = renderScanView(); bindScan(body); } else if (state.mode === "results") { body.innerHTML = renderResultsView(); bindResults(body); } else if (state.mode === "unfollowing" || state.mode === "unfollowDone") { body.innerHTML = renderUnfollowView(); bindUnfollow(body); } else { body.innerHTML = renderIdleView(); bindIdle(body); } if (state.mode === "scanning" || state.mode === "unfollowing") startCountdown(); else stopCountdown(); } function renderIdleView() { const checkpoint = state.checkpoint; const resumeActions = checkpoint ? ` <div class="iu-welcome-actions"> <button type="button" class="iu-btn iu-btn--primary iu-btn--lg" data-action="resume-scan">${escapeHTML(t("resumeScan"))}</button> <button type="button" class="iu-btn iu-btn--ghost" data-action="restart-scan">${escapeHTML(t("startOver"))}</button> </div>` : ""; if (state.error) { return ` <div class="iu-welcome"> <div class="iu-welcome-icon iu-welcome-icon--error">${SVG.alert}</div> <h2>${escapeHTML(t("scanFailed"))}</h2> <p>${escapeHTML(state.error)}</p> ${checkpoint ? resumeActions : ` <button type="button" class="iu-btn iu-btn--primary" data-action="scan">${escapeHTML(t("retry"))}</button>`} </div> `; } if (checkpoint) { return ` <div class="iu-welcome"> <div class="iu-welcome-icon">${SVG.sparkle}</div> <h2>${escapeHTML(t("welcomeTitle"))}</h2> <p>${escapeHTML(resumeHintText(checkpoint))}</p> ${checkpoint.stopReason ? `<p>${escapeHTML(checkpoint.stopReason)}</p>` : ""} ${resumeActions} </div> `; } return ` <div class="iu-welcome"> <div class="iu-welcome-icon">${SVG.sparkle}</div> <h2>${escapeHTML(t("welcomeTitle"))}</h2> <p>${escapeHTML(t("welcomeBody"))}</p> <p>${escapeHTML(t("scanNotice"))}</p> <button type="button" class="iu-btn iu-btn--primary iu-btn--lg" data-action="scan">${escapeHTML(t("scanBtn"))}</button> </div> `; } function bindIdle(body) { body.querySelector("[data-action='scan']")?.addEventListener("click", () => startScan()); bindScanResume(body); } function bindScanResume(body) { body.querySelector("[data-action='resume-scan']")?.addEventListener("click", () => startScan({ resume: true })); body.querySelector("[data-action='restart-scan']")?.addEventListener("click", () => { clearCheckpoint(); startScan(); }); } function renderBar(percent, valueText, known) { const now = known ? ` aria-valuenow="${percent}"` : ""; return ` <div class="iu-bar" role="progressbar" aria-labelledby="${PROGRESS_TITLE_ID}" aria-valuemin="0" aria-valuemax="100"${now} aria-valuetext="${escapeAttr(valueText)}" data-bar> <span data-progress-bar style="width:${percent}%"></span> </div>`; } function renderScanView() {
    const { current, total, label, note } = state.progress;
    const percent = total ? Math.min(100, Math.round((current / total) * 100)) : 0;
    const counter = progressCounter(current, total);
    return `
      <div class="iu-progress">
        <div class="iu-scan-card">
          <div class="iu-scan-visual" aria-hidden="true">
            <span class="iu-scan-orbit"></span>
            <svg viewBox="0 0 48 48" width="34" height="34" fill="none">
              <circle cx="18" cy="18" r="7" fill="currentColor" opacity=".95"/>
              <circle cx="30" cy="20" r="6" fill="currentColor" opacity=".72"/>
              <path d="M7 38c0-7 5.2-11 11-11s11 4 11 11" fill="currentColor" opacity=".95"/>
              <path d="M25 38c0-5.8 4.1-9.2 9-9.2 4.3 0 7.7 2.7 8.5 7.2" fill="currentColor" opacity=".62"/>
            </svg>
          </div>
          <h2 id="${PROGRESS_TITLE_ID}" data-progress-label>${escapeHTML(state.scanPaused ? t("paused") : t(label))}</h2>
          <p class="iu-scan-hint">${escapeHTML(t("scanWorkingHint"))}</p>
          <p class="iu-scan-note" data-progress-note>${escapeHTML(note)}</p>

          ${renderBar(percent, counter, Boolean(total))}

          <div class="iu-progress-meta">
            <span data-progress-counter>${escapeHTML(counter)}</span>
            <span data-countdown class="iu-muted"></span>
          </div>
        </div>

        <div class="iu-progress-actions">
          <button type="button" class="iu-btn iu-btn--primary" data-action="pause-scan">${escapeHTML(t(state.scanPaused ? "resume" : "pause"))}</button>
          <button type="button" class="iu-btn iu-btn--ghost" data-action="cancel-scan">${escapeHTML(t("cancel"))}</button>
        </div>
      </div>
    `;
  } function bindScan(body) { body.querySelector("[data-action='pause-scan']")?.addEventListener("click", () => { state.scanPaused = !state.scanPaused; const btn = body.querySelector("[data-action='pause-scan']"); if (btn) btn.textContent = t(state.scanPaused ? "resume" : "pause"); const label = body.querySelector("[data-progress-label]"); if (label) label.textContent = state.scanPaused ? t("paused") : t(state.progress.label); wakeUp(); }); body.querySelector("[data-action='cancel-scan']")?.addEventListener("click", () => { state.scanCancelled = true; state.scanPaused = false; activeRequest?.abort(); wakeUp(); }); } function renderPartialNotice() { const checkpoint = state.checkpoint; if (!state.partial || !checkpoint) return ""; const loaded = formatCount(checkpoint.followerIds.length); const body = checkpoint.followersTotal ? t("partialBody", { loaded, total: formatCount(checkpoint.followersTotal) }) : t("partialBodyUnknown", { loaded }); return ` <div class="iu-notice" role="status"> <strong>${escapeHTML(t("partialTitle"))}</strong> <p>${escapeHTML(body)}</p> ${checkpoint.stopReason ? `<p class="iu-notice-reason">${escapeHTML(checkpoint.stopReason)}</p>` : ""} <div class="iu-notice-actions"> <button type="button" class="iu-btn iu-btn--primary iu-btn--small" data-action="resume-scan">${escapeHTML(t("resumeScan"))}</button> <button type="button" class="iu-btn iu-btn--ghost iu-btn--small" data-action="restart-scan">${escapeHTML(t("startOver"))}</button> </div> </div> `; } function renderResultsView() { if (state.partial) return `<div class="iu-results">${renderPartialNotice()}</div>`; const display = getDisplayUsers(); const totalNonFollowers = state.users.filter((u) => u.follows_viewer === false && !state.hidden.has(u.id)).length; const allSelected = display.length > 0 && display.every((u) => state.selected.has(u.id)); let summary; if (totalNonFollowers === 0) summary = t("foundNone"); else if (totalNonFollowers === 1) summary = t("foundOne"); else summary = t("foundCount", { count: totalNonFollowers }); return ` <div class="iu-results"> ${renderPartialNotice()} ${state.coverage ? `<div class="iu-notice" role="status"><p>${escapeHTML(state.coverage)}</p></div>` : ""} <div class="iu-results-summary">${escapeHTML(summary)}</div> <div class="iu-search-row"> <input class="iu-search" type="search" data-search placeholder="${escapeAttr(t("search"))}" value="${escapeAttr(state.search)}" autocomplete="off" spellcheck="false" > </div> <div class="iu-filters"> ${filterChip("verified", t("filterVerified"))} ${filterChip("private", t("filterPrivate"))} ${filterChip("noAvatar", t("filterNoAvatar"))} ${filterChip("showHidden", t("filterShowHidden"), state.hidden.size > 0 || state.filters.showHidden)} </div> <div class="iu-list" data-list>${renderUserList(display)}</div> <div class="iu-actionbar"> <div class="iu-actionbar-left"> <button type="button" class="iu-btn iu-btn--small" data-action="select-all" ${display.length ? "" : "disabled"}> ${escapeHTML(allSelected ? t("selectNone") : t("selectAll"))} </button> <span class="iu-muted" data-selected-label>${escapeHTML(t("selectedCount", { count: state.selected.size }))}</span> </div> <div class="iu-actionbar-right"> <button type="button" class="iu-btn iu-btn--small" data-action="copy" ${display.length ? "" : "disabled"}>${escapeHTML(state.selected.size ? t("copy") : t("copyAll"))}</button> <button type="button" class="iu-btn iu-btn--danger iu-btn--small" data-action="unfollow" ${state.selected.size ? "" : "disabled"}>${escapeHTML(t("unfollow"))}${state.selected.size ? " (" + state.selected.size + ")" : ""}</button> </div> </div> </div> `; } function filterChip(key, label, visible = true) { if (!visible && key === "showHidden") return ""; const active = state.filters[key]; return ` <button type="button" class="iu-chip ${active ? "iu-chip--on" : ""}" data-filter="${escapeAttr(key)}" aria-pressed="${active ? "true" : "false"}"> <span class="iu-chip-tick">${active ? SVG.check : ""}</span> ${escapeHTML(label)} </button> `; } function renderUserList(display) { if (!display.length) { return `<div class="iu-list-empty">${escapeHTML(t("noMatches"))}</div>`; } return display.map(renderUserRow).join(""); } function renderUserRow(user) { const hidden = state.hidden.has(user.id); const checked = state.selected.has(user.id); const tags = []; if (user.is_verified) tags.push(`<span class="iu-tag iu-tag--blue">${escapeHTML(t("filterVerified"))}</span>`); if (user.is_private) tags.push(`<span class="iu-tag">${escapeHTML(t("filterPrivate"))}</span>`); return ` <div class="iu-row ${hidden ? "iu-row--hidden" : ""} ${checked ? "iu-row--selected" : ""}" data-row="${escapeAttr(user.id)}" role="button" tabindex="0"> <input type="checkbox" class="iu-row-check" data-select="${escapeAttr(user.id)}" ${checked ? "checked" : ""} aria-label="${escapeAttr(user.username)}"> <img class="iu-avatar" src="${escapeAttr(user.profile_pic_url || "")}" alt="" loading="lazy" onerror="this.style.visibility='hidden'"> <div class="iu-row-text"> <div class="iu-row-name"> <a href="/${encodeURIComponent(user.username)}/" target="_blank" rel="noopener noreferrer" data-stop>@${escapeHTML(user.username)}</a> ${tags.join(" ")} </div> <div class="iu-row-sub">${escapeHTML(user.full_name || "")}</div> </div> <div class="iu-row-actions"> <a class="iu-icon-btn" href="/${encodeURIComponent(user.username)}/" target="_blank" rel="noopener noreferrer" data-stop title="${escapeAttr(t("openProfile"))}" aria-label="${escapeAttr(t("openProfile"))}">${SVG.open}</a> <button type="button" class="iu-icon-btn iu-text-btn" data-hide="${escapeAttr(user.id)}" data-stop title="${escapeAttr(hidden ? t("unhideTooltip") : t("hideTooltip"))}">${escapeHTML(hidden ? t("unhide") : t("hide"))}</button> </div> </div> `; } function bindResults(body) { const search = body.querySelector("[data-search]"); if (search) { search.addEventListener("input", (event) => { state.search = event.target.value; const list = body.querySelector("[data-list]"); if (list) list.innerHTML = renderUserList(getDisplayUsers()); updateActionBar(body); }); } body.querySelectorAll("[data-filter]").forEach((el) => { el.addEventListener("click", () => { const key = el.getAttribute("data-filter"); state.filters[key] = !state.filters[key]; pruneSelectionToDisplayed(); persist(); renderBody(); }); }); body.addEventListener("change", (event) => { const checkbox = event.target.closest("[data-select]"); if (!checkbox) return; const id = checkbox.getAttribute("data-select"); if (checkbox.checked) state.selected.add(id); else state.selected.delete(id); const row = checkbox.closest("[data-row]"); if (row) row.classList.toggle("iu-row--selected", checkbox.checked); updateActionBar(body); }); body.addEventListener("click", (event) => { const hideBtn = event.target.closest("[data-hide]"); if (hideBtn) { event.preventDefault(); event.stopPropagation(); const id = hideBtn.getAttribute("data-hide"); if (state.hidden.has(id)) state.hidden.delete(id); else { state.hidden.add(id); state.selected.delete(id); } persist(); renderBody(); return; } if (event.target.closest("[data-stop]")) { event.stopPropagation(); return; } const row = event.target.closest("[data-row]"); if (!row || event.target.closest(".iu-row-check")) return; const id = row.getAttribute("data-row"); const checkbox = row.querySelector("[data-select]"); if (!checkbox) return; if (state.selected.has(id)) { state.selected.delete(id); checkbox.checked = false; } else { state.selected.add(id); checkbox.checked = true; } row.classList.toggle("iu-row--selected", checkbox.checked); updateActionBar(body); }); body.addEventListener("keydown", (event) => { if (event.key !== " " && event.key !== "Enter") return; const row = event.target.closest("[data-row]"); if (!row || event.target.tagName === "INPUT" || event.target.tagName === "A" || event.target.tagName === "BUTTON") return; event.preventDefault(); row.click(); }); body.querySelector("[data-action='select-all']")?.addEventListener("click", () => { const display = getDisplayUsers(); const allSelected = display.length && display.every((u) => state.selected.has(u.id)); if (allSelected) display.forEach((u) => state.selected.delete(u.id)); else display.forEach((u) => state.selected.add(u.id)); renderBody(); }); body.querySelector("[data-action='copy']")?.addEventListener("click", copyUsernames); body.querySelector("[data-action='unfollow']")?.addEventListener("click", confirmUnfollow); bindScanResume(body); } function updateActionBar(body) { const root = body || document.querySelector(`#${APP_ID} [data-body]`); if (!root) return; const display = getDisplayUsers(); const allSelected = display.length > 0 && display.every((u) => state.selected.has(u.id)); const selectAllBtn = root.querySelector("[data-action='select-all']"); if (selectAllBtn) { selectAllBtn.disabled = display.length === 0; selectAllBtn.textContent = allSelected ? t("selectNone") : t("selectAll"); } const copyBtn = root.querySelector("[data-action='copy']"); if (copyBtn) copyBtn.disabled = display.length === 0; updateSelectedLabel(root); } function updateSelectedLabel(body) { const root = body || document.querySelector(`#${APP_ID} [data-body]`); if (!root) return; const label = root.querySelector("[data-selected-label]"); if (label) label.textContent = t("selectedCount", { count: state.selected.size }); const unfollowBtn = root.querySelector("[data-action='unfollow']"); if (unfollowBtn) { unfollowBtn.disabled = state.selected.size === 0; unfollowBtn.textContent = t("unfollow") + (state.selected.size ? " (" + state.selected.size + ")" : ""); } const copyBtn = root.querySelector("[data-action='copy']"); if (copyBtn) copyBtn.textContent = state.selected.size ? t("copy") : t("copyAll"); } function renderUnfollowView() { const total = state.progress.total; const done = state.progress.current; const percent = total ? Math.round((done / total) * 100) : 0; const last = state.log[state.log.length - 1]; const summary = unfollowSummary(); return ` <div class="iu-progress"> <div class="iu-progress-head"> <h2 id="${PROGRESS_TITLE_ID}" data-progress-label>${escapeHTML(unfollowTitle())}</h2> <p data-progress-note>${escapeHTML(state.progress.note || "")}</p> </div> ${renderBar(percent, summary, Boolean(total))} <div class="iu-progress-meta"> <span data-progress-counter>${escapeHTML(summary)}</span> <span data-countdown class="iu-muted"></span> </div> <div class="iu-current" data-current ${last ? "" : "hidden"}> <span class="iu-muted">${escapeHTML(t("currently"))}</span> <strong data-current-user>${last ? "@" + escapeHTML(last.user.username) : ""}</strong> <span class="iu-tag ${last && !last.ok ? "iu-tag--red" : "iu-tag--green"}" data-current-tag title="${escapeAttr(last?.reason || "")}">${last && !last.ok ? "✕" : "✓"}</span> </div> ${state.unfollowBlocked ? ` <div class="iu-blocked">${escapeHTML(t("unfollowBlocked", { count: state.unfollowBlocked }))}</div>` : ""} <div class="iu-progress-actions"> ${state.mode === "unfollowing" ? ` <button type="button" class="iu-btn" data-action="pause-unfollow">${escapeHTML(t(state.unfollowPaused ? "resume" : "pause"))}</button> <button type="button" class="iu-btn iu-btn--ghost" data-action="cancel-unfollow">${escapeHTML(t("cancel"))}</button> ` : ` <button type="button" class="iu-btn iu-btn--primary" data-action="back-results">${escapeHTML(t("goBack"))}</button> `} </div> </div> `; } function unfollowTitle() { if (state.mode === "unfollowDone") return t("unfollowDoneTitle"); return state.unfollowPaused ? t("paused") : t("unfollowing"); } function unfollowSummary() { if (state.mode === "unfollowDone") { return t("unfollowDoneBody", { ok: state.log.filter((e) => e.ok).length, fail: state.log.filter((e) => !e.ok).length }); } return t("ofTotal", { current: state.progress.current, total: state.progress.total }); } function bindUnfollow(body) { body.querySelector("[data-action='pause-unfollow']")?.addEventListener("click", () => { state.unfollowPaused = !state.unfollowPaused; const btn = body.querySelector("[data-action='pause-unfollow']"); if (btn) btn.textContent = t(state.unfollowPaused ? "resume" : "pause"); const label = body.querySelector("[data-progress-label]"); if (label) label.textContent = unfollowTitle(); wakeUp(); }); body.querySelector("[data-action='cancel-unfollow']")?.addEventListener("click", () => { state.unfollowCancelled = true; state.unfollowPaused = false; wakeUp(); }); body.querySelector("[data-action='back-results']")?.addEventListener("click", () => { state.mode = "results"; state.log = []; state.unfollowCancelled = false; renderBody(); }); } async function startScan(options = {}) { if (destroyed || state.mode === "scanning" || state.mode === "unfollowing") return; state.error = ""; state.mode = "scanning"; state.scanPaused = false; state.scanCancelled = false; state.unfollowCancelled = false; state.partial = false; state.coverage = ""; state.users = []; state.followingCount = 0; state.followersCount = 0; state.selected.clear(); state.log = []; state.progress = { current: 0, total: 0, label: "loadingFollowing", note: visibilityNote() }; renderBody(); let checkpoint = null; try { const viewerId = getCookie("ds_user_id"); if (!viewerId) throw new Error(t("cookieMissing")); const previous = options.resume ? state.checkpoint : null; checkpoint = previous && previous.viewerId === String(viewerId) ? previous : createCheckpoint(viewerId); checkpoint.stopReason = ""; state.checkpoint = checkpoint; if (!checkpoint.followingDone) { const following = await scanList(checkpoint, viewerId, "following"); if (state.scanCancelled || destroyed) return resetToIdle(); checkpoint.following = following; checkpoint.followingCursor = ""; checkpoint.followingDone = true; saveCheckpoint(checkpoint); } if (state.scanCancelled || destroyed) return resetToIdle(); if (!checkpoint.followersDone) { const followers = await scanList(checkpoint, viewerId, "followers"); if (state.scanCancelled || destroyed) return resetToIdle(); checkpoint.followerIds = followers.map((user) => user.id); checkpoint.followersCursor = ""; checkpoint.followersDone = true; } showResults(checkpoint, true); clearCheckpoint(); } catch (error) { if (destroyed) return; if (state.scanCancelled) return resetToIdle(); console.error("[iu] scan failed:", error); const message = error?.message || String(error) || t("scanFailed"); if (checkpoint) { checkpoint.stopReason = message; saveCheckpoint(checkpoint); } if (checkpoint && checkpoint.followingDone && checkpoint.following.length) { showResults(checkpoint, false); return; } state.error = message; state.mode = "idle"; renderBody(); } } function showResults(checkpoint, complete) { state.followingCount = checkpoint.following.length; state.followersCount = checkpoint.followerIds.length; state.users = addFollowBackStatus(checkpoint.following, checkpoint.followerIds, complete); state.coverage = ""; state.partial = !complete; state.mode = "results"; if (complete) { const nonFollowers = state.users.filter((u) => !u.follows_viewer && !state.hidden.has(u.id)).length; toast(t("scanCompletedToast", { count: nonFollowers })); } renderBody(); } function resetToIdle() { if (destroyed) return; state.mode = "idle"; state.users = []; state.scanCancelled = false; state.error = ""; renderBody(); } async function scanList(checkpoint, viewerId, kind) { const isFollowing = kind === "following"; const cursorKey = isFollowing ? "followingCursor" : "followersCursor"; const total = isFollowing ? checkpoint.followingTotal : checkpoint.followersTotal; const label = isFollowing ? "loadingFollowing" : "loadingFollowers"; const seed = isFollowing ? checkpoint.following : checkpoint.followerIds.map((id) => ({ id })); const onPage = (results, nextCursor) => { if (isFollowing) checkpoint.following = results; else checkpoint.followerIds = results.map((user) => user.id); checkpoint[cursorKey] = nextCursor; saveCheckpoint(checkpoint); state.progress = { current: results.length, total, label, note: visibilityNote() }; updateProgressDOM(); }; state.progress = { current: seed.length, total, label, note: visibilityNote() }; updateProgressDOM(); try { return await fetchFriendshipList(viewerId, kind, onPage, { cursor: checkpoint[cursorKey], seed, total }); } catch (error) { if (error?.kind !== "http" || error?.status !== 400 || !checkpoint[cursorKey]) throw error; console.warn(`[iu] stored ${kind} cursor was rejected, restarting that list`); checkpoint[cursorKey] = ""; if (isFollowing) checkpoint.following = []; else checkpoint.followerIds = []; return fetchFriendshipList(viewerId, kind, onPage, { total }); } } async function fetchFriendshipList(viewerId, kind, onPage, options = {}) { const results = Array.isArray(options.seed) ? [...options.seed] : []; let cursor = options.cursor || ""; let page = 0; const seenCursors = new Set(cursor ? [cursor] : []); while (true) { if (state.scanPaused) await waitWhile(() => state.scanPaused && !state.scanCancelled); if (state.scanCancelled) return dedupe(results); const json = await igFetch(friendshipListUrl(viewerId, kind, cursor, state.timings.usersPerRequest)); if (state.scanCancelled || destroyed) return dedupe(results); if (!Array.isArray(json?.users)) throw new Error(t("scanFailed")); if (json.should_limit_list_of_followers === true || json.should_limit_list_of_followings === true) { throw scanError("incomplete", t("limitedList")); } const users = json.users.map(normalizeUser).filter((u) => u.id && u.username); results.push(...users); const nextCursor = json.next_max_id == null ? "" : String(json.next_max_id); const finished = json.has_more === false || !nextCursor; if (finished && json.has_more === true && !nextCursor) throw new Error(t("scanFailed")); if (!finished && seenCursors.has(nextCursor)) throw new Error(t("scanFailed")); onPage(dedupe(results), finished ? "" : nextCursor); if (finished) break; seenCursors.add(nextCursor); cursor = nextCursor; page += 1; await waitBeforeNextScanPage(page); } return dedupe(results); } async function waitBeforeNextScanPage(page) { await sleepWithCountdown(randomBetween(SCAN_MICRO_DELAY_MIN, SCAN_MICRO_DELAY_MAX), "scanPause"); await sleepWithCountdown(randomBetween(state.timings.scanDelayMin, state.timings.scanDelayMax), "scanPause"); if (state.timings.scanPauseEveryPages > 0 && page % state.timings.scanPauseEveryPages === 0) { await sleepWithCountdown(Math.max( 0, state.timings.scanPauseMs + (Math.random() * SCAN_PAUSE_JITTER_MS * 2 - SCAN_PAUSE_JITTER_MS) ), "scanPause"); } } function friendshipListUrl(viewerId, kind, cursor = "", count = DEFAULT_TIMINGS.usersPerRequest) { if (kind !== "following" && kind !== "followers") throw new Error("Unknown friendship list"); const safeCount = Math.min(200, Math.max(1, Math.round(Number(count) || DEFAULT_TIMINGS.usersPerRequest))); const base = `/api/v1/friendships/${encodeURIComponent(viewerId)}/${kind}/?count=${safeCount}`; return cursor ? `${base}&max_id=${encodeURIComponent(cursor)}` : base; } function addFollowBackStatus(following, followers, complete = true) { const followerIds = new Set(followers.map((entry) => String(entry && typeof entry === "object" ? entry.id : entry))); return following.map((user) => ({ ...user, follows_viewer: followerIds.has(String(user.id)) ? true : (complete ? false : null) })); } function scanError(kind, message, status) { const error = new Error(message); error.kind = kind; error.status = status; return error; } async function igFetch(url, init = {}) { let attempt = 0; while (true) { if (destroyed || state.scanCancelled) throw scanError("cancelled", "Scan cancelled"); let response; const controller = new AbortController(); activeRequest = controller; try { response = await fetch(url, { ...init, credentials: "include", headers: { ...IG_HEADERS, ...(init.headers || {}) }, signal: controller.signal }); } catch (error) { if (destroyed || state.scanCancelled) throw scanError("cancelled", "Scan cancelled"); if (attempt >= MAX_RETRIES) throw scanError("network", t("networkError"), 0); await sleepWithCountdown(Math.min(30000, 3000 * Math.pow(2, attempt)), "cooldownIn"); attempt += 1; continue; } finally { if (activeRequest === controller) activeRequest = null; } if (destroyed || state.scanCancelled) throw scanError("cancelled", "Scan cancelled"); const body = await response.text(); let json; try { json = JSON.parse(body); } catch {   } const message = json ? String(json.message || json.error_type || "") : body; if (response.status === 401 || json?.require_login || /login_required/i.test(message)) { throw scanError("session", t("sessionExpired"), response.status); } if (response.status === 429 || /rate_limit|too many requests|please wait a few minutes/i.test(message)) { throw scanError("rate", t("tooManyRequests"), response.status); } if (response.status === 403 || json?.spam || json?.challenge || json?.checkpoint_url || json?.feedback_required || /feedback_required|checkpoint_required|challenge_required/i.test(message)) { throw scanError("blocked", t("scanBlocked"), response.status); } if (response.status >= 500 && response.status < 600) { if (attempt >= MAX_RETRIES) { throw scanError("http", t("requestFailed", { status: response.status }), response.status); } const retryAfter = parseRetryAfter(response.headers?.get?.("retry-after")); const wait = retryAfter || Math.min(60000, 5000 * Math.pow(2, attempt)); await sleepWithCountdown(wait, "cooldownIn"); attempt += 1; continue; } if (response.ok) { if (!json || typeof json !== "object") throw scanError("session", t("sessionExpired"), response.status); if (json.status && json.status !== "ok") throw scanError("http", t("scanFailed"), response.status); return json; } throw scanError("http", t("requestFailed", { status: response.status }), response.status); } } function parseRetryAfter(value) { if (!value) return 0; const seconds = Number(value); if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000); const date = Date.parse(value); if (!Number.isNaN(date)) return Math.max(0, date - Date.now()); return 0; } function evaluateUnfollowResponse(status, bodyText) { const text = typeof bodyText === "string" ? bodyText : ""; let payload = null; try { payload = JSON.parse(text); } catch { payload = null; } const message = String(payload?.message || ""); const blockedByPayload = payload?.feedback_required === true || payload?.spam === true || payload?.require_login === true || /feedback_required|checkpoint_required|challenge_required|login_required/i.test(message); if (status === 401 || status === 403 || status === 429 || blockedByPayload) { return { ok: false, blocked: true, reason: message || `HTTP ${status}` }; } if (status >= 500) { return { ok: false, blocked: false, reason: `HTTP ${status}` }; } if (status < 200 || status >= 300) { return { ok: false, blocked: false, reason: message || `HTTP ${status}` }; } if (payload === null) { return { ok: false, blocked: false, reason: "unexpected response" }; } if (payload.status === "ok" || payload.friendship_status !== undefined) { return { ok: true, blocked: false, reason: "" }; } return { ok: false, blocked: false, reason: message || String(payload.status || "unfollow rejected") }; } function confirmUnfollow() { if (destroyed || state.partial || !state.selected.size) return; const count = state.selected.size; showDialog({ title: t("unfollowConfirmTitle", { count }), body: t("unfollowConfirmBody"), confirmLabel: t("unfollowConfirmBtn", { count }), destructive: true, onConfirm: () => startUnfollow() }); } async function startUnfollow() { if (destroyed || state.partial || state.mode === "scanning" || state.mode === "unfollowing") return; const targets = state.users.filter((u) => u.follows_viewer === false && state.selected.has(u.id)); if (!targets.length) return; const csrf = getCookie("csrftoken"); if (!csrf) { toast(t("csrfMissing")); return; } state.mode = "unfollowing"; state.unfollowPaused = false; state.unfollowCancelled = false; state.unfollowBlocked = 0; state.log = []; state.progress = { current: 0, total: targets.length, label: "unfollowing", note: "" }; renderBody(); let processed = 0; for (let i = 0; i < targets.length; i += 1) { await waitWhile(() => state.unfollowPaused && !state.unfollowCancelled); if (state.unfollowCancelled) break; const user = targets[i]; let outcome = { ok: false, blocked: false, reason: "" }; try { outcome = await unfollowUser(user.id, csrf); } catch (error) { console.error("[iu] unfollow failed for", user.username, error); outcome = { ok: false, blocked: false, reason: error?.message || "" }; } if (destroyed) return; state.log.push({ user, ok: outcome.ok, reason: outcome.reason }); if (outcome.ok) { state.selected.delete(user.id); const userRef = state.users.find((u) => u.id === user.id); if (userRef) userRef.unfollowed = true; } processed += 1; state.progress = { current: processed, total: targets.length, label: "unfollowing", note: outcome.ok ? "" : outcome.reason }; updateUnfollowDOM(); if (outcome.blocked) { state.unfollowBlocked = targets.length - processed; console.warn("[iu] Instagram blocked the unfollow action:", outcome.reason); break; } const isLast = i === targets.length - 1; if (!isLast) { await sleepWithCountdown(randomBetween(state.timings.unfollowDelayMin, state.timings.unfollowDelayMax), "nextActionIn"); if (state.timings.unfollowPauseEvery > 0 && (i + 1) % state.timings.unfollowPauseEvery === 0) { await sleepWithCountdown(state.timings.unfollowPauseMs, "cooldownIn"); } } } state.users = state.users.filter((u) => !u.unfollowed); state.mode = "unfollowDone"; state.waitUntil = 0; state.waitReason = ""; renderBody(); } async function unfollowUser(id, csrf) { const formHeaders = { "content-type": "application/x-www-form-urlencoded", "x-csrftoken": csrf }; const attempts = [ { url: `/api/v1/friendships/destroy/${id}/`, headers: { ...IG_HEADERS, ...formHeaders } }, { url: `/web/friendships/${id}/unfollow/`, headers: formHeaders } ]; let outcome = { ok: false, blocked: false, reason: "" }; for (let i = 0; i < attempts.length; i += 1) { if (i > 0) await sleep(randomBetween(1200, 2500)); if (destroyed || state.unfollowCancelled) return { ok: false, blocked: true, reason: "Cancelled" }; let response; try { response = await fetch(attempts[i].url, { method: "POST", credentials: "include", headers: attempts[i].headers }); } catch (error) { outcome = { ok: false, blocked: false, reason: error?.message || "network error" }; continue; } const text = await response.text().catch(() => ""); outcome = evaluateUnfollowResponse(response.status, text); if (outcome.ok || outcome.blocked) return outcome; } return outcome; } async function copyUsernames() { const display = getDisplayUsers(); const target = state.selected.size ? display.filter((u) => state.selected.has(u.id)) : display; if (!target.length) return; const text = target.map((u) => u.username).sort().join("\n"); try { await navigator.clipboard.writeText(text); toast(t("copiedToast", { count: target.length })); } catch (error) { console.error("[iu] copy failed:", error); const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); toast(t("copiedToast", { count: target.length })); } catch {   } ta.remove(); } } function showSettings() { const fields = [ ["scanDelayMin", "minScanDelay", 100, 0], ["scanDelayMax", "maxScanDelay", 100, 0], ["scanPauseEveryPages", "scanPauseEvery", 1, 0], ["scanPauseMs", "scanPauseLength", 1000, 0], ["usersPerRequest", "usersPerRequest", 1, 1, 200], ["unfollowDelayMin", "minUnfollowDelay", 1000, 0], ["unfollowDelayMax", "maxUnfollowDelay", 1000, 0], ["unfollowPauseEvery", "unfollowPauseEvery", 1, 0], ["unfollowPauseMs", "unfollowPauseLength", 1000, 0] ]; const formHTML = fields.map(([key, label, step, min, max]) => ` <label class="iu-field"> <span>${escapeHTML(t(label))}</span> <input type="number" min="${min}"${max ? ` max="${max}"` : ""} step="${step}" data-setting="${escapeAttr(key)}" value="${Number(state.timings[key])}"> </label> `).join(""); showDialog({ title: t("settingsTitle"), body: t("settingsBody"), contentHTML: `<div class="iu-form">${formHTML}</div>`, confirmLabel: t("save"), extraButton: { label: t("restoreDefaults"), action: "restore" }, onConfirm: (dialog) => { dialog.querySelectorAll("[data-setting]").forEach((input) => { const key = input.getAttribute("data-setting"); const val = Number(input.value); const min = Number(input.min || 0); const max = input.max ? Number(input.max) : Infinity; if (Number.isFinite(val) && val >= min && val <= max) state.timings[key] = val; }); persist(); toast(t("saved")); }, onExtra: (dialog) => { Object.assign(state.timings, DEFAULT_TIMINGS); dialog.querySelectorAll("[data-setting]").forEach((input) => { const key = input.getAttribute("data-setting"); input.value = state.timings[key]; }); } }); } function showDialog({ title, body, contentHTML, confirmLabel, destructive, extraButton, onConfirm, onExtra }) { dialogCounter += 1; const titleId = `${APP_ID}-dialog-title-${dialogCounter}`; const previouslyFocused = document.activeElement; const overlay = document.createElement("div"); overlay.className = "iu-overlay"; overlay.innerHTML = ` <div class="iu-dialog" role="dialog" aria-modal="true" aria-labelledby="${titleId}" tabindex="-1"> <h3 id="${titleId}">${escapeHTML(title)}</h3> ${body ? `<p>${escapeHTML(body)}</p>` : ""} ${contentHTML || ""} <div class="iu-dialog-actions"> ${extraButton ? `<button type="button" class="iu-btn iu-btn--ghost iu-btn--small" data-extra>${escapeHTML(extraButton.label)}</button>` : ""} <button type="button" class="iu-btn iu-btn--small" data-cancel>${escapeHTML(t("cancel"))}</button> <button type="button" class="iu-btn iu-btn--small ${destructive ? "iu-btn--danger" : "iu-btn--primary"}" data-confirm>${escapeHTML(confirmLabel)}</button> </div> </div> `; document.getElementById(APP_ID).appendChild(overlay); const dialog = overlay.querySelector(".iu-dialog"); const close = () => { document.removeEventListener("keydown", onKeyDown, true); if (closeActiveDialog === close) closeActiveDialog = null; overlay.remove(); if (previouslyFocused && document.contains(previouslyFocused)) previouslyFocused.focus(); }; const focusables = () => Array.from( dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ).filter((el) => !el.disabled && el.getClientRects().length > 0); function onKeyDown(event) { if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); return; } if (event.key !== "Tab") return; const items = focusables(); if (!items.length) return; const first = items[0]; const last = items[items.length - 1]; if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } document.addEventListener("keydown", onKeyDown, true); closeActiveDialog = close; overlay.addEventListener("click", (event) => { if (event.target === overlay) close(); }); overlay.querySelector("[data-cancel]").addEventListener("click", close); overlay.querySelector("[data-confirm]").addEventListener("click", () => { try { onConfirm?.(dialog); } finally { close(); } }); if (extraButton && onExtra) { overlay.querySelector("[data-extra]").addEventListener("click", () => onExtra(dialog)); } (dialog.querySelector("input") || (destructive ? dialog.querySelector("[data-cancel]") : dialog)).focus(); } function toggleLanguage() { state.language = state.language === "tr" ? "en" : "tr"; persist(); renderShell(); } function getDisplayUsers() { const query = state.search.trim().toLowerCase(); return state.users .filter((u) => u.follows_viewer === false) .filter((u) => state.filters.showHidden ? state.hidden.has(u.id) : !state.hidden.has(u.id)) .filter((u) => state.filters.verified || !u.is_verified) .filter((u) => state.filters.private || !u.is_private) .filter((u) => state.filters.noAvatar || !isDefaultAvatar(u)) .filter((u) => !query || (u.username + " " + (u.full_name || "")).toLowerCase().includes(query)) .sort((a, b) => a.username.localeCompare(b.username)); } function pruneSelectionToDisplayed() { if (!state.selected.size) return; const visible = new Set(getDisplayUsers().map((u) => u.id)); state.selected.forEach((id) => { if (!visible.has(id)) state.selected.delete(id); }); } function normalizeUser(raw) { return { id: String(raw.id || raw.pk || raw.pk_id || ""), username: String(raw.username || ""), full_name: String(raw.full_name || ""), profile_pic_url: String(raw.profile_pic_url || raw.profile_pic_url_hd || ""), is_verified: Boolean(raw.is_verified), is_private: Boolean(raw.is_private), follows_viewer: Boolean(raw.follows_viewer ?? raw.friendship_status?.followed_by ?? raw.followed_by) }; } function dedupe(list) { const seen = new Set(); return list.filter((u) => { if (!u.id || seen.has(u.id)) return false; seen.add(u.id); return true; }); } function isDefaultAvatar(user) { const url = user.profile_pic_url || ""; return /44884218_345707102882519|464760996_1254146839119862/.test(url); } function getCookie(name) { const match = document.cookie.match(new RegExp("(^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)")); return match ? decodeURIComponent(match[2]) : null; } function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms))); } function interruptibleSleep(ms) { return new Promise((resolve) => { let timer = null; let settled = false; const finish = (expired) => { if (settled) return; settled = true; if (timer) clearTimeout(timer); if (wakeSleep === finish) wakeSleep = null; resolve(expired); }; wakeSleep = finish; timer = setTimeout(() => finish(true), Math.max(0, ms)); }); } function wakeUp() { if (typeof wakeSleep === "function") wakeSleep(false); } function visibilityNote() { return typeof document !== "undefined" && document.hidden ? t("keepTabVisible") : ""; } function onVisibilityChange() { if (state.mode !== "scanning") return; state.progress.note = visibilityNote(); updateProgressDOM(); } function randomBetween(min, max) { const lo = Math.min(min, max); const hi = Math.max(min, max); return Math.floor(Math.random() * (hi - lo)) + lo; } async function waitWhile(predicate, interval = 1000) { while (predicate()) await interruptibleSleep(interval); } async function sleepWithCountdown(ms, reasonKey) { state.waitReason = reasonKey; let remaining = Math.max(0, ms); while (remaining > 0) { if (state.scanCancelled || state.unfollowCancelled) break; if (state.scanPaused || state.unfollowPaused) { state.waitUntil = 0; updateCountdownDOM(); await waitWhile(() => (state.scanPaused || state.unfollowPaused) && !state.scanCancelled && !state.unfollowCancelled); continue; } state.waitUntil = Date.now() + remaining; updateCountdownDOM(); const before = Date.now(); const expired = await interruptibleSleep(remaining); remaining = expired ? 0 : Math.max(0, remaining - (Date.now() - before)); } state.waitUntil = 0; state.waitReason = ""; updateCountdownDOM(); } function startCountdown() { if (countdownTimer) return; countdownTimer = setInterval(updateCountdownDOM, 500); } function stopCountdown() { if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; } } function updateCountdownDOM() { const node = document.querySelector(`#${APP_ID} [data-countdown]`); if (!node) return; if (!state.waitUntil) { node.textContent = ""; return; } const remaining = Math.max(0, Math.ceil((state.waitUntil - Date.now()) / 1000)); const reason = state.waitReason || "nextActionIn"; node.textContent = t(reason, { seconds: remaining }); } function progressCounter(current, total) { if (total) return t("ofTotal", { current: formatCount(current), total: formatCount(total) }); return t("ofUnknown", { current: formatCount(current) }); } function setBar(root, percent, valueText, known) { const bar = root.querySelector("[data-progress-bar]"); if (bar) bar.style.width = percent + "%"; const box = root.querySelector("[data-bar]"); if (!box) return; if (known) box.setAttribute("aria-valuenow", String(percent)); else box.removeAttribute("aria-valuenow"); box.setAttribute("aria-valuetext", valueText); } function updatePillDOM() { if (!state.minimized) return; const pillLabelEl = document.querySelector(`#${APP_ID} [data-pill-label]`); if (pillLabelEl) pillLabelEl.textContent = pillLabel(); } function updateProgressDOM() { const root = document.querySelector(`#${APP_ID} [data-body]`); if (!root) return; const { current, total, label, note } = state.progress; const percent = total ? Math.min(100, Math.round((current / total) * 100)) : 0; const counter = progressCounter(current, total); setBar(root, percent, counter, Boolean(total)); const counterEl = root.querySelector("[data-progress-counter]"); if (counterEl) counterEl.textContent = counter; const labelEl = root.querySelector("[data-progress-label]"); if (labelEl) labelEl.textContent = state.scanPaused ? t("paused") : t(label); const noteEl = root.querySelector("[data-progress-note]"); if (noteEl) noteEl.textContent = note || ""; updatePillDOM(); } function updateUnfollowDOM() { const root = document.querySelector(`#${APP_ID} [data-body]`); if (!root) return; const { current, total, note } = state.progress; const percent = total ? Math.min(100, Math.round((current / total) * 100)) : 0; const summary = unfollowSummary(); setBar(root, percent, summary, Boolean(total)); const counterEl = root.querySelector("[data-progress-counter]"); if (counterEl) counterEl.textContent = summary; const labelEl = root.querySelector("[data-progress-label]"); if (labelEl) labelEl.textContent = unfollowTitle(); const noteEl = root.querySelector("[data-progress-note]"); if (noteEl) noteEl.textContent = note || ""; const last = state.log[state.log.length - 1]; const currentEl = root.querySelector("[data-current]"); if (currentEl) { currentEl.hidden = !last; if (last) { const userEl = currentEl.querySelector("[data-current-user]"); if (userEl) userEl.textContent = "@" + last.user.username; const tagEl = currentEl.querySelector("[data-current-tag]"); if (tagEl) { tagEl.textContent = last.ok ? "✓" : "✕"; tagEl.title = last.reason || ""; tagEl.classList.toggle("iu-tag--green", last.ok); tagEl.classList.toggle("iu-tag--red", !last.ok); } } } updatePillDOM(); } function toast(message) { const root = document.getElementById(APP_ID); if (!root) return; root.querySelector(".iu-toast")?.remove(); if (toastTimer) { clearTimeout(toastTimer); toastTimer = null; } const node = document.createElement("div"); node.className = "iu-toast"; node.setAttribute("role", "status"); node.setAttribute("aria-live", "polite"); node.textContent = message; root.appendChild(node); toastTimer = setTimeout(() => { node.remove(); toastTimer = null; }, 3500); } function clamp(value, min, max) { return Math.min(Math.max(value, min), max); } function escapeHTML(value) { return String(value ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])); } function escapeAttr(value) { return escapeHTML(value); } const CSS = ` #${APP_ID}, #${APP_ID} * {
  box-sizing: border-box;
}

#${APP_ID} {
  --iu-bg: rgba(18, 12, 31, .97);
  --iu-bg-2: rgba(255,255,255,.05);
  --iu-bg-3: rgba(255,255,255,.085);
  --iu-line: rgba(201, 168, 255, .16);
  --iu-line-strong: rgba(211, 184, 255, .28);
  --iu-text: #f8f5ff;
  --iu-muted: #b4aacb;
  --iu-muted-2: #8f84aa;
  --iu-accent: #b66cff;
  --iu-accent-2: #8a5cff;
  --iu-accent-3: #e395ff;
  --iu-success: #51ddb1;
  --iu-danger: #ff82a6;
  --iu-gradient: linear-gradient(135deg, #d68aff 0%, #a568ff 48%, #7f5dff 100%);
  --iu-gradient-soft: linear-gradient(135deg, rgba(214,138,255,.17), rgba(165,104,255,.11), rgba(127,93,255,.08));

  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483647;
  color: var(--iu-text);
  color-scheme: dark;
  font: 14px/1.45 Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

#${APP_ID} > * { pointer-events: auto; }
#${APP_ID} button, #${APP_ID} input, #${APP_ID} a { font: inherit; color: inherit; }
#${APP_ID} button { cursor: pointer; }
#${APP_ID} a { text-decoration: none; }
#${APP_ID} [hidden] { display: none !important; }

#${APP_ID} :focus-visible {
  outline: 2px solid rgba(182,108,255,.96);
  outline-offset: 2px;
}

#${APP_ID} .iu-panel {
  position: absolute;
  width: ${PANEL_WIDTH}px;
  max-width: calc(100vw - 32px);
  max-height: min(760px, calc(100vh - 32px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(205,170,255,.24);
  border-radius: 28px;
  background:
    radial-gradient(circle at 8% -12%, rgba(215,139,255,.16), transparent 34%),
    radial-gradient(circle at 105% 6%, rgba(114,82,255,.14), transparent 31%),
    linear-gradient(180deg, rgba(31,21,51,.985), rgba(13,10,23,.985));
  box-shadow:
    0 34px 90px rgba(0,0,0,.58),
    0 10px 32px rgba(0,0,0,.25),
    inset 0 1px 0 rgba(255,255,255,.045);
  backdrop-filter: blur(25px) saturate(132%);
  -webkit-backdrop-filter: blur(25px) saturate(132%);
  animation: iu-panel-in .2s cubic-bezier(.2,.8,.2,1);
}

#${APP_ID} .iu-panel::before {
  content: "";
  position: absolute;
  top: 0;
  left: 28px;
  right: 28px;
  height: 2px;
  border-radius: 0 0 999px 999px;
  background: linear-gradient(90deg, transparent, #d98dff, #8b61ff, transparent);
  box-shadow: 0 0 24px rgba(182,108,255,.3);
  pointer-events: none;
  z-index: 5;
}

@keyframes iu-panel-in {
  from { opacity: 0; transform: translate(-50%, calc(-50% + 10px)) scale(.985); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

#${APP_ID} .iu-header {
  flex-shrink: 0;
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 15px 16px 14px 18px;
  border-bottom: 1px solid rgba(205,170,255,.11);
  background: rgba(17,12,29,.44);
  cursor: grab;
  user-select: none;
}

#${APP_ID} .iu-header.iu-dragging { cursor: grabbing; }

#${APP_ID} .iu-brand {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

#${APP_ID} .iu-brand-dot {
  position: relative;
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  border-radius: 14px;
  background: linear-gradient(145deg, #eea5ff, #b367ff 52%, #775cff);
  box-shadow:
    0 11px 25px rgba(177,101,255,.28),
    inset 0 1px 0 rgba(255,255,255,.28);
}

#${APP_ID} .iu-brand-dot::before {
  content: "";
  position: absolute;
  inset: 9px;
  border: 2px solid rgba(255,255,255,.95);
  border-radius: 9px;
}

#${APP_ID} .iu-brand-dot::after {
  content: "";
  position: absolute;
  top: 10px;
  right: 10px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #fff;
}

#${APP_ID} .iu-brand-text { min-width: 0; }

#${APP_ID} .iu-brand-text strong {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 760;
  letter-spacing: -.014em;
}

#${APP_ID} .iu-brand-text span {
  display: block;
  margin-top: 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--iu-muted);
  font-size: 10.7px;
}

#${APP_ID} .iu-header-actions {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}

#${APP_ID} .iu-header-actions button {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 11px;
  background: transparent;
  color: #c0b5dc;
  transition: .15s ease;
  font-size: 10px;
  font-weight: 750;
}

#${APP_ID} .iu-header-actions button:hover {
  color: #fff;
  border-color: var(--iu-line);
  background: rgba(255,255,255,.065);
  transform: translateY(-1px);
}

#${APP_ID} .iu-header-actions svg { display: block; }

#${APP_ID} .iu-body {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

#${APP_ID} .iu-welcome {
  padding: 34px 28px 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 11px;
}

#${APP_ID} .iu-welcome-icon {
  width: 74px;
  height: 74px;
  display: grid;
  place-items: center;
  margin-bottom: 3px;
  border: 1px solid rgba(214,183,255,.15);
  border-radius: 24px;
  background: var(--iu-gradient-soft);
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.045);
}

#${APP_ID} .iu-welcome-icon svg {
  width: 34px;
  height: 34px;
  filter: drop-shadow(0 8px 16px rgba(181,108,255,.24));
}

#${APP_ID} .iu-welcome-icon--error {
  color: #ffb3c8;
  background: rgba(255,130,166,.10);
  border-color: rgba(255,130,166,.22);
}

#${APP_ID} .iu-welcome h2 {
  margin: 2px 0 0;
  font-size: 20px;
  line-height: 1.25;
  font-weight: 760;
  letter-spacing: -.025em;
}

#${APP_ID} .iu-welcome p {
  max-width: 365px;
  margin: 0;
  color: var(--iu-muted);
  font-size: 12.5px;
  line-height: 1.58;
}

#${APP_ID} .iu-welcome p + p {
  margin-top: 3px;
  padding: 10px 12px;
  border: 1px solid rgba(255,255,255,.055);
  border-radius: 13px;
  background: rgba(255,255,255,.025);
  font-size: 11.5px;
}

#${APP_ID} .iu-welcome-actions {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 9px;
  margin-top: 8px;
}

#${APP_ID} .iu-progress {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

#${APP_ID} .iu-scan-card {
  position: relative;
  padding: 28px 28px 22px;
  border: 1px solid rgba(207,177,255,.18);
  border-radius: 22px;
  text-align: center;
  background:
    radial-gradient(circle at 50% 0%, rgba(188,116,255,.13), transparent 44%),
    linear-gradient(180deg, rgba(255,255,255,.052), rgba(255,255,255,.025));
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.04),
    0 14px 34px rgba(0,0,0,.12);
}

#${APP_ID} .iu-scan-visual {
  position: relative;
  width: 84px;
  height: 84px;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
  border-radius: 50%;
  color: #d9a7ff;
  background: radial-gradient(circle, rgba(182,108,255,.18), rgba(182,108,255,.03) 66%, transparent 68%);
}

#${APP_ID} .iu-scan-orbit {
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  border: 6px solid rgba(189,139,255,.10);
  border-top-color: #d783ff;
  border-right-color: #9461ff;
  border-bottom-color: rgba(148,97,255,.42);
  animation: iu-orbit 1.8s linear infinite;
}

@keyframes iu-orbit {
  to { transform: rotate(360deg); }
}

#${APP_ID} .iu-scan-visual svg {
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 6px 12px rgba(181,108,255,.28));
}

#${APP_ID} .iu-scan-card h2 {
  margin: 0;
  font-size: 20px;
  line-height: 1.25;
  font-weight: 770;
  letter-spacing: -.025em;
}

#${APP_ID} .iu-scan-hint {
  max-width: 370px;
  margin: 8px auto 0;
  color: var(--iu-muted);
  font-size: 12px;
  line-height: 1.55;
}

#${APP_ID} .iu-scan-note {
  max-width: 370px;
  margin: 6px auto 0;
  color: #cbbfe7;
  font-size: 11px;
  line-height: 1.45;
}

#${APP_ID} .iu-scan-note:empty {
  display: none;
}

#${APP_ID} .iu-bar {
  position: relative;
  height: 9px;
  margin-top: 22px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.035);
  border-radius: 999px;
  background: rgba(255,255,255,.07);
}

#${APP_ID} .iu-bar > span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #d78cff, #a865ff 58%, #835eff);
  box-shadow: 0 0 18px rgba(181,108,255,.28);
  transition: width .3s ease;
}

#${APP_ID} .iu-progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  color: #ece6fb;
  font-size: 11.8px;
}

#${APP_ID} .iu-progress-meta [data-progress-counter] {
  font-weight: 650;
}

#${APP_ID} .iu-progress-meta [data-countdown] {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 4px 10px;
  border: 1px solid rgba(204,171,255,.18);
  border-radius: 999px;
  background: rgba(178,108,255,.09);
  color: #d8c9ef;
}

#${APP_ID} .iu-progress-actions {
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 10px;
}

#${APP_ID} .iu-btn {
  min-height: 43px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 9px 15px;
  border: 1px solid var(--iu-line);
  border-radius: 14px;
  background: rgba(255,255,255,.04);
  color: var(--iu-text);
  font-size: 12.5px;
  font-weight: 670;
  letter-spacing: -.005em;
  transition: .15s ease;
}

#${APP_ID} .iu-btn:hover:not(:disabled) {
  border-color: var(--iu-line-strong);
  background: rgba(255,255,255,.075);
  transform: translateY(-1px);
}

#${APP_ID} .iu-btn:active:not(:disabled) {
  transform: translateY(0) scale(.985);
}

#${APP_ID} .iu-btn:disabled {
  opacity: .38;
  cursor: not-allowed;
}

#${APP_ID} .iu-btn--primary {
  border-color: rgba(255,255,255,.12);
  background: var(--iu-gradient);
  color: #fff;
  box-shadow:
    0 11px 26px rgba(142,91,255,.24),
    inset 0 1px 0 rgba(255,255,255,.18);
}

#${APP_ID} .iu-btn--primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #df94ff, #ae70ff 48%, #8862ff);
  box-shadow:
    0 14px 30px rgba(142,91,255,.29),
    inset 0 1px 0 rgba(255,255,255,.2);
}

#${APP_ID} .iu-btn--ghost {
  background: rgba(255,255,255,.025);
}

#${APP_ID} .iu-btn--danger {
  border-color: rgba(255,130,166,.24);
  background: rgba(255,130,166,.09);
  color: #ffbfd1;
}

#${APP_ID} .iu-btn--danger:hover:not(:disabled) {
  border-color: rgba(255,130,166,.36);
  background: rgba(255,130,166,.16);
}

#${APP_ID} .iu-btn--lg {
  min-width: 170px;
  min-height: 43px;
  padding: 10px 18px;
  border-radius: 14px;
  font-size: 13px;
}

#${APP_ID} .iu-btn--small {
  min-height: 31px;
  padding: 5px 10px;
  border-radius: 9px;
  font-size: 11.5px;
}

#${APP_ID} .iu-progress-actions [data-action="pause-scan"]::before {
  content: "Ⅱ";
  font-size: 12px;
  font-weight: 900;
  letter-spacing: -2px;
}

#${APP_ID} .iu-progress-actions [data-action="cancel-scan"]::before {
  content: "■";
  font-size: 8px;
}

#${APP_ID} .iu-progress-head {
  padding: 15px 16px;
  border: 1px solid var(--iu-line);
  border-radius: 16px;
  background: rgba(255,255,255,.035);
}

#${APP_ID} .iu-progress-head h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}

#${APP_ID} .iu-progress-head p {
  min-height: 1em;
  margin: 5px 0 0;
  color: var(--iu-muted);
  font-size: 11.5px;
}

#${APP_ID} .iu-current {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 9px;
  padding: 11px 12px;
  border: 1px solid var(--iu-line);
  border-radius: 12px;
  background: rgba(255,255,255,.035);
  font-size: 11.5px;
}

#${APP_ID} .iu-current strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
}

#${APP_ID} .iu-blocked {
  padding: 11px 12px;
  border: 1px solid rgba(255,130,166,.24);
  border-radius: 12px;
  background: rgba(255,130,166,.08);
  color: #ffd0dd;
  font-size: 11.5px;
  line-height: 1.5;
}

#${APP_ID} .iu-notice {
  margin: 14px 16px 0;
  padding: 13px 14px;
  border: 1px solid rgba(210,180,255,.14);
  border-radius: 14px;
  background: rgba(255,255,255,.03);
  font-size: 12px;
}

#${APP_ID} .iu-notice strong {
  display: block;
  margin-bottom: 4px;
  color: #eadcff;
  font-weight: 700;
}

#${APP_ID} .iu-notice p {
  margin: 0;
  color: #bfb4d7;
  font-size: 11.5px;
  line-height: 1.5;
}

#${APP_ID} .iu-notice-reason {
  margin-top: 7px !important;
  color: #f0ebff !important;
}

#${APP_ID} .iu-notice-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

#${APP_ID} .iu-results {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

#${APP_ID} .iu-results-summary {
  padding: 15px 16px 5px;
  color: #e7e0f6;
  font-size: 12px;
  font-weight: 650;
}

#${APP_ID} .iu-search-row {
  padding: 8px 16px 9px;
}

#${APP_ID} .iu-search {
  width: 100%;
  height: 42px;
  padding: 0 14px;
  border: 1px solid var(--iu-line);
  border-radius: 13px;
  outline: none;
  background: rgba(255,255,255,.04);
  color: var(--iu-text);
  font-size: 12.5px;
  transition: .16s ease;
}

#${APP_ID} .iu-search::placeholder {
  color: #8d82a8;
}

#${APP_ID} .iu-search:hover {
  background: rgba(255,255,255,.06);
}

#${APP_ID} .iu-search:focus {
  border-color: rgba(182,108,255,.48);
  background: rgba(255,255,255,.065);
  box-shadow: 0 0 0 3px rgba(182,108,255,.08);
}

#${APP_ID} .iu-search::-webkit-search-cancel-button {
  filter: opacity(.65);
  cursor: pointer;
}

#${APP_ID} .iu-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 16px 12px;
}

#${APP_ID} .iu-chip {
  min-height: 29px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 9px;
  border: 1px solid var(--iu-line);
  border-radius: 999px;
  background: rgba(255,255,255,.025);
  color: #bdb3d2;
  font-size: 10.5px;
  font-weight: 650;
  transition: .15s ease;
}

#${APP_ID} .iu-chip:hover {
  border-color: var(--iu-line-strong);
  background: rgba(255,255,255,.06);
  color: #fff;
}

#${APP_ID} .iu-chip--on {
  border-color: rgba(182,108,255,.2);
  background: linear-gradient(135deg, rgba(182,108,255,.14), rgba(127,93,255,.07));
  color: #ecd9ff;
}

#${APP_ID} .iu-chip-tick {
  width: 12px;
  height: 12px;
  display: inline-grid;
  place-items: center;
}

#${APP_ID} .iu-chip-tick svg {
  width: 11px;
  height: 11px;
}

#${APP_ID} .iu-list {
  flex: 1 1 auto;
  min-height: 120px;
  max-height: 50vh;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 6px 10px 8px;
  border-top: 1px solid var(--iu-line);
  border-bottom: 1px solid var(--iu-line);
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,.18) transparent;
}

#${APP_ID} .iu-list::-webkit-scrollbar,
#${APP_ID} .iu-form::-webkit-scrollbar {
  width: 7px;
}

#${APP_ID} .iu-list::-webkit-scrollbar-track,
#${APP_ID} .iu-form::-webkit-scrollbar-track {
  background: transparent;
}

#${APP_ID} .iu-list::-webkit-scrollbar-thumb,
#${APP_ID} .iu-form::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,.15);
  border-radius: 999px;
}

#${APP_ID} .iu-list::-webkit-scrollbar-thumb:hover,
#${APP_ID} .iu-form::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,.25);
}

#${APP_ID} .iu-list-empty {
  margin: 8px 0;
  padding: 32px 18px;
  border: 1px dashed rgba(255,255,255,.08);
  border-radius: 14px;
  text-align: center;
  color: var(--iu-muted);
  font-size: 12px;
}

#${APP_ID} .iu-row {
  display: grid;
  grid-template-columns: 18px 38px minmax(0,1fr) auto;
  gap: 9px;
  align-items: center;
  margin: 4px 0;
  padding: 9px;
  border: 1px solid transparent;
  border-radius: 13px;
  cursor: pointer;
  transition: .14s ease;
}

#${APP_ID} .iu-row:hover {
  border-color: rgba(255,255,255,.055);
  background: rgba(255,255,255,.04);
}

#${APP_ID} .iu-row--selected {
  border-color: rgba(182,108,255,.17);
  background: linear-gradient(135deg, rgba(182,108,255,.12), rgba(127,93,255,.055));
  box-shadow: inset 3px 0 0 rgba(182,108,255,.72);
}

#${APP_ID} .iu-row--selected:hover {
  background: linear-gradient(135deg, rgba(182,108,255,.15), rgba(127,93,255,.075));
}

#${APP_ID} .iu-row--hidden {
  opacity: .52;
}

#${APP_ID} .iu-row-check {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: var(--iu-accent);
  cursor: pointer;
}

#${APP_ID} .iu-avatar {
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 50%;
  object-fit: cover;
  background: rgba(255,255,255,.06);
}

#${APP_ID} .iu-row-text {
  min-width: 0;
}

#${APP_ID} .iu-row-name {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12.5px;
  font-weight: 650;
}

#${APP_ID} .iu-row-name > a {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #f3effb;
}

#${APP_ID} .iu-row-name a:hover {
  color: #fff;
}

#${APP_ID} .iu-row-sub {
  margin-top: 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #948aa9;
  font-size: 10.8px;
}

#${APP_ID} .iu-row-actions {
  display: flex;
  align-items: center;
  gap: 3px;
}

#${APP_ID} .iu-icon-btn {
  width: 29px;
  height: 29px;
  display: inline-grid;
  place-items: center;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 9px;
  background: transparent;
  color: #aa9fc2;
  transition: .15s ease;
}

#${APP_ID} .iu-icon-btn:hover {
  border-color: var(--iu-line);
  background: rgba(255,255,255,.06);
  color: #fff;
}

#${APP_ID} .iu-text-btn {
  width: auto;
  padding: 0 8px;
  font-size: 10.5px;
  font-weight: 650;
}

#${APP_ID} .iu-tag {
  min-height: 18px;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  padding: 1px 6px;
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 6px;
  background: rgba(255,255,255,.05);
  color: #aaa0bd;
  font-size: 8.5px;
  line-height: 1;
  font-weight: 750;
  letter-spacing: .03em;
  text-transform: uppercase;
}

#${APP_ID} .iu-tag--blue {
  border-color: rgba(182,108,255,.17);
  background: rgba(182,108,255,.09);
  color: #ead8ff;
}

#${APP_ID} .iu-tag--green {
  border-color: rgba(81,221,177,.16);
  background: rgba(81,221,177,.09);
  color: #7aeabf;
}

#${APP_ID} .iu-tag--red {
  border-color: rgba(255,130,166,.2);
  background: rgba(255,130,166,.09);
  color: #ffc0d3;
}

#${APP_ID} .iu-actionbar {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 11px 13px;
  border-top: 1px solid var(--iu-line);
  background: rgba(16,11,28,.86);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

#${APP_ID} .iu-actionbar-left,
#${APP_ID} .iu-actionbar-right {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 7px;
}

#${APP_ID} .iu-muted {
  color: var(--iu-muted);
  font-size: 10.8px;
}

#${APP_ID} .iu-overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(0,0,0,.67);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

#${APP_ID} .iu-dialog {
  width: 100%;
  max-width: 390px;
  padding: 20px;
  border: 1px solid var(--iu-line-strong);
  border-radius: 18px;
  background:
    radial-gradient(circle at 100% 0%, rgba(182,108,255,.10), transparent 36%),
    #151020;
  box-shadow: 0 30px 90px rgba(0,0,0,.58);
}

#${APP_ID} .iu-dialog h3 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 740;
}

#${APP_ID} .iu-dialog p {
  margin: 0 0 15px;
  color: var(--iu-muted);
  font-size: 12px;
  line-height: 1.55;
}

#${APP_ID} .iu-dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 7px;
  margin-top: 15px;
}

#${APP_ID} .iu-dialog-actions [data-extra] {
  margin-right: auto;
}

#${APP_ID} .iu-form {
  display: grid;
  gap: 8px;
  max-height: 52vh;
  overflow-y: auto;
  padding-right: 4px;
}

#${APP_ID} .iu-field {
  display: grid;
  grid-template-columns: minmax(0,1fr) 112px;
  align-items: center;
  gap: 10px;
  padding: 8px 9px;
  border: 1px solid rgba(255,255,255,.045);
  border-radius: 10px;
  background: rgba(255,255,255,.025);
  color: #bdb3d2;
  font-size: 11.5px;
}

#${APP_ID} .iu-field input {
  height: 32px;
  padding: 0 9px;
  border: 1px solid var(--iu-line);
  border-radius: 8px;
  outline: none;
  background: rgba(255,255,255,.05);
  color: var(--iu-text);
}

#${APP_ID} .iu-field input:focus {
  border-color: rgba(182,108,255,.45);
  box-shadow: 0 0 0 3px rgba(182,108,255,.07);
}

#${APP_ID} .iu-toast {
  position: absolute;
  z-index: 30;
  left: 50%;
  bottom: 14px;
  max-width: calc(100% - 28px);
  transform: translateX(-50%);
  padding: 9px 14px;
  border: 1px solid rgba(255,255,255,.11);
  border-radius: 999px;
  background: rgba(31,21,51,.96);
  box-shadow: 0 12px 35px rgba(0,0,0,.35);
  color: #f6f2ff;
  font-size: 11.5px;
  pointer-events: none;
  animation: iu-toast-in .18s ease-out;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

@keyframes iu-toast-in {
  from { opacity: 0; transform: translate(-50%, 8px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

#${APP_ID} .iu-pill {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 42px;
  padding: 8px 14px;
  border: 1px solid var(--iu-line);
  border-radius: 999px;
  background: rgba(23,16,38,.96);
  box-shadow: 0 16px 38px rgba(0,0,0,.42);
  color: var(--iu-text);
  font-size: 11.5px;
  font-weight: 650;
  transition: .15s ease;
  cursor: pointer;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

#${APP_ID} .iu-pill:hover {
  border-color: var(--iu-line-strong);
  background: rgba(31,21,53,.98);
  transform: translateY(-1px);
}

#${APP_ID} .iu-pill-dot {
  width: 9px;
  height: 9px;
  flex: 0 0 9px;
  border-radius: 50%;
  background: #8d83a4;
  box-shadow: 0 0 0 4px rgba(255,255,255,.03);
}

#${APP_ID} .iu-pill-dot--active {
  background: var(--iu-accent);
  box-shadow: 0 0 0 4px rgba(182,108,255,.11), 0 0 16px rgba(182,108,255,.36);
  animation: iu-pulse 1.4s infinite;
}

#${APP_ID} .iu-pill-dot--error {
  background: var(--iu-danger);
  box-shadow: 0 0 0 4px rgba(255,130,166,.1);
}

@keyframes iu-pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: .55; transform: scale(.84); }
}

@media (max-width: 620px) {
  #${APP_ID} .iu-panel {
    width: calc(100vw - 20px) !important;
    max-width: calc(100vw - 20px);
    max-height: calc(100vh - 20px);
    border-radius: 20px;
  }

  #${APP_ID} .iu-header {
    min-height: 66px;
    padding: 12px 11px 11px 13px;
  }

  #${APP_ID} .iu-brand-dot {
    width: 35px;
    height: 35px;
    flex-basis: 35px;
  }

  #${APP_ID} .iu-brand-text strong {
    max-width: 185px;
  }

  #${APP_ID} .iu-progress {
    padding: 14px;
  }

  #${APP_ID} .iu-scan-card {
    padding: 22px 16px 18px;
  }

  #${APP_ID} .iu-scan-card h2 {
    font-size: 18px;
  }

  #${APP_ID} .iu-progress-actions {
    grid-template-columns: 1fr;
  }

  #${APP_ID} .iu-welcome-actions {
    flex-direction: column;
  }

  #${APP_ID} .iu-welcome-actions .iu-btn {
    width: 100%;
  }

  #${APP_ID} .iu-actionbar {
    align-items: stretch;
    flex-direction: column;
  }

  #${APP_ID} .iu-actionbar-left,
  #${APP_ID} .iu-actionbar-right {
    justify-content: space-between;
  }

  #${APP_ID} .iu-list {
    max-height: 48vh;
  }
}

@media (prefers-reduced-motion: reduce) {
  #${APP_ID} *,
  #${APP_ID} *::before,
  #${APP_ID} *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
} `; if (globalThis.__IU_TEST__) { globalThis.__IU_TEST__({ addFollowBackStatus, evaluateUnfollowResponse, fetchFriendshipList, friendshipListUrl, igFetch, createCheckpoint, loadCheckpoint, loadTimings, waitBeforeNextScanPage, startScan, showResults, renderResultsView, getDisplayUsers, startUnfollow, unmount, state, interruptibleSleep, sleepWithCountdown, unfollowUser, normalizeUser, isDefaultAvatar, parseRetryAfter, I18N, t }); return; } cleanupExisting(); injectStyles(); mount(); })();
