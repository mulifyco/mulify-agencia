import { getLeads } from '../actions'
import MessagesClient from './messages-client'

export default async function MessajlarPage() {
  const leads = await getLeads()
  return <MessagesClient initialLeads={leads} />
}
