// 创建一个全局div元素用于显示文本
const tooltipDiv = document.createElement("div");

tooltipDiv.classList.add("show-size-popover");
tooltipDiv.style.position = "fixed";
tooltipDiv.style.display = "none"; // 初始不显示
document.body.appendChild(tooltipDiv);

// 全局数组，用于存储所有激活的tooltip的hideTooltip函数引用
const activeTooltipsHideFunctions = [];

// 确保全局监听器只被添加一次
if (!window.__globalMouseDownListenerAdded__) {
  document.addEventListener("mousedown", () => {
    activeTooltipsHideFunctions.forEach((hideTooltip) => hideTooltip());
    activeTooltipsHideFunctions.length = 0; // 清空数组
  });
  window.__globalMouseDownListenerAdded__ = true;
}

// 实现指令 v-my-tooltip
export const vMyTooltip = {
  mounted(el, binding) {
    if (binding.value?.hidden) {
      // 不进行任何提示
      return;
    }
    let showTimeout;
    const showTooltip = (event) => {
      // 检查是否文本溢出
      clearTimeout(showTimeout);
      const isOverflow = el.scrollWidth > el.offsetWidth;

      // 当有modifiers修饰符时 并且文本 溢出 没有溢出则不执行任何操作
      if (
        binding.modifiers.text &&
        binding.modifiers.overflow &&
        !isOverflow &&
        !el.classList.contains("show-my-tooltip")
      ) {
        // 文本溢出了才显示
        return;
      }

      if (document.querySelector(".svg_wrapper_move")) {
        // 如果正在移动文件，那么不显示 tooltip
        hideTooltip();
        return;
      }

      const delay =
        binding.value?.delay !== undefined ? binding.value?.delay : 300;

      showTimeout = setTimeout(
        () => {
          let text;
          if (
            binding.modifiers.text &&
            !el.classList.contains("show-my-tooltip")
          ) {
            text = el.innerText;
          } else {
            text =
              typeof binding.value === "string"
                ? binding.value
                : binding.value.text;
          }
          tooltipDiv.textContent = text; // 设置显示的文本

          tooltipDiv.style.display = "block"; // 显示

          // 获取dynamicMouseDiv的宽度和高度
          const divWidth = tooltipDiv.offsetWidth;
          const divHeight = tooltipDiv.offsetHeight;

          // 计算视窗的宽度和高度
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;

          let finalLeft = event.pageX + 10;
          let finalTop = event.pageY + 15;

          if (finalLeft + divWidth > windowWidth) {
            finalLeft = windowWidth - divWidth - 8; // 调整left值，使其不超出右边界
          }

          if (finalTop + divHeight > windowHeight) {
            finalTop = windowHeight - divHeight - 8; // 调整top值，使其不超出下边界
          }

          tooltipDiv.style.left = `${finalLeft}px`; // 鼠标右下角显示
          tooltipDiv.style.top = `${finalTop}px`;
        },
        tooltipDiv.style.display === "none" ? delay : 0
      );
    };

    const hideTooltip = () => {
      clearTimeout(showTimeout);

      tooltipDiv.style.display = "none"; // 隐藏
    };

    // 添加事件监听器
    el.addEventListener("mouseenter", showTooltip);
    el.addEventListener("mousemove", showTooltip);
    el.addEventListener("mouseleave", hideTooltip);

    // 在元素销毁时移除事件监听
    el._showTooltip = showTooltip;
    el._hideTooltip = hideTooltip;

    // 在mounted时将hideTooltip添加到全局数组
    activeTooltipsHideFunctions.push(hideTooltip);
  },
  unmounted(el) {
    el._showTooltip && el.removeEventListener("mouseenter", el._showTooltip);
    el._hideTooltip && el.removeEventListener("mouseleave", el._hideTooltip);

    // 从全局数组中移除对应的hideTooltip
    const index = activeTooltipsHideFunctions.indexOf(el._hideTooltip);
    if (index > -1) {
      activeTooltipsHideFunctions.splice(index, 1);
    }
  },
};
