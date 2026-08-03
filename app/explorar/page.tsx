"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Show {
  id: number;
  name: string;
  genres: string[];
  rating: { average: number | null };
  image: { medium: string } | null;
  summary: string;
}

export default function Explorar() {
  const [shows, setShows] = useState<Show[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Busca inicial (Tendências)
  useEffect(() => {
    async function fetchInitialShows() {
      try {
        const res = await fetch("https://api.tvmaze.com/shows");
        const data = await res.json();
        setShows(data.slice(0, 20)); // Pega os primeiros 20
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchInitialShows();
  }, []);

  // Busca por termo
  useEffect(() => {
    if (search.length < 2) return;

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.tvmaze.com/search/shows?q=${search}`);
        const data = await res.json();
        // A API de busca retorna um formato diferente: [{score: ..., show: {...}}]
        setShows(data.map((item: any) => item.show));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Header da Vitrine */}
      <nav className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-purple-500 font-bold text-2xl group-hover:scale-110 transition-transform">←</span>
            <span className="font-bold text-xl tracking-tight">Cine<span className="text-purple-500">Maze</span></span>
          </Link>

          <div className="relative w-full md:w-96">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">🔍</span>
            <input
              type="text"
              placeholder="Pesquisar séries ou filmes..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white">
            {search ? `Resultados para: ${search}` : "Explorar Catálogo"}
          </h1>
          <p className="text-zinc-400 mt-2">Encontre informações detalhadas sobre suas produções favoritas.</p>
        </header>

        {loading ? (
          /* Skeleton Loading Simples */
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-zinc-800 aspect-[2/3] rounded-xl mb-3"></div>
                <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {shows.map((show) => (
              <div 
                key={show.id} 
                className="group bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col"
              >
                {/* Poster com Overlay de Nota */}
                <div className="relative aspect-[2/3] w-full overflow-hidden">
                  {show.image?.medium ? (
                    <Image
                      src={show.image.medium}
                      alt={show.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-zinc-800 text-zinc-500 text-xs italic">
                      Sem imagem
                    </div>
                  )}
                  
                  {show.rating.average && (
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded text-[10px] font-bold text-yellow-400 flex items-center gap-1">
                      ★ {show.rating.average}
                    </div>
                  )}
                </div>

                {/* Conteúdo do Card */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-white text-sm line-clamp-1 mb-1 group-hover:text-purple-400 transition-colors">
                    {show.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {show.genres.slice(0, 2).map((g) => (
                      <span key={g} className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold">
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Botão de Informações */}
                  <Link
                    href={`/explorar/${show.id}`}
                    className="mt-auto w-full bg-zinc-800 hover:bg-purple-600 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Saiba mais</span>
                    <span className="opacity-50 text-[10px]">ℹ️</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && shows.length === 0 && (
          <div className="text-center py-20">
            <span className="text-5xl">🏜️</span>
            <p className="text-zinc-500 mt-4">Nenhuma série encontrada com esse nome.</p>
          </div>
        )}
      </main>

      {/* Rodapé Simples */}
      <footer className="py-10 border-t border-zinc-900 text-center text-zinc-600 text-xs">
        Desenvolvido com API TVmaze e Next.js
      </footer>
    </div>
  );
}