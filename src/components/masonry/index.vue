<template>
  <div ref="containerRef" class="relative w-full transition-[height] duration-300"
    :style="{ height: containerHeight + 'px' }">
    <template v-if="layoutReady">
      <div v-for="item in grid" :key="item.id" :data-key="item.id" class="absolute box-content cursor-pointer " :style="{
        willChange: 'transform, width, height, opacity'
      }" @mouseenter="e => handleMouseEnter(item.id, e.currentTarget as HTMLElement)"
        @mouseleave="e => handleMouseLeave(item.id, e.currentTarget as HTMLElement)" @click="handleClick(item)">
        <!-- Card -->
        <div class="relative w-full h-full bg-white rounded-xl overflow-hidden
               shadow-[0_4px_10px_rgba(0,0,0,0.12)]
               flex flex-col ">
          <!-- Header -->
          <div class="px-3 pt-3 pb-2 w-full">
            <div class="w-full text-sm font-medium text-gray-900 line-clamp-2">
              <span v-if="masonryType == 'case'">{{ item.cate_title + ' - ' + item.name }}</span>
              <span v-else>{{ item.name }}</span>
            </div>
            <div v-if="masonryType == 'case'" class="text-xs text-gray-500 mt-0.5">
              {{ item.car_brand + ' - ' + item.car_model }}
            </div>
          </div>

          <!-- Image -->
          <div class="w-full bg-cover bg-center" :style="{
            height: item.imageHeight + 'px',
          }">
            <el-image :src="`${item.cover}?w=600&q=75&format=webp`" :alt="item.id"
              class="w-full h-full object-cover block" fit="cover" lazy>
              <template #placeholder>
                <div class="w-full text-2xl flex justify-center">
                  <Loading />
                </div>
              </template>
            </el-image>
          </div>

          <!-- Footer -->
          <div class="absolute bottom-1  px-3 text-xs text-gray-400 ">
            <span v-if="masonryType == 'case'">Date:{{ dayjs(item.bulid_time).format('YYYY-MM-DD') }}</span>
            <span v-else>No.{{ item.id }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, computed, onMounted, onUnmounted, watchEffect, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { useCounterStore } from '../../stores/counter.js'
const pageStore = useCounterStore()

/* ================== props ================== */

interface MasonryItem {
  id: string
  name: number
  cover: string
  title: string
  cate_title: string
  bulid_time: string
  car_brand: string
  car_model: string
}

const props = withDefaults(
  defineProps<{
    items: MasonryItem[]
    masonryType: string
    gap?: number
    duration?: number
    stagger?: number
    animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
    scaleOnHover?: boolean;
    hoverScale?: number;
    blurToFocus?: boolean;
    colorShiftOnHover?: boolean;
    casePage?: any
  }>(),
  {
    gap: 16,
    duration: 0.6,
    scaleOnHover: true,
    hoverScale: 0.95,
    blurToFocus: true,
    colorShiftOnHover: false,
    stagger: 0.05,
    animateFrom: 'bottom',
    masonryType: ''
  }
)

/* ================== constants ================== */

const HEADER_HEIGHT = 52
const FOOTER_HEIGHT = 32

/* ================== router ================== */

const router = useRouter()

const routeMap = {
  case: (item: any) => ({
    name: 'caseInfo',
    params: { page: props.casePage, caseId: item.id },
  }),
  product: (item: any) => ({
    name: 'productsInfo',
    params: { cateId: item.cate_id, productId: item.id },
  }),
}

const handleClick = (item: any) => {
  const resolver = routeMap[props.masonryType]
  if (!resolver) return

  const { href } = router.resolve(resolver(item))
  window.open(href, '_blank', 'noopener,noreferrer')
}

/* ================== responsive columns ================== */

const columns = ref(1)
const updateColumns = () => {
  const w = window.innerWidth
  if (w >= 1500) columns.value = 5
  else if (w >= 1000) columns.value = 4
  else if (w >= 640) columns.value = 3
  else columns.value = 2
}

/* ================== measure container ================== */

const containerRef = ref<HTMLElement | null>(null)
const containerWidth = ref(0)

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  pageStore.setPageLoading(true)
  updateColumns()
  window.addEventListener('resize', updateColumns)

  if (containerRef.value) {
    resizeObserver = new ResizeObserver(entries => {
      containerWidth.value = entries[0].contentRect.width
    })
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateColumns)
  resizeObserver?.disconnect()
  pageStore.setPageLoading(false)

})

/* ================== image ratio ================== */

const ratioMap = ref<Record<string, number>>({})
const imagesReady = ref(false)

const preloadImages = async () => {
  await Promise.all(
    props.items.map(item => {
      return new Promise<void>(resolve => {
        const img = new Image()
        img.src = item.cover
        img.onload = () => {
          ratioMap.value[item.id] =
            img.naturalHeight / img.naturalWidth
          resolve()
        }
        img.onerror = () => {
          ratioMap.value[item.id] = 3 / 4
          resolve()
        }
      })
    })
  )
  imagesReady.value = true
}

/* ================== grid ================== */

const grid = computed(() => {
  if (!imagesReady.value || !containerWidth.value) return []

  const colHeights = new Array(columns.value).fill(0)
  const totalGap = (columns.value - 1) * props.gap
  const colWidth = (containerWidth.value - totalGap) / columns.value

  return props.items
    .map(item => {
      const ratio = ratioMap.value[item.id]
      if (!ratio) return null

      const imageHeight = colWidth * ratio
      const totalHeight =
        HEADER_HEIGHT + imageHeight + FOOTER_HEIGHT + (props.masonryType == 'case' ? 20 : -20)

      const col = colHeights.indexOf(Math.min(...colHeights))
      const x = col * (colWidth + props.gap)
      const y = colHeights[col]

      colHeights[col] += totalHeight + props.gap

      return {
        ...item,
        x,
        y,
        w: colWidth,
        h: totalHeight,
        imageHeight
      }
    })
    .filter(Boolean)
})

/* ================== container height ================== */

const layoutReady = ref(false);

const containerHeight = computed(() => {
  if (!grid.value.length) return 0;

  let max = 0;
  grid.value.forEach(item => {
    max = Math.max(max, item.y + item.h + 20);
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

/* ================== animation ================== */
interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}
const getInitialPosition = (item: GridItem) => {
  const containerRect = containerRef.value?.getBoundingClientRect();
  if (!containerRect) return { x: item.x, y: item.y + 20 };

  let direction = props.animateFrom;
  if (props.animateFrom === 'random') {
    const dirs = ['top', 'bottom', 'left', 'right'];
    direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof props.animateFrom;
  }
  return { x: item.x, y: item.y + 100 };

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

const hasAnimated = ref(false)

watch(
  [imagesReady, layoutReady, () => grid.value],
  ([imgReady, ready, currentGrid]) => {
    if (!imgReady || !ready || !currentGrid.length) return;

    nextTick(() => {
      currentGrid.forEach((item, index) => {
        const selector = `[data-key="${item.id}"]`;
        const animProps = { x: item.x, y: item.y + 20, width: item.w, height: item.h };

        if (!hasAnimated.value) {
          const start = getInitialPosition(item);
          const startY = item.y + 20 + 60; // 20 是高度补偿，60 是动画偏移
          gsap.fromTo(
            selector,
            {
              opacity: 0,
              x: start.x,
              y: startY,
              ...(props.blurToFocus && { filter: 'blur(10px)' })
            },
            {
              opacity: 1,
              ...animProps,
              ...(props.blurToFocus && { filter: 'blur(0px)' }),
              // duration: 0.8,
              // ease: 'power3.out',
              // delay: index * props.stagger
            }
          );
        } else {
          gsap.to(selector, {
            ...animProps,
            // duration: props.duration,
            // ease: 'power3.out',
            overwrite: 'auto'
          });
        }
      });

      hasAnimated.value = true;
    });
  },
  { flush: 'post' }
);


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

/* ================== init ================== */
watchEffect(() => {
  if (props.items.length) {
    imagesReady.value = false
    preloadImages()
  }
})
</script>
