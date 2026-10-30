import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности — «На Глубине» | караоке.москва" },
      {
        name: "description",
        content:
          "Политика обработки персональных данных заведения «На Глубине» на сайте караоке.москва.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div>
      <SiteHeader />
      <main className="pt-20">
        <section className="py-24 md:py-36">
          <div className="site-container max-w-3xl">
            <p className="eyebrow">Документ</p>
            <h1 className="section-title mb-12">Политика конфиденциальности</h1>

            <div className="prose-block space-y-8 text-sm leading-7 text-muted-foreground">
              <div>
                <h2 className="mb-3 font-display text-xl uppercase text-foreground">
                  1. Общие положения
                </h2>
                <p>
                  Настоящая политика обработки персональных данных составлена в соответствии с
                  требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и
                  определяет порядок обработки персональных данных, которые собирает заведение «На
                  Глубине» (далее — Оператор) через форму бронирования на сайте караоке.москва.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-display text-xl uppercase text-foreground">
                  2. Какие данные мы собираем
                </h2>
                <p>При заполнении формы бронирования Оператор получает:</p>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  <li>имя (имя и/или фамилия);</li>
                  <li>номер телефона;</li>
                  <li>желаемые дату и время посещения;</li>
                  <li>количество гостей.</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 font-display text-xl uppercase text-foreground">
                  3. Цель обработки
                </h2>
                <p>
                  Персональные данные используются исключительно для обработки заявки на
                  бронирование столика: подтверждения резервирования, уточнения деталей визита и
                  связи с вами по оставленному номеру телефона.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-display text-xl uppercase text-foreground">
                  4. Передача третьим лицам
                </h2>
                <p>
                  Оператор не передаёт персональные данные третьим лицам в коммерческих или иных
                  целях. Данные поступают в защищённый Telegram-канал заведения и обрабатываются
                  только сотрудниками «На Глубине».
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-display text-xl uppercase text-foreground">
                  5. Срок хранения
                </h2>
                <p>
                  Данные хранятся в течение 30 дней с момента подтверждения или отмены бронирования,
                  после чего удаляются.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-display text-xl uppercase text-foreground">
                  6. Права субъекта
                </h2>
                <p>
                  Вы вправе в любой момент запросить удаление своих персональных данных, направив
                  обращение на адрес заведения или по телефону, указанному в разделе «Контакты».
                  Запрос будет обработан в течение 10 рабочих дней.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-display text-xl uppercase text-foreground">
                  7. Контакты оператора
                </h2>
                <p>«На Глубине» · Рождественская ул., с8, Нижний Новгород</p>
              </div>

              <p className="border-t border-border pt-6 text-xs text-muted-foreground/60">
                Документ актуален с 1 января 2026 года.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
