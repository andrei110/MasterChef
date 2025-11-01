(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const h=async function(t){try{const e=await fetch(t);console.log(e);const s=await e.json();if(!e.ok)throw new Error(`Error: ${s.message} (${s.code})`);return s}catch(e){throw e}},y=t=>`https://api.spoonacular.com/recipes/${t}/information?includeNutrition=true`,$="https://api.spoonacular.com/recipes/complexSearch",m="apiKey=8cc85375e59d42b687c87e8f0de98833",S=15,r={recipe:{},search:{query:"",results:[],page:1,resultsPerPage:S}},w=async function(t){try{const e=await h(`${y(t)}&${m}`);console.log(e),r.recipe={id:e.id,title:e.title,publisher:e.sourceName,sourceUrl:e.sourceUrl,image:e.image,servings:1,cookingTime:e.readyInMinutes,instructions:e.analyzedInstructions,ingredients:e.nutrition.ingredients,nutrition:{protein:e.nutrition.nutrients.find(s=>s.name==="Protein").amount,fats:e.nutrition.nutrients.find(s=>s.name==="Fat").amount,carbs:e.nutrition.nutrients.find(s=>s.name==="Carbohydrates").amount,calories:e.nutrition.nutrients.find(s=>s.name==="Calories").amount}},console.log(r.recipe)}catch(e){throw console.error(`${e}💥💥`),e}},M=async function(t){try{r.search.query=t;const e=await h(`${$}?query=${t}&${m}&titleMatch=${t}&number=100`);console.log(e),r.search.results=e.results.map(s=>({id:s.id,image:s.image,title:s.title}))}catch(e){throw console.error(`❌❌${e}`),e}},v=function(t=r.search.page){r.search.page=t;const e=(t-1)*r.search.resultsPerPage,s=t*r.search.resultsPerPage;return r.search.results.slice(e,s)},P=function(t){t<1||(r.recipe.servings=t,r.recipe.nutrition.initial||(console.log("Creare nutrition initial"),r.recipe.nutrition.initial={},Object.entries(r.recipe.nutrition).map(([e,s])=>!e.includes("initial")&&(r.recipe.nutrition.initial[e]=s)),r.recipe.ingredients.map(e=>e.amountInitial=e.amount)),Object.entries(r.recipe.nutrition).map(([e,s])=>!e.includes("initial")&&(r.recipe.nutrition[e]=+(r.recipe.nutrition.initial[e]*t).toFixed(2))),r.recipe.ingredients.map(e=>e.amount=+(e.amountInitial*t).toFixed(2)))};class u{_data;searchTitle=document.querySelector(".search-results__title");overlay=document.querySelector(".overlay");bp800=window.matchMedia("(max-width: 800px)");render(e){this._data=e,console.log(this._data);const s=this.generateMarkup();this._clearParentEl(),this._parentElement.insertAdjacentHTML("afterbegin",s)}setOverlayHeight(){document.querySelector(".overlay").style.height=`${document.querySelector(".container").getBoundingClientRect().height}px`}renderError(e){this._clearParentEl()}_clearParentEl(){this._parentElement.innerHTML=""}clearSearchTitle(){this.searchTitle.innerHTML=""}}const o="/assets/icons-DnzRpXm9.svg";class p extends u{_parentElement=document.querySelector(".recipe");_overlay=document.querySelector(".overlay");_errorMessage="";_message="";addHandlerRender(e){["hashchange","load"].forEach(s=>window.addEventListener(s,e))}addHandlerServings(e){this._parentElement.addEventListener("click",function(s){s.preventDefault();const c=s.target.closest(".btn__servings");if(!c)return;const n=+c.dataset.servings;e(n)})}generateMarkup(){return console.log(this),`
      <div class="recipe__header">
          <div class="recipe__calories">
            <div class="calories calories__container">
              <h1 class="calories__title">Calories</h1>
              <h1 class="calories__value">${Math.floor(this._data.nutrition.calories)} <span>kcal</span></h1>
            </div>
            <div class="calories__protein calories__container">
              <h3 class="calories__macro calories__protein__title">Protein</h3>
              <h3
                class="calories__macro calories__macro__value calories__protein__value"
              >
                ${this._data.nutrition.protein} <span>g</span>
              </h3>
            </div>
            <div class="calories__fat calories__container">
              <h3 class="calories__macro calories__fat__title">Fats</h3>
              <h3
                class="calories__macro calories__macro__value calories__fat__value"
              >
                ${this._data.nutrition.fats} <span>g</span>
              </h3>
            </div>
            <div class="calories__carbo calories__container">
              <h3 class="calories__macro calories__carbo__title">
                Carbohydrates
              </h3>
              <h3
                class="calories__macro calories__macro__value calories__carbo__value"
              >
                ${this._data.nutrition.carbs} <span>g</span>
              </h3>
            </div>
          </div>

          <figure class="recipe__fig">
            <img
              src="${this._data.image}"
              alt="Recipe Photo"
              class="recipe__img"
            />
            <h1 class="title__main recipe__title">
              <span
                >${this._data.title}</span
              >
            </h1>
          </figure>
        </div>

        
        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${o}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-minutes">${this._data.cookingTime}</span>
            <span class="recipe__info-text">Minutes</span>
          </div>

          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${o}#icon-people_alt"></use>
            </svg>
            <span class="recipe__info-data recipe__info-servings">${this._data.servings}</span>
            <span class="recipe__info-text">${this._data.servings>1?"Servings":"Serving"}</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn__servings btn__servings--plus" data-servings=${this._data.servings+1}>
                <svg>
                  <use href="${o}#icon-add_circle_outline"></use>
                </svg>
              </button>
              <button class="btn--tiny btn__servings btn__servings--minus" data-servings=${this._data.servings-1}>
                <svg>
                  <use href="${o}#icon-minus-outline"></use>
                </svg>
              </button>
            </div>
          </div>
          <button class="btn--round">
            <svg>
              <use href="${o}#icon-bookmark-outline"></use>
            </svg>
          </button>
        </div>

        
        <div class="recipe__ingredients">
          <h2 class="title--secondary">Recipe Ingredients</h2>
          <ul class="recipe__ingredients-list">
            ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
          </ul>
        </div>


        <div class="recipe__instructions">
          <div class="recipe__instructions-container">
            <h2 class="title--secondary">How to cook it</h2>
            <ul class="recipe__instructions-list">
              ${this._data.instructions.map(this._generateMarkupInstructions).join("")}
            </ul>
          </div>
        </div>


        <div class="recipe__directions">
          <div class="recipe__directions-container">
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span>${this._data.publisher}</span>. Please check out directions at their
              website.
            </p>
            <a href="${this._data.sourceUrl}" class="btn__recipe">
              <span class="btn__recipe-text">Directions</span>
              <svg class="btn__recipe-icon">
                <use href="${o}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </div>
    `}_generateMarkupIngredient(e){return`
            <li class="recipe__ingredients-item">
              <svg class="recipe__ingredients-icon">
                <use href="${o}#icon-check"></use>
              </svg>
              <div class="recipe__ingredients-quantity">${e.amount}</div>
              <div class="recipe__ingredients-description">
                <span class="recipe__ingredients-unit">${e.unit}</span>
                ${e.name}
              </div>
            </li>
    `}_generateMarkupInstructions(e){return`
        <li class="recipe__instructions-item">
          ${e.name?`
              <h2 class="title--tetriary recipe__instructions-heading">
                <svg class="recipe__instructions-icon">
                  <use href="${o}#icon-arrow-right"></use>
                </svg>
                ${e.name}
              </h2>
            `:""}
          
          ${e.steps.map(p.prototype._generateMarkupInstructionsSteps).join("")}
        </li>
    `}_generateMarkupInstructionsSteps(e){return`
        <p class="recipe__instructions-text">
          <span>${e.number}</span>${e.step}
        </p>
    `}}const l=new p;class k extends u{_parentElement=document.querySelector(".search-results__list");_sideBarBtn=document.querySelector(".search-results__btn");_errorMessage="";_message="";generateMarkup(){return this._data.map(this._generateMarkupPreview).join("")}_generateMarkupPreview(e){return`
        <li class="preview">
            <a href="#${e.id}" class="preview__link">
              <figure class="preview__fig">
                <img src=${e.image} alt="Recipe name" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">
                  ${e.title}
                </h4>
              </div>
            </a>
        </li>
    `}}const f=new k;class B extends u{_parentElement=document.querySelector(".search");_inputSearch=document.querySelector(".search__field");_errorMessage="";_message="";addHandlerSearch(e){this._parentElement.addEventListener("submit",function(s){s.preventDefault(),e()})}getQuery(){const e=this._inputSearch.value;this._clearInput();const s=`<span>${e[0].toUpperCase()+e.slice(1)} Recipes</span>`;return this.clearSearchTitle(),this.searchTitle.insertAdjacentHTML("afterbegin",s),e}_clearInput(){this._inputSearch.value=""}}const b=new B;class E extends u{_parentElement=document.querySelector(".pagination");_errorMessage="";_message="";addHandlerPagination(e){this._parentElement.addEventListener("click",function(s){s.preventDefault();const c=s.target.closest(".btn-pagination");if(!c)return;const n=+c.dataset.goto;e(n)})}_generateMarkupBtnPrev(e){return`
        <button class="btn btn-pagination btn-pagination__prev" data-goTo=${e-1}>
            <svg class="pagination__icon">
              <use href="${o}#icon-arrow-left"></use>
            </svg>
        </button>
    `}_generateMarkupBtnNext(e){return`
        <button class="btn btn-pagination btn-pagination__next" data-goTo=${e+1}>
            <svg class="pagination__icon">
              <use href="${o}#icon-arrow-right"></use>
            </svg>
        </button>
    `}_generateMarkupBtnNumber(e){return`
        <button class="btn btn-pagination btn-pagination__numb" data-goTo="${e}">
            <span>${e}</span>
        </button>
    `}_generateMarkupBtnDots(){return`
        <button class="btn btn-pagination btn-pagination__dots" disabled>
            <span>...</span>
        </button>
    `}generateMarkup(){const e=this._data.page,s=this._data.results.length,c=this._data.resultsPerPage,n=Math.ceil(s/c);let i="";if(n===1)return"";e>1&&(i+=this._generateMarkupBtnPrev(e)),e===3&&(i+=this._generateMarkupBtnNumber(1)),e>3&&(i+=this._generateMarkupBtnNumber(1)+this._generateMarkupBtnDots());for(let a=e-1;a<=e+1;a++)a!==0&&(a>n||(i+=`
        <button class="btn btn-pagination btn-pagination__numb ${e===a?"btn-pagination__active":""}" data-goTo=${a}>
            <span>${a}</span>
        </button>
    `));return e<n-2&&(i+=this._generateMarkupBtnDots()+this._generateMarkupBtnNumber(n)),e===n-2&&(i+=this._generateMarkupBtnNumber(n)),e<n&&(i+=this._generateMarkupBtnNext(e)),i}}const g=new E;class d extends u{_parentElement=document.querySelector(".search-results");_sideBarBtn=document.querySelector(".search-results__btn");_errorMessage="";_message="";addHandlerSideBar(){this._sideBarBtn.addEventListener("click",function(e){e.preventDefault(),document.querySelector(".search-results").classList.toggle("search-results__sideBar-toggle"),document.querySelector(".search-results").classList.contains("search-results__sideBar-toggle")?document.querySelector(".overlay").classList.add("hidden"):document.querySelector(".overlay").classList.remove("hidden"),setTimeout(()=>d.prototype.setOverlayHeight(),500)})}addHandlerOverlay(){document.querySelector(".overlay").addEventListener("click",function(){d.prototype.closeSideBar()})}unhideSideBarBtn(){this.bp800.matches&&this._sideBarBtn.classList.remove("hidden")}closeSideBar(){document.querySelector(".search-results").classList.add("search-results__sideBar-toggle"),document.querySelector(".overlay").classList.add("hidden")}}const _=new d,L=async function(){try{const t=window.location.hash.slice(1);if(console.log(t),!t)return;_.closeSideBar(),await w(t),l.render(r.recipe),l.setOverlayHeight()}catch(t){console.error(t)}},q=async function(){try{const t=b.getQuery();if(console.log(t),!t)return;_.unhideSideBarBtn(),await M(t),console.log(r.search),f.render(v(1)),g.render(r.search)}catch(t){console.error(`❌🥲${t}`)}},R=function(t){console.log(t),f.render(v(t)),g.render(r.search)},T=function(t){console.log(t),P(t),console.log(r.recipe),l.render(r.recipe)},H=function(){l.addHandlerRender(L),l.addHandlerServings(T),b.addHandlerSearch(q),g.addHandlerPagination(R),_.addHandlerSideBar(),_.addHandlerOverlay()};H();
