'use client'
import React from 'react'
import DefaultButton from './DefaultButton'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

type Props = {}

const ToFormButton = (props: Props) => {
    const t = useTranslations('homepage')
    const router = useRouter();
    const currentLocale = useLocale();

    return (
        <DefaultButton size='large' onClick={(e) => {
            router.push(`/${currentLocale}/form`, { scroll: false, });

        }} >
            {t('button')}
        </DefaultButton>
    )
}

export default ToFormButton