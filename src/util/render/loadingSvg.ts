/*
 * @Description: 动态获取加载svg
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-18 16:40:07
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-18 16:58:41
 */

interface LoadingSvgOptions {
  width?: number; //  svg 宽度
  height?: number; // svg 高度
  outSideColor?: string; // 外轮廓颜色
  inSideColor?: string; // 内轮廓颜色
  dur?: number; // animateTransform dur
}

/**
 * @description: 动态获取加载svg
 * @return {string} 返回svg的html
 * @author: dreamy-xay
 */
export default function(options: LoadingSvgOptions) {
  options = {
    width: 50,
    height: 50,
    outSideColor: '#409eff',
    inSideColor: '#02bcfe',
    dur: 2,
    ...options
  };

  const outSideColorAnimation = `${options.inSideColor};${options.outSideColor};${options.inSideColor}`;
  const inSideColorAnimation = `${options.outSideColor};${options.inSideColor};${options.outSideColor}`;

  return `<svg width="${options.width}" height="${options.height}" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
            <circle
              cx="25"
              cy="25"
              r="22"
              fill="none"
              stroke-width="3"
              stroke="${options.outSideColor}"
              stroke-dasharray="34"
              stroke-linecap="round"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 25 25;360 25 25"
                dur="${options.dur}s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke"
                values="${outSideColorAnimation}"
                dur="${options.dur}s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="25"
              cy="25"
              r="12"
              fill="none"
              stroke-width="3"
              stroke="${options.inSideColor}"
              stroke-dasharray="19"
              stroke-linecap="round"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 25 25"
                to="0 25 25"
                dur="${options.dur}s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke"
                values="${inSideColorAnimation}"
                dur="${options.dur}s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>`;
}
