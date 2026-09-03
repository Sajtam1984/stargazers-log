const list = document.querySelector("#repository-list");

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium"
  }).format(new Date(`${date}T00:00:00`));
}

function renderRepositories(repositories) {
  list.replaceChildren();

  repositories.forEach((repository) => {
    const item = document.createElement("li");
    item.className = "repository";

    const heading = document.createElement("div");
    heading.className = "repository-heading";

    const link = document.createElement("a");
    link.href = repository.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = repository.repository;

    const date = document.createElement("time");
    date.dateTime = repository.starred_at;
    date.textContent = `Starred ${formatDate(repository.starred_at)}`;

    heading.append(link, date);

    const description = document.createElement("p");
    description.textContent = repository.description;

    const metadata = document.createElement("div");
    metadata.className = "repository-meta";
    metadata.textContent = `Language: ${repository.language}`;

    item.append(heading, description, metadata);
    list.append(item);
  });
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    list.innerHTML = "<li class=\"status\">Unable to load starred repositories.</li>";
    console.error(error);
  }
}

loadRepositories();
