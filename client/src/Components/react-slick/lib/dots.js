'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Dots = void 0;

const _react = _interopRequireDefault(require('react'));

const _classnames = _interopRequireDefault(require('classnames'));

const _innerSliderUtils = require('./utils/innerSliderUtils');

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof (obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj; }; } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

function ownKeys (object, enumerableOnly) { const keys = Object.keys(object); if (Object.getOwnPropertySymbols) { let symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread (target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty (obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

const getDotCount = function getDotCount (spec) {
  let dots;

  if (spec.infinite) {
    dots = Math.ceil(spec.slideCount / spec.slidesToScroll);
  } else {
    dots = Math.ceil((spec.slideCount - spec.slidesToShow) / spec.slidesToScroll) + 1;
  }

  return dots;
};

const Dots = /* #__PURE__ */(function (_React$PureComponent) {
  _inherits(Dots, _React$PureComponent);

  const _super = _createSuper(Dots);

  function Dots () {
    _classCallCheck(this, Dots);

    return _super.apply(this, arguments);
  }

  _createClass(Dots, [{
    key: 'clickHandler',
    value: function clickHandler (options, e) {
      // In Autoplay the focus stays on clicked button even after transition
      // to next slide. That only goes away by click somewhere outside
      e.preventDefault();
      this.props.clickHandler(options);
    }
  }, {
    key: 'render',
    value: function render () {
      const _this$props = this.props;
      const onMouseEnter = _this$props.onMouseEnter;
      const onMouseOver = _this$props.onMouseOver;
      const onMouseLeave = _this$props.onMouseLeave;
      const infinite = _this$props.infinite;
      const slidesToScroll = _this$props.slidesToScroll;
      const slidesToShow = _this$props.slidesToShow;
      const slideCount = _this$props.slideCount;
      const currentSlide = _this$props.currentSlide;
      const dotCount = getDotCount({
        slideCount: slideCount,
        slidesToScroll: slidesToScroll,
        slidesToShow: slidesToShow,
        infinite: infinite
      });
      const mouseEvents = {
        onMouseEnter: onMouseEnter,
        onMouseOver: onMouseOver,
        onMouseLeave: onMouseLeave
      };
      let dots = [];

      for (let i = 0; i < dotCount; i++) {
        const _rightBound = (i + 1) * slidesToScroll - 1;

        const rightBound = infinite ? _rightBound : (0, _innerSliderUtils.clamp)(_rightBound, 0, slideCount - 1);

        const _leftBound = rightBound - (slidesToScroll - 1);

        const leftBound = infinite ? _leftBound : (0, _innerSliderUtils.clamp)(_leftBound, 0, slideCount - 1);
        const className = (0, _classnames.default)({
          'slick-active': infinite ? currentSlide >= leftBound && currentSlide <= rightBound : currentSlide === leftBound
        });
        const dotOptions = {
          message: 'dots',
          index: i,
          slidesToScroll: slidesToScroll,
          currentSlide: currentSlide
        };
        const onClick = this.clickHandler.bind(this, dotOptions);
        dots = dots.concat(/* #__PURE__ */_react.default.createElement('li', {
          key: i,
          className: className
        }, /* #__PURE__ */_react.default.cloneElement(this.props.customPaging(i), {
          onClick: onClick
        })));
      }

      return /* #__PURE__ */_react.default.cloneElement(this.props.appendDots(dots), _objectSpread({
        className: this.props.dotsClass
      }, mouseEvents));
    }
  }]);

  return Dots;
}(_react.default.PureComponent));

exports.Dots = Dots;
