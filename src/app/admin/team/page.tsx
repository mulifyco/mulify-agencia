import { getTeamMembers } from '../actions'
import TeamClient from './team-client'

export default async function TeamPage() {
  const members = await getTeamMembers()
  return <TeamClient initialMembers={members} />
}
