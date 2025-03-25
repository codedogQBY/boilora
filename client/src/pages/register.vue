<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <Card class="w-full max-w-md">
      <CardHeader class="text-center">
        <CardTitle>注册</CardTitle>
        <CardDescription>创建一个新账号，开启您的高效工作之旅</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <form @submit="onSubmit" class="space-y-6">
          <FormField v-slot="{ componentField }" name="email" :validate-on-blur="true">
            <FormItem class="space-y-1">
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input v-bind="componentField" type="email" placeholder="请输入邮箱地址" />
              </FormControl>
              <div class="min-h-5">
                <FormMessage class="error-message" />
              </div>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password" :validate-on-blur="true">
            <FormItem class="space-y-1">
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input v-bind="componentField" type="password" placeholder="请设置密码" />
              </FormControl>
              <div class="min-h-5">
                <FormMessage class="error-message" />
              </div>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="confirmPassword" :validate-on-blur="true">
            <FormItem class="space-y-1">
              <FormLabel>确认密码</FormLabel>
              <FormControl>
                <Input v-bind="componentField" type="password" placeholder="请再次输入密码" />
              </FormControl>
              <div class="min-h-5">
                <FormMessage class="error-message" />
              </div>
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="isLoading">
            <span v-if="isLoading" class="mr-2">
              <span
                class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
              />
            </span>
            {{ isLoading ? '注册中...' : '注册' }}
          </Button>
        </form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t border-border" />
          </div>
          <div class="relative flex justify-center text-xs">
            <span class="bg-card px-2 text-muted-foreground">或者使用</span>
          </div>
        </div>

        <Button variant="outline" class="w-full flex items-center justify-center">
          <GithubIcon class="mr-2 h-4 w-4" />
          通过 GitHub 注册
        </Button>

        <div class="text-center text-sm">
          已有账号?
          <router-link to="/login" class="font-medium text-primary hover:underline">
            登录
          </router-link>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { GithubIcon } from 'lucide-vue-next'

// 获取路由实例
const router = useRouter()
const isLoading = ref(false)

// 表单验证模式
const formSchema = toTypedSchema(
  z
    .object({
      email: z.string().min(1, '请输入邮箱地址').email('邮箱格式不正确'),
      password: z.string().min(1, '请输入密码').min(6, '密码至少需要6个字符'),
      confirmPassword: z.string().min(1, '请确认您的密码'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: '两次输入的密码不一致',
      path: ['confirmPassword'],
    }),
)

// 表单处理
const { handleSubmit } = useForm({
  validationSchema: formSchema,
  validateOnMount: false,
})

const onSubmit = handleSubmit(async (values) => {
  console.log('注册信息:', values)
  isLoading.value = true

  try {
    // 模拟注册API调用
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 假设注册成功，生成一个模拟的验证token
    const mockToken = `verify_${Date.now()}_${Math.random().toString(36).slice(2)}`

    // 跳转到验证页面，并传递token和邮箱信息
    router.push({
      path: '/verify',
      query: {
        token: mockToken,
        email: values.email,
      },
    })
  } catch (error) {
    console.error('注册失败:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
:deep(input:-webkit-autofill),
:deep(input:-webkit-autofill:hover),
:deep(input:-webkit-autofill:focus) {
  -webkit-box-shadow: 0 0 0px 1000px transparent inset;
  transition: background-color 5000s ease-in-out 0s;
}

:deep(.error-message) {
  opacity: 0;
  transform: translateY(-5px);
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
