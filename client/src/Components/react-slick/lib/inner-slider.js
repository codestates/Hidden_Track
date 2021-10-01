'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.InnerSlider = void 0;

const _react = _interopRequireDefault(require('react'));

const _initialState = _interopRequireDefault(require('./initial-state'));

const _lodash = _interopRequireDefault(require('lodash.debounce'));

const _classnames = _interopRequireDefault(require('classnames'));

const _innerSliderUtils = require('./utils/innerSliderUtils');

const _track = require('./track');

const _dots = require('./dots');

const _arrows = require('./arrows');

const _resizeObserverPolyfill = _interopRequireDefault(require('resize-observer-polyfill'));

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof (obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj; }; } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

function _extends () { _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties (source, excluded) { if (source == null) return {}; const target = _objectWithoutPropertiesLoose(source, excluded); let key, i; if (Object.getOwnPropertySymbols) { const sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose (source, excluded) { if (source == null) return {}; const target = {}; const sourceKeys = Object.keys(source); let key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys (object, enumerableOnly) { const keys = Object.keys(object); if (Object.getOwnPropertySymbols) { let symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread (target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties (target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass (Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function'); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf (o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf (o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper (Derived) { const hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal () { const Super = _getPrototypeOf(Derived); let result; if (hasNativeReflectConstruct) { const NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn (self, call) { if (call && (_typeof(call) === 'object' || typeof call === 'function')) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized (self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct () { if (typeof Reflect === 'undefined' || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === 'function') return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf (o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf (o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty (obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const InnerSlider = /* #__PURE__ */(function (_React$Component) {
  _inherits(InnerSlider, _React$Component);

  const _super = _createSuper(InnerSlider);

  function InnerSlider (props) {
    let _this;

    _classCallCheck(this, InnerSlider);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), 'listRefHandler', function (ref) {
      return _this.list = ref;
    });

    _defineProperty(_assertThisInitialized(_this), 'trackRefHandler', function (ref) {
      return _this.track = ref;
    });

    _defineProperty(_assertThisInitialized(_this), 'adaptHeight', function () {
      if (_this.props.adaptiveHeight && _this.list) {
        const elem = _this.list.querySelector('[data-index="'.concat(_this.state.currentSlide, '"]'));

        _this.list.style.height = (0, _innerSliderUtils.getHeight)(elem) + 'px';
      }
    });

    _defineProperty(_assertThisInitialized(_this), 'componentDidMount', function () {
      _this.props.onInit && _this.props.onInit();

      if (_this.props.lazyLoad) {
        const slidesToLoad = (0, _innerSliderUtils.getOnDemandLazySlides)(_objectSpread(_objectSpread({}, _this.props), _this.state));

        if (slidesToLoad.length > 0) {
          _this.setState(function (prevState) {
            return {
              lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad)
            };
          });

          if (_this.props.onLazyLoad) {
            _this.props.onLazyLoad(slidesToLoad);
          }
        }
      }

      const spec = _objectSpread({
        listRef: _this.list,
        trackRef: _this.track
      }, _this.props);

      _this.updateState(spec, true, function () {
        _this.adaptHeight();

        _this.props.autoplay && _this.autoPlay('update');
      });

      if (_this.props.lazyLoad === 'progressive') {
        _this.lazyLoadTimer = setInterval(_this.progressiveLazyLoad, 1000);
      }

      _this.ro = new _resizeObserverPolyfill.default(function () {
        if (_this.state.animating) {
          _this.onWindowResized(false); // don't set trackStyle hence don't break animation

          _this.callbackTimers.push(setTimeout(function () {
            return _this.onWindowResized();
          }, _this.props.speed));
        } else {
          _this.onWindowResized();
        }
      });

      _this.ro.observe(_this.list);

      document.querySelectorAll && Array.prototype.forEach.call(document.querySelectorAll('.slick-slide'), function (slide) {
        slide.onfocus = _this.props.pauseOnFocus ? _this.onSlideFocus : null;
        slide.onblur = _this.props.pauseOnFocus ? _this.onSlideBlur : null;
      });

      if (window.addEventListener) {
        window.addEventListener('resize', _this.onWindowResized);
      } else {
        window.attachEvent('onresize', _this.onWindowResized);
      }
    });

    _defineProperty(_assertThisInitialized(_this), 'componentWillUnmount', function () {
      if (_this.animationEndCallback) {
        clearTimeout(_this.animationEndCallback);
      }

      if (_this.lazyLoadTimer) {
        clearInterval(_this.lazyLoadTimer);
      }

      if (_this.callbackTimers.length) {
        _this.callbackTimers.forEach(function (timer) {
          return clearTimeout(timer);
        });

        _this.callbackTimers = [];
      }

      if (window.addEventListener) {
        window.removeEventListener('resize', _this.onWindowResized);
      } else {
        window.detachEvent('onresize', _this.onWindowResized);
      }

      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
      }

      _this.ro.disconnect();
    });

    _defineProperty(_assertThisInitialized(_this), 'componentDidUpdate', function (prevProps) {
      _this.checkImagesLoad();

      _this.props.onReInit && _this.props.onReInit();

      if (_this.props.lazyLoad) {
        const slidesToLoad = (0, _innerSliderUtils.getOnDemandLazySlides)(_objectSpread(_objectSpread({}, _this.props), _this.state));

        if (slidesToLoad.length > 0) {
          _this.setState(function (prevState) {
            return {
              lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad)
            };
          });

          if (_this.props.onLazyLoad) {
            _this.props.onLazyLoad(slidesToLoad);
          }
        }
      } // if (this.props.onLazyLoad) {
      //   this.props.onLazyLoad([leftMostSlide])
      // }

      _this.adaptHeight();

      const spec = _objectSpread(_objectSpread({
        listRef: _this.list,
        trackRef: _this.track
      }, _this.props), _this.state);

      const setTrackStyle = _this.didPropsChange(prevProps);

      setTrackStyle && _this.updateState(spec, setTrackStyle, function () {
        if (_this.state.currentSlide >= _react.default.Children.count(_this.props.children)) {
          _this.changeSlide({
            message: 'index',
            index: _react.default.Children.count(_this.props.children) - _this.props.slidesToShow,
            currentSlide: _this.state.currentSlide
          });
        }

        if (_this.props.autoplay) {
          _this.autoPlay('update');
        } else {
          _this.pause('paused');
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), 'onWindowResized', function (setTrackStyle) {
      if (_this.debouncedResize) _this.debouncedResize.cancel();
      _this.debouncedResize = (0, _lodash.default)(function () {
        return _this.resizeWindow(setTrackStyle);
      }, 50);

      _this.debouncedResize();
    });

    _defineProperty(_assertThisInitialized(_this), 'resizeWindow', function () {
      const setTrackStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      const isTrackMounted = Boolean(_this.track && _this.track.node); // prevent warning: setting state on unmounted component (server side rendering)

      if (!isTrackMounted) return;

      const spec = _objectSpread(_objectSpread({
        listRef: _this.list,
        trackRef: _this.track
      }, _this.props), _this.state);

      _this.updateState(spec, setTrackStyle, function () {
        if (_this.props.autoplay) _this.autoPlay('update'); else _this.pause('paused');
      }); // animating state should be cleared while resizing, otherwise autoplay stops working

      _this.setState({
        animating: false
      });

      clearTimeout(_this.animationEndCallback);
      delete _this.animationEndCallback;
    });

    _defineProperty(_assertThisInitialized(_this), 'updateState', function (spec, setTrackStyle, callback) {
      const updatedState = (0, _innerSliderUtils.initializedState)(spec);
      spec = _objectSpread(_objectSpread(_objectSpread({}, spec), updatedState), {}, {
        slideIndex: updatedState.currentSlide
      });
      const targetLeft = (0, _innerSliderUtils.getTrackLeft)(spec);
      spec = _objectSpread(_objectSpread({}, spec), {}, {
        left: targetLeft
      });
      const trackStyle = (0, _innerSliderUtils.getTrackCSS)(spec);

      if (setTrackStyle || _react.default.Children.count(_this.props.children) !== _react.default.Children.count(spec.children)) {
        updatedState.trackStyle = trackStyle;
      }

      _this.setState(updatedState, callback);
    });

    _defineProperty(_assertThisInitialized(_this), 'ssrInit', function () {
      if (_this.props.variableWidth) {
        let _trackWidth = 0;
        let _trackLeft = 0;
        const childrenWidths = [];
        const preClones = (0, _innerSliderUtils.getPreClones)(_objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
          slideCount: _this.props.children.length
        }));
        const postClones = (0, _innerSliderUtils.getPostClones)(_objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
          slideCount: _this.props.children.length
        }));

        _this.props.children.forEach(function (child) {
          childrenWidths.push(child.props.style.width);
          _trackWidth += child.props.style.width;
        });

        for (let i = 0; i < preClones; i++) {
          _trackLeft += childrenWidths[childrenWidths.length - 1 - i];
          _trackWidth += childrenWidths[childrenWidths.length - 1 - i];
        }

        for (let _i = 0; _i < postClones; _i++) {
          _trackWidth += childrenWidths[_i];
        }

        for (let _i2 = 0; _i2 < _this.state.currentSlide; _i2++) {
          _trackLeft += childrenWidths[_i2];
        }

        const _trackStyle = {
          width: _trackWidth + 'px',
          left: -_trackLeft + 'px'
        };

        if (_this.props.centerMode) {
          const currentWidth = ''.concat(childrenWidths[_this.state.currentSlide], 'px');
          _trackStyle.left = 'calc('.concat(_trackStyle.left, ' + (100% - ').concat(currentWidth, ') / 2 ) ');
        }

        return {
          trackStyle: _trackStyle
        };
      }

      const childrenCount = _react.default.Children.count(_this.props.children);

      const spec = _objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
        slideCount: childrenCount
      });

      const slideCount = (0, _innerSliderUtils.getPreClones)(spec) + (0, _innerSliderUtils.getPostClones)(spec) + childrenCount;
      const trackWidth = 100 / _this.props.slidesToShow * slideCount;
      const slideWidth = 100 / slideCount;
      let trackLeft = -slideWidth * ((0, _innerSliderUtils.getPreClones)(spec) + _this.state.currentSlide) * trackWidth / 100;

      if (_this.props.centerMode) {
        trackLeft += (100 - slideWidth * trackWidth / 100) / 2;
      }

      const trackStyle = {
        width: trackWidth + '%',
        left: trackLeft + '%'
      };
      return {
        slideWidth: slideWidth + '%',
        trackStyle: trackStyle
      };
    });

    _defineProperty(_assertThisInitialized(_this), 'checkImagesLoad', function () {
      const images = _this.list && _this.list.querySelectorAll && _this.list.querySelectorAll('.slick-slide img') || [];
      const imagesCount = images.length;
      let loadedCount = 0;
      Array.prototype.forEach.call(images, function (image) {
        const handler = function handler () {
          return ++loadedCount && loadedCount >= imagesCount && _this.onWindowResized();
        };

        if (!image.onclick) {
          image.onclick = function () {
            return image.parentNode.focus();
          };
        } else {
          const prevClickHandler = image.onclick;

          image.onclick = function () {
            prevClickHandler();
            image.parentNode.focus();
          };
        }

        if (!image.onload) {
          if (_this.props.lazyLoad) {
            image.onload = function () {
              _this.adaptHeight();

              _this.callbackTimers.push(setTimeout(_this.onWindowResized, _this.props.speed));
            };
          } else {
            image.onload = handler;

            image.onerror = function () {
              handler();
              _this.props.onLazyLoadError && _this.props.onLazyLoadError();
            };
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), 'progressiveLazyLoad', function () {
      const slidesToLoad = [];

      const spec = _objectSpread(_objectSpread({}, _this.props), _this.state);

      for (let index = _this.state.currentSlide; index < _this.state.slideCount + (0, _innerSliderUtils.getPostClones)(spec); index++) {
        if (_this.state.lazyLoadedList.indexOf(index) < 0) {
          slidesToLoad.push(index);
          break;
        }
      }

      for (let _index = _this.state.currentSlide - 1; _index >= -(0, _innerSliderUtils.getPreClones)(spec); _index--) {
        if (_this.state.lazyLoadedList.indexOf(_index) < 0) {
          slidesToLoad.push(_index);
          break;
        }
      }

      if (slidesToLoad.length > 0) {
        _this.setState(function (state) {
          return {
            lazyLoadedList: state.lazyLoadedList.concat(slidesToLoad)
          };
        });

        if (_this.props.onLazyLoad) {
          _this.props.onLazyLoad(slidesToLoad);
        }
      } else {
        if (_this.lazyLoadTimer) {
          clearInterval(_this.lazyLoadTimer);
          delete _this.lazyLoadTimer;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), 'slideHandler', function (index) {
      const dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      const _this$props = _this.props;
      const asNavFor = _this$props.asNavFor;
      const beforeChange = _this$props.beforeChange;
      const onLazyLoad = _this$props.onLazyLoad;
      const speed = _this$props.speed;
      const afterChange = _this$props.afterChange; // capture currentslide before state is updated

      const currentSlide = _this.state.currentSlide;

      const _slideHandler = (0, _innerSliderUtils.slideHandler)(_objectSpread(_objectSpread(_objectSpread({
        index: index
      }, _this.props), _this.state), {}, {
        trackRef: _this.track,
        useCSS: _this.props.useCSS && !dontAnimate
      }));
      const state = _slideHandler.state;
      const nextState = _slideHandler.nextState;

      if (!state) return;
      beforeChange && beforeChange(currentSlide, state.currentSlide);
      const slidesToLoad = state.lazyLoadedList.filter(function (value) {
        return _this.state.lazyLoadedList.indexOf(value) < 0;
      });
      onLazyLoad && slidesToLoad.length > 0 && onLazyLoad(slidesToLoad);

      if (!_this.props.waitForAnimate && _this.animationEndCallback) {
        clearTimeout(_this.animationEndCallback);
        afterChange && afterChange(currentSlide);
        delete _this.animationEndCallback;
      }

      _this.setState(state, function () {
        // asNavForIndex check is to avoid recursive calls of slideHandler in waitForAnimate=false mode
        if (asNavFor && _this.asNavForIndex !== index) {
          _this.asNavForIndex = index;
          asNavFor.innerSlider.slideHandler(index);
        }

        if (!nextState) return;
        _this.animationEndCallback = setTimeout(function () {
          const animating = nextState.animating;
          const firstBatch = _objectWithoutProperties(nextState, ['animating']);

          _this.setState(firstBatch, function () {
            _this.callbackTimers.push(setTimeout(function () {
              return _this.setState({
                animating: animating
              });
            }, 10));

            afterChange && afterChange(state.currentSlide);
            delete _this.animationEndCallback;
          });
        }, speed);
      });
    });

    _defineProperty(_assertThisInitialized(_this), 'changeSlide', function (options) {
      const dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      const spec = _objectSpread(_objectSpread({}, _this.props), _this.state);

      const targetSlide = (0, _innerSliderUtils.changeSlide)(spec, options);
      if (targetSlide !== 0 && !targetSlide) return;

      if (dontAnimate === true) {
        _this.slideHandler(targetSlide, dontAnimate);
      } else {
        _this.slideHandler(targetSlide);
      }

      _this.props.autoplay && _this.autoPlay('update');

      if (_this.props.focusOnSelect) {
        const nodes = _this.list.querySelectorAll('.slick-current');

        nodes[0] && nodes[0].focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), 'clickHandler', function (e) {
      if (_this.clickable === false) {
        e.stopPropagation();
        e.preventDefault();
      }

      _this.clickable = true;
    });

    _defineProperty(_assertThisInitialized(_this), 'keyHandler', function (e) {
      const dir = (0, _innerSliderUtils.keyHandler)(e, _this.props.accessibility, _this.props.rtl);
      dir !== '' && _this.changeSlide({
        message: dir
      });
    });

    _defineProperty(_assertThisInitialized(_this), 'selectHandler', function (options) {
      _this.changeSlide(options);
    });

    _defineProperty(_assertThisInitialized(_this), 'disableBodyScroll', function () {
      const preventDefault = function preventDefault (e) {
        e = e || window.event;
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
      };

      window.ontouchmove = preventDefault;
    });

    _defineProperty(_assertThisInitialized(_this), 'enableBodyScroll', function () {
      window.ontouchmove = null;
    });

    _defineProperty(_assertThisInitialized(_this), 'swipeStart', function (e) {
      if (_this.props.verticalSwiping) {
        _this.disableBodyScroll();
      }

      const state = (0, _innerSliderUtils.swipeStart)(e, _this.props.swipe, _this.props.draggable);
      state !== '' && _this.setState(state);
    });

    _defineProperty(_assertThisInitialized(_this), 'swipeMove', function (e) {
      const state = (0, _innerSliderUtils.swipeMove)(e, _objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
        trackRef: _this.track,
        listRef: _this.list,
        slideIndex: _this.state.currentSlide
      }));
      if (!state) return;

      if (state.swiping) {
        _this.clickable = false;
      }

      _this.setState(state);
    });

    _defineProperty(_assertThisInitialized(_this), 'swipeEnd', function (e) {
      const state = (0, _innerSliderUtils.swipeEnd)(e, _objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
        trackRef: _this.track,
        listRef: _this.list,
        slideIndex: _this.state.currentSlide
      }));
      if (!state) return;
      const triggerSlideHandler = state.triggerSlideHandler;
      delete state.triggerSlideHandler;

      _this.setState(state);

      if (triggerSlideHandler === undefined) return;

      _this.slideHandler(triggerSlideHandler);

      if (_this.props.verticalSwiping) {
        _this.enableBodyScroll();
      }
    });

    _defineProperty(_assertThisInitialized(_this), 'touchEnd', function (e) {
      _this.swipeEnd(e);

      _this.clickable = true;
    });

    _defineProperty(_assertThisInitialized(_this), 'slickPrev', function () {
      // this and fellow methods are wrapped in setTimeout
      // to make sure initialize setState has happened before
      // any of such methods are called
      _this.callbackTimers.push(setTimeout(function () {
        return _this.changeSlide({
          message: 'previous'
        });
      }, 0));
    });

    _defineProperty(_assertThisInitialized(_this), 'slickNext', function () {
      _this.callbackTimers.push(setTimeout(function () {
        return _this.changeSlide({
          message: 'next'
        });
      }, 0));
    });

    _defineProperty(_assertThisInitialized(_this), 'slickGoTo', function (slide) {
      const dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      slide = Number(slide);
      if (isNaN(slide)) return '';

      _this.callbackTimers.push(setTimeout(function () {
        return _this.changeSlide({
          message: 'index',
          index: slide,
          currentSlide: _this.state.currentSlide
        }, dontAnimate);
      }, 0));
    });

    _defineProperty(_assertThisInitialized(_this), 'play', function () {
      let nextIndex;

      if (_this.props.rtl) {
        nextIndex = _this.state.currentSlide - _this.props.slidesToScroll;
      } else {
        if ((0, _innerSliderUtils.canGoNext)(_objectSpread(_objectSpread({}, _this.props), _this.state))) {
          nextIndex = _this.state.currentSlide + _this.props.slidesToScroll;
        } else {
          return false;
        }
      }

      _this.slideHandler(nextIndex);
    });

    _defineProperty(_assertThisInitialized(_this), 'autoPlay', function (playType) {
      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
      }

      const autoplaying = _this.state.autoplaying;

      if (playType === 'update') {
        if (autoplaying === 'hovered' || autoplaying === 'focused' || autoplaying === 'paused') {
          return;
        }
      } else if (playType === 'leave') {
        if (autoplaying === 'paused' || autoplaying === 'focused') {
          return;
        }
      } else if (playType === 'blur') {
        if (autoplaying === 'paused' || autoplaying === 'hovered') {
          return;
        }
      }

      _this.autoplayTimer = setInterval(_this.play, _this.props.autoplaySpeed + 50);

      _this.setState({
        autoplaying: 'playing'
      });
    });

    _defineProperty(_assertThisInitialized(_this), 'pause', function (pauseType) {
      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
        _this.autoplayTimer = null;
      }

      const autoplaying = _this.state.autoplaying;

      if (pauseType === 'paused') {
        _this.setState({
          autoplaying: 'paused'
        });
      } else if (pauseType === 'focused') {
        if (autoplaying === 'hovered' || autoplaying === 'playing') {
          _this.setState({
            autoplaying: 'focused'
          });
        }
      } else {
        // pauseType  is 'hovered'
        if (autoplaying === 'playing') {
          _this.setState({
            autoplaying: 'hovered'
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), 'onDotsOver', function () {
      return _this.props.autoplay && _this.pause('hovered');
    });

    _defineProperty(_assertThisInitialized(_this), 'onDotsLeave', function () {
      return _this.props.autoplay && _this.state.autoplaying === 'hovered' && _this.autoPlay('leave');
    });

    _defineProperty(_assertThisInitialized(_this), 'onTrackOver', function () {
      return _this.props.autoplay && _this.pause('hovered');
    });

    _defineProperty(_assertThisInitialized(_this), 'onTrackLeave', function () {
      return _this.props.autoplay && _this.state.autoplaying === 'hovered' && _this.autoPlay('leave');
    });

    _defineProperty(_assertThisInitialized(_this), 'onSlideFocus', function () {
      return _this.props.autoplay && _this.pause('focused');
    });

    _defineProperty(_assertThisInitialized(_this), 'onSlideBlur', function () {
      return _this.props.autoplay && _this.state.autoplaying === 'focused' && _this.autoPlay('blur');
    });

    _defineProperty(_assertThisInitialized(_this), 'render', function () {
      const className = (0, _classnames.default)('slick-slider', _this.props.className, {
        'slick-vertical': _this.props.vertical,
        'slick-initialized': true
      });

      const spec = _objectSpread(_objectSpread({}, _this.props), _this.state);

      let trackProps = (0, _innerSliderUtils.extractObject)(spec, ['fade', 'cssEase', 'speed', 'infinite', 'centerMode', 'focusOnSelect', 'currentSlide', 'lazyLoad', 'lazyLoadedList', 'rtl', 'slideWidth', 'slideHeight', 'listHeight', 'vertical', 'slidesToShow', 'slidesToScroll', 'slideCount', 'trackStyle', 'variableWidth', 'unslick', 'centerPadding', 'targetSlide', 'useCSS']);
      const pauseOnHover = _this.props.pauseOnHover;
      trackProps = _objectSpread(_objectSpread({}, trackProps), {}, {
        onMouseEnter: pauseOnHover ? _this.onTrackOver : null,
        onMouseLeave: pauseOnHover ? _this.onTrackLeave : null,
        onMouseOver: pauseOnHover ? _this.onTrackOver : null,
        focusOnSelect: _this.props.focusOnSelect && _this.clickable ? _this.selectHandler : null
      });
      let dots;

      if (_this.props.dots === true && _this.state.slideCount >= _this.props.slidesToShow) {
        let dotProps = (0, _innerSliderUtils.extractObject)(spec, ['dotsClass', 'slideCount', 'slidesToShow', 'currentSlide', 'slidesToScroll', 'clickHandler', 'children', 'customPaging', 'infinite', 'appendDots']);
        const pauseOnDotsHover = _this.props.pauseOnDotsHover;
        dotProps = _objectSpread(_objectSpread({}, dotProps), {}, {
          clickHandler: _this.changeSlide,
          onMouseEnter: pauseOnDotsHover ? _this.onDotsLeave : null,
          onMouseOver: pauseOnDotsHover ? _this.onDotsOver : null,
          onMouseLeave: pauseOnDotsHover ? _this.onDotsLeave : null
        });
        dots = /* #__PURE__ */_react.default.createElement(_dots.Dots, dotProps);
      }

      let prevArrow, nextArrow;
      const arrowProps = (0, _innerSliderUtils.extractObject)(spec, ['infinite', 'centerMode', 'currentSlide', 'slideCount', 'slidesToShow', 'prevArrow', 'nextArrow']);
      arrowProps.clickHandler = _this.changeSlide;

      if (_this.props.arrows) {
        prevArrow = /* #__PURE__ */_react.default.createElement(_arrows.PrevArrow, arrowProps);
        nextArrow = /* #__PURE__ */_react.default.createElement(_arrows.NextArrow, arrowProps);
      }

      let verticalHeightStyle = null;

      if (_this.props.vertical) {
        verticalHeightStyle = {
          height: _this.state.listHeight
        };
      }

      let centerPaddingStyle = null;

      if (_this.props.vertical === false) {
        if (_this.props.centerMode === true) {
          centerPaddingStyle = {
            padding: '0px ' + _this.props.centerPadding
          };
        }
      } else {
        if (_this.props.centerMode === true) {
          centerPaddingStyle = {
            padding: _this.props.centerPadding + ' 0px'
          };
        }
      }

      const listStyle = _objectSpread(_objectSpread({}, verticalHeightStyle), centerPaddingStyle);

      const touchMove = _this.props.touchMove;
      let listProps = {
        className: 'slick-list',
        style: listStyle,
        onClick: _this.clickHandler,
        onMouseDown: touchMove ? _this.swipeStart : null,
        onMouseMove: _this.state.dragging && touchMove ? _this.swipeMove : null,
        onMouseUp: touchMove ? _this.swipeEnd : null,
        onMouseLeave: _this.state.dragging && touchMove ? _this.swipeEnd : null,
        onTouchStart: touchMove ? _this.swipeStart : null,
        onTouchMove: _this.state.dragging && touchMove ? _this.swipeMove : null,
        onTouchEnd: touchMove ? _this.touchEnd : null,
        onTouchCancel: _this.state.dragging && touchMove ? _this.swipeEnd : null,
        onKeyDown: _this.props.accessibility ? _this.keyHandler : null
      };
      let innerSliderProps = {
        className: className,
        dir: 'ltr',
        style: _this.props.style
      };

      if (_this.props.unslick) {
        listProps = {
          className: 'slick-list'
        };
        innerSliderProps = {
          className: className
        };
      }

      return /* #__PURE__ */_react.default.createElement('div', innerSliderProps, !_this.props.unslick ? prevArrow : '', /* #__PURE__ */_react.default.createElement('div', _extends({
        ref: _this.listRefHandler
      }, listProps), /* #__PURE__ */_react.default.createElement(_track.Track, _extends({
        ref: _this.trackRefHandler
      }, trackProps), _this.props.children)), !_this.props.unslick ? nextArrow : '', !_this.props.unslick ? dots : '');
    });

    _this.list = null;
    _this.track = null;
    _this.state = _objectSpread(_objectSpread({}, _initialState.default), {}, {
      currentSlide: _this.props.initialSlide,
      slideCount: _react.default.Children.count(_this.props.children)
    });
    _this.callbackTimers = [];
    _this.clickable = true;
    _this.debouncedResize = null;

    const ssrState = _this.ssrInit();

    _this.state = _objectSpread(_objectSpread({}, _this.state), ssrState);
    return _this;
  }

  _createClass(InnerSlider, [{
    key: 'didPropsChange',
    value: function didPropsChange (prevProps) {
      let setTrackStyle = false;

      for (let _i3 = 0, _Object$keys = Object.keys(this.props); _i3 < _Object$keys.length; _i3++) {
        const key = _Object$keys[_i3];

        if (!prevProps.hasOwnProperty(key)) {
          setTrackStyle = true;
          break;
        }

        if (_typeof(prevProps[key]) === 'object' || typeof prevProps[key] === 'function') {
          continue;
        }

        if (prevProps[key] !== this.props[key]) {
          setTrackStyle = true;
          break;
        }
      }

      return setTrackStyle || _react.default.Children.count(this.props.children) !== _react.default.Children.count(prevProps.children);
    }
  }]);

  return InnerSlider;
}(_react.default.Component));

exports.InnerSlider = InnerSlider;
