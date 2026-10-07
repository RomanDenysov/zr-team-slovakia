/**
 * Content is statically rendered, so an edit in the admin has to tell Next to
 * drop its cache. The site is small — revalidating the whole route tree is
 * cheaper than tracking which pages embed which document.
 *
 * `next/cache` only exists inside the Next runtime; when the config is loaded
 * by the Payload CLI (seed, migrations) the import is skipped.
 */
async function revalidateEverything(): Promise<void> {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    // Not running inside Next — nothing to revalidate.
  }
}

export async function revalidateContent<T>({ doc }: { doc: T }): Promise<T> {
  await revalidateEverything()
  return doc
}

export async function revalidateGlobal<T>({ doc }: { doc: T }): Promise<T> {
  await revalidateEverything()
  return doc
}
