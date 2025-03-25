<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <Card class="w-full max-w-md">
      <CardHeader class="text-center">
        <CardTitle>登录</CardTitle>
        <CardDescription>欢迎回来，请输入您的登录信息</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div v-if="redirectMessage" class="mb-4 p-3 bg-primary/10 rounded-md text-sm text-primary">
          {{ redirectMessage }}
        </div>
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
              <div class="flex items-center justify-between">
                <FormLabel>密码</FormLabel>
                <router-link
                  to="/forgot-password"
                  class="text-sm font-medium text-primary hover:underline"
                >
                  忘记密码?
                </router-link>
              </div>
              <FormControl>
                <Input v-bind="componentField" type="password" placeholder="请输入密码" />
              </FormControl>
              <div class="min-h-5">
                <FormMessage class="error-message" />
              </div>
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full">登录</Button>
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
          通过 GitHub 登录
        </Button>

        <div class="text-center text-sm">
          还没有账号?
          <router-link to="/register" class="font-medium text-primary hover:underline">
            注册新账号
          </router-link>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { GithubIcon } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// 表单验证模式
const formSchema = toTypedSchema(
  z.object({
    email: z.string().email('邮箱格式不正确'),
    password: z.string().min(6, '密码至少需要6个字符'),
  }),
)

// 表单处理
const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
  validateOnMount: false,
})

const route = useRoute()
const redirectMessage = ref('')

onMounted(() => {
  // 检查URL参数中是否有预填邮箱
  const email = route.query.email as string
  if (email) {
    // 使用同一个表单实例的setFieldValue方法
    setFieldValue('email', email)
  }

  // 显示重定向消息
  redirectMessage.value = (route.query.redirectMessage as string) || ''
})

const onSubmit = handleSubmit((values) => {
  console.log('登录信息:', values)
  // 这里添加登录逻辑
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
