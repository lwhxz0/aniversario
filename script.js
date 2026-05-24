const { useMemo, useState } = React;

function NanaBirthdayPage() {
  const { motion, AnimatePresence } = window.Framer || {};
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const confetti = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 3,
        size: 6 + Math.random() * 8,
        color: ['#c4b5fd', '#a78bfa', '#8b5cf6', '#ddd6fe'][i % 4],
      })),
    []
  );

  const handleUnlock = (event) => {
    event.preventDefault();
    if (password.trim().toLowerCase() === 'roxinho') {
      setUnlocked(true);
      setError('');
      return;
    }
    setError('Ops! Essa senha não abriu o portal roxinho 💜');
  };

  if (!motion || !AnimatePresence) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white px-4">
        Carregando animações...
      </div>
    );
  }

  return (
    <main className="min-h-screen text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.section
            key="login"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <div className="w-full max-w-md rounded-3xl bg-white/10 border border-lilac/30 backdrop-blur-xl p-8 shadow-glow">
              <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3">Você é mesmo a Nana?</h1>
              <p className="text-center text-lilac mb-8">Digite a senha secreta para abrir a surpresa.</p>

              <form onSubmit={handleUnlock} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha..."
                  className="w-full rounded-xl bg-plum/50 border border-lilac/40 px-4 py-3 outline-none focus:ring-2 focus:ring-lilac"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-iris to-grape py-3 font-semibold transition hover:brightness-110"
                >
                  Entrar no aniversário
                </button>
              </form>

              {error && <p className="mt-4 text-center text-pink-200">{error}</p>}
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="birthday"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen py-10 px-4 sm:px-8"
          >
            <div className="absolute inset-0 pointer-events-none">
              {confetti.map((piece) => (
                <motion.span
                  key={piece.id}
                  className="absolute top-[-10%] rounded-sm"
                  style={{ left: piece.left, width: piece.size, height: piece.size * 1.5, backgroundColor: piece.color }}
                  animate={{ y: ['0vh', '115vh'], rotate: [0, 220, 360], opacity: [0, 1, 1, 0] }}
                  transition={{ repeat: Infinity, duration: piece.duration, delay: piece.delay, ease: 'linear' }}
                />
              ))}
            </div>

            <div className="relative mx-auto max-w-5xl space-y-8">
              <header className="text-center rounded-3xl bg-white/10 border border-lilac/30 backdrop-blur-xl p-8 shadow-glow">
                <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-white to-lilac bg-clip-text text-transparent">
                  Feliz aniversário, Nana 💜
                </h2>
                <p className="mt-3 text-lilac">Que seu novo ciclo seja cheio de amor, luz e momentos inesquecíveis.</p>
              </header>

              <section className="grid gap-6 md:grid-cols-2">
                <article className="rounded-2xl bg-white/10 border border-lilac/30 p-6 backdrop-blur-md">
                  <h3 className="text-2xl font-semibold mb-4">Seção para fotos</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Foto 1', 'Foto 2', 'Foto 3', 'Foto 4'].map((item) => (
                      <div key={item} className="aspect-square rounded-xl bg-gradient-to-br from-iris/50 to-plum/80 flex items-center justify-center text-lilac text-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-2xl bg-white/10 border border-lilac/30 p-6 backdrop-blur-md">
                  <h3 className="text-2xl font-semibold mb-4">Seção para mensagem especial</h3>
                  <p className="leading-relaxed text-lilac">
                    Nana, hoje celebramos sua existência com todo carinho. Que cada sonho encontre caminho,
                    que cada sorriso volte em dobro e que o amor te abrace em todos os dias.
                  </p>
                </article>
              </section>

              <section className="rounded-2xl bg-white/10 border border-lilac/30 p-6 backdrop-blur-md">
                <h3 className="text-2xl font-semibold mb-4">Seção para playlist</h3>
                <ul className="space-y-3">
                  {['Música 1 - Momento Especial', 'Música 2 - Vibe Roxinha', 'Música 3 - Festa da Nana'].map((song) => (
                    <li key={song} className="rounded-xl bg-plum/60 border border-lilac/20 px-4 py-3">
                      {song}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<NanaBirthdayPage />);
