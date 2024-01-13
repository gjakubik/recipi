'use client'

import { useState } from 'react'
import { GetMenusResult } from '@/types'
import { User } from 'next-auth'
import { MENU_QUERY } from '@/lib/constants'

import { ClientMenuList } from '@/components/menu/ClientMenuList'

interface MenuListControllerProps {
  user: User
  initialData: GetMenusResult
}

export const MenuListController = ({
  user,
  initialData,
}: MenuListControllerProps) => {
  const [params, setParams] = useState({
    authorId: user.id,
    ...MENU_QUERY,
  })

  return (
    <ClientMenuList
      initialData={initialData}
      params={{
        ...params,
        setPage: (page) => setParams({ ...params, page }),
        setLimit: (limit) => setParams({ ...params, limit }),
      }}
    />
  )
}
