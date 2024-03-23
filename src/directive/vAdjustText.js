const resizeHandlers = [];

window.addEventListener(
  "resize",
  debounce(() => {
    resizeHandlers.forEach((handler) => handler());
  }, 16)
);

function debounce(func, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

function abbreviateFileName(el, fileName, fileType) {
  // 根据文件类型决定是否提取扩展名
  const hasExtension = fileType !== 2;
  const extension = hasExtension
    ? fileName.slice(fileName.lastIndexOf("."))
    : "";
  const baseName = hasExtension
    ? fileName.slice(0, fileName.lastIndexOf("."))
    : fileName;

  let low = 1;
  let high = baseName.length;
  let bestFit = fileName;

  // 使用二分查找法寻找最佳缩写
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const testAbbrev = `${baseName.slice(0, mid)}...${baseName.slice(
      -mid
    )}${extension}`;
    el.innerText = testAbbrev; // 临时设置以检测宽度

    if (el.scrollWidth > el.offsetWidth) {
      high = mid - 1;
    } else {
      bestFit = testAbbrev; // 找到一个合适的缩写
      low = mid + 1;
    }
  }

  el.innerText = bestFit; // 应用最合适的缩写，减少DOM操作

  // 如果文本与一开始的相同，那么使用尾部...的方式
  return bestFit.trim() === fileName.trim();
}

function applyAbbreviationIfNeeded(el, binding) {
  // 先重置到原始文本
  const originalText =
    el._originalText || binding.value?.name.trim() || el.innerText.trim();
  el.innerText = originalText; // 重置文本

  // 如果文本已经适合显示，就不进行任何操作
  if (el.scrollWidth <= el.offsetWidth) {
    // 修复不显示省略号也显示tooltip的问题
    if (el.classList.contains("show-my-tooltip")) {
      el.classList.remove("show-my-tooltip");
    }
    return;
  }

  // console.time('applyAbbreviationIfNeeded');
  // const originalText = binding.value?.name.trim() || el.innerText.trim();

  el.innerText = originalText; // 先恢复原始文本再检查，确保正确的比较

  const isRemoveClass = abbreviateFileName(
    el,
    originalText,
    binding.value?.fileType
  );

  // 避免重复添加同一个类
  if (!el.classList.contains("show-my-tooltip") && !isRemoveClass) {
    el.classList.add("show-my-tooltip");
  } else if (el.classList.contains("show-my-tooltip") && isRemoveClass) {
    el.classList.remove("show-my-tooltip");
  }
  // console.timeEnd('applyAbbreviationIfNeeded');
}

// 实现指令 v-adjust-text
export const vAdjustText = {
  mounted(el, binding) {
    const handleResize = () => applyAbbreviationIfNeeded(el, binding);
    el._handleResize = handleResize; // 将处理函数存储在元素上以便移除
    resizeHandlers.push(handleResize);
    applyAbbreviationIfNeeded(el, binding); // 初次挂载时也应用
  },
  updated(el, binding) {
    applyAbbreviationIfNeeded(el, binding);
  },
  beforeUnmount(el) {
    const index = resizeHandlers.indexOf(el._handleResize);
    if (index > -1) {
      resizeHandlers.splice(index, 1);
    }
  },
};
