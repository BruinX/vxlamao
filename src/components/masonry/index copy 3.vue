<template>
  <div ref="containerRef" class="relative w-full transition-[height] duration-300"
    :style="{ height: containerHeight + 'px' }">
    <template v-if="layoutReady">
      <div v-for="item in grid" :key="item.id" :data-key="item.id" class="absolute box-content"
        :style="{ willChange: 'transform, width, height, opacity' }" @click="openUrl(item.url)"
        @mouseenter="e => handleMouseEnter(item.id, e.currentTarget as HTMLElement)"
        @mouseleave="e => handleMouseLeave(item.id, e.currentTarget as HTMLElement)">
        <div
          class="relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] uppercase text-[10px] leading-[10px] "
          :style="{ backgroundImage: `url(${item.img})` }">
          <div v-if="colorShiftOnHover"
            class="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '../../stores/counter.js'
import { ref, computed, onMounted, onUnmounted, watchEffect, nextTick, useTemplateRef } from 'vue';
import { gsap } from 'gsap';
const pageStore = useCounterStore()

interface Item {
  id: string;
  img: string;
  url: string;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const props = withDefaults(defineProps<MasonryProps>(), {
  ease: 'power3.out',
  duration: 0.6,
  stagger: 0.05,
  animateFrom: 'bottom',
  scaleOnHover: true,
  hoverScale: 0.95,
  blurToFocus: true,
  colorShiftOnHover: false
});


const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const value = ref<number>(get());

  onMounted(() => {
    const handler = () => (value.value = get());
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));

    onUnmounted(() => {
      queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
    });
  });

  return value;
};

const useMeasure = () => {
  const containerRef = useTemplateRef<HTMLDivElement>('containerRef');
  const size = ref({ width: 0, height: 0 });
  let resizeObserver: ResizeObserver | null = null;

  onMounted(() => {
    if (!containerRef.value) return;

    resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      size.value = { width, height };
    });
    pageStore.setPageLoading(true)
    resizeObserver.observe(containerRef.value);
  });

  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  });

  return [containerRef, size] as const;
};

const imageRatioMap = ref<Record<string, number>>({});
const preloadImages = async (items: Item[]) => {
  await Promise.all(
    items.map(
      item =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = item.img;

          img.onload = () => {
            imageRatioMap.value[item.id] =
              img.naturalHeight / img.naturalWidth;
            resolve();
          };

          img.onerror = () => {
            // fallback：给个常见比例，防止布局炸
            imageRatioMap.value[item.id] = 4 / 3;
            resolve();
          };
        })
    )
  );
};


const columns = useMedia(
  ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
  [5, 4, 3, 2],
  1
);

const [containerRef, size] = useMeasure();
const imagesReady = ref(false);
const hasMounted = ref(false);

const grid = computed(() => {
  if (!size.value.width) return [];
  const colHeights = new Array(columns.value).fill(0);
  const gap = 16;
  const totalGaps = (columns.value - 1) * gap;
  const columnWidth = (size.value.width - totalGaps) / columns.value;

  return props.items.map(child => {

    const ratio = imageRatioMap.value[child.id];
    if (!ratio) return null;

    const col = colHeights.indexOf(Math.min(...colHeights));
    const x = col * (columnWidth + gap);
    const height = columnWidth * ratio;
    const y = colHeights[col];

    colHeights[col] += height + gap;
    return { ...child, x, y, w: columnWidth, h: height };
  }).filter(Boolean);
});

const openUrl = (url: string) => {
  window.open(url, '_blank', 'noopener');
};

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

const getInitialPosition = (item: GridItem) => {
  const containerRect = containerRef.value?.getBoundingClientRect();
  if (!containerRect) return { x: item.x, y: item.y };

  let direction = props.animateFrom;
  if (props.animateFrom === 'random') {
    const dirs = ['top', 'bottom', 'left', 'right'];
    direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof props.animateFrom;
  }

  switch (direction) {
    case 'top':
      return { x: item.x, y: -200 };
    case 'bottom':
      return { x: item.x, y: window.innerHeight + 200 };
    case 'left':
      return { x: -200, y: item.y };
    case 'right':
      return { x: window.innerWidth + 200, y: item.y };
    case 'center':
      return {
        x: containerRect.width / 2 - item.w / 2,
        y: containerRect.height / 2 - item.h / 2
      };
    default:
      return { x: item.x, y: item.y + 100 };
  }
};

const handleMouseEnter = (id: string, element: HTMLElement) => {
  if (props.scaleOnHover) {
    gsap.to(`[data-key="${id}"]`, {
      scale: props.hoverScale,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
  if (props.colorShiftOnHover) {
    const overlay = element.querySelector('.color-overlay') as HTMLElement;
    if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
  }
};

const handleMouseLeave = (id: string, element: HTMLElement) => {
  if (props.scaleOnHover) {
    gsap.to(`[data-key="${id}"]`, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
  if (props.colorShiftOnHover) {
    const overlay = element.querySelector('.color-overlay') as HTMLElement;
    if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
  }
};

const layoutReady = ref(false);

const containerHeight = computed(() => {
  if (!grid.value.length) return 0;

  let max = 900;
  grid.value.forEach(item => {
    max = Math.max(max, item.y + item.h);
  });

  return max;
});

let lastHeight = 0;
let timer: number | null = null;

watch(
  () => containerHeight.value,
  h => {
    if (h <= 0) return;

    lastHeight = h;

    if (timer) clearTimeout(timer);

    timer = window.setTimeout(() => {
      if (lastHeight === h) {
        layoutReady.value = true;
        pageStore.setPageLoading(false)

      }
      timer = null;
    }, 500);
  }
);

watchEffect(() => {
  preloadImages(props.items).then(() => {
    imagesReady.value = true;
  });
});

watch(
  [imagesReady, layoutReady, () => grid.value],
  ([imgReady, ready, currentGrid]) => {
    if (!imgReady || !ready || !currentGrid.length) return;

    nextTick(() => {
      currentGrid.forEach((item, index) => {
        const selector = `[data-key="${item.id}"]`;
        const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

        if (!hasMounted.value) {
          const start = getInitialPosition(item);

          gsap.fromTo(
            selector,
            {
              opacity: 0,
              x: start.x,
              y: start.y,
              ...(props.blurToFocus && { filter: 'blur(10px)' })
            },
            {
              opacity: 1,
              ...animProps,
              ...(props.blurToFocus && { filter: 'blur(0px)' }),
              duration: 0.8,
              ease: 'power3.out',
              delay: index * props.stagger
            }
          );
        } else {
          gsap.to(selector, {
            ...animProps,
            duration: props.duration,
            ease: props.ease,
            overwrite: 'auto'
          });
        }
      });

      hasMounted.value = true;
    });
  },
  { flush: 'post' }
);

</script>
