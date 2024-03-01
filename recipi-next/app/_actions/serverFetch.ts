'use server'

export const serverFetch = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options)
  const html = await res.text()

  // Try to extract the body of the html
  const body = html.match(/<body[^>]*>((.|[\n\r])*)<\/body>/)

  console.log('body', body)
  // Remove unneeded html tags like svg, script, style, img, form, a, etc
  const cleanBody = body
    ? body[0]
        .replace(/<script[\s\S]*?<\/script>/g, '')
        .replace(/<style[\s\S]*?<\/style>/g, '')
        .replace(/<svg[\s\S]*?<\/svg>/g, '')
        .replace(/<img[\s\S]*?>/g, '')
        .replace(/<form[\s\S]*?<\/form>/g, '')
        .replace(/<a[\s\S]*?<\/a>/g, '')
        .replace(/<[^>]*>/g, '')
    : 'No body found'
  console.log('cleanBody', cleanBody)

  return cleanBody
}
