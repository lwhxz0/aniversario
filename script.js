const { useMemo, useState } = React;

function NanaBirthdaySite() {
  const { motion, AnimatePresence } = window.Framer || {};
  const senhaCorreta = 'roxinho';
  const [senha, setSenha] = useState('');
  const [entrou, setEntrou] = useState(false);
  const [erro, setErro] = useState('');

  const confetes = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: 5 + Math.random() * 3,
        size: 6 + Math.random() * 8,
        color: ['#f5d0fe', '#c4b5fd', '#a78bfa', '#e9d5ff'][i % 4],
      })),
    []
  );

  const verificarSenha = (event) => {
    event?.preventDefault?.();
    if (senha.toLowerCase().trim() === senhaCorreta) {
      setEntrou(true);
      setErro('');
    } else {
      setErro('Hmm… essa não 👀 dica: tem a ver com sua cor favorita 💜');
    }
  };

  if (!motion || !AnimatePresence) {
    return <div className="min-h-screen flex items-center justify-center text-white">Carregando...</div>;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-800 text-white relative">
      <AnimatePresence mode="wait">
        {!entrou ? (
          <motion.section
            key="senha"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 1.02 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="w-full max-w-lg rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(196,181,253,0.25)] p-10 text-center space-y-6">
              <div className="text-3xl">✨</div>
              <h1 className="text-4xl font-bold">Você é mesmo a Nana?</h1>
              <p className="text-lg text-purple-100">Digite a senha secreta para entrar 💜</p>
              <form onSubmit={verificarSenha} className="space-y-4">
                <input
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full rounded-2xl px-4 py-3 text-center bg-white/90 text-purple-900 outline-none ring-2 ring-transparent focus:ring-purple-300"
                  placeholder="Digite aqui..."
                  type="password"
                />
                {erro && <p className="text-sm text-pink-100">{erro}</p>}
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-purple-500 hover:bg-purple-600 transition px-8 py-3 text-base font-semibold"
                >
                  Entrar
                </button>
              </form>
            </div>
          </motion.section>
        ) : (
          <motion.section key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
            <div className="absolute inset-0 pointer-events-none">
              {confetes.map((c) => (
                <motion.div
                  key={c.id}
                  className="absolute rounded-full"
                  style={{ left: c.left, top: '-10px', width: c.size, height: c.size, backgroundColor: c.color }}
                  animate={{ y: ['0vh', '110vh'], rotate: [0, 180, 360], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: c.duration, repeat: Infinity, delay: c.delay, ease: 'linear' }}
                />
              ))}
            </div>

            <section className="max-w-5xl mx-auto px-6 py-20 text-center relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                Feliz aniversário, Nana 💜
              </motion.h1>

              <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-95">
                Fiz esse cantinho com carinho para celebrar você. Hoje é dia de festa, memórias bonitas, risadas,
                música e muito amor. Você deixa tudo mais especial só por existir.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-16">
                <article className="rounded-3xl bg-white/10 border border-white/10 backdrop-blur-lg p-8 text-center space-y-4">
                  <div className="text-3xl">💜</div>
                  <h2 className="text-2xl font-semibold">Momentos</h2>
                  <p>Adicione aqui fotos favoritas de vocês.</p>
                </article>

                <article className="rounded-3xl bg-white/10 border border-white/10 backdrop-blur-lg p-8 text-center space-y-4">
                  <div className="text-3xl">🎁</div>
                  <h2 className="text-2xl font-semibold">Surpresa</h2>
                  <p>Você pode colocar uma mensagem escondida ou um vídeo especial.</p>
                </article>

                <article className="rounded-3xl bg-white/10 border border-white/10 backdrop-blur-lg p-8 text-center space-y-4">
                  <div className="text-3xl">🎵</div>
                  <h2 className="text-2xl font-semibold">Playlist</h2>
                  <p>Adicione aqui a música preferida dela para tocar no fundo.</p>
                </article>
              </div>
            </section>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<NanaBirthdaySite />);
