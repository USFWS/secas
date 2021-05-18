const createListItem = (result) => {
  const permalink = result.url.replace('.html', '').trim();
  return `
    <li class="search">
      <a href="${permalink}">
        <h2>${result.title}</h2>
      </a>
      <p>${result.description}</p>
    </li>
  `;
};

module.exports = results.map(createListItem).join('');
