import { getMyFavourites } from '@/services/favourites.service'
import FavouritesTable from './components/FavouritesTable'

export default async function FavouritesPage() {
  const favourites = await getMyFavourites()

  const totalSaved   = favourites.length
  const totalApproved = favourites.filter((f: any) => f.properties?.is_active).length
  const totalPending  = favourites.filter((f: any) => !f.properties?.is_active).length

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">My Favourites</h1>
        <p className="text-gray-500 text-sm font-medium mt-1">Manage and track your saved properties</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Total Saved</p>
          <h4 className="text-2xl font-bold text-gray-900 mt-1">{totalSaved}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Approved</p>
          <h4 className="text-2xl font-bold text-green-600 mt-1">{totalApproved}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Pending</p>
          <h4 className="text-2xl font-bold text-orange-500 mt-1">{totalPending}</h4>
        </div>
      </div>

      <FavouritesTable initialFavourites={favourites} />
    </div>
  )
}
