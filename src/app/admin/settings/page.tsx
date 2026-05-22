import { getSettings } from '../actions'
import SettingsClient from './settings-client'

export default async function SettingsPage() {
  const settings = await getSettings()
  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]))
  return <SettingsClient initialSettings={settingsMap} />
}
