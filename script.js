/* ====================================
   ISLAMICPATH PRO
   FINAL BUILD
   CHUNK 1
==================================== */

/* ---------- STORAGE ---------- */

const STORAGE = {
  USER: "islamicpath_user",
  DARK: "islamicpath_dark",
  TASBEEH: "islamicpath_tasbeeh",
  BOOKMARKS: "islamicpath_bookmarks",
  STREAK: "islamicpath_streak",
  LAST_SURAH: "islamicpath_last_surah"
};

const ACCOUNT_STORAGE =
  "islamicpath_accounts";

/* ---------- APP STATE ---------- */

let currentUser = null;
let prayerChart = null;
let countdownInterval = null;
let allSurahs = [];

/* ---------- ELEMENTS ---------- */

const loginScreen =
  document.getElementById(
    "loginScreen"
  );

const mainApp =
  document.getElementById(
    "mainApp"
  );

const usernameInput =
  document.getElementById(
    "username"
  );

const passwordInput =
  document.getElementById(
    "password"
  );

const loginBtn =
  document.getElementById(
    "loginBtn"
  );

const registerBtn =
  document.getElementById(
    "registerBtn"
  );

const logoutBtn =
  document.getElementById(
    "logoutBtn"
  );

const welcomeUser =
  document.getElementById(
    "welcomeUser"
  );

const profileName =
  document.getElementById(
    "profileName"
  );

/* ====================================
   ACCOUNT SYSTEM
==================================== */

function registerUser() {

  const username =
    usernameInput.value.trim();

  const password =
    passwordInput.value.trim();

  if (!username || !password) {

    alert(
      "Enter username and password."
    );

    return;
  }

  const accounts =
    JSON.parse(
      localStorage.getItem(
        ACCOUNT_STORAGE
      ) || "{}"
    );

  if (accounts[username]) {

    alert(
      "Account already exists."
    );

    return;
  }

  accounts[username] =
    password;

  localStorage.setItem(
    ACCOUNT_STORAGE,
    JSON.stringify(accounts)
  );

  localStorage.setItem(
    STORAGE.USER,
    username
  );

  currentUser =
    username;

  enterApp();
}

function loginUser() {

  const username =
    usernameInput.value.trim();

  const password =
    passwordInput.value.trim();

  const accounts =
    JSON.parse(
      localStorage.getItem(
        ACCOUNT_STORAGE
      ) || "{}"
    );

  if (!accounts[username]) {

    alert(
      "Account not found."
    );

    return;
  }

  if (
    accounts[username] !==
    password
  ) {

    alert(
      "Incorrect password."
    );

    return;
  }

  localStorage.setItem(
    STORAGE.USER,
    username
  );

  currentUser =
    username;

  enterApp();
}

function autoLogin() {

  const savedUser =
    localStorage.getItem(
      STORAGE.USER
    );

  if (!savedUser)
    return;

  currentUser =
    savedUser;

  enterApp();
}

function enterApp() {

  loginScreen.classList.remove(
    "active"
  );

  mainApp.classList.add(
    "active"
  );

  welcomeUser.textContent =
    `Assalamu Alaikum, ${currentUser}`;

  profileName.textContent =
    currentUser;

  updateDashboard();
}

function logoutUser() {

  localStorage.removeItem(
    STORAGE.USER
  );

  currentUser = null;

  mainApp.classList.remove(
    "active"
  );

  loginScreen.classList.add(
    "active"
  );

  usernameInput.value = "";

  passwordInput.value = "";
}/* ====================================
   CHUNK 2
   NAVIGATION + DASHBOARD
==================================== */

/* ---------- ELEMENTS ---------- */

const darkModeBtn =
  document.getElementById(
    "darkModeBtn"
  );

const todayDate =
  document.getElementById(
    "todayDate"
  );

/* ====================================
   NAVIGATION
==================================== */

function setupNavigation() {

  const navButtons =
    document.querySelectorAll(
      ".nav-btn"
    );

  const pages =
    document.querySelectorAll(
      ".page"
    );

  navButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          navButtons.forEach(
            btn =>
              btn.classList.remove(
                "active"
              )
          );

          button.classList.add(
            "active"
          );

          const target =
            button.dataset.page;

          pages.forEach(
            page =>
              page.classList.remove(
                "active"
              )
          );

          const selectedPage =
            document.getElementById(
              target
            );

          if (
            selectedPage
          ) {

            selectedPage.classList.add(
              "active"
            );

          }

        }
      );

    }
  );

}

/* ====================================
   DARK MODE
==================================== */

function toggleDarkMode() {

  document.body.classList.toggle(
    "dark"
  );

  const enabled =
    document.body.classList.contains(
      "dark"
    );

  localStorage.setItem(
    STORAGE.DARK,
    enabled
  );

}

function loadTheme() {

  const savedTheme =
    localStorage.getItem(
      STORAGE.DARK
    );

  if (
    savedTheme === "true"
  ) {

    document.body.classList.add(
      "dark"
    );

  }

}

/* ====================================
   DATE
==================================== */

function loadDate() {

  if (!todayDate)
    return;

  const date =
    new Date();

  todayDate.textContent =
    date.toLocaleDateString(
      undefined,
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );

}

/* ====================================
   DASHBOARD
==================================== */

function updateDashboard() {

  updateTasbeehStat();

  updateBookmarkStat();

  updateStreakStat();

  updateLastSurahStat();

}

/* ---------- TASBEEH STAT ---------- */

function updateTasbeehStat() {

  const total =
    Number(
      localStorage.getItem(
        STORAGE.TASBEEH
      ) || 0
    );

  const element =
    document.getElementById(
      "tasbeehTotal"
    );

  if (element) {

    element.textContent =
      total;

  }

}

/* ---------- BOOKMARK STAT ---------- */

function updateBookmarkStat() {

  const bookmarks =
    JSON.parse(
      localStorage.getItem(
        STORAGE.BOOKMARKS
      ) || "[]"
    );

  const count =
    bookmarks.length;

  const dashboardCount =
    document.getElementById(
      "bookmarkCount"
    );

  const profileCount =
    document.getElementById(
      "profileBookmarks"
    );

  if (
    dashboardCount
  ) {

    dashboardCount.textContent =
      count;

  }

  if (
    profileCount
  ) {

    profileCount.textContent =
      count;

  }

}

/* ---------- STREAK ---------- */

function updateStreakStat() {

  const streak =
    Number(
      localStorage.getItem(
        STORAGE.STREAK
      ) || 0
    );

  const dashboard =
    document.getElementById(
      "streakValue"
    );

  const profile =
    document.getElementById(
      "profileStreak"
    );

  if (
    dashboard
  ) {

    dashboard.textContent =
      `${streak} Days`;

  }

  if (
    profile
  ) {

    profile.textContent =
      streak;

  }

}

/* ---------- LAST SURAH ---------- */

function updateLastSurahStat() {

  const lastSurah =
    localStorage.getItem(
      STORAGE.LAST_SURAH
    ) || "None";

  const element =
    document.getElementById(
      "lastSurahRead"
    );

  if (
    element
  ) {

    element.textContent =
      lastSurah;

  }

}

/* ====================================
   HELPERS
==================================== */

function saveData(
  key,
  value
) {

  localStorage.setItem(
    key,
    JSON.stringify(
      value
    )
  );

}

function getData(
  key,
  fallback = []
) {

  const data =
    localStorage.getItem(
      key
    );

  if (!data)
    return fallback;

  try {

    return JSON.parse(
      data
    );

  } catch {

    return fallback;

  }

}

/* ====================================
   EVENTS
==================================== */

if (darkModeBtn) {

  darkModeBtn.addEventListener(
    "click",
    toggleDarkMode
  );

}/* ====================================
   CHUNK 3
   PRAYER TIMES SYSTEM
==================================== */

const PRAYER_STORAGE =
  "islamicpath_prayers";

/* ====================================
   LOAD PRAYER TIMES
==================================== */

async function loadPrayerTimes() {

  try {

    const response =
      await fetch(
        "https://api.aladhan.com/v1/timingsByCity?city=London&country=Canada"
      );

    const data =
      await response.json();

    const timings =
      data.data.timings;

    renderPrayerTimes(
      timings
    );

    calculateNextPrayer(
      timings
    );

  } catch (error) {

    console.error(
      "Prayer API Error:",
      error
    );

    const grid =
      document.getElementById(
        "prayerGrid"
      );

    if (grid) {

      grid.innerHTML =
        `
        <div class="prayer-card glass">
          Unable to load prayer times.
        </div>
        `;

    }

  }

}

/* ====================================
   DISPLAY PRAYERS
==================================== */

function renderPrayerTimes(
  timings
) {

  const grid =
    document.getElementById(
      "prayerGrid"
    );

  if (!grid)
    return;

  grid.innerHTML = "";

  const prayers = [
    "Fajr",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha"
  ];

  const completed =
    getPrayerProgress();

  prayers.forEach(
    prayer => {

      const card =
        document.createElement(
          "div"
        );

      card.className =
        "prayer-card glass";

      const done =
        completed.includes(
          prayer
        );

      card.innerHTML =
        `
        <h3>${prayer}</h3>

        <p>
          ${timings[prayer]}
        </p>

        <button
          onclick="markPrayerComplete('${prayer}')"
        >
          ${
            done
              ? "✓ Completed"
              : "Mark Complete"
          }
        </button>
      `;

      grid.appendChild(
        card
      );

    }
  );

}

/* ====================================
   DAILY PROGRESS
==================================== */

function getTodayKey() {

  return new Date()
    .toISOString()
    .split("T")[0];

}

function getPrayerProgress() {

  const saved =
    JSON.parse(
      localStorage.getItem(
        PRAYER_STORAGE
      ) || "{}"
    );

  return (
    saved[
      getTodayKey()
    ] || []
  );

}

function savePrayerProgress(
  prayers
) {

  const saved =
    JSON.parse(
      localStorage.getItem(
        PRAYER_STORAGE
      ) || "{}"
    );

  saved[
    getTodayKey()
  ] = prayers;

  localStorage.setItem(
    PRAYER_STORAGE,
    JSON.stringify(
      saved
    )
  );

}

/* ====================================
   MARK COMPLETE
==================================== */

function markPrayerComplete(
  prayer
) {

  let completed =
    getPrayerProgress();

  if (
    completed.includes(
      prayer
    )
  ) {
    return;
  }

  completed.push(
    prayer
  );

  savePrayerProgress(
    completed
  );

  updatePrayerChart();

  updatePrayerStreak();

  loadPrayerTimes();

}

/* ====================================
   STREAK
==================================== */

function updatePrayerStreak() {

  const completed =
    getPrayerProgress();

  if (
    completed.length >= 5
  ) {

    let streak =
      Number(
        localStorage.getItem(
          STORAGE.STREAK
        ) || 0
      );

    streak++;

    localStorage.setItem(
      STORAGE.STREAK,
      streak
    );

    updateStreakStat();

  }

}

/* ====================================
   NEXT PRAYER
==================================== */

function calculateNextPrayer(
  timings
) {

  const prayers = [
    "Fajr",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha"
  ];

  const now =
    new Date();

  let nextPrayer =
    null;

  for (
    const prayer
    of prayers
  ) {

    const [
      hours,
      minutes
    ] =
      timings[
        prayer
      ]
        .split(":")
        .map(Number);

    const prayerTime =
      new Date();

    prayerTime.setHours(
      hours,
      minutes,
      0,
      0
    );

    if (
      prayerTime > now
    ) {

      nextPrayer = {
        name:
          prayer,
        time:
          prayerTime
      };

      break;

    }

  }

  if (
    !nextPrayer
  ) {

    const [
      hours,
      minutes
    ] =
      timings.Fajr
        .split(":")
        .map(Number);

    const tomorrow =
      new Date();

    tomorrow.setDate(
      tomorrow.getDate() + 1
    );

    tomorrow.setHours(
      hours,
      minutes,
      0,
      0
    );

    nextPrayer = {
      name: "Fajr",
      time:
        tomorrow
    };

  }

  const prayerName =
    document.getElementById(
      "nextPrayerName"
    );

  if (
    prayerName
  ) {

    prayerName.textContent =
      nextPrayer.name;

  }

  startCountdown(
    nextPrayer.time
  );

}

/* ====================================
   COUNTDOWN
==================================== */

function startCountdown(
  targetTime
) {

  clearInterval(
    countdownInterval
  );

  countdownInterval =
    setInterval(
      () => {

        const now =
          new Date();

        const diff =
          targetTime -
          now;

        const display =
          document.getElementById(
            "countdown"
          );

        if (
          !display
        ) return;

        if (
          diff <= 0
        ) {

          display.textContent =
            "It's Time!";

          clearInterval(
            countdownInterval
          );

          return;

        }

        const hours =
          Math.floor(
            diff /
            1000 /
            60 /
            60
          );

        const minutes =
          Math.floor(
            (
              diff /
              1000 /
              60
            ) % 60
          );

        const seconds =
          Math.floor(
            (
              diff /
              1000
            ) % 60
          );

        display.textContent =
          `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

      },
      1000
    );

}

/* ====================================
   PRAYER CHART
==================================== */

function updatePrayerChart() {

  const canvas =
    document.getElementById(
      "prayerChart"
    );

  if (!canvas)
    return;

  const completed =
    getPrayerProgress()
      .length;

  const remaining =
    5 -
    completed;

  if (
    prayerChart
  ) {

    prayerChart.destroy();

  }

  prayerChart =
    new Chart(
      canvas,
      {
        type:
          "doughnut",

        data: {

          labels: [
            "Completed",
            "Remaining"
          ],

          datasets: [
            {
              data: [
                completed,
                remaining
              ]
            }
          ]
        }
      }
    );

}/* ====================================
   CHUNK 4
   QURAN SYSTEM
==================================== */

const QURAN_API =
  "https://api.alquran.cloud/v1";

/* ---------- ELEMENTS ---------- */

const loadSurahsBtn =
  document.getElementById(
    "loadSurahs"
  );

const surahList =
  document.getElementById(
    "surahList"
  );

const surahReader =
  document.getElementById(
    "surahReader"
  );

const surahSearch =
  document.getElementById(
    "surahSearch"
  );

/* ====================================
   LOAD QURAN
==================================== */

async function loadQuran() {

  try {

    if (!surahList)
      return;

    surahList.innerHTML =
      `
      <div class="card glass">
        Loading Quran...
      </div>
      `;

    const response =
      await fetch(
        `${QURAN_API}/surah`
      );

    const data =
      await response.json();

    allSurahs =
      data.data;

    renderSurahList(
      allSurahs
    );

  } catch (error) {

    console.error(
      error
    );

    surahList.innerHTML =
      `
      <div class="card glass">
        Unable to load Quran.
      </div>
      `;

  }

}

/* ====================================
   SURAH LIST
==================================== */

function renderSurahList(
  surahs
) {

  if (!surahList)
    return;

  surahList.innerHTML =
    "";

  surahs.forEach(
    surah => {

      const card =
        document.createElement(
          "div"
        );

      card.className =
        "surah-card glass";

      card.innerHTML =
        `
        <h3>
          ${surah.number}.
          ${surah.englishName}
        </h3>

        <p>
          ${surah.name}
        </p>

        <small>
          ${surah.numberOfAyahs}
          Ayahs
        </small>
      `;

      card.addEventListener(
        "click",
        () => {

          loadSurah(
            surah.number,
            surah.englishName
          );

        }
      );

      surahList.appendChild(
        card
      );

    }
  );

}

/* ====================================
   SEARCH
==================================== */

if (
  surahSearch
) {

  surahSearch.addEventListener(
    "input",
    e => {

      const search =
        e.target.value
          .toLowerCase()
          .trim();

      const filtered =
        allSurahs.filter(
          surah =>

            surah.englishName
              .toLowerCase()
              .includes(
                search
              )

            ||

            surah.name
              .includes(
                search
              )
        );

      renderSurahList(
        filtered
      );

    }
  );

}

/* ====================================
   LOAD SURAH
==================================== */

async function loadSurah(
  number,
  englishName
) {

  try {

    if (!surahReader)
      return;

    surahReader.innerHTML =
      `
      <div class="card glass">
        Loading Surah...
      </div>
      `;

    localStorage.setItem(
      STORAGE.LAST_SURAH,
      englishName
    );

    updateLastSurahStat();

    const arabicResponse =
      await fetch(
        `${QURAN_API}/surah/${number}`
      );

    const englishResponse =
      await fetch(
        `${QURAN_API}/surah/${number}/en.asad`
      );

    const arabic =
      await arabicResponse.json();

    const english =
      await englishResponse.json();

    renderSurahReader(
      arabic.data,
      english.data
    );

  } catch (error) {

    console.error(
      error
    );

    surahReader.innerHTML =
      `
      <div class="card glass">
        Unable to load Surah.
      </div>
      `;

  }

}

/* ====================================
   SURAH READER
==================================== */

function renderSurahReader(
  arabic,
  english
) {

  surahReader.innerHTML =
    `
    <h2>
      ${arabic.englishName}
    </h2>

    <br>
    `;

  arabic.ayahs.forEach(
    (
      ayah,
      index
    ) => {

      const translation =
        english.ayahs[
          index
        ]?.text || "";

      const ayahBox =
        document.createElement(
          "div"
        );

      ayahBox.className =
        "ayah";

      ayahBox.innerHTML =
        `
        <div class="arabic">
          ${ayah.text}
        </div>

        <div class="translation">
          ${translation}
        </div>

        <br>

        <button
          onclick="bookmarkVerse(
            ${arabic.number},
            ${ayah.numberInSurah},
            '${arabic.englishName}'
          )"
        >
          🔖 Bookmark
        </button>

        <hr>
      `;

      surahReader.appendChild(
        ayahBox
      );

    }
  );

}

/* ====================================
   LOAD BUTTON
==================================== */

if (
  loadSurahsBtn
) {

  loadSurahsBtn.addEventListener(
    "click",
    loadQuran
  );

}/* ====================================
   CHUNK 5
   BOOKMARK SYSTEM
==================================== */

/* ====================================
   SAVE BOOKMARK
==================================== */

function bookmarkVerse(
  surah,
  ayah,
  surahName
) {

  const bookmarks =
    getData(
      STORAGE.BOOKMARKS,
      []
    );

  const exists =
    bookmarks.find(
      item =>
        item.surah === surah &&
        item.ayah === ayah
    );

  if (exists) {

    alert(
      "This verse is already bookmarked."
    );

    return;
  }

  bookmarks.push({

    surah:
      surah,

    ayah:
      ayah,

    surahName:
      surahName

  });

  saveData(
    STORAGE.BOOKMARKS,
    bookmarks
  );

  renderBookmarks();

  updateBookmarkStat();

  alert(
    "Bookmark saved successfully."
  );

}

/* ====================================
   DISPLAY BOOKMARKS
==================================== */

function renderBookmarks() {

  const container =
    document.getElementById(
      "bookmarkContainer"
    );

  if (!container)
    return;

  const bookmarks =
    getData(
      STORAGE.BOOKMARKS,
      []
    );

  if (
    bookmarks.length === 0
  ) {

    container.innerHTML =
      `
      <div class="card glass">
        No bookmarks saved yet.
      </div>
      `;

    return;
  }

  container.innerHTML =
    "";

  bookmarks.forEach(
    (
      bookmark,
      index
    ) => {

      const card =
        document.createElement(
          "div"
        );

      card.className =
        "card glass";

      card.innerHTML =
        `
        <h3>
          ${bookmark.surahName}
        </h3>

        <p>
          Surah ${bookmark.surah}
          • Ayah ${bookmark.ayah}
        </p>

        <br>

        <button
          onclick="removeBookmark(${index})"
        >
          Remove Bookmark
        </button>
        `;

      container.appendChild(
        card
      );

    }
  );

}

/* ====================================
   REMOVE BOOKMARK
==================================== */

function removeBookmark(
  index
) {

  const bookmarks =
    getData(
      STORAGE.BOOKMARKS,
      []
    );

  bookmarks.splice(
    index,
    1
  );

  saveData(
    STORAGE.BOOKMARKS,
    bookmarks
  );

  renderBookmarks();

  updateBookmarkStat();

}

/* ====================================
   CLEAR ALL BOOKMARKS
==================================== */

function clearBookmarks() {

  const confirmed =
    confirm(
      "Delete all bookmarks?"
    );

  if (!confirmed)
    return;

  saveData(
    STORAGE.BOOKMARKS,
    []
  );

  renderBookmarks();

  updateBookmarkStat();

}

/* ====================================
   BOOKMARK SEARCH
==================================== */

function searchBookmarks(
  query
) {

  const bookmarks =
    getData(
      STORAGE.BOOKMARKS,
      []
    );

  return bookmarks.filter(
    bookmark =>

      bookmark.surahName
        .toLowerCase()
        .includes(
          query
            .toLowerCase()
        )
  );

}

/* ====================================
   BOOKMARK EXPORT
==================================== */

function exportBookmarks() {

  const bookmarks =
    getData(
      STORAGE.BOOKMARKS,
      []
    );

  const data =
    JSON.stringify(
      bookmarks,
      null,
      2
    );

  const blob =
    new Blob(
      [data],
      {
        type:
          "application/json"
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href =
    url;

  link.download =
    "IslamicPathBookmarks.json";

  link.click();

  URL.revokeObjectURL(
    url
  );

}

/* ====================================
   BOOKMARK IMPORT
==================================== */

function importBookmarks(
  event
) {

  const file =
    event.target.files[0];

  if (!file)
    return;

  const reader =
    new FileReader();

  reader.onload =
    function(e) {

      try {

        const bookmarks =
          JSON.parse(
            e.target.result
          );

        saveData(
          STORAGE.BOOKMARKS,
          bookmarks
        );

        renderBookmarks();

        updateBookmarkStat();

        alert(
          "Bookmarks imported successfully."
        );

      } catch {

        alert(
          "Invalid bookmark file."
        );

      }

    };

  reader.readAsText(
    file
  );

}

/* ====================================
   INITIALIZE
==================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderBookmarks();

  }
);/* ====================================
   CHUNK 6
   TASBEEH + HADITH + ACHIEVEMENTS
==================================== */

/* ---------- ELEMENTS ---------- */

const tasbeehBtn =
  document.getElementById(
    "tasbeehBtn"
  );

const resetTasbeehBtn =
  document.getElementById(
    "resetTasbeeh"
  );

const tasbeehCountElement =
  document.getElementById(
    "tasbeehCount"
  );

const loadHadithBtn =
  document.getElementById(
    "loadHadith"
  );

const hadithContent =
  document.getElementById(
    "hadithContent"
  );

/* ====================================
   TASBEEH
==================================== */

let tasbeehCount =
  Number(
    localStorage.getItem(
      STORAGE.TASBEEH
    ) || 0
  );

function updateTasbeehDisplay() {

  if (
    tasbeehCountElement
  ) {

    tasbeehCountElement.textContent =
      tasbeehCount;

  }

  localStorage.setItem(
    STORAGE.TASBEEH,
    tasbeehCount
  );

  updateTasbeehStat();

}

function incrementTasbeeh() {

  tasbeehCount++;

  updateTasbeehDisplay();

}

function resetTasbeeh() {

  const confirmed =
    confirm(
      "Reset Tasbeeh counter?"
    );

  if (!confirmed)
    return;

  tasbeehCount = 0;

  updateTasbeehDisplay();

}

if (
  tasbeehBtn
) {

  tasbeehBtn.addEventListener(
    "click",
    incrementTasbeeh
  );

}

if (
  resetTasbeehBtn
) {

  resetTasbeehBtn.addEventListener(
    "click",
    resetTasbeeh
  );

}

/* ====================================
   DAILY HADITH
==================================== */

const hadithCollection = [

  "The best among you are those who learn the Quran and teach it.",

  "Actions are judged by intentions.",

  "Allah does not look at your appearance or wealth but at your hearts and deeds.",

  "The strong person is not the one who overcomes others by force, but the one who controls himself while angry.",

  "Whoever believes in Allah and the Last Day should speak good or remain silent.",

  "The most beloved deeds to Allah are those done consistently, even if they are small.",

  "Make things easy and do not make them difficult.",

  "The merciful are shown mercy by The Most Merciful.",

  "A smile to your brother is charity.",

  "Seeking knowledge is an obligation upon every Muslim."

];

function loadRandomHadith() {

  const randomIndex =
    Math.floor(
      Math.random() *
      hadithCollection.length
    );

  if (
    hadithContent
  ) {

    hadithContent.innerHTML =
      `
      <h3>
        Daily Hadith
      </h3>

      <br>

      <p>
        ${hadithCollection[randomIndex]}
      </p>
      `;

  }

}

if (
  loadHadithBtn
) {

  loadHadithBtn.addEventListener(
    "click",
    loadRandomHadith
  );

}

/* ====================================
   ACHIEVEMENTS
==================================== */

function getAchievementLevel() {

  const streak =
    Number(
      localStorage.getItem(
        STORAGE.STREAK
      ) || 0
    );

  const tasbeeh =
    Number(
      localStorage.getItem(
        STORAGE.TASBEEH
      ) || 0
    );

  if (
    streak >= 100
  ) {

    return "🏆 Legend";

  }

  if (
    streak >= 50
  ) {

    return "⭐ Master";

  }

  if (
    streak >= 30
  ) {

    return "🥇 Advanced";

  }

  if (
    streak >= 10
  ) {

    return "🥈 Dedicated";

  }

  if (
    tasbeeh >= 1000
  ) {

    return "📿 Dhikr Champion";

  }

  return "🥉 Beginner";

}

/* ====================================
   ACHIEVEMENT CARD
==================================== */

function addAchievementCard() {

  const profilePage =
    document.getElementById(
      "profile"
    );

  if (
    !profilePage
  ) return;

  const existing =
    document.getElementById(
      "achievementCard"
    );

  if (
    existing
  ) {

    existing.remove();

  }

  const card =
    document.createElement(
      "div"
    );

  card.id =
    "achievementCard";

  card.className =
    "card glass";

  card.innerHTML =
    `
    <h2>
      Achievements
    </h2>

    <p>
      ${getAchievementLevel()}
    </p>
    `;

  profilePage.appendChild(
    card
  );

}

/* ====================================
   DAILY VISIT TRACKER
==================================== */

function trackDailyVisit() {

  const today =
    new Date()
      .toISOString()
      .split(
        "T"
      )[0];

  const lastVisit =
    localStorage.getItem(
      "islamicpath_lastvisit"
    );

  if (
    lastVisit !== today
  ) {

    localStorage.setItem(
      "islamicpath_lastvisit",
      today
    );

  }

}

/* ====================================
   PROFILE REFRESH
==================================== */

function refreshProfile() {

  if (
    !currentUser
  ) return;

  const profileNameElement =
    document.getElementById(
      "profileName"
    );

  if (
    profileNameElement
  ) {

    profileNameElement.textContent =
      currentUser;

  }

  updateBookmarkStat();

  updateStreakStat();

  updateTasbeehStat();

  addAchievementCard();

}

/* ====================================
   STARTUP
==================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateTasbeehDisplay();

    refreshProfile();

    trackDailyVisit();

  }
);/* ====================================
   CHUNK 7
   BACKUP + RESTORE
==================================== */

/* ====================================
   EXPORT DATA
==================================== */

function exportData() {

  const data = {

    user:
      localStorage.getItem(
        STORAGE.USER
      ),

    tasbeeh:
      localStorage.getItem(
        STORAGE.TASBEEH
      ),

    streak:
      localStorage.getItem(
        STORAGE.STREAK
      ),

    lastSurah:
      localStorage.getItem(
        STORAGE.LAST_SURAH
      ),

    bookmarks:
      getData(
        STORAGE.BOOKMARKS,
        []
      )

  };

  const blob =
    new Blob(
      [
        JSON.stringify(
          data,
          null,
          2
        )
      ],
      {
        type:
          "application/json"
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href =
    url;

  link.download =
    "IslamicPathBackup.json";

  link.click();

  URL.revokeObjectURL(
    url
  );

}

/* ====================================
   IMPORT DATA
==================================== */

function importData(
  event
) {

  const file =
    event.target.files[0];

  if (!file)
    return;

  const reader =
    new FileReader();

  reader.onload =
    function(e) {

      try {

        const data =
          JSON.parse(
            e.target.result
          );

        if (
          data.bookmarks
        ) {

          saveData(
            STORAGE.BOOKMARKS,
            data.bookmarks
          );

        }

        if (
          data.tasbeeh
        ) {

          localStorage.setItem(
            STORAGE.TASBEEH,
            data.tasbeeh
          );

        }

        if (
          data.streak
        ) {

          localStorage.setItem(
            STORAGE.STREAK,
            data.streak
          );

        }

        if (
          data.lastSurah
        ) {

          localStorage.setItem(
            STORAGE.LAST_SURAH,
            data.lastSurah
          );

        }

        renderBookmarks();

        updateDashboard();

        updateTasbeehDisplay();

        refreshProfile();

        alert(
          "Backup restored successfully."
        );

      } catch {

        alert(
          "Invalid backup file."
        );

      }

    };

  reader.readAsText(
    file
  );

}

/* ====================================
   PROFILE TOOLS
==================================== */

function createProfileTools() {

  const profilePage =
    document.getElementById(
      "profile"
    );

  if (
    !profilePage
  ) return;

  const existing =
    document.getElementById(
      "backupTools"
    );

  if (
    existing
  ) return;

  const card =
    document.createElement(
      "div"
    );

  card.id =
    "backupTools";

  card.className =
    "card glass";

  card.innerHTML =
    `
    <h2>
      Backup & Restore
    </h2>

    <br>

    <button id="exportBtn">
      Export Data
    </button>

    <br><br>

    <input
      type="file"
      id="importFile"
      accept=".json"
    >
    `;

  profilePage.appendChild(
    card
  );

  const exportBtn =
    document.getElementById(
      "exportBtn"
    );

  const importFile =
    document.getElementById(
      "importFile"
    );

  if (
    exportBtn
  ) {

    exportBtn.addEventListener(
      "click",
      exportData
    );

  }

  if (
    importFile
  ) {

    importFile.addEventListener(
      "change",
      importData
    );

  }

}

/* ====================================
   RESET ACCOUNT DATA
==================================== */

function resetAccountData() {

  const confirmed =
    confirm(
      "Delete all IslamicPath data?"
    );

  if (
    !confirmed
  ) return;

  localStorage.removeItem(
    STORAGE.TASBEEH
  );

  localStorage.removeItem(
    STORAGE.STREAK
  );

  localStorage.removeItem(
    STORAGE.BOOKMARKS
  );

  localStorage.removeItem(
    STORAGE.LAST_SURAH
  );

  renderBookmarks();

  updateDashboard();

  updateTasbeehDisplay();

  refreshProfile();

  alert(
    "Data has been reset."
  );

}

/* ====================================
   ADVANCED PROFILE CARD
==================================== */

function createStatsCard() {

  const profilePage =
    document.getElementById(
      "profile"
    );

  if (
    !profilePage
  ) return;

  const existing =
    document.getElementById(
      "advancedStats"
    );

  if (
    existing
  ) return;

  const bookmarks =
    getData(
      STORAGE.BOOKMARKS,
      []
    ).length;

  const tasbeeh =
    Number(
      localStorage.getItem(
        STORAGE.TASBEEH
      ) || 0
    );

  const streak =
    Number(
      localStorage.getItem(
        STORAGE.STREAK
      ) || 0
    );

  const card =
    document.createElement(
      "div"
    );

  card.id =
    "advancedStats";

  card.className =
    "card glass";

  card.innerHTML =
    `
    <h2>
      IslamicPath Statistics
    </h2>

    <p>
      📿 Tasbeeh Count:
      ${tasbeeh}
    </p>

    <p>
      🔖 Bookmarks:
      ${bookmarks}
    </p>

    <p>
      🔥 Prayer Streak:
      ${streak}
    </p>
    `;

  profilePage.appendChild(
    card
  );

}

/* ====================================
   STARTUP
==================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    createProfileTools();

    createStatsCard();

  }
);/* ====================================
   CHUNK 8
   FINAL STARTUP
==================================== */

/* ====================================
   EVENT LISTENERS
==================================== */

if (loginBtn) {

  loginBtn.addEventListener(
    "click",
    loginUser
  );

}

if (registerBtn) {

  registerBtn.addEventListener(
    "click",
    registerUser
  );

}

if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    logoutUser
  );

}

/* ====================================
   APP STARTUP
==================================== */

function initializeIslamicPath() {

  console.log(
    "🕌 IslamicPath Loaded"
  );

  loadTheme();

  loadDate();

  autoLogin();

  setupNavigation();

  updateDashboard();

  renderBookmarks();

  updateTasbeehDisplay();

  refreshProfile();

  addAchievementCard();

  createProfileTools();

  createStatsCard();

  trackDailyVisit();

  loadPrayerTimes();

  updatePrayerChart();

}

/* ====================================
   DOM READY
==================================== */

document.addEventListener(
  "DOMContentLoaded",
  initializeIslamicPath
);

/* ====================================
   GLOBAL FUNCTIONS
==================================== */

window.loginUser =
  loginUser;

window.logoutUser =
  logoutUser;

window.registerUser =
  registerUser;

window.markPrayerComplete =
  markPrayerComplete;

window.bookmarkVerse =
  bookmarkVerse;

window.removeBookmark =
  removeBookmark;

window.exportData =
  exportData;

window.importData =
  importData;

/* ====================================
   VERSION INFO
==================================== */

console.log(`
🕌 IslamicPath Pro
Version: 1.0 Final

Features:
✔ Login & Accounts
✔ Prayer Times API
✔ Prayer Tracker
✔ Countdown Timer
✔ Quran Reader
✔ Quran Search
✔ Verse Bookmarks
✔ Tasbeeh Counter
✔ Daily Hadith
✔ Achievements
✔ Statistics
✔ Backup & Restore
✔ Dark Mode
✔ Dashboard
✔ Profile System
`);