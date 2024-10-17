'use client'

import Paginate from '@components/Paginate'
import { useItems } from '@hooks/useWebtoons'
import { useSearchParams } from 'next/navigation'
import { PiBellFill, PiCheckCircleFill, PiWarningCircleFill } from 'react-icons/pi'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParam'
import React, { useCallback, useEffect, useMemo } from 'react'
import { Combobox } from '@components/ComboBox'
import { SearchWebtoon } from '@components/SearchWebtoon'
import { useAlertWebtoons, useCreateAlertWebtoon, useDeleteAlertWebtoon } from '@hooks/useAlertWebtoon'
import Card from '@components/Card'
import { toast } from 'sonner'
import { usePageTotal } from '@store/webtoons'
import { usePagination } from '@hooks/usePagination'
import Title from '@components/Title'
import Container from '@components/Container'
import { Webtoon } from '@dto/webtoon'

/**
 * 뭔가 아쉬운데...
 */

interface Alert {
    id: number
    webtoon: Webtoon
}

const toastStyles = {
    base: {
        color: 'white',
        border: 0,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
    success: { backgroundColor: '#3b82f6' },
    warning: { backgroundColor: '#f59e0b' },
    error: { backgroundColor: '#ef4444' },
}

function WebtoonList() {
    const searchParams = useSearchParams()
    const { data: alertList } = useAlertWebtoons()
    const { data, isLoading } = useItems(searchParams.toString())
    const { trigger: createAlert, isMutating: createMutating } = useCreateAlertWebtoon()
    const { trigger: deleteAlert, isMutating: deleteMutating } = useDeleteAlertWebtoon()
    const { change } = usePageTotal()

    const alertMap = useMemo(() => {
        return new Map(alertList?.map((alert: Alert) => [alert.webtoon.id, alert.id]) || [])
    }, [alertList])

    const handleAlertToggle = useCallback(
        (item: Webtoon) => {
            if (!alertList) {
                toast.message('로그인이 필요한 서비스입니다.', {
                    duration: 1500,
                    icon: <PiWarningCircleFill className="text-2xl text-white rounded-full" />,
                    style: { ...toastStyles.base, ...toastStyles.error },
                })
                return
            }

            const alertId = alertMap.get(item.id)
            const action = alertId ? deleteAlert : createAlert
            const message = alertId ? '알람이 해지되었습니다.' : '알람 설정이 되었습니다.'
            const style = alertId ? toastStyles.warning : toastStyles.success

            action({ webtoonId: (alertId as number) || item.id }).then(() => {
                toast.message(`${item.title} ${message}`, {
                    duration: 1500,
                    icon: <PiCheckCircleFill className="text-xl text-white" />,
                    style: { ...toastStyles.base, ...style },
                })
            })
        },
        [alertList, alertMap, createAlert, deleteAlert],
    )

    const renderAlertButton = useCallback(
        (item: Webtoon) => (
            <button
                onClick={() => handleAlertToggle(item)}
                disabled={alertMap.has(item.id) ? deleteMutating : createMutating}
                aria-label="알람 설정 토글"
            >
                <PiBellFill className={alertMap.has(item.id) ? 'text-yellow-400' : 'text-black/30'} />
            </button>
        ),
        [alertMap, handleAlertToggle, createMutating, deleteMutating],
    )

    useEffect(() => {
        if (isLoading) return
        change(data?.totalPages ?? 0)
    }, [change, data, isLoading])

    return (
        <div className="grid grid-cols-3 gap-1">
            {data?.content.map((item: Webtoon) => <Card key={item.id} item={item} button={renderAlertButton(item)} />)}
        </div>
    )
}

function ComboBoxes() {
    const searchParams = useSearchParams()
    const defaultValue = (role: string) => searchParams.get(role)
    const { updateSearchParams } = useUpdateSearchParams()

    const onChange = (role: string, value: string) => {
        updateSearchParams(role, value)
    }
    const selectRole = useMemo(
        () => [
            {
                role: { label: '플랫폼', value: 'platforms' },
                content: [
                    { label: '카카오', value: 'KAKAO' },
                    { label: '네이버', value: 'NAVER' },
                ],
            },
            {
                role: { label: '요일', value: 'days' },
                content: [
                    { label: '월요일', value: 'MONDAY'.toUpperCase() },
                    { label: '화요일', value: 'tuesday'.toUpperCase() },
                    { label: '수요일', value: 'wednesday'.toUpperCase() },
                    { label: '목요일', value: 'thursday'.toUpperCase() },
                    { label: '금요일', value: 'friday'.toUpperCase() },
                    { label: '토요일', value: 'Saturday'.toUpperCase() },
                    { label: '일요일', value: 'sunday'.toUpperCase() },
                ],
            },
        ],
        [],
    )
    return selectRole.map((list) => (
        <Combobox
            key={list.role.value}
            list={list.content}
            role={list.role}
            defaultValue={defaultValue(list.role.value)}
            onChange={onChange}
        />
    ))
}

function Page() {
    const { total } = usePageTotal()
    const { currentPage, paginationRange, createPageUrl, isFirstPage, isLastPage } = usePagination({
        totalPages: total,
        maxVisiblePages: 5,
    })

    return (
        <>
            <Paginate
                currentPage={currentPage}
                paginationRange={paginationRange}
                createPageUrl={createPageUrl}
                isFirstPage={isFirstPage}
                isLastPage={isLastPage}
            />
        </>
    )
}

export default function Webtoons() {
    return (
        <Container>
            <Title>WEBTOONS</Title>
            <div className="flex gap-1">
                <ComboBoxes />
            </div>
            <SearchWebtoon />
            <WebtoonList />
            <Page />
        </Container>
    )
}
