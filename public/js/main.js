/* jshint browser: true */
(function() {
  'use strict';

  var slides;
  var classNames = {
    PREV: 'previous',
    CURR: 'current',
    NEXT: 'next'
  };

  writeSlideCss();
  manageSlideTransition();

  // make the slides fillscreen
  function writeSlideCss() {
    var viewportSize = {
      x: window.innerWidth,
      y: window.innerHeight
    };
    var styleCSS = document.createElement('style');
    styleCSS.id = 'style-css';
    styleCSS.innerHTML = '.slide { height: ' + viewportSize.y + 'px; width: ' + viewportSize.x + 'px; }';
    document.body.appendChild(styleCSS);
    console.log('style rlement written');
  }

  function manageSlideTransition() {
    slides = document.querySelectorAll('section.slide');
    console.log(slides);
    Array.prototype.forEach.call(slides, function(elem, index) {
      var className = classNames.NEXT;
      if (index === 0) {
        className = classNames.CURR;
      }
      elem.classList.add(className);
    });
  }

  // function mapSlides() {

  // };

  // function handleScroll() {
  //   document.addEventListener('scroll', function() {

  //   });
  // };
}());
