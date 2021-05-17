const createListItem = (result) => {
  const permalink = result.url.replace('.html', '').trim();
  console.log(result);
  const tags = result.tags ? result.tags.map(tag => `<li class="tag">${tag}</li>`).join('') : '';
  return `
    <li class="search">
      <a href="${permalink}">
        <h2>${result.title}</h2>
      </a>
      <ul class="result-tags">
        ${tags}
      </ul>
      <p>${result.description}</p>
    </li>
  `;
};

const result = results => results.map(createListItem).join('');

module.exports = result;
