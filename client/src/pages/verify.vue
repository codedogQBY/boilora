<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <Card class="w-full max-w-md">
      <CardHeader class="text-center">
        <CardTitle>邮箱验证</CardTitle>
        <CardDescription>{{ descriptions[verificationStatus] }}</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="flex justify-center">
          <!-- 处理中状态 -->
          <div
            v-if="verificationStatus === 'processing'"
            class="flex flex-col items-center space-y-4"
          >
            <LoaderIcon class="h-12 w-12 animate-spin text-primary" />
            <p class="text-sm text-muted-foreground">正在验证您的邮箱，请稍候...</p>
          </div>

          <!-- 成功状态 -->
          <div
            v-else-if="verificationStatus === 'success'"
            class="flex flex-col items-center space-y-4"
          >
            <CheckCircleIcon class="h-12 w-12 text-green-500" />
            <p class="text-sm text-muted-foreground">
              您的邮箱
              <span class="font-medium">{{ userEmail }}</span>
              已成功验证！
            </p>
          </div>

          <!-- 失败状态 -->
          <div
            v-else-if="verificationStatus === 'error'"
            class="flex flex-col items-center space-y-4"
          >
            <XCircleIcon class="h-12 w-12 text-red-500" />
            <p class="text-sm text-muted-foreground">验证链接无效或已过期，请重新发送验证邮件。</p>
          </div>
        </div>

        <!-- 成功状态下的按钮 -->
        <Button
          v-if="verificationStatus === 'success'"
          class="w-full"
          @click="$router.push('/login')"
        >
          前往登录
        </Button>

        <!-- 失败状态下的按钮 -->
        <div v-if="verificationStatus === 'error'" class="space-y-4">
          <Button class="w-full" @click="resendVerification">重新发送验证邮件</Button>
          <div class="text-center text-sm">
            <router-link to="/login" class="font-medium text-primary hover:underline">
              返回登录
            </router-link>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CheckCircleIcon, XCircleIcon, LoaderIcon } from 'lucide-vue-next'

// 定义验证状态类型
type VerificationStatus = 'processing' | 'success' | 'error'

// 验证状态
const verificationStatus = ref<VerificationStatus>('processing')
const userEmail = ref('')

// 状态对应的描述文本
const descriptions = {
  processing: '正在验证您的邮箱...',
  success: '您的邮箱已成功验证',
  error: '验证失败',
}

// 重新发送验证邮件
const resendVerification = () => {
  // 这里添加重新发送验证邮件的逻辑
  console.log('重新发送验证邮件到:', userEmail.value)
}

// 获取路由参数
const route = useRoute()

// 在组件挂载时处理验证逻辑
onMounted(async () => {
  const token = route.query.token as string
  userEmail.value = (route.query.email as string) || '未知邮箱'

  if (!token) {
    verificationStatus.value = 'error'
    return
  }

  try {
    // 模拟与后端验证的过程
    // 实际应用中，这里应该调用API验证token
    // const response = await api.verifyEmail(token)

    // 模拟延迟，展示加载状态
    setTimeout(() => {
      // 根据token是否有效设置状态
      // 这里假设所有从注册页跳转过来的token都是有效的
      if (token.startsWith('verify_')) {
        verificationStatus.value = 'success'
      } else {
        verificationStatus.value = 'error'
      }
    }, 2000)
  } catch (error) {
    verificationStatus.value = 'error'
    console.error('验证邮箱失败:', error)
  }
})
</script>

<style scoped>
/* 可以添加一些额外的样式 */
</style>
