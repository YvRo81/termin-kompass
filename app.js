const events = [
  {
    title: "Almrausch",
    date: "2026-11-07",
    time: "Beginn 20:00 Uhr",
    place: "",
    kind: "Zelt",
    note: "",
  },
  {
    title: "Sessionseröffnung",
    date: "2026-11-14",
    time: "Beginn 19:11 Uhr",
    place: "TuS Sportheim, Schießgasse 9, 52152 Simmerath-Lammersdorf",
    kind: "Intern",
    note: "",
  },
  {
    title: "Prinzenproklamation",
    date: "2026-11-21",
    time: "Beginn 19:00 Uhr",
    place: "",
    kind: "Zelt",
    note: "Treffen: 18:15 Uhr.",
  },
  {
    title: "Kinder Pri-Pro",
    date: "2027-01-10",
    time: "Beginn 14:00 Uhr",
    place: "",
    kind: "Zelt",
    note: "Treffen: 13:15 Uhr.",
  },
  {
    title: "Duell der Jecken",
    date: "2027-01-16",
    time: "Beginn 16:00 Uhr",
    place: "",
    kind: "Zelt",
    note: "Einlass: 15:30 Uhr.",
  },
  {
    title: "Bessemsbengersause",
    date: "2027-01-30",
    time: "Beginn 18:55 Uhr",
    place: "",
    kind: "Zelt",
    note: "Treffen: 18:30 Uhr.",
  },
  {
    title: "Besuch Helena Stollenwerk Haus",
    date: "2027-02-02",
    time: "18:00 Uhr",
    place: "Quadfliegstr. 14, 52152 Simmerath",
    kind: "Auftritt",
    note: "Privatanreise.",
  },
  {
    title: "Besuch Behindertenwerkstatt",
    date: "2027-02-04",
    time: "08:15 Uhr",
    place: "CBW-GmbH Werk 5, Am Handwerkerzentrum 13, 52156 Monschau",
    kind: "Auftritt",
    note: "Privatanreise.",
  },
  {
    title: "Grundschule",
    date: "2027-02-04",
    time: "09:15 Uhr",
    place: "",
    kind: "Auftritt",
    note: "Auftrittszeit 30 Min.",
  },
  {
    title: "Kindergarten Profinos",
    date: "2027-02-04",
    time: "10:15 Uhr",
    place: "",
    kind: "Auftritt",
    note: "",
  },
  {
    title: "Schlüsselübergabe Simmerath",
    date: "2027-02-04",
    time: "11:11 Uhr",
    place: "Dreifachhalle, Im Römbchen, 52152 Simmerath",
    kind: "Auftritt",
    note: "Privatanreise.",
  },
  {
    title: "Altweiber",
    date: "2027-02-04",
    time: "Beginn 14:11 Uhr",
    place: "",
    kind: "Zelt",
    note: "",
  },
  {
    title: "Besuch Bürgerverein Mulartshütte",
    date: "2027-02-04",
    time: "Uhrzeit folgt",
    place: "Zweifaller Straße 34, 52159 Mulartshütte",
    kind: "Auftritt",
    note: "Auftrittszeit 45 Min. BUS.",
  },
  {
    title: "Karnevalszug Rollesbroich",
    date: "2027-02-06",
    time: "Uhrzeit folgt",
    place: "Treffen Bushaltestelle Grundschule",
    kind: "Zug",
    note: "BUS.",
  },
  {
    title: "Frühschoppen Kester Lehmschwalben",
    date: "2027-02-07",
    time: "Einlass ab 10:30 Uhr",
    place: "DGH Kesternich, Vereinsweg 10, 52152 Simmerath",
    kind: "Auftritt",
    note: "Einlass ab 10:30 Uhr. BUS.",
  },
  {
    title: "Familiensitzung",
    date: "2027-02-07",
    time: "Beginn 14:30 Uhr",
    place: "",
    kind: "Zelt",
    note: "",
  },
  {
    title: "Rosenmontagszug",
    date: "2027-02-08",
    time: "Beginn 11:11 Uhr",
    place: "",
    kind: "Zug",
    note: "Aufstellen 13:30 Uhr. Frühschoppen Zelt. 14:30 Uhr Start Zug.",
  },
  {
    title: "Tollitäten auskleiden",
    date: "2027-02-17",
    time: "Uhrzeit folgt",
    place: "TuS Sportheim, Schießgasse 9, 52152 Simmerath-Lammersdorf",
    kind: "Intern",
    note: "",
  },
];

const monthNames = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

const eventList = document.querySelector("#eventList");
const resultCount = document.querySelector("#resultCount");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll(".filter-button");
const monthButtons = document.querySelectorAll(".month-button");
const spotlightTitle = document.querySelector("#spotlight-title");
const spotlightMeta = document.querySelector("#spotlightMeta");

let activeFilter = "Alle";
let activeMonth = "Alle";

function shouldShowRoute(event) {
  const hasAddress = /\d{5}|straße|str\.|gasse|weg|römbchen|quadflieg/i.test(event.place);
  const isOwnTravel = /privatanreise/i.test(event.note);

  return hasAddress && isOwnTravel;
}

function getRouteUrl(place) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: monthNames[date.getMonth()],
    compact: `${String(date.getDate()).padStart(2, "0")}. ${monthNames[date.getMonth()]}`,
  };
}

function getFilteredEvents() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  return events.filter((event) => {
    const date = formatDate(event.date);
    const text = `${event.title} ${event.place} ${event.kind} ${event.note}`.toLowerCase();
    const matchesSearch = !searchTerm || text.includes(searchTerm);
    const matchesFilter = activeFilter === "Alle" || event.kind === activeFilter;
    const matchesMonth = activeMonth === "Alle" || date.month === activeMonth;

    return matchesSearch && matchesFilter && matchesMonth;
  });
}

function renderSpotlight() {
  const nextEvent = events[0];
  const date = formatDate(nextEvent.date);

  spotlightTitle.textContent = nextEvent.title;
  spotlightMeta.textContent = `${date.compact} · ${nextEvent.time} · ${nextEvent.place}`;
}

function renderEvents() {
  const filteredEvents = getFilteredEvents();
  resultCount.textContent =
    filteredEvents.length === 1 ? "1 Termin" : `${filteredEvents.length} Termine`;

  if (!filteredEvents.length) {
    eventList.innerHTML = '<div class="empty-state">Keine passenden Termine gefunden.</div>';
    return;
  }

  eventList.innerHTML = filteredEvents
    .map((event) => {
      const date = formatDate(event.date);

      return `
        <article class="event-card" data-kind="${event.kind}">
          <div class="date-tile">
            <div>
              <strong>${date.day}</strong>
              <span>${date.month}</span>
            </div>
          </div>
          <div>
            <h3>${event.title}</h3>
            <p>${event.time} · ${event.place}</p>
            <p>${event.note}</p>
          </div>
          <div class="card-actions">
            <span class="tag">${event.kind}</span>
            ${
              shouldShowRoute(event)
                ? `<a class="route-link" href="${getRouteUrl(event.place)}" target="_blank" rel="noreferrer">Route öffnen</a>`
                : ""
            }
          </div>
        </article>
      `;
    })
    .join("");
}

function setActiveButton(buttons, selectedButton, activeClass) {
  buttons.forEach((button) => button.classList.remove(activeClass));
  selectedButton.classList.add(activeClass);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    setActiveButton(filterButtons, button, "is-active");
    renderEvents();
  });
});

monthButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeMonth = button.dataset.month;
    setActiveButton(monthButtons, button, "is-active");
    renderEvents();
  });
});

searchInput.addEventListener("input", renderEvents);

renderSpotlight();
renderEvents();
