<template>
  <div class="w-full h-[100vh] flex flex-col items-center justify-center space-y-4">
    <h1 class="font-bold text-5xl">
      <span>让想法和创意沸腾</span>
    </h1>
    <p>
      <!--   打字动画效果   -->
      <span class="relative inline-block text-xl">
        <span ref="typingTextRef" />
        <span class="cursor-blink">｜</span>
      </span>
    </p>
    <Button v-if="isLogin" size="lg" class="flex items-center">
      <SparklesIcon />
      <span>开始使用</span>
    </Button>
    <form v-else @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormControl>
            <div class="flex items-center space-x-2">
              <Input
                type="email"
                class="w-60 h-10"
                placeholder="输入邮箱地址"
                v-bind="componentField"
              />
              <Button type="submit" size="lg" class="flex items-center">
                <span>高效工作</span>
                <RocketIcon />
              </Button>
            </div>
          </FormControl>
        </FormItem>
      </FormField>
    </form>
    <img class="w-[500px] h-auto" :src="homepage" alt="homepage" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import homepage from '@/assets/imgs/homepage.gif'
import { Button } from '@/components/ui/button'
import { SparklesIcon, RocketIcon } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { useRouter } from 'vue-router'

const isLogin = ref(false)
const typingTextRef = ref<HTMLElement | null>(null)
const fullText = '现在开启高效工作之旅！'
const router = useRouter()
const isLoading = ref(false)

// 打字机效果实现（循环播放）
onMounted(() => {
  if (typingTextRef.value) {
    let currentIndex = 0
    let isTyping = true // 标记是否处于打字阶段

    const typeLoop = () => {
      // 打字阶段
      if (isTyping) {
        if (currentIndex < fullText.length) {
          typingTextRef.value!.textContent = fullText.substring(0, currentIndex + 1)
          currentIndex++
        } else {
          // 打字完成，等待一段时间后开始删除
          isTyping = false
          setTimeout(() => {
            typeLoop()
          }, 1500) // 完成后暂停1.5秒
          return
        }
      }
      // 删除阶段
      else {
        if (currentIndex > 0) {
          currentIndex--
          typingTextRef.value!.textContent = fullText.substring(0, currentIndex)
        } else {
          // 删除完成，等待一段时间后重新开始打字
          isTyping = true
          setTimeout(() => {
            typeLoop()
          }, 500) // 删除完成后暂停0.5秒
          return
        }
      }

      // 根据当前阶段设置不同的速度
      const speed = isTyping ? 150 : 100 // 打字较慢，删除较快
      setTimeout(typeLoop, speed)
    }

    // 开始循环
    typeLoop()
  }
})

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
  }),
)

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  console.log('邮箱地址:', values.email)
  isLoading.value = true

  try {
    // 模拟API调用，检查用户是否已存在
    await new Promise((resolve) => setTimeout(resolve, 800))

    // 模拟随机结果：用户存在或不存在
    const isExistingUser = Math.random() > 0.5 // 随机模拟用户是否已存在

    if (isExistingUser) {
      // 如果用户已存在，跳转到登录页面并预填邮箱
      router.push({
        path: '/login',
        query: {
          email: values.email,
          redirectMessage: '此邮箱已注册，请直接登录',
        },
      })
    } else {
      // 如果是新用户，跳转到注册页面并预填邮箱
      router.push({
        path: '/register',
        query: {
          email: values.email,
        },
      })
    }
  } catch (error) {
    console.error('请求处理失败:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.cursor-blink {
  display: inline-block;
  animation: blink 1s infinite;
}

:deep(input:-webkit-autofill),
:deep(input:-webkit-autofill:hover),
:deep(input:-webkit-autofill:focus) {
  -webkit-box-shadow: 0 0 0px 1000px transparent inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
