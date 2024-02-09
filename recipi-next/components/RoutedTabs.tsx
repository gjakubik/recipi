'use client'
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  FunctionComponent,
  Children,
  isValidElement,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'

// Context definition
interface TabContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabContext = createContext<TabContextType | undefined>(undefined)

function useTabContext() {
  const context = useContext(TabContext)
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider')
  }
  return context
}

const TabProvider: FunctionComponent<{
  children: ReactNode
  defaultActiveTab: string
}> = ({ children, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab)

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  )
}

// Tab component (simplified for clarity)
interface TabProps {
  label: string
  route: string
  children?: ReactNode
}

const Tab: FunctionComponent<TabProps> = ({ children }) => {
  // Children are rendered by TabsContent, so no direct rendering here
  return null
}

// Intermediate component to render tab headers and content
const TabsContent: FunctionComponent<{
  children: ReactNode
  basePath: string
}> = ({ children, basePath }) => {
  const { activeTab, setActiveTab } = useTabContext()
  const router = useRouter()

  const headers = Children.map(children, (child) =>
    isValidElement(child) ? (
      <button
        onClick={(e) => {
          e.preventDefault()
          setActiveTab(child.props.route)
          router.push(`${basePath}/${child.props.route}`)
        }}
        className={`px-2 pb-3 hover:cursor ${
          activeTab === child.props.route
            ? 'font-bold long-dashed-border'
            : 'dashed-border-hover'
        } transition duration-150 ease-in-out`}
      >
        {child.props.label}
      </button>
    ) : null
  )

  const activeContent = Children.toArray(children).find(
    (child) => isValidElement(child) && child.props.route === activeTab
    // @ts-ignore
  )?.props.children

  return (
    <>
      <div className="flex flex-row items-end gap-4">{headers}</div>
      <div>{activeContent}</div>
    </>
  )
}

// RoutedTabs component
interface RoutedTabsProps {
  basePath: string
  children: ReactNode
}

const RoutedTabs: FunctionComponent<RoutedTabsProps> = ({
  children,
  basePath,
}) => {
  const pathname = usePathname()
  const activeRoute = pathname.replace(basePath, '').split('/')[1] || ''

  return (
    <TabProvider defaultActiveTab={activeRoute}>
      <TabsContent basePath={basePath}>{children}</TabsContent>
    </TabProvider>
  )
}

export { RoutedTabs, Tab }
