// PostCreatePage.tsx
'use client'

import Title from '@components/Title'
import PostCreatePage from '@components/Editor'
import { useGetPost } from '@hooks/usePost'
import { PiEyesFill } from 'react-icons/pi'
import { useUserInfo } from '@hooks/useUserInfo'

const Unauthorized = () => {
    return (
        <main className="flex-1 pb-[80px]" style={{ alignContent: 'center' }}>
            <PiEyesFill className="text-6xl text-black mx-auto" />
            <p className="text-black font-bold text-center">잘못된 접근입니다.</p>
        </main>
    )
}

export default function EditPost() {
    const { data, isLoading, error } = useGetPost()
    const { data: profile, isLoading: profileLoading, error: profileError } = useUserInfo()
    if (isLoading || profileLoading) return <></>
    if (error || profileError) return <></>
    return data.username === profile.name ? (
        <PostCreatePage initialValue={data}>
            <Title>EDIT</Title>
        </PostCreatePage>
    ) : (
        <Unauthorized />
    )
}
