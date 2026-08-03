import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CastMember {
  person: {
    id: number;
    name: string;
    image: { medium: string } | null;
  };
  character: {
    name: string;
  };
}

interface ShowDetail {
  id: number;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  officialSite: string | null;
  rating: { average: number | null };
  image: { original: string; medium: string } | null;
  summary: string;
  premiered: string;
  _embedded?: {
    cast: CastMember[];
  };
}

// Função para buscar dados da API do TVmaze com elenco embutido
async function getShowDetails(id: string): Promise<ShowDetail | null> {
  try {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Erro ao carregar detalhes:", error);
    return null;
  }
}

export default async function ShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const show = await getShowDetails(id);

  if (!show) {
    notFound();
  }

  // A API do TVmaze retorna a sinopse com tags HTML (ex: <p>...</p>), 
  // por isso removemos para exibição limpa:
  const cleanSummary = show.summary
    ? show.summary.replace(/<[^>]*>?/gm, "")
    : "Nenhuma sinopse disponível.";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Topo / Voltar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/explorar"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <span>←</span> Voltar para a Vitrine
          </Link>
          <span className="font-bold text-xl tracking-tight">
            Cine<span className="text-purple-500">Maze</span>
          </span>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Banner de Apresentação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Capa */}
          <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl bg-zinc-900">
            {show.image?.original || show.image?.medium ? (
              <Image
                src={show.image.original || show.image.medium}
                alt={show.name}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-zinc-600">
                Sem Imagem
              </div>
            )}
          </div>

          {/* Informações Principais */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {show.rating.average && (
                  <span className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-bold px-3 py-1 rounded-full text-xs">
                    ★ {show.rating.average} / 10
                  </span>
                )}
                <span className="bg-purple-600/20 border border-purple-500/30 text-purple-400 font-medium px-3 py-1 rounded-full text-xs uppercase">
                  {show.status}
                </span>
                <span className="text-xs text-zinc-400">
                  {show.premiered ? new Date(show.premiered).getFullYear() : "N/A"}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {show.name}
              </h1>

              {/* Gêneros */}
              <div className="flex flex-wrap gap-2 mt-4">
                {show.genres.map((genre) => (
                  <span
                    key={genre}
                    className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-md font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Sinopse */}
            <div className="border-t border-b border-zinc-800 py-6">
              <h2 className="text-lg font-semibold text-white mb-2">Sinopse</h2>
              <p className="text-zinc-300 text-base leading-relaxed">
                {cleanSummary}
              </p>
            </div>

            {/* Detalhes Adicionais */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="block text-zinc-500 text-xs">Tipo</span>
                <span className="font-semibold text-zinc-200">{show.type}</span>
              </div>
              <div>
                <span className="block text-zinc-500 text-xs">Idioma</span>
                <span className="font-semibold text-zinc-200">{show.language}</span>
              </div>
              {show.officialSite && (
                <div>
                  <span className="block text-zinc-500 text-xs">Site Oficial</span>
                  <a
                    href={show.officialSite}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-400 hover:underline font-semibold"
                  >
                    Acessar site ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Elenco Principais (Cast) */}
        {show._embedded?.cast && show._embedded.cast.length > 0 && (
          <section className="mt-16 border-t border-zinc-800 pt-10">
            <h2 className="text-2xl font-bold text-white mb-6">Elenco Principal</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {show._embedded.cast.slice(0, 6).map((item) => (
                <div
                  key={item.person.id}
                  className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 flex flex-col items-center text-center"
                >
                  <div className="relative h-20 w-20 rounded-full overflow-hidden mb-3 bg-zinc-800">
                    {item.person.image?.medium ? (
                      <Image
                        src={item.person.image.medium}
                        alt={item.person.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-zinc-600">
                        N/A
                      </div>
                    )}
                  </div>
                  <span className="font-semibold text-xs text-white line-clamp-1">
                    {item.person.name}
                  </span>
                  <span className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
                    {item.character.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}