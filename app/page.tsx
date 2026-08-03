import Image from "next/image";
import Link from "next/link";

interface Show {
  id: number;
  name: string;
  rating: { average: number | null };
  image: { medium: string; original: string } | null;
  genres: string[];
}

// Busca os dados diretamente da API TVmaze no lado do servidor (Server Component)
async function getFeaturedShows(): Promise<Show[]> {
  try {
    const res = await fetch("https://api.tvmaze.com/shows", {
      next: { revalidate: 3600 }, // Recarrega os dados do cache a cada 1 hora
    });

    if (!res.ok) return [];

    const data: Show[] = await res.json();
    return data.slice(0, 6); // Retorna as 6 primeiras séries para os destaques
  } catch (error) {
    console.error("Erro ao buscar séries do TVmaze:", error);
    return [];
  }
}

export default async function Home() {
  const featuredShows = await getFeaturedShows();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-600 selection:text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 font-bold text-white shadow-lg shadow-purple-600/30">
              TV
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Cine<span className="text-purple-500">Maze</span>
            </span>
          </div>

          <Link
            href="/explorar"
            className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-600/25"
          >
            Explorar Vitrine
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-zinc-800 py-24 sm:py-32">
          {/* Efeito de brilho de fundo */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[120px]" />

          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-400">
              Conectado à API TVmaze
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Descubra suas próximas{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                séries e produções
              </span>{" "}
              favoritas
            </h1>

            <p className="mt-6 text-lg leading-8 text-zinc-400 sm:text-xl">
              Explore um catálogo completo com resumos, elencos, avaliações e detalhes em tempo real alimentados diretamente pela base de dados do TVmaze.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/explorar"
                className="w-full rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-600/30 transition-all hover:bg-purple-500 hover:shadow-purple-600/50 sm:w-auto"
              >
                Acessar Vitrine
              </Link>
              <a
                href="#destaques"
                className="w-full rounded-full border border-zinc-700 bg-zinc-900/50 px-8 py-3.5 text-base font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800 sm:w-auto"
              >
                Ver Destaques
              </a>
            </div>
          </div>
        </section>

        {/* Seção de Destaques (API TVmaze) */}
        <section id="destaques" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Séries em Destaque
            </h2>
            <p className="mt-2 text-zinc-400">
              Uma prévia dos conteúdos carregados diretamente da API.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredShows.map((show) => (
              <div
                key={show.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="relative h-72 w-full overflow-hidden bg-zinc-800">
                  {show.image?.medium ? (
                    <Image
                      src={show.image.medium}
                      alt={show.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-zinc-500">
                      Sem Capa
                    </div>
                  )}
                  {show.rating.average && (
                    <div className="absolute top-3 right-3 rounded-md bg-zinc-950/80 px-2.5 py-1 text-xs font-bold text-yellow-400 backdrop-blur">
                      ★ {show.rating.average}
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-1">
                      {show.genres.slice(0, 2).map((genre) => (
                        <span
                          key={genre}
                          className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-[10px] font-medium text-zinc-300"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {show.name}
                    </h3>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/explorar"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300"
            >
              Ver todo o catálogo na Vitrine &rarr;
            </Link>
          </div>
        </section>

        {/* Recursos da Aplicação */}
        <section className="border-t border-zinc-800 bg-zinc-900/30 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20 text-xl font-bold text-purple-400">
                  🔍
                </div>
                <h3 className="text-lg font-semibold text-white">Busca Dinâmica</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Pesquise rapidamente por qualquer título ou gênero catalogado na base de dados global do TVmaze.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20 text-xl font-bold text-purple-400">
                  ⭐
                </div>
                <h3 className="text-lg font-semibold text-white">Ficha Técnica Completa</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Consulte notas do público, episódios, datas de lançamento e elenco de cada produção.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20 text-xl font-bold text-purple-400">
                  ⚡
                </div>
                <h3 className="text-lg font-semibold text-white">API REST sem limites</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Consumo direto dos endpoints públicos e gratuitos da API do TVmaze, garantindo agilidade.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p>
            © {new Date().getFullYear()} CineMaze. Dados fornecidos por{" "}
            <a
              href="https://www.tvmaze.com/api"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-zinc-300"
            >
              TVmaze API
            </a>
            .
          </p>
          <div className="flex gap-4">
            <Link href="/explorar" className="hover:text-zinc-300">
              Explorar
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}