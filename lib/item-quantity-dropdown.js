(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("item-quantity-dropdown", [], factory);
	else if(typeof exports === 'object')
		exports["item-quantity-dropdown"] = factory();
	else
		root["item-quantity-dropdown"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	(function ($) {
	  var defaults = {
	    maxItems: Infinity,
	    minItems: 0,
	    selectionText: 'item',
	    textPlural: 'items',
	    controls: {
	      position: 'right',
	      incrementText: '+',
	      decrementText: '-',
	      displayCls: 'iqdropdown-item-display',
	      controlsCls: 'iqdropdown-item-controls',
	      counterCls: 'counter'
	    },
	    items: {},
	    onChange: function onChange() {},
	    beforeDecrement: function beforeDecrement() {
	      return true;
	    },
	    beforeIncrement: function beforeIncrement() {
	      return true;
	    }
	  };

	  $.fn.iqDropdown = function (options) {
	    var $selection = this.find('p').last();
	    var $menu = this.find('ul');
	    var $items = $menu.find('li');
	    var settings = $.extend(true, {}, defaults, options);
	    var itemCount = {};
	    var totalItems = 0;

	    function setItemSettings(id, $item) {
	      var minCount = parseInt($item.data('mincount'), 10);
	      var maxCount = parseInt($item.data('maxcount'), 10);

	      settings.items[id] = {
	        minCount: isNaN(minCount) ? 0 : minCount,
	        maxCount: isNaN(maxCount) ? Infinity : maxCount
	      };
	    }

	    function addControls(id, $item, updateDisplay) {
	      var $controls = $('<div />').addClass(settings.controls.controlsCls);
	      var $decrementButton = $('<button>' + settings.controls.decrementText + '</button>');
	      var $incrementButton = $('<button>' + settings.controls.incrementText + '</button>');
	      var $counter = $('<span>' + itemCount[id] + '</span>').addClass(settings.controls.counterCls);

	      $item.children('div').addClass(settings.controls.displayCls);
	      $controls.append($decrementButton, $counter, $incrementButton);

	      if (settings.controls.position === 'right') {
	        $item.append($controls);
	      } else {
	        $item.prepend($controls);
	      }

	      $decrementButton.click(function (event) {
	        var items = settings.items;
	        var minItems = settings.minItems;
	        var beforeDecrement = settings.beforeDecrement;
	        var onChange = settings.onChange;

	        var allowClick = beforeDecrement(id, itemCount);
	        if (allowClick && totalItems > minItems && itemCount[id] > items[id].minCount) {
	          itemCount[id]--;
	          totalItems--;
	          $counter.html(itemCount[id]);
	          updateDisplay();
	          onChange(id, itemCount[id], totalItems);
	        }
	        event.preventDefault();
	      });

	      $incrementButton.click(function (event) {
	        var items = settings.items;
	        var maxItems = settings.maxItems;
	        var beforeIncrement = settings.beforeIncrement;
	        var onChange = settings.onChange;

	        var allowClick = beforeIncrement(id, itemCount);
	        if (allowClick && totalItems < maxItems && itemCount[id] < items[id].maxCount) {
	          itemCount[id]++;
	          totalItems++;
	          $counter.html(itemCount[id]);
	          updateDisplay();
	          onChange(id, itemCount[id], totalItems);
	        }
	        event.preventDefault();
	      });

	      $item.click(function (event) {
	        return event.stopPropagation();
	      });

	      return $item;
	    }

	    function updateDisplay() {
	      var usePlural = totalItems !== 1 && settings.textPlural.length > 0;
	      var text = usePlural ? settings.textPlural : settings.selectionText;
	      $selection.html(totalItems + ' ' + text);
	    }

	    this.click(function () {
	      $selection.toggleClass('menu-open');
	      $menu.toggleClass('show-menu');
	    });

	    $items.each(function () {
	      var $item = $(this);
	      var id = $item.data('id');
	      var defaultCount = parseInt($item.data('defaultcount') || '0', 10);

	      itemCount[id] = defaultCount;
	      totalItems += defaultCount;
	      setItemSettings(id, $item);
	      addControls(id, $item, updateDisplay);
	    });

	    updateDisplay();

	    return this;
	  };
	})(jQuery); /* global jQuery */

	// plugin styles

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;