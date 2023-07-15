import { FIRST_NEWS_PAGE_INDEX } from "./constant.js";

const $pageInfo = document.createElement('div');

/**
 해당 카테고리를 클릭했다가 다른 카테고리를 클릭하면
 해당 카테고리는 progress 해제됨
 */
function removeProgress(){
  const $allCategoryContainer = document.querySelectorAll('.press-news-bar li');
  const allCategoryContainer = Array.from($allCategoryContainer);
  allCategoryContainer.forEach(categoryContainer => {
    if(categoryContainer.classList.contains('progress')){
      categoryContainer.classList.remove('progress');
      categoryContainer.classList.add('non-progress')
      categoryContainer.removeChild($pageInfo);
    }
  })
}

/** 
 progressbar의 현재 페이지 업데이트
 */

function drawProgressPage(shuffledPressNews, clickedCategory, newsPageIndex){
  $pageInfo.innerHTML =  `
  <div class="display-bold12 text-white-default">${newsPageIndex + 1}</div>
  <img src="./assets/Icon/division.svg">
  <div class="display-bold12 text-white-weak">${shuffledPressNews[clickedCategory].length}</div>
`
}

/**
 페이지 넘기면 progressbar의 현재 페이지 업데이트
 */

function setProgressPage(shuffledPressNews, clickedCategory, newsPage) {
  drawProgressPage(shuffledPressNews, clickedCategory, newsPage);
}

/**
 클릭한 카테고리에 대한 progress를 보여줌(미완성)
 */
function showProgress(shuffledPressNews, clickedCategory, newsPage) {
  removeProgress();
  const $CategoryContainer = document.querySelector(`.press-news-bar li:nth-child(${clickedCategory + 1})`);
  const $Category = document.querySelector(`.press-news-bar li:nth-child(${clickedCategory + 1}) .progress-category`);

  $CategoryContainer.classList.add('progress');
  $CategoryContainer.classList.remove('non-progress')
  
  $pageInfo.classList.add('progress-page');

  drawProgressPage(shuffledPressNews, clickedCategory, FIRST_NEWS_PAGE_INDEX);
  $CategoryContainer.appendChild($pageInfo);
}

export  {showProgress, setProgressPage};