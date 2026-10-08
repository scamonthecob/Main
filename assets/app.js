"use strict";
(() => {
  const labels = {
    unknown: ["Payment unknown", "badge-unknown"],
    winner_reports_unpaid: ["Winner reports unpaid", "badge-unpaid"],
    winner_reports_paid: ["Winner reports paid", "badge-paid"],
    payment_evidence_reviewed: ["Payment evidence reviewed", "badge-reviewed"],
    winner_reports_accepted_subs: ["Winner accepted subs instead", "badge-subs"]
  };
  const announcementLabels = {needs_review:"Announcement needs review", reviewed:"Announcement reviewed"};
  function dateLabel(value, fallback) {
    if (!value) return fallback || "Date unconfirmed";
    return new Intl.DateTimeFormat("en-GB", {day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(new Date(value + "T00:00:00Z"));
  }
  function stamp(seconds) {
    const h = Math.floor(seconds / 3600), m = Math.floor(seconds % 3600 / 60), s = seconds % 60;
    return [h,m,s].map(n => String(n).padStart(2,"0")).join(":");
  }
  function make(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }
  function safeEvidenceLink(value) {
    try {
      const url = new URL(value, location.href);
      return url.protocol === "https:" || (url.origin === location.origin && url.protocol !== "javascript:");
    } catch { return false; }
  }
  const dataset = window.PRIZE_DATA;
  if (!dataset || !Array.isArray(dataset.records)) {
    document.querySelector("#data-message").textContent = "The current data file could not be loaded. The initial record is shown above.";
    return;
  }
  const records = [...dataset.records].sort((a,b) => (b.winDate || "").localeCompare(a.winDate || "") || a.id.localeCompare(b.id));
  const rows = document.createDocumentFragment();
  records.forEach(record => {
    const row = make("tr"); row.id = record.id;
    const name = make("th",record.winner);name.scope="row";name.append(make("small",record.id));
    const date = make("td", dateLabel(record.winDate, record.dateDisplay));
    if (record.dateNote) date.title = record.dateNote;
    const hasCashValue = typeof record.prize.amount === "number" && Boolean(record.prize.currency);
    const prizeText = hasCashValue
      ? new Intl.NumberFormat("en-US",{style:"currency",currency:record.prize.currency,maximumFractionDigits:2}).format(record.prize.amount) + " " + record.prize.currency
      : record.prize.description || record.prize.kind;
    const prize = make("td",prizeText);
    if (hasCashValue || prizeText !== record.prize.kind) prize.append(make("small",record.prize.kind));
    const payment = make("td"); const status = labels[record.paymentStatus] || labels.unknown;
    payment.append(make("span",status[0],"badge " + status[1]));
    if (record.paymentCheckedAt) payment.append(make("small","Checked " + dateLabel(record.paymentCheckedAt)));
    const evidence = make("td");
    if (record.vodId && Number.isInteger(record.timestampSeconds)) {
      const h=Math.floor(record.timestampSeconds/3600),m=Math.floor(record.timestampSeconds%3600/60),s=record.timestampSeconds%60;
      const link=make("a","VOD · " + stamp(record.timestampSeconds));
      link.href="https://www.twitch.tv/videos/" + encodeURIComponent(record.vodId) + "?t=" + h + "h" + m + "m" + s + "s";
      link.target="_blank";link.rel="noopener noreferrer";evidence.append(link);
    } else evidence.append(make("span","VOD not yet supplied"));
    evidence.append(make("small",announcementLabels[record.announcementStatus] || "Announcement needs review"));
    (record.evidenceLinks || []).forEach(source => {
      if (!safeEvidenceLink(source.url)) return;
      const wrap=make("small"),link=make("a",source.label);link.href=source.url;link.target="_blank";link.rel="noopener noreferrer";wrap.append(link);evidence.append(wrap);
    });
    if (record.notes) {
      const details=make("details",undefined,"record-notes");details.append(make("summary","Record notes"),make("p",record.notes));evidence.append(details);
    }
    row.append(name,date,prize,payment,evidence);rows.append(row);
  });
  const tbody=document.querySelector("#winner-rows");tbody.replaceChildren(rows);
  if (!records.length) {
    const row=make("tr"),cell=make("td","No winner records have been published yet.");cell.colSpan=5;row.append(cell);tbody.append(row);
  }
  document.querySelector("#count-records").textContent=records.length;
  document.querySelector("#count-reviewed").textContent=records.filter(r=>r.announcementStatus==="reviewed").length;
  document.querySelector("#count-paid").textContent=records.filter(r=>["winner_reports_paid","payment_evidence_reviewed"].includes(r.paymentStatus)).length;
  const updated=document.querySelector("#updated");updated.textContent=dateLabel(dataset.updatedAt);updated.dateTime=dataset.updatedAt;
  document.querySelector("#data-message").textContent=records.length + " raffle " + (records.length===1?"record is":"records are") + " listed. Race winners, Fall Bash prizes and the 6 Years Celebration VOD still need to be added; this is not yet a complete archive.";
})();
