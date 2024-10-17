'use client'

import dayjs from 'dayjs'
import Link from 'next/link'
import Paginate from '@components/Paginate'
import { usePageTotal } from '@store/posts'
import { usePagination } from '@hooks/usePagination'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import React from 'react'
import { useGetPosts } from '@hooks/usePost'
import Title from '@components/Title'
import Container from '@components/Container'
import { Post } from '@dto/Posts'

/**
 * Pagination
 */

function Page() {
    const { total } = usePageTotal()

    const { currentPage, paginationRange, createPageUrl, isFirstPage, isLastPage } = usePagination({
        totalPages: total,
        maxVisiblePages: 5,
    })

    return (
        <Paginate
            currentPage={currentPage}
            paginationRange={paginationRange}
            createPageUrl={createPageUrl}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
        />
    )
}

function PostList() {
    const searchParams = useSearchParams()

    const { data, isLoading, error } = useGetPosts(`/api/posts?${searchParams.toString()}`)
    const { change } = usePageTotal()

    useEffect(() => {
        if (isLoading) return
        change(data?.totalPages ?? 0)
    }, [change, data, isLoading])

    if (isLoading) return <></>
    if (error) return <></>

    return (
        <div className="flex flex-col gap-2">
            {data.content.map((item: Post) => (
                <div key={item.id} className="flex items-center px-2 border-b">
                    <Link href={'/posts/' + item.id} className="w-full">
                        <div className="flex flex-col gap-2 py-2">
                            <div className="flex gap-2">
                                <p className="font-medium text-black text-sm">{item.title}</p>
                            </div>
                            {item.tag ? <p>{item.tag}</p> : null}
                            <div>
                                <p className="text-xs text-black/50">{item.username}</p>
                                <p className="text-xs text-black/50">{dayjs(item.createdAt).format('YYYY-MM-DD')}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default function Posts() {
    return (
        <Container>
            <Title>BOARD</Title>
            <Suspense>
                <PostList />
            </Suspense>
            <Page />
        </Container>
    )
}
