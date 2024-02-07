import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <h1 {...props} className="text-4xl font-bold" />,
    h2: (props) => <h2 {...props} className="text-3xl font-bold" />,
    h3: (props) => <h3 {...props} className="text-2xl font-bold" />,
    h4: (props) => <h4 {...props} className="text-xl font-bold" />,
    h5: (props) => <h5 {...props} className="text-lg font-bold" />,
    h6: (props) => <h6 {...props} className="text-base font-bold" />,
    p: (props) => <p {...props} className="text-base" />,
    a: (props) => <a {...props} className="text-blue-500" />,
    ul: (props) => <ul {...props} className="list-disc pl-4" />,
    ol: (props) => <ol {...props} className="list-decimal pl-4" />,
    li: (props) => <li {...props} className="text-base" />,
    blockquote: (props) => (
      <blockquote {...props} className="border-l-4 border-gray-300 pl-4" />
    ),
    pre: (props) => <pre {...props} className="text-base" />,
    code: (props) => {
      console.log(props)
      if (!props.className) {
        return (
          <code
            {...props}
            className="text-base bg-slate-200 py-1 px-2 rounded-md"
          />
        )
      }

      return <code {...props} />
    },
    hr: (props) => <hr {...props} className="border-gray-300" />,
  }
}
