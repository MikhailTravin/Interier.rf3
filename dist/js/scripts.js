const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//========================================================================================================================================================

if (document.querySelector('.block-reviews__slider')) {
  const swiperReviews = new Swiper('.block-reviews__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 16,
    speed: 800,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      prevEl: '.block-reviews-arrow-prev',
      nextEl: '.block-reviews-arrow-next',
    },
    on: {
      init: function () {
        updateFraction(this);
      },
      slideChange: function () {
        updateFraction(this);
      },
    },
  });

  function updateFraction(swiper) {
    const currentEl = document.querySelector('.block-reviews-pagination-fraction .swiper-pagination-current');
    const totalEl = document.querySelector('.block-reviews-pagination-fraction .swiper-pagination-total');

    if (currentEl && totalEl) {
      let currentSlide;
      if (swiper.params.loop) {
        currentSlide = swiper.realIndex + 1;
      } else {
        currentSlide = swiper.activeIndex + 1;
      }
      currentEl.textContent = currentSlide.toString();

      let totalSlides;
      if (swiper.params.loop) {
        totalSlides = swiper.slides.length / 2;
      } else {
        totalSlides = swiper.slides.length;
      }

      totalEl.textContent = totalSlides.toString();
    }
  }
}

document.querySelectorAll('.product-right-filter__options').forEach((container) => {
  const sliderEl = container.querySelector('.product-right-filter__slider');
  const prevEl = container.querySelector('.options-arrow-prev');
  const nextEl = container.querySelector('.options-arrow-next');

  new Swiper(sliderEl, {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 0,
    speed: 800,
    navigation: {
      prevEl,
      nextEl,
    },
  });
});

document.querySelectorAll('.card-product__slider').forEach((slider) => {
  const cardsContainer = slider.closest('.card-product__images');

  if (!cardsContainer) return;

  const pagination = cardsContainer.querySelector('.card-product-pagination');

  const config = {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 800,
  };

  if (pagination) {
    config.pagination = {
      el: pagination,
      clickable: true,
    };
  }

  new Swiper(slider, config);
});

document.querySelectorAll('.images-product').forEach((product) => {
  const thumbsEl = product.querySelector('.images-product__thumb');
  const mainEl = product.querySelector('.images-product__slider');

  if (!thumbsEl || !mainEl) return;

  const thumbsSwiper = new Swiper(thumbsEl, {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 5,
    speed: 400,
    preloadImages: true,
    direction: 'horizontal',
    breakpoints: {
      550: {
        spaceBetween: 5,
        direction: 'vertical',
      },
      992: {
        spaceBetween: 15,
        direction: 'vertical',
      },
      1300: {
        slidesPerView: 7,
        spaceBetween: 10,
        direction: 'vertical',
      },
    },

  });

  const mainSwiper = new Swiper(mainEl, {
    thumbs: {
      swiper: thumbsSwiper,
    },
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 400,
    preloadImages: true,
    navigation: {
      prevEl: '.block-product-arrow-prev',
      nextEl: '.block-product-arrow-next',
    },
    on: {
      init: function () {
        updateFraction(this);
      },
      slideChange: function () {
        updateFraction(this);
      },
    },
  });

  function updateFraction(swiper) {
    const currentEl = document.querySelector('.block-product-pagination-fraction .swiper-pagination-current');
    const totalEl = document.querySelector('.block-product-pagination-fraction .swiper-pagination-total');

    if (currentEl && totalEl) {
      let currentSlide;
      if (swiper.params.loop) {
        currentSlide = swiper.realIndex + 1;
      } else {
        currentSlide = swiper.activeIndex + 1;
      }
      currentEl.textContent = currentSlide.toString();

      let totalSlides;
      if (swiper.params.loop) {
        totalSlides = swiper.slides.length / 2;
      } else {
        totalSlides = swiper.slides.length;
      }

      totalEl.textContent = totalSlides.toString();
    }
  }
});

document.querySelectorAll('.slide-block-gallery__slider').forEach((slider) => {
  const galleryContainer = slider.closest('.slide-block-gallery__images');

  if (!galleryContainer) return;

  const pagination = galleryContainer.querySelector('.slide-block-gallery-pagination');
  const prevBtn = galleryContainer.querySelector('.slide-block-gallery-arrow-prev');
  const nextBtn = galleryContainer.querySelector('.slide-block-gallery-arrow-next');

  const config = {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 800,
  };

  if (pagination) {
    config.pagination = {
      el: pagination,
      clickable: true,
    };
  }

  if (prevBtn && nextBtn) {
    config.navigation = {
      prevEl: prevBtn,
      nextEl: nextBtn,
    };
  }

  new Swiper(slider, config);
});

if (document.querySelector('.block-product-catalog__slider')) {
  const swiperCatalog = new Swiper('.block-product-catalog__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 24,
    speed: 800,
    pagination: {
      el: '.product-catalog-pagination',
      clickable: true,
    },
    breakpoints: {
      1544: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  });
}

if (document.querySelector('.catalog-cats__slider')) {
  const catalogCatsBody = document.querySelector('.catalog-cats__body');

  const toggleEdgeClasses = (swiper) => {
    catalogCatsBody.classList.toggle('slide-start', swiper.isBeginning);
    catalogCatsBody.classList.toggle('slide-end', swiper.isEnd);
  };

  const catalogCatsSwiper = new Swiper('.catalog-cats__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 8,
    speed: 800,
    navigation: {
      prevEl: '.options-arrow-prev',
      nextEl: '.options-arrow-next',
    },
    on: {
      init: toggleEdgeClasses,
      slideChange: toggleEdgeClasses,
      fromEdge: toggleEdgeClasses,
      reachBeginning: toggleEdgeClasses,
      reachEnd: toggleEdgeClasses,
      resize: toggleEdgeClasses,
      observerUpdate: toggleEdgeClasses,
      setTranslate: toggleEdgeClasses,
    },
  });
}

if (document.querySelector('.block-benefits2__slider')) {
  const swiperBenefits = new Swiper('.block-benefits2__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 20,
    speed: 800,
    navigation: {
      prevEl: '.benefits2-arrow-prev',
      nextEl: '.benefits2-arrow-next',
    },
  });
}

//========================================================================================================================================================

Fancybox.bind("[data-fancybox]", {
  // ваши опции
});

//========================================================================================================================================================

//Попап
class Popup {
  constructor(options) {
    let config = {
      logging: true,
      init: true,
      attributeOpenButton: "data-popup",
      attributeCloseButton: "data-close",
      fixElementSelector: "[data-lp]",
      youtubeAttribute: "data-popup-youtube",
      youtubePlaceAttribute: "data-popup-youtube-place",
      setAutoplayYoutube: true,
      classes: {
        popup: "popup",
        popupContent: "popup__content",
        popupActive: "popup_show",
        bodyActive: "popup-show"
      },
      focusCatch: true,
      closeEsc: true,
      bodyLock: true,
      hashSettings: {
        goHash: true
      },
      on: {
        beforeOpen: function () { },
        afterOpen: function () { },
        beforeClose: function () { },
        afterClose: function () { }
      }
    };
    this.youTubeCode;
    this.isOpen = false;
    this.targetOpen = {
      selector: false,
      element: false
    };
    this.previousOpen = {
      selector: false,
      element: false
    };
    this.lastClosed = {
      selector: false,
      element: false
    };
    this._dataValue = false;
    this.hash = false;
    this._reopen = false;
    this._selectorOpen = false;
    this.lastFocusEl = false;
    this._focusEl = ["a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'];
    this.options = {
      ...config,
      ...options,
      classes: {
        ...config.classes,
        ...options?.classes
      },
      hashSettings: {
        ...config.hashSettings,
        ...options?.hashSettings
      },
      on: {
        ...config.on,
        ...options?.on
      }
    };
    this.bodyLock = false;
    this.previousMenuState = false;
    this.options.init ? this.initPopups() : null;
    this._resizeObserver = null;
    this._mutationObserver = null;
  }

  initPopups() {
    this.eventsPopup();
  }

  eventsPopup() {
    document.addEventListener("click", function (e) {
      const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
      if (buttonOpen) {
        e.preventDefault();
        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
        if ("error" !== this._dataValue) {
          if (!this.isOpen) this.lastFocusEl = buttonOpen;
          this.targetOpen.selector = `${this._dataValue}`;
          this._selectorOpen = true;
          this.open();
          return;
        }
        return;
      }
      const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
      if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
    }.bind(this));

    document.addEventListener("keydown", function (e) {
      if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
      if (this.options.focusCatch && 9 == e.which && this.isOpen) {
        this._focusCatch(e);
        return;
      }
    }.bind(this));

    if (this.options.hashSettings.goHash) {
      window.addEventListener("hashchange", function () {
        if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
      }.bind(this));
      window.addEventListener("load", function () {
        if (window.location.hash) this._openToHash();
      }.bind(this));
    }

    window.addEventListener("resize", this._handleResize.bind(this));
  }

  _calculateBottomHeight(popupElement) {
    const popupContent = popupElement.querySelector(`.${this.options.classes.popupContent}`);
    if (!popupContent) return;

    const popupTop = popupContent.querySelector('.popup__top');
    const popupBody = popupContent.querySelector('.popup__body');
    const popupCenter = popupBody ? popupBody.querySelector('.popup-center') : null;
    const popupBottom = popupBody ? popupBody.querySelector('.popup__bottom') : null;

    if (!popupTop || !popupBottom || !popupCenter) return;

    const topHeight = popupTop.offsetHeight;
    const centerHeight = popupCenter.offsetHeight;

    const bodyStyles = window.getComputedStyle(popupBody);
    const bodyPaddingTop = parseFloat(bodyStyles.paddingTop) || 0;
    const bodyPaddingBottom = parseFloat(bodyStyles.paddingBottom) || 0;
    const bodyPadding = bodyPaddingTop + bodyPaddingBottom;

    const vh = window.innerHeight;
    const maxHeight = vh - topHeight - centerHeight - bodyPadding;

    popupBottom.style.maxHeight = `${Math.max(maxHeight, 100)}px`;
  }

  _calculateCloseButtonPosition() {
    if (!this.targetOpen.element) return;

    const popupContent = this.targetOpen.element.querySelector(`.${this.options.classes.popupContent}`);
    const closeButton = this.targetOpen.element.querySelector('.popup-close-other');

    if (popupContent && closeButton) {
      const popupRect = this.targetOpen.element.getBoundingClientRect();
      const contentRect = popupContent.getBoundingClientRect();
      const topPosition = contentRect.top - popupRect.top + 13;
      closeButton.style.top = topPosition + 'px';
    }
  }

  _handleResize() {
    if (this.isOpen && this.previousOpen.element) {
      this._calculateBottomHeight(this.previousOpen.element);
      this._calculateCloseButtonPosition();
    }
  }

  open(selectorValue) {
    if (bodyLockStatus) {
      this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
      if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      if (this.isOpen) {
        this._reopen = true;
        this.close();
      }
      if (!this._reopen) this.previousActiveElement = document.activeElement;
      this.targetOpen.element = document.querySelector(this.targetOpen.selector);
      if (this.targetOpen.element) {
        this.previousMenuState = document.documentElement.classList.contains('menu-open');
        if (this.previousMenuState) {
          if (typeof menuClose === 'function') {
            menuClose();
          } else {
            document.documentElement.classList.remove("menu-open");
            if (typeof bodyUnlock === 'function') bodyUnlock();
          }
        }
        if (this.youTubeCode) {
          const codeVideo = this.youTubeCode;
          const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
          const iframe = document.createElement("iframe");
          iframe.setAttribute("allowfullscreen", "");
          const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
          iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
          iframe.setAttribute("src", urlVideo);
          if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
          }
          this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
        }
        const videoElement = this.targetOpen.element.querySelector("video");
        if (videoElement) {
          videoElement.muted = true;
          videoElement.currentTime = 0;
          videoElement.play().catch((e => console.error("Autoplay error:", e)));
        }
        if (this.options.hashSettings.location) {
          this._getHash();
          this._setHash();
        }
        this.options.on.beforeOpen(this);
        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
          detail: {
            popup: this
          }
        }));
        this.targetOpen.element.classList.add(this.options.classes.popupActive);
        document.documentElement.classList.add(this.options.classes.bodyActive);
        if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
        this.targetOpen.element.setAttribute("aria-hidden", "false");
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;
        this._selectorOpen = false;
        this.isOpen = true;

        setTimeout(() => {
          this._calculateBottomHeight(this.targetOpen.element);
          this._calculateCloseButtonPosition();
        }, 50);

        this._setupObserver(this.targetOpen.element);

        this.options.on.afterOpen(this);
        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
          detail: {
            popup: this
          }
        }));
      }
    }
  }

  _setupObserver(popupElement) {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }

    const popupBody = popupElement.querySelector('.popup__body');
    if (!popupBody) return;

    const popupCenter = popupBody.querySelector('.popup-center');
    const popupBottom = popupBody.querySelector('.popup__bottom');

    if (!popupCenter || !popupBottom) return;

    this._mutationObserver = new MutationObserver(() => {
      this._calculateBottomHeight(popupElement);
      this._calculateCloseButtonPosition();
    });

    this._mutationObserver.observe(popupCenter, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });
  }

  close(selectorValue) {
    if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
    if (!this.isOpen || !bodyLockStatus) return;

    this.options.on.beforeClose(this);
    document.dispatchEvent(new CustomEvent("beforePopupClose", {
      detail: {
        popup: this
      }
    }));

    if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";

    this.previousOpen.element.classList.remove(this.options.classes.popupActive);
    const videoElement = this.previousOpen.element.querySelector("video");
    if (videoElement) videoElement.pause();
    this.previousOpen.element.setAttribute("aria-hidden", "true");

    const popupBottom = this.previousOpen.element.querySelector('.popup__bottom');
    if (popupBottom) {
      popupBottom.style.maxHeight = '';
    }

    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
      this._mutationObserver = null;
    }

    if (!this._reopen) {
      document.documentElement.classList.remove(this.options.classes.bodyActive);
      !this.bodyLock ? bodyUnlock() : null;
      this.isOpen = false;
      if (this.previousMenuState) {
        if (typeof menuOpen === 'function') {
          menuOpen();
        } else {
          document.documentElement.classList.add("menu-open");
          if (typeof bodyLock === 'function') bodyLock();
        }
      }
    }

    document.dispatchEvent(new CustomEvent("afterPopupClose", {
      detail: {
        popup: this
      }
    }));
    this.options.on.afterClose(this);
  }

  _getHash() {
    if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
  }

  _openToHash() {
    let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
    const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
    if (buttons && classInHash) this.open(classInHash);
  }

  _setHash() {
    history.pushState("", "", this.hash);
  }

  _removeHash() {
    history.pushState("", "", window.location.href.split("#")[0]);
  }

  _focusCatch(e) {
    const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);
    if (e.shiftKey && 0 === focusedIndex) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }
}
modules_flsModules.popup = new Popup({});

function menuOpen() {
  bodyLock();
  document.documentElement.classList.add("menu-open");
}
function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove("menu-open");
}

//========================================================================================================================================================

//Спойлер
function spollers() {
  const spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
    const spollersRegular = Array.from(spollersArray).filter((function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    }));
    if (spollersRegular.length) initSpollers(spollersRegular);

    spollersArray.forEach(spollersBlock => {
      const mediaQuery = spollersBlock.dataset.spollers;
      if (mediaQuery) {
        const [maxWidth, type] = mediaQuery.split(",");
        const width = parseInt(maxWidth);

        if (type === "max" && window.innerWidth <= width) {
          if (!spollersBlock.classList.contains("_spoller-init")) {
            initSpollers([spollersBlock]);
          }
        } else if (type === "max" && window.innerWidth > width) {
          if (spollersBlock.classList.contains("_spoller-init")) {
            spollersBlock.classList.remove("_spoller-init");
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener("click", setSpollerAction);
          }
        }
      }
    });

    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_spoller-init");
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);

          initCloseButtons(spollersBlock);
        } else {
          spollersBlock.classList.remove("_spoller-init");
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      }));
    }

    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
        spollerTitles.forEach((spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerTitle.classList.contains("_spoller-active")) {
              if (spollerTitle.nextElementSibling) {
                spollerTitle.nextElementSibling.hidden = true;
              }
            }
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            if (spollerTitle.nextElementSibling) {
              spollerTitle.nextElementSibling.hidden = false;
            }
          }
        }));
      }
    }

    function initCloseButtons(spollersBlock) {
      const closeButtons = spollersBlock.querySelectorAll('.cabinet-orders-spollers__button');

      closeButtons.forEach(button => {
        button.removeEventListener('click', closeSpollerHandler);
        button.addEventListener('click', closeSpollerHandler);
      });
    }

    function closeSpollerHandler(e) {
      e.preventDefault();
      e.stopPropagation();

      const button = e.currentTarget;
      const spollersBlock = button.closest('[data-spollers]');
      const spollerItem = button.closest('.cabinet-orders-spollers__item');

      if (spollersBlock && spollerItem) {
        const spollerTitle = spollerItem.querySelector('[data-spoller]');

        if (spollerTitle && spollerTitle.classList.contains('_spoller-active')) {
          const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

          spollerTitle.classList.remove('_spoller-active');
          spollerItem.classList.remove('_spoller-active');

          const contentBlock = spollerTitle.nextElementSibling;
          _slideUp(contentBlock, spollerSpeed);
        }
      }
    }

    function setSpollerAction(e) {
      const el = e.target;
      const spollerTitle = el.closest("[data-spoller]");
      if (!spollerTitle) return;

      if (el.closest('a') && !spollerTitle.closest('a')) {
        return;
      }

      const spollerItem = spollerTitle.closest(".spollers__item, .cabinet-orders-spollers__item, .menu-catalog__item");
      const spollersBlock = spollerTitle.closest("[data-spollers]");

      if (!spollersBlock) return;

      const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

      if (!spollersBlock.querySelectorAll("._slide").length) {
        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
          hideSpollersBody(spollersBlock);
        }

        spollerTitle.classList.toggle("_spoller-active");
        if (spollerItem) spollerItem.classList.toggle("_spoller-active");

        const contentBlock = spollerTitle.nextElementSibling;
        if (contentBlock) {
          _slideToggle(contentBlock, spollerSpeed);
        }

        e.preventDefault();
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
        const spollerItem = spollerActiveTitle.closest(".spollers__item, .cabinet-orders-spollers__item, .menu-catalog__item");

        spollerActiveTitle.classList.remove("_spoller-active");
        if (spollerItem) spollerItem.classList.remove("_spoller-active");
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
    }

    const spollersClose = document.querySelectorAll("[data-spoller-close]");
    if (spollersClose.length) {
      document.addEventListener("click", (function (e) {
        const el = e.target;
        if (!el.closest("[data-spollers]")) {
          spollersClose.forEach((spollerClose => {
            const spollersBlock = spollerClose.closest("[data-spollers]");
            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
            spollerClose.classList.remove("_spoller-active");

            const spollerItem = spollerClose.closest(".spollers__item, .cabinet-orders-spollers__item, .menu-catalog__item");
            if (spollerItem) spollerItem.classList.remove("_spoller-active");

            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
          }));
        }
      }));
    }
  }
}

spollers();
window.addEventListener('resize', function () {
  spollers();
});

//========================================================================================================================================================

//Табы
function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]');
  let tabsActiveHash = [];

  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-');
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init');
      tabsBlock.setAttribute('data-tabs-index', index);
      tabsBlock.addEventListener("click", setTabsAction);
      initTabs(tabsBlock);
    });

    let mdQueriesArray = dataMediaQueries(tabs, "tabs");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }

  function getTitles(tabsBlock) {
    const titlesWrap = tabsBlock.querySelector('[data-tabs-titles]');
    if (!titlesWrap) return [];
    return Array.from(titlesWrap.children);
  }

  function getBodies(tabsBlock) {
    const bodyWrap = tabsBlock.querySelector('[data-tabs-body]');
    if (!bodyWrap) return [];
    return Array.from(bodyWrap.children).filter(el =>
      el.matches('[data-tabs-title], [data-tabs-item]')
    );
  }

  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach(tabsMediaItem => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
      let tabsTitleItems = getTitles(tabsMediaItem);
      let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
      let tabsContentItems = getBodies(tabsMediaItem);
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          if (tabsTitleItems[index]) tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add('_tab-spoller');
        } else {
          if (tabsTitleItems[index]) tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove('_tab-spoller');
        }
      });
    });
  }

  function initTabs(tabsBlock) {
    let tabsTitles = getTitles(tabsBlock);
    let tabsContent = getBodies(tabsBlock);
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
      tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
    }

    const hasActive = tabsTitles.some(t => t.classList.contains('_tab-active'));
    if (!hasActive && tabsTitles.length) {
      tabsTitles[0].classList.add('_tab-active');
    }

    if (tabsContent.length) {
      tabsContent.forEach((tabsContentItem, index) => {
        if (!tabsTitles[index].hasAttribute('data-tabs-title')) {
          tabsTitles[index].setAttribute('data-tabs-title', '');
        }
        if (!tabsContentItem.hasAttribute('data-tabs-item')) {
          tabsContentItem.setAttribute('data-tabs-item', '');
        }

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles.forEach(t => t.classList.remove('_tab-active'));
          tabsTitles[index].classList.add('_tab-active');
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
      });
    }
    setTabsStatus(tabsBlock);
  }

  function setTabsStatus(tabsBlock) {
    let tabsTitles = getTitles(tabsBlock);
    let tabsContent = getBodies(tabsBlock);
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

    function isTabsAnimate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
      }
      return false;
    }
    const tabsBlockAnimate = isTabsAnimate(tabsBlock);

    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute('data-tabs-hash');
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index] && tabsTitles[index].classList.contains('_tab-active')) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
          }
          if (isHash && !tabsContentItem.closest('.popup')) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }

  function setTabsAction(e) {
    const el = e.target;
    const tabTitle = el.closest('[data-tabs-titles] > [data-tabs-title]');
    if (tabTitle) {
      const tabsBlock = tabTitle.closest('[data-tabs]');
      if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
        let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-titles] > ._tab-active');
        tabActiveTitle.forEach(t => t.classList.remove('_tab-active'));
        tabTitle.classList.add('_tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}
tabs();

document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-goto-tab]');
  if (!link) return;
  e.preventDefault();

  const tabsBlock = document.querySelector('.product-tabs');
  if (!tabsBlock) return;

  const index = link.dataset.gotoTab;
  const title = tabsBlock.querySelector(`button[data-tabs-title="${index}"]`);

  if (title && !title.classList.contains('_tab-active')) {
    title.click();
  }

  const header = document.querySelector('header');
  const offset = (header ? header.offsetHeight : 0) + 20;
  const top = tabsBlock.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, behavior: 'smooth' });
});

//========================================================================================================================================================

class SelectConstructor {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true,
      logging: true,
      speed: 150
    }
    this.config = Object.assign(defaultConfig, props);
    this.selectClasses = {
      classSelect: "select",
      classSelectBody: "select__body",
      classSelectTitle: "select__title",
      classSelectValue: "select__value",
      classSelectLabel: "select__label",
      classSelectInput: "select__input",
      classSelectText: "select__text",
      classSelectLink: "select__link",
      classSelectOptions: "select__options",
      classSelectOptionsScroll: "select__scroll",
      classSelectOption: "select__option",
      classSelectContent: "select__content",
      classSelectRow: "select__row",
      classSelectData: "select__asset",
      classSelectArrow: "select__arrow",
      classSelectDisabled: "_select-disabled",
      classSelectTag: "_select-tag",
      classSelectOpen: "_select-open",
      classSelectActive: "_select-active",
      classSelectFocus: "_select-focus",
      classSelectMultiple: "_select-multiple",
      classSelectCheckBox: "_select-checkbox",
      classSelectOptionSelected: "_select-selected",
      classSelectPseudoLabel: "_select-pseudo-label",
    }
    this._this = this;
    if (this.config.init) {
      const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select');
      if (selectItems.length) {
        this.selectsInit(selectItems);
      }
    }
  }
  getSelectClass(className) {
    return `.${className}`;
  }
  getSelectElement(selectItem, className) {
    return {
      originalSelect: selectItem.querySelector('select'),
      selectElement: selectItem.querySelector(this.getSelectClass(className)),
    }
  }
  selectsInit(selectItems) {
    selectItems.forEach((originalSelect, index) => {
      this.selectInit(originalSelect, index + 1);
    });
    document.addEventListener('click', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('keydown', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('focusin', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('focusout', function (e) {
      this.selectsActions(e);
    }.bind(this));
  }
  selectInit(originalSelect, index) {
    const _this = this;
    let selectItem = document.createElement("div");
    selectItem.classList.add(this.selectClasses.classSelect);
    originalSelect.parentNode.insertBefore(selectItem, originalSelect);
    selectItem.appendChild(originalSelect);
    originalSelect.hidden = true;
    index ? originalSelect.dataset.id = index : null;

    selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);

    if (this.getSelectPlaceholder(originalSelect)) {
      originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
    }

    this.selectBuild(originalSelect);

    originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
    this.config.speed = +originalSelect.dataset.speed;

    originalSelect.addEventListener('change', function (e) {
      _this.selectChange(e);
    });
  }
  selectBuild(originalSelect) {
    const selectItem = originalSelect.parentElement;

    selectItem.dataset.id = originalSelect.dataset.id;
    originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;

    originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);

    originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);

    this.setSelectTitleValue(selectItem, originalSelect);
    this.setOptions(selectItem, originalSelect);
    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;

    originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null;

    this.selectDisabled(selectItem, originalSelect);
  }
  selectsActions(e) {
    const targetElement = e.target;
    const targetType = e.type;
    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
      const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      if (targetType === 'click') {
        if (!originalSelect.disabled) {
          if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {

            const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
            const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
            this.optionAction(selectItem, originalSelect, optionItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
            this.selectAction(selectItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
            const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
            this.optionAction(selectItem, originalSelect, optionItem);
          }
        }
      } else if (targetType === 'focusin' || targetType === 'focusout') {
        if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
          targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
        }
      } else if (targetType === 'keydown' && e.code === 'Escape') {
        this.selectsСlose();
      }
    } else {
      this.selectsСlose();
    }
  }
  selectsСlose(selectOneGroup) {
    const selectsGroup = selectOneGroup ? selectOneGroup : document;
    const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
    if (selectActiveItems.length) {
      selectActiveItems.forEach(selectActiveItem => {
        this.selectСlose(selectActiveItem);
      });
    }
  }
  selectСlose(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    if (!selectOptions.classList.contains('_slide')) {
      selectItem.classList.remove(this.selectClasses.classSelectOpen);
      _slideUp(selectOptions, originalSelect.dataset.speed);
      setTimeout(() => {
        selectItem.style.zIndex = '';
      }, originalSelect.dataset.speed);
    }
  }
  selectAction(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;

    this.setOptionsPosition(selectItem);

    this.selectsСlose();

    setTimeout(() => {
      if (!selectOptions.classList.contains('_slide')) {
        selectItem.classList.toggle(this.selectClasses.classSelectOpen);
        _slideToggle(selectOptions, originalSelect.dataset.speed);

        if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
          selectItem.style.zIndex = selectOpenzIndex;
        } else {
          setTimeout(() => {
            selectItem.style.zIndex = '';
          }, originalSelect.dataset.speed);
        }
      }
    }, 0);
  }
  setSelectTitleValue(selectItem, originalSelect) {
    const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
    if (selectItemTitle) selectItemTitle.remove();
    selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));

    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
  }
  getSelectTitleValue(selectItem, originalSelect) {
    let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
    const selectedOptions = this.getSelectedOptionsData(originalSelect);

    if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
      selectTitleValue = selectedOptions.elements.map(option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="${this.selectClasses.classSelectTag}">${this.getSelectElementContent(option)}</span>`).join('');

      if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
        document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
        if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
      }
    }

    if (selectedOptions.values.length > 0) {
      selectTitleValue = selectTitleValue.length ? selectTitleValue : '';
    } else {
      selectTitleValue = originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '';
    }

    let pseudoAttribute = '';
    let pseudoAttributeClass = '';
    if (originalSelect.hasAttribute('data-pseudo-label')) {
      pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
      pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
    }

    selectedOptions.values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);

    if (originalSelect.hasAttribute('data-search')) {
      return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
    } else {
      const customClass = selectedOptions.elements.length && selectedOptions.elements[0] && selectedOptions.elements[0].dataset.class ? ` ${selectedOptions.elements[0].dataset.class}` : '';

      return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span><span class="${this.selectClasses.classSelectArrow}"></span></span></button>`;
    }
  }
  getSelectElementContent(selectOption, useHtml = false) {
    const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : '';
    const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
    const content = (useHtml && selectOption.dataset.html) ? selectOption.dataset.html : selectOption.textContent;
    let selectOptionContentHTML = ``;
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
    selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
    selectOptionContentHTML += content;
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    return selectOptionContentHTML;
  }
  getSelectPlaceholder(originalSelect) {
    const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
    if (selectPlaceholder) {
      return {
        value: selectPlaceholder.textContent,
        show: selectPlaceholder.hasAttribute("data-show"),
        label: {
          show: selectPlaceholder.hasAttribute("data-label"),
          text: selectPlaceholder.dataset.label
        }
      }
    }
  }

  getSelectedOptionsData(originalSelect, type) {
    let selectedOptions = [];
    if (originalSelect.multiple) {
      selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
    } else {
      if (originalSelect.selectedIndex >= 0 && originalSelect.options[originalSelect.selectedIndex]) {
        const option = originalSelect.options[originalSelect.selectedIndex];
        if (option.value) {
          selectedOptions.push(option);
        }
      }
    }
    return {
      elements: selectedOptions.map(option => option),
      values: selectedOptions.filter(option => option && option.value).map(option => option.value),
      html: selectedOptions.map(option => this.getSelectElementContent(option))
    }
  }
  getOptions(originalSelect) {
    const selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : '';
    const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;
    let selectOptions = Array.from(originalSelect.options);
    if (selectOptions.length > 0) {
      let selectOptionsHTML = ``;

      selectOptions = selectOptions.filter(option => option.value);

      selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ''} class="${this.selectClasses.classSelectOptionsScroll}">`;
      selectOptions.forEach(selectOption => {
        selectOptionsHTML += this.getOption(selectOption, originalSelect);
      });
      selectOptionsHTML += `</div>`;
      return selectOptionsHTML;
    }
  }
  getOption(selectOption, originalSelect) {
    const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : '';

    const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple && selectOption.value ? `hidden` : ``;

    const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : '';
    const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
    const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank') ? `target="_blank"` : '';
    let selectOptionHTML = ``;
    selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
    selectOptionHTML += this.getSelectElementContent(selectOption, true);
    selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
    return selectOptionHTML;
  }
  setOptions(selectItem, originalSelect) {
    const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    selectItemOptions.innerHTML = this.getOptions(originalSelect);
  }
  setOptionsPosition(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
    const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
    const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;

    if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
      selectOptions.hidden = false;
      const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue('max-height'));
      const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
      const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
      selectOptions.hidden = true;

      const selectItemHeight = selectItem.offsetHeight;
      const selectItemPos = selectItem.getBoundingClientRect().top;
      const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
      const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);

      if (selectItemResult < 0) {
        const newMaxHeightValue = selectOptionsHeight + selectItemResult;
        if (newMaxHeightValue < 100) {
          selectItem.classList.add('select--show-top');
          selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
        } else {
          selectItem.classList.remove('select--show-top');
          selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
        }
      }
    } else {
      setTimeout(() => {
        selectItem.classList.remove('select--show-top');
        selectItemScroll.style.maxHeight = customMaxHeightValue;
      }, +originalSelect.dataset.speed);
    }
  }
  optionAction(selectItem, originalSelect, optionItem) {
    const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
    if (!selectOptions.classList.contains('_slide')) {
      if (originalSelect.multiple) {
        optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
        const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
        originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
          originalSelectSelectedItem.removeAttribute('selected');
        });
        const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
        selectSelectedItems.forEach(selectSelectedItems => {
          originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute('selected', 'selected');
        });
      } else {
        if (optionItem.dataset.value) {
          if (!originalSelect.hasAttribute('data-show-selected')) {
            setTimeout(() => {
              if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
                selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
              }
              optionItem.hidden = true;
            }, this.config.speed);
          }
          originalSelect.value = optionItem.dataset.value;
          this.selectAction(selectItem);
        }
      }
      this.setSelectTitleValue(selectItem, originalSelect);
      this.setSelectChange(originalSelect);
    }
  }
  selectChange(e) {
    const originalSelect = e.target;
    this.selectBuild(originalSelect);
    this.setSelectChange(originalSelect);
  }
  setSelectChange(originalSelect) {
    if (originalSelect.hasAttribute('data-validate')) {
      if (window.formValidate) {
        window.formValidate.validateInput(originalSelect);
      }
    }
    if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
      let tempButton = document.createElement("button");
      tempButton.type = "submit";
      const form = originalSelect.closest('form');
      if (form) {
        form.appendChild(tempButton);
        tempButton.click();
        tempButton.remove();
      }
    }
    const selectItem = originalSelect.parentElement;
    this.selectCallback(selectItem, originalSelect);
  }
  selectDisabled(selectItem, originalSelect) {
    if (originalSelect.disabled) {
      selectItem.classList.add(this.selectClasses.classSelectDisabled);
      const titleElement = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
      if (titleElement) titleElement.disabled = true;
    } else {
      selectItem.classList.remove(this.selectClasses.classSelectDisabled);
      const titleElement = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
      if (titleElement) titleElement.disabled = false;
    }
  }
  searchActions(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);
    const _this = this;
    selectInput.addEventListener("input", function () {
      selectOptionsItems.forEach(selectOptionsItem => {
        if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) {
          selectOptionsItem.hidden = false;
        } else {
          selectOptionsItem.hidden = true;
        }
      });
      selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
    });
  }
  selectCallback(selectItem, originalSelect) {
    document.dispatchEvent(new CustomEvent("selectCallback", {
      detail: {
        select: originalSelect
      }
    }));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    window.modules_flsModules = window.modules_flsModules || {};
    modules_flsModules.select = new SelectConstructor({});
  });
} else {
  window.modules_flsModules = window.modules_flsModules || {};
  modules_flsModules.select = new SelectConstructor({});
}

//========================================================================================================================================================

let productFilterColors = document.querySelectorAll('.product-right-filter__colors');
if (productFilterColors) {
  productFilterColors.forEach((root) => {
    const added = root.querySelector('.product-added-color');
    const edit = root.querySelector('.product-edit-color');

    const openBtn = added.querySelector('[data-color-open]');
    const closeBtn = edit.querySelector('.product-edit-color__close');
    const content = edit.querySelector('.product-edit-color__content');
    const selected = edit.querySelector('.product-edit-selected');
    const submitBtn = selected.querySelector('[data-color-submit]');
    const inputs = edit.querySelectorAll('.options5__input');

    const updatePadding = () => {
      if (selected.classList.contains('active')) {
        content.style.paddingBottom = selected.offsetHeight + 0 + 'px';
      }
    };
    window.addEventListener('resize', updatePadding);

    const openEdit = () => {
      edit.classList.add('active');
      document.documentElement.classList.add('edit-colors-open');
      updatePadding();
    };

    const closeEdit = () => {
      edit.classList.remove('active');
      if (!document.querySelector('.product-edit-color.active')) {
        document.documentElement.classList.remove('edit-colors-open');
      }
    };

    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openEdit();
    });
    closeBtn.addEventListener('click', closeEdit);

    const fillSelected = (input) => {
      const item = input.closest('.options5__item');
      const img = item.querySelector('.options5__pic1').getAttribute('src');
      const title = item.querySelector('.options5__title').textContent.trim();
      const price = item.querySelector('.options5__price').textContent.trim();

      selected.querySelector('.product-edit-selected__pic1').src = img;
      selected.querySelector('.product-edit-selected__left p').textContent = title;
      selected.querySelector('.product-edit-selected__price').textContent = price;
    };

    inputs.forEach((input) => {
      input.addEventListener('click', () => {
        if (input.dataset.was === 'true') {
          input.checked = false;
          input.dataset.was = 'false';
          selected.classList.remove('active');
        } else {
          inputs.forEach((i) => (i.dataset.was = 'false'));
          input.dataset.was = 'true';
          fillSelected(input);
          selected.classList.add('active');
        }
        updatePadding();
      });
    });

    submitBtn.addEventListener('click', () => {
      const checked = edit.querySelector('.options5__input:checked');
      if (!checked) return;

      const item = checked.closest('.options5__item');
      const img = item.querySelector('.options5__pic1').getAttribute('src');
      const title = item.querySelector('.options5__title').textContent.trim();

      added.querySelector('.product-added-color__pic1').src = img;
      added.querySelector('.product-added-color__titles p').textContent = title;

      closeEdit();
    });
  });
}

let productFilter = document.querySelectorAll('.product-right-filter__column');
if (productFilter) {
  productFilter.forEach((column) => {
    const title = column.querySelector('.product-right-filter__title');
    if (!title) return;

    const updateFromInput = (input) => {
      Object.keys(input.dataset).forEach((key) => {
        const target = title.querySelector(`span[data-${key}]`);
        if (target) target.textContent = input.dataset[key];
      });
    };

    column.addEventListener('change', (e) => {
      const input = e.target.closest('input[type="radio"]');
      if (input && input.checked) updateFromInput(input);
    });

    const checked = column.querySelector('input[type="radio"]:checked');
    if (checked) updateFromInput(checked);
  });
  const select = document.querySelector('select[name="select-size1"]');
  if (select) {
    const popup = document.querySelector('#size-popup');
    const column = select.closest('.product-right-filter__column');
    const sizeSpan = column.querySelector('.product-right-filter__title span[data-size1]');
    const linkContent = document.querySelector('.select-size-popup .select__content');
    const popupRadios = popup ? popup.querySelectorAll('input[name="option4"]') : [];

    const syncSize = () => {
      const option = select.options[select.selectedIndex];
      if (!option) return;
      const value = option.dataset.size1 || option.textContent.trim();

      if (sizeSpan) sizeSpan.textContent = value;
      if (linkContent) linkContent.textContent = value;

      popupRadios.forEach((radio) => {
        radio.checked = radio.value === select.value;
      });
    };

    document.addEventListener('selectCallback', (e) => {
      if (e.detail.select === select) syncSize();
    });

    popupRadios.forEach((radio) => {
      radio.addEventListener('change', () => {
        if (!radio.checked) return;
        select.value = radio.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });

    syncSize();
  }
}

//========================================================================================================================================================

const iconElements = document.querySelectorAll('.icons');

if (iconElements) {
  iconElements.forEach(element => {
    element.addEventListener('click', function (e) {
      e.preventDefault();

      this.classList.toggle('active');

      e.stopPropagation();
    });
  });
}

//========================================================================================================================================================

//Количество
function formQuantity() {
  function getUnit(quantityElement) {
    if (quantityElement.classList.contains('quantity-col')) return '';
    const item = quantityElement.closest('.product-calc__item');
    const checked = item ? item.querySelector('.options2__input:checked') : null;
    return checked ? checked.dataset.col || '' : '';
  }

  function getMin(quantityElement) {
    return quantityElement.dataset.quantityMin ? +quantityElement.dataset.quantityMin : 1;
  }

  function getMax(quantityElement) {
    return quantityElement.dataset.quantityMax ? +quantityElement.dataset.quantityMax : null;
  }

  function getNumber(quantityElement) {
    const input = quantityElement.querySelector('[data-quantity-value]');
    return parseInt(input.value) || 0;
  }

  function setValue(quantityElement, number) {
    const input = quantityElement.querySelector('[data-quantity-value]');
    const unit = getUnit(quantityElement);
    const num = number === '' ? '' : String(number);
    input.value = num && unit ? `${num} ${unit}` : num || unit;
    return num.length;
  }

  function updateButtons(quantityElement) {
    const minusBtn = quantityElement.querySelector('[data-quantity-minus]');
    const plusBtn = quantityElement.querySelector('[data-quantity-plus]');
    const value = getNumber(quantityElement);
    const max = getMax(quantityElement);
    const min = getMin(quantityElement);

    const minusDisabled = value <= min;
    const plusDisabled = max !== null && value >= max;

    minusBtn.classList.toggle('disabled', minusDisabled);
    plusBtn.classList.toggle('disabled', plusDisabled);
    minusBtn.disabled = minusDisabled;
    plusBtn.disabled = plusDisabled;
  }

  document.addEventListener("click", function (e) {
    const targetElement = e.target;
    if (targetElement.closest('[data-quantity-plus]') || targetElement.closest('[data-quantity-minus]')) {
      const quantityElement = targetElement.closest('[data-quantity]');
      const max = getMax(quantityElement);
      const min = getMin(quantityElement);
      let value = getNumber(quantityElement);

      if (targetElement.closest('[data-quantity-plus]')) {
        value++;
        if (max !== null && value > max) value = max;
      } else {
        value--;
        if (value < min) value = min;
      }
      setValue(quantityElement, value);
      updateButtons(quantityElement);
    }
  });

  document.addEventListener("input", function (e) {
    const input = e.target.closest('[data-quantity] [data-quantity-value]');
    if (!input) return;
    const quantityElement = input.closest('[data-quantity]');
    const max = getMax(quantityElement);

    let digits = input.value.replace(/\D/g, '');
    if (digits !== '') {
      let value = parseInt(digits);
      if (max !== null && value > max) value = max;
      digits = String(value);
    }
    const len = setValue(quantityElement, digits);
    input.setSelectionRange(len, len);
    updateButtons(quantityElement);
  });

  function keepCaretBeforeUnit(e) {
    const input = e.target.closest('[data-quantity] [data-quantity-value]');
    if (!input) return;
    const len = String(parseInt(input.value) || '').length;
    if (input.selectionStart > len) input.setSelectionRange(len, len);
  }
  document.addEventListener("click", keepCaretBeforeUnit);
  document.addEventListener("focusin", keepCaretBeforeUnit);

  document.addEventListener("focusout", function (e) {
    const input = e.target.closest('[data-quantity] [data-quantity-value]');
    if (!input) return;
    const quantityElement = input.closest('[data-quantity]');
    const min = getMin(quantityElement);
    const value = getNumber(quantityElement);
    setValue(quantityElement, value < min ? min : value);
    updateButtons(quantityElement);
  });

  document.addEventListener("change", function (e) {
    const radio = e.target.closest('.options2__input');
    if (!radio) return;
    const item = radio.closest('.product-calc__item');
    if (!item) return;
    item.querySelectorAll('[data-quantity]:not(.quantity-col)').forEach(function (el) {
      setValue(el, getNumber(el) || getMin(el));
      updateButtons(el);
    });
  });

  document.querySelectorAll('[data-quantity]').forEach(function (el) {
    setValue(el, getNumber(el) || getMin(el));
    updateButtons(el);
  });
}
formQuantity();

//========================================================================================================================================================

function productCalc() {
  const calcs = [...document.querySelectorAll('.product-calc')];

  const selects = [...document.querySelectorAll('.product-select')]
    .filter(s => s.querySelector('.product-select__dropdown') && !s.closest('.popup'));

  if (!calcs.length && !selects.length) return;

  const popupOwner = new Map();

  const toNum = v => {
    const n = parseFloat(String(v).replace(/\s/g, '').replace(',', '.'));
    return Number.isFinite(n) && n > 0 ? n : 0;
  };

  const fmt = n =>
    (Math.round(n * 100) / 100).toLocaleString('ru-RU', { maximumFractionDigits: 2 });

  const fmtRub = n => {
    const r = Math.round(n * 100) / 100;
    return Number.isInteger(r)
      ? r.toLocaleString('ru-RU')
      : r.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  function applyValue(select, radio) {
    const item = radio.closest('.options6__item');
    if (!item) return;
    const titleEl = item.querySelector('.options6__title');
    const percentEl = item.querySelector('.options6__percent');
    if (!titleEl || !percentEl) return;

    const title = titleEl.textContent.trim();
    const percent = percentEl.textContent.trim();

    select.querySelectorAll('.product-select__title').forEach(el => (el.textContent = title));
    select.querySelectorAll('.product-select__percent span').forEach(el => (el.textContent = percent));
  }

  function setText(root, name, text) {
    root.querySelectorAll(`[data-calc="${name}"]`).forEach(el => (el.textContent = text));
  }

  function recalc(calc) {
    const root = calc.closest('.product-right__top') || calc;

    const priceM2 = toNum(calc.dataset.priceM2);
    const packArea = toNum(calc.dataset.packArea);
    const packPcs = toNum(calc.dataset.packPcs) || 1;
    if (!priceM2 || !packArea) return;

    const pricePack = priceM2 * packArea;
    const pieceArea = packArea / packPcs;

    const unitInput = calc.querySelector('.options2__input:checked');
    const unit = unitInput ? unitInput.dataset.col : 'м²';
    const qtyField = calc.querySelector('[data-quantity-value]');
    const qty = qtyField ? toNum(qtyField.value) : 0;

    const areaPerUnit = unit === 'шт' ? pieceArea : unit === 'упаковка' ? packArea : 1;
    const area = qty * areaPerUnit;

    const layout = calc.querySelector('.product-select .options6__input:checked');
    const percent = layout ? toNum(layout.dataset.percent) : 0;
    const reserve = (area * percent) / 100;

    const packs = area ? Math.ceil((area + reserve) / packArea - 1e-9) : 0;
    const totalArea = packs * packArea;
    const totalPcs = packs * packPcs;
    const leftover = totalArea - area;
    const total = Math.round(packs * pricePack);

    setText(root, 'price-m2', fmtRub(priceM2));
    setText(root, 'price-pack', fmtRub(pricePack));
    setText(root, 'pack-area', fmt(packArea));
    setText(root, 'pack-pcs', fmt(packPcs));

    setText(root, 'area', fmt(area));
    setText(root, 'percent', fmt(percent));
    setText(root, 'reserve', fmt(reserve));
    setText(root, 'packs', fmt(packs));
    setText(root, 'leftover', fmt(leftover));
    setText(root, 'total-area', fmt(totalArea));
    setText(root, 'total-pcs', fmt(totalPcs));
    setText(root, 'price-total', fmtRub(total));

    const stock = toNum(calc.dataset.stock);
    calc.classList.toggle('is-over-stock', !!stock && totalArea > stock);
  }

  calcs.forEach((calc, i) => {
    calc.querySelectorAll('.options2__input').forEach(input => {
      input.name = `calc-unit-${i}`;
    });
  });

  selects.forEach((select, i) => {
    select.querySelectorAll('.options6__input').forEach(input => {
      input.name = `layout-select-${i}`;
    });
    const checked = select.querySelector('.options6__input:checked');
    if (checked) applyValue(select, checked);
  });

  document.querySelectorAll('.popup .options6__input').forEach(input => {
    const popup = input.closest('.popup');
    if (popup && popup.id) input.name = `layout-popup-${popup.id}`;
  });

  calcs.forEach(recalc);

  document.addEventListener('click', e => {
    const qtyBtn = e.target.closest('[data-quantity-minus], [data-quantity-plus]');
    if (qtyBtn) {
      const calc = qtyBtn.closest('.product-calc');
      if (calc) setTimeout(() => recalc(calc), 0);
    }

    const btn = e.target.closest('.product-select__button:not(.button-popup)');
    if (btn) {
      const select = btn.closest('.product-select');
      if (!select) return;
      selects.forEach(s => s !== select && s.classList.remove('active'));
      select.classList.toggle('active');
      return;
    }

    const popupBtn = e.target.closest('.product-select__button.button-popup');
    if (popupBtn) {
      const select = popupBtn.closest('.product-select');
      const popup = popupBtn.dataset.popup ? document.querySelector(popupBtn.dataset.popup) : null;
      if (select && popup) {
        popupOwner.set(popup.id, select);
        const current = select.querySelector('.options6__input:checked');
        if (current) {
          const target = popup.querySelector(`.options6__input[value="${current.value}"]`);
          if (target) target.checked = true;
        }
      }
      return;
    }

    if (!e.target.closest('.product-select')) {
      selects.forEach(s => s.classList.remove('active'));
    }
  });

  document.addEventListener('change', e => {
    const unit = e.target.closest('.options2__input');
    if (unit) {
      const calc = unit.closest('.product-calc');
      if (calc) recalc(calc);
      return;
    }

    const radio = e.target.closest('.options6__input');
    if (!radio) return;

    const popup = radio.closest('.popup');
    let select;

    if (popup) {
      select = popupOwner.get(popup.id);
      if (!select) return;
      const mirror = select.querySelector(`.options6__input[value="${radio.value}"]`);
      if (mirror) mirror.checked = true;
    } else {
      select = radio.closest('.product-select');
      if (!select) return;
      select.classList.remove('active');
    }

    applyValue(select, radio);

    const calc = select.closest('.product-calc');
    if (calc) recalc(calc);
  });

  document.addEventListener('input', e => {
    const field = e.target.closest('[data-quantity-value]');
    if (!field) return;
    const calc = field.closest('.product-calc');
    if (calc) recalc(calc);
  });
}

productCalc();

//========================================================================================================================================================

document.addEventListener('click', (e) => {
  const closeBtn = e.target.closest('.menu-product-added__close');
  if (!closeBtn) return;

  const column = closeBtn.closest('.menu-product-added__column');
  if (column) {
    column.remove();
  }
});

const bottomMenu = document.querySelector('.bottom-menu');

if (bottomMenu) {
  const setBottomMenuHeight = () => {
    document.documentElement.style.setProperty(
      '--bottom-menu-height',
      `${bottomMenu.offsetHeight}px`
    );
  };

  setBottomMenuHeight();

  new ResizeObserver(setBottomMenuHeight).observe(bottomMenu);
}

//========================================================================================================================================================

