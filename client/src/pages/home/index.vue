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

const isLogin = ref(true)
const typingTextRef = ref<HTMLElement | null>(null)
const fullText = '现在开启高效工作之旅！'

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

const onSubmit = handleSubmit((values) => {
  console.log(values)
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
</style>
