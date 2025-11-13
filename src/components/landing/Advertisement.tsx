/**
 * COMPONENTE ADVERTISEMENT
 *
 * Anuncio tipo periódico vintage (decorativo y divertido)
 */

export function Advertisement() {
  return (
    <section className="newspaper-page py-8 px-4 md:px-8 bg-newspaper-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Anuncio 1 - Recomendación */}
          <div className="newspaper-box text-center">
            <div className="border-b-2 border-newspaper-black pb-3 mb-3">
              <h3 className="font-headline text-2xl font-bold">RECOMENDACIÓN</h3>
            </div>
            <p className="font-serif text-sm mb-3">
              Los especialistas recomiendan
            </p>
            <p className="font-sans text-xs leading-relaxed mb-3">
              Asistir a bodas aumenta la felicidad en un 95%.
              Estudios demuestran que presenciar el amor verdadero
              tiene efectos positivos duraderos.
            </p>
            <div className="border-t border-newspaper-border pt-2">
              <p className="newspaper-page-number">Dr. Amor - Pág. 42</p>
            </div>
          </div>

          {/* Anuncio 2 - Estadística */}
          <div className="newspaper-box text-center">
            <div className="border-b-2 border-newspaper-black pb-3 mb-3">
              <h3 className="font-headline text-2xl font-bold">ESTADÍSTICA</h3>
            </div>
            <div className="my-4">
              <div className="text-6xl font-headline font-black text-newspaper-accent">
                100%
              </div>
              <p className="font-sans text-xs mt-2">
                de los invitados están emocionados
              </p>
            </div>
            <p className="font-serif text-xs italic">
              "Será la boda del año"
            </p>
            <div className="border-t border-newspaper-border pt-2 mt-3">
              <p className="newspaper-page-number">Encuesta 2026</p>
            </div>
          </div>

          {/* Anuncio 3 - Dato curioso */}
          <div className="newspaper-box text-center">
            <div className="border-b-2 border-newspaper-black pb-3 mb-3">
              <h3 className="font-headline text-2xl font-bold">SABÍAS QUE</h3>
            </div>
            <p className="font-serif text-sm mb-3">
              ¿Dato Curioso?
            </p>
            <p className="font-sans text-xs leading-relaxed mb-3">
              Alexei esperó 6 años antes de escribirle a Estephanie.
              Las mejores historias requieren paciencia y el momento perfecto.
            </p>
            <div className="border-t border-newspaper-border pt-2">
              <p className="newspaper-page-number">Curiosidades - Pág. 15</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
