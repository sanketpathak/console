import { global_palette_black_300 as globalBlack300 } from '@patternfly/react-tokens/dist/js/global_palette_black_300';

const pfDependentAxisTickLabels = {
  padding: 5,
  fontFamily: 'var(--pf-chart-global--FontFamily)',
  letterSpacing: 'var(--pf-chart-global--letter-spacing)',
  fill: 'var(--pf-global--Color--200)',
};
const pfIndependentAxisTickLabels = Object.assign({}, pfDependentAxisTickLabels, { padding: 2 });
const axisTicks = {
  size: 5,
  strokeWidth: 1,
  stroke: globalBlack300.value,
};

export const areaTheme = {
  area: {
    style: {
      data: {
        fillOpacity: 0.15,
      },
    },
  },
  chart: {
    padding: {
      bottom: 30,
      left: 60,
      right: 10,
      top: 0,
    },
  },
  dependentAxis: {
    style: {
      axis: {
        stroke: 'EDEDED',
        strokeWidth: 2,
      },
      grid: { stroke: '#EDEDED' },
      tickLabels: pfDependentAxisTickLabels,
      ticks: axisTicks,
    },
  },
};

export const barTheme = {
  bar: {
    style: {
      labels: {
        textAnchor: 'end' as 'end',
      },
    },
  },
  dependentAxis: {
    style: {
      axis: {
        stroke: 'none',
      },
      tickLabels: {
        fill: 'none',
      },
    },
  },
  independentAxis: {
    style: {
      axis: {
        stroke: 'none',
      },
      tickLabels: {
        textAnchor: 'start' as 'start',
      },
    },
  },
};

export const queryBrowserTheme = {
  chart: {
    padding: {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
  },
  dependentAxis: {
    style: {
      axis: {
        stroke: 'none',
      },
      grid: {
        stroke: '#EDEDED',
      },
      tickLabels: pfDependentAxisTickLabels,
    },
  },
  independentAxis: {
    style: {
      ticks: axisTicks,
      tickLabels: pfIndependentAxisTickLabels,
      grid: {
        stroke: 'none',
      },
    },
  },
  line: {
    style: {
      data: {
        opacity: 0.75,
      },
    },
  },
};
