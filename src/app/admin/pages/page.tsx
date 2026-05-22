import { getPages } from '../actions'
import PagesClient from './pages-client'

export default async function PagesAdminPage() {
  const pages = await getPages()
  return <PagesClient initialPages={pages} />
}
