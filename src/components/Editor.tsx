'use client'

import React, { ReactNode, useEffect, useMemo } from 'react'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { usePostSubmit } from '@hooks/usePostSubmit'
import { Control } from 'react-hook-form'
import Container from '@components/Container'

type TitleInputProps = {
    control: Control<any>
    updateField: (field: 'title', value: string) => void
}

const firstTag = [
    { label: '일반', value: 'GENERAL' },
    { label: '기타', value: 'OTHER' },
]

type QuillInputProps = {
    control: Control<any>
    updateField: (field: 'content', value: string) => void
    initialContent?: string
}

const QuillInput = ({ updateField, initialContent }: QuillInputProps) => {
    const { quill, quillRef } = useQuill({
        modules: { toolbar: false },
        formats: null,
        placeholder: '공유하고 싶은 내용을 입력해주세요',
    })

    useEffect(() => {
        if (quill) {
            if (initialContent) {
                quill.clipboard.dangerouslyPasteHTML(initialContent)
            }
            quill.on('text-change', () => {
                updateField('content', quill.root.innerHTML)
            })
        }
    }, [initialContent, quill, updateField])

    return <div ref={quillRef} className="h-full flex flex-col flex-1 text-base"></div>
}

const TitleInput = ({ control, updateField }: TitleInputProps) => {
    return (
        <FormField
            control={control}
            name="title"
            render={({ field, fieldState }) => (
                <FormItem className="flex-[3] space-y-0 text-black">
                    <FormLabel className="text-xs text-black/50 pl-1">제목</FormLabel>
                    {/* {fieldState.error && <p className='text-red-500 text-xs mt-1'>{fieldState.error.message}</p>} */}
                    <FormControl>
                        <Input
                            className={`w-full ${fieldState.error ? 'focus-visible:ring-red-500' : 'focus-visible:ring-ring'}`}
                            minLength={1}
                            placeholder="제목을 입력하세요"
                            {...field}
                            onChange={(e) => updateField('title', e.target.value)}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

type ContentTypeInputProps = {
    control: Control<any>
    updateField: (field: 'contentType', value: string) => void
}

const ContentTypeInput = ({ control, updateField }: ContentTypeInputProps) => {
    return (
        <FormField
            control={control}
            name="contentType"
            render={({ field }) => (
                <FormItem className="flex-1 space-y-0 text-black">
                    <FormLabel className="text-xs text-black/50 pl-1">태그</FormLabel>
                    <Select onValueChange={(value) => updateField('contentType', value)} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="태그 선택" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {firstTag.map((tag) => (
                                <SelectItem key={tag.value} value={tag.value} disabled={tag.value !== 'GENERAL'}>
                                    {tag.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    )
}

const PostCreatePage = ({
    children,

    initialValue,
}: {
    children: ReactNode

    initialValue?: { title: string; content: string }
}) => {
    const { form, onSubmit, updateField } = usePostSubmit()

    const formFields = useMemo(
        () => (
            <div className="flex space-x-4">
                <ContentTypeInput control={form.control} updateField={updateField} />
                <TitleInput control={form.control} updateField={updateField} />
            </div>
        ),
        [form.control, updateField],
    )

    useEffect(() => {
        if (initialValue) {
            updateField('title', initialValue.title)
            updateField('content', initialValue.content)
        }
    }, [initialValue, updateField])

    return (
        <Container>
            <div className="flex justify-between">
                {children}
                <button
                    onClick={form.handleSubmit(onSubmit)}
                    className="bg-black/80 px-5 rounded text-white/80 font-medium hover:text-white hover:bg-black transition h-fit py-1"
                >
                    작성
                </button>
            </div>
            <Form {...form}>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-8 flex flex-col flex-1">
                    {formFields}
                    <QuillInput
                        control={form.control}
                        updateField={updateField}
                        initialContent={initialValue?.content}
                    />
                </form>
            </Form>
        </Container>
    )
}

export default PostCreatePage
