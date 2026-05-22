'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Upload, Trash2, Copy, LayoutGrid, List, Search, X, File } from 'lucide-react'
import ConfirmDialog from '@/components/admin/shared/confirm-dialog'
import { mockAdminMedia } from '@/lib/admin-mock-data'

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

export default function MediaPage() {
  const [files, setFiles] = useState(mockAdminMedia)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const filtered = files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))

  const handleFileAdd = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return
    Array.from(uploadedFiles).forEach((file) => {
      const url = URL.createObjectURL(file)
      setFiles((prev) => [...prev, { id: Date.now().toString() + file.name, name: file.name, url, size: file.size, type: file.type, createdAt: new Date().toISOString() }])
    })
    toast.success(`${uploadedFiles.length} dosya yüklendi`)
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success('URL kopyalandı')
  }

  const selectedFile = files.find((f) => f.id === selected)

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Medya Kütüphanesi</h1>
          <p className="text-white/40 text-sm mt-1">{files.length} dosya</p>
        </div>
        <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl text-sm hover:bg-[#FFD166]">
          <Upload className="w-4 h-4" /> Yükle
        </button>
        <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleFileAdd(e.target.files)} />
      </div>

      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFileAdd(e.dataTransfer.files) }}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${dragging ? 'border-[#F5A623] bg-[#F5A623]/5' : 'border-white/10 hover:border-white/20'}`}
        onClick={() => fileRef.current?.click()}
      >
        <Upload className={`w-8 h-8 mx-auto mb-2 transition-colors ${dragging ? 'text-[#F5A623]' : 'text-white/20'}`} />
        <p className="text-sm text-white/40">Dosyaları buraya sürükleyin veya <span className="text-[#F5A623]">tıklayın</span></p>
        <p className="text-xs text-white/20 mt-1">PNG, JPG, WebP, SVG — Max 10MB</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Dosya ara..." className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#F5A623]/30" />
        </div>
        <div className="flex p-1 bg-white/5 rounded-xl">
          <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white/10 text-white' : 'text-white/30'}`}><LayoutGrid className="w-4 h-4" /></button>
          <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white/10 text-white' : 'text-white/30'}`}><List className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((file) => (
            <div
              key={file.id}
              onClick={() => setSelected(file.id === selected ? null : file.id)}
              className={`group relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${selected === file.id ? 'border-[#F5A623]' : 'border-transparent hover:border-white/20'}`}
            >
              <div className="relative aspect-square bg-slate-800">
                {file.type.startsWith('image/') ? (
                  <Image src={file.url} alt={file.name} fill className="object-cover" unoptimized />
                ) : (
                  <div className="flex items-center justify-center h-full"><File className="w-8 h-8 text-white/30" /></div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="p-2 w-full flex justify-between">
                  <button onClick={(e) => { e.stopPropagation(); copyUrl(file.url) }} className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20"><Copy className="w-3 h-3" /></button>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteId(file.id) }} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
              <p className="text-xs text-white/60 p-2 truncate bg-slate-900">{file.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
          <div className="divide-y divide-white/5">
            {filtered.map((file) => (
              <div key={file.id} className="flex items-center gap-4 px-5 py-3 hover:bg-white/2 transition-colors group">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0 relative">
                  {file.type.startsWith('image/') ? <Image src={file.url} alt={file.name} fill className="object-cover" unoptimized /> : <File className="w-5 h-5 text-white/30 m-auto mt-2.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm truncate">{file.name}</p>
                  <p className="text-xs text-white/40">{formatBytes(file.size)} · {new Date(file.createdAt).toLocaleDateString('tr-TR')}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => copyUrl(file.url)} className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5"><Copy className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteId(file.id)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/5"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
            className="fixed right-6 top-24 w-72 bg-slate-900 border border-white/10 rounded-2xl p-5 shadow-2xl z-30"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-white text-sm">Dosya Detayı</h4>
              <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="relative h-36 rounded-xl overflow-hidden bg-slate-800 mb-4">
              <Image src={selectedFile.url} alt={selectedFile.name} fill className="object-cover" unoptimized />
            </div>
            <div className="space-y-2 text-xs mb-4">
              <div className="flex justify-between"><span className="text-white/40">Ad</span><span className="text-white truncate max-w-32">{selectedFile.name}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Boyut</span><span className="text-white">{formatBytes(selectedFile.size)}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Tür</span><span className="text-white">{selectedFile.type}</span></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => copyUrl(selectedFile.url)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-lg text-xs hover:bg-[#FFD166]">
                <Copy className="w-3.5 h-3.5" /> URL Kopyala
              </button>
              <button onClick={() => setDeleteId(selectedFile.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog open={!!deleteId} title="Dosyayı sil" description="Bu dosya kalıcı olarak silinecek." onConfirm={() => { setFiles((p) => p.filter((f) => f.id !== deleteId)); if (selected === deleteId) setSelected(null); toast.success('Dosya silindi'); setDeleteId(null) }} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
