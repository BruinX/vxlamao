<template>
  <footer
    class="relative bg-[url('../assets/image/footer_bg.jpg')] bg-no-repeat bg-cover bg-center cursor-pointer"
  >
    <!-- 遮罩层 -->
    <div class="absolute inset-0 bg-black/50"></div>

    <div class="relative z-10 mx-auto px-6 pt-20 grid grid-cols-1 md:grid-cols-3">
      <div class="bg-black/5 flex justify-center md:justify-start items-start flex-wrap">
        <img class="size-20" src="../../assets/image/logo.avif" alt="" />
        <div class="w-full mt-4 flex justify-center md:justify-start flex-nowrap">
          <img class="size-7 mr-3" src="../../assets/image/icon-ytb.png" alt="" />
          <img class="size-7 mr-3" src="../../assets/image/icon-f.png" alt="" />
          <img class="size-7 mr-3" src="../../assets/image/icon-is.png" alt="" />
          <img class="size-7 mr-3" src="../../assets/image/icon-tk.png" alt="" />
          <img class="size-7 mr-3" src="../../assets/image/icon-wx.png" alt="" />
        </div>
      </div>
      <div class="bg-black h-40"></div>
      <div class="bg-black h-40"></div>
    </div>

    <!-- <div class="relative z-10 mx-auto max-w-[1376px] px-6 border-b border-[#4D5776] border-solid">
      <div class="flex justify-between items-center mb-6">
        <div
          class="flex justify-start items-center hover:opacity-60 duration-[.25s] cursor-pointer"
        >
          <img src="../../assets/image/logo.png" alt="logo" class="w-[8rem] mr-2" />
        </div>
      </div>

      <div class="mx-auto flex flex-wrap justify-start text-center sm:text-left text-sm">
        <div class="w-[50%] md:w-1/4 sm:w-1/2 pb-3">
          <div class="flex flex-col pr-6 h-full">
            <div class="text-[#B3C5FE] font-bold mb-2">Huang Sales Director</div>
            <a class="text-[#fff] mb-2" href="tel:18888888888">+86-188 8888 8888</a>
          </div>
        </div>
        <div class="w-[50%] md:w-1/4 sm:w-1/2">
          <template v-for="(item, index) in footerInfo" :key="index">
            <div class="pb-3">
              <div class="flex flex-col h-full">
                <div class="text-[#B3C5FE] font-bold mb-2">{{ item.title }}</div>
                <template v-for="(content, contentIndex) in item.content" :key="contentIndex">
                  <a
                    v-if="content.url === 'https://ht.cfcfilms.cn/XKJxzWjvFd.php/index/login'"
                    class="text-[#fff] mb-2 cursor-pointer"
                    :href="content.url"
                    >{{ content.label }}</a
                  >
                  <div
                    v-else
                    class="text-[#fff] mb-2 cursor-pointer"
                    @click="goProduct(content.linkUrl, content.query)"
                  >
                    {{ content.label }}
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
        <div class="w-[100%] md:w-1/4 sm:w-1/2 pb-3">
          <div class="text-[#B3C5FE] font-bold mb-2 w-full flex justify-between">
            <span>留言</span>
          </div>
        </div>
      </div>
    </div> -->
  </footer>
</template>

<script setup lang="ts">
const router = useRouter()

const footerInfo = [
  // {
  //   title: '邮箱',
  //   content: [
  //     {
  //       label: '18888888888@qq.com',
  //       url: 'mailto:1007069905@qq.com'
  //     }
  //   ]
  // },
  {
    title: '产品',
    content: [
      {
        label: '隐形车衣',
        linkUrl: 'product',
        query: '0',
      },
      {
        label: 'TPU改色膜',
        linkUrl: 'product',
        query: '1',
      },
      {
        label: '太阳膜',
        linkUrl: 'product',
        query: '2',
      },
    ],
  },
  {
    title: '资源',
    content: [
      // {
      //   label: '关于我们',
      //   url: ''
      // },
      {
        label: '后台',
        url: 'https://ht.cfcfilms.cn/XKJxzWjvFd.php/index/login',
      },
    ],
  },
]

const goProduct = (path, query) => {
  if (path) {
    router.push({
      path: `/${path}`,
      query: {
        _id: query,
      },
    })
  }
}
</script>
