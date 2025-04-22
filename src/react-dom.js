import { render as _render } from "./react-reconciler";

// 判断该属性是事件
const isEvent = (key) => key.startsWith("on");
// 不是事件就是属性
const isProperty = (key) => key !== "children" && !isEvent(key);
// 属性是否变化
const isNew = (prev, next) => (key) => prev[key] !== next[key];
// 属性是否被删除
const isGone = (prev, next) => (key) => !(key in next);
/**
 * 更新dom属性和事件
 * @param {*} dom
 * @param {*} prevProps
 * @param {*} nextProps
 */
export function updateDom(dom, prevProps, nextProps) {
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

/**
 * 为fiber创建真实dom
 * @param {*} fiber
 * @returns
 */
export function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  updateDom(dom, {}, fiber.props);

  return dom;
}

export function render(element, container) {
  _render(element, container);
}

const reactDom = {
  render,
};

export default reactDom;
