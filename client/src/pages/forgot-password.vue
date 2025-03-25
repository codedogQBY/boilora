<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <Card class="w-full max-w-md">
      <CardHeader class="text-center">
        <CardTitle>忘记密码</CardTitle>
        <CardDescription>请输入您的邮箱地址，我们将发送重置密码链接</CardDescription>
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

          <Button type="submit" class="w-full">发送重置链接</Button>
        </form>

        <div v-if="isSubmitted" class="p-4 bg-primary/10 rounded-md text-center">
          <p class="text-sm text-primary">重置密码链接已发送至您的邮箱，请查收并按照提示操作。</p>
        </div>

        <div class="text-center text-sm">
          想起密码了？
          <router-link to="/login" class="font-medium text-primary hover:underline">
            返回登录
          </router-link>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

// 跟踪表单是否已提交
const isSubmitted = ref(false)

// 表单验证模式
const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, '请输入邮箱地址').email('邮箱格式不正确'),
  }),
)

// 表单处理
const { handleSubmit } = useForm({
  validationSchema: formSchema,
  validateOnMount: false,
})

const onSubmit = handleSubmit((values) => {
  console.log('忘记密码请求:', values)
  // 这里添加发送重置密码邮件的逻辑
  isSubmitted.value = true
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
