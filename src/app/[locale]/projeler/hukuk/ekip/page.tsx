import PageHeader from '@/components/demos/hukuk/page-header'
import LawyerCard from '@/components/demos/hukuk/lawyer-card'
import { getHukukTeam } from '../_data'

export const dynamic = 'force-dynamic'

export default async function HukukTeamPage() {
  const team = await getHukukTeam()

  return (
    <>
      <PageHeader
        eyebrow="Ekip"
        title="Ortaklardan counsel kadrosuna kadar derinleşen uzman ekip"
        description="Büyük hukuk bürosu güveninin önemli bir parçası; isim, unvan ve uzmanlık derinliğini görünür kılan ekip yapısıdır."
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 xl:grid-cols-4 lg:px-8">
          {team.map((member) => (
            <LawyerCard key={member.id} lawyer={{ name: member.name, role: member.role, bio: member.bio ?? '' }} />
          ))}
        </div>
      </section>
    </>
  )
}

