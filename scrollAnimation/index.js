const articleList = document.getElementById('article-list');
const articleListPagination = document.getElementById('article-list-pagination');

let page = 0;

function getPageId(n) {
  return 'article-page-' + n;
}

function getDocumentHeight() {
	const body = document.body;
	const html = document.documentElement;
	
	return Math.max(
		body.scrollHeight, body.offsetHeight,
		html.clientHeight, html.scrollHeight, html.offsetHeight
	);
};

function getScrollTop() {
	return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function getArticleImage() {
	const hash = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	const image = new Image;
	image.className = 'article-list__item__image article-list__item__image--loading';
	image.src = 'http://api.adorable.io/avatars/250/' + hash;
	
	image.onload = function() {
		image.classList.remove('article-list__item__image--loading');
	};
	
	return image;
}


function getArticle() {
  const articleImage = getArticleImage();
  const article = document.createElement('article');
  article.className = 'article-list__item';
  article.appendChild(articleImage);
  return article;
}

function getArticlePage (page, articlesPerPage = 16) {
  const pageElement = document.createElement('div');
  pageElement.id = getPageId(page);
  pageElement.className = 'article-list__page';

  while(articlesPerPage--) {
    pageElement.appendChild(getArticle());
  }
  return pageElement;

}

function addPaginationPage(page) {
	const pageLink = document.createElement('a');
	pageLink.href = '#' + getPageId(page);
	pageLink.innerHTML = page;
	
	const listItem = document.createElement('li');
	listItem.className = 'article-list__pagination__item';
	listItem.appendChild(pageLink);
	
	articleListPagination.appendChild(listItem);
	
	if (page === 2) {
		articleListPagination.classList.remove('article-list__pagination--inactive');
	}
}

function fetchPage(page) {
	articleList.appendChild(getArticlePage(page));
}

function addPage(page) {
	fetchPage(page);
	addPaginationPage(page);
}



addPage(++page);

window.addEventListener('scroll', () => {
  if(getDocumentHeight() - window.innerHeight >= getScrollTop()) {
    return;
    addPage(++page);
  }
})


/*
event
window.addEventListener('scroll', () => {
  const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
  if(scrollTop + clientHeight >= scrollHeight) {
    showScroll();
  }
})


function showScroll() {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show');
    setTimeout(() => {
      createPost();
    }, 300);
  }, 1000)
}
*/ 
