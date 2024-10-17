// hooks/usePostSubmit.ts
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { usePostContent, usePostTitle, usePostType } from '@store/posts'
import { useCreatePost, usePutPost } from './usePost'

const formSchema = z.object({
    title: z.string().trim().min(1, { message: '제목을 입력해주세요' }),
    contentType: z.enum(['GENERAL', 'WEBTOON']),
    content: z.string().trim().min(1, { message: '내용을 입력해주세요' }),
})

type FormData = z.infer<typeof formSchema>

export const usePostSubmit = () => {
    const router = useRouter()
    const { id: postId } = useParams()

    const { trigger: putTrigger, isMutating: putMutating } = usePutPost()
    const { trigger: createTrigger, isMutating: createMutating } = useCreatePost()

    const { setTitle } = usePostTitle()
    const { setContent } = usePostContent()
    const { setContentType } = usePostType()

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            contentType: 'GENERAL',
            content: '',
        },
    })

    const onSubmit = async (values: FormData) => {
        const result = formSchema.safeParse(values)
        if (!result.success) {
            const errorMessages: string[] = []
            result.error.issues.forEach((issue) => {
                form.setError(issue.path[0] as keyof FormData, {
                    type: 'manual',
                    message: issue.message,
                })
                errorMessages.push(issue.message)
            })
            toast.error(errorMessages[0], {
                duration: 1500,
            })
            return
        }
        try {
            postId ? await putTrigger({ post: result.data }) : await createTrigger({ post: result.data })
            toast.success(postId ? '수정이 완료되었습니다.' : '글쓰기에 성공하셨습니다', {
                duration: 1500,
            })
            router.replace('/posts')
        } catch (error) {
            toast.error('글쓰기에 실패했습니다.', {
                duration: 1500,
            })
        }
    }

    const updateField = useCallback(
        (field: keyof FormData, value: string) => {
            form.setValue(field, value as any, { shouldValidate: true })
            if (field === 'title') setTitle(value)
            if (field === 'content') setContent(value)
            if (field === 'contentType') setContentType(value as 'GENERAL' | 'WEBTOON')
        },
        [form, setTitle, setContent, setContentType],
    )

    return { form, onSubmit, isMutating: postId ? putMutating : createMutating, updateField }
}
