# abstract-element

Абстрактный класс и набор базовых методов для разработки веб-компонентов с использованием различных рендеров через простые функции.

## <a id="install"></a>Установка

Для удобства можно выполнять установку через `npm`:

`npm i abstract-element`

В этом случае вы получите уже сжатые и скомпилированные под `esm` и `cjs` форматы импортов файлы. **Такой способ установки является рекомендуемым**.

Помимо установки через `npm`, есть возможность скачать исходники с текущего репозитория и включить их непосредственно в свой проект, если вы используете сборщик Webpack, Rollup или какой-либо иной способный транспалировать TypeScript файлы.

## <a id="use"></a>Использование

1. Установите предпочитаемый рендер. К примеру, воспользуемя [lit-html](https://github.com/Polymer/lit-html).

2. Создайте класс и унаследуйте его от `AbstractElement`. При этом необходимо заимпортить или реализовать функцию `render` соответствующую выбранному рендеру. Эта функция передается в конструктор абстрактного класса через оператор `super`.

**demo-lit-component.ts**

```typescript
import { Define, AbstractElement, attr, state } from 'abstract-element';
import litRender from 'abstract-element/render/lit';

import { html } from 'lit-html';

/**
 * The demo web component with lit-html render engine
 */
@Define('demo-lit-component')
export class DemoLitComponent extends AbstractElement {
  @attr('data-demo')
  dataDemo;

  @state()
  time = new Date().toLocaleTimeString();

  constructor() {
    super(litRender, true);

    // update the time each second
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
    }, 1000);
  }

  render() {
    return html`
      <section>
        <p>${this.attr[DemoLitComponent.attributes.dataDemo]}</p>
        <div>${this.time}</div>
      </section>
    `;
  }
}
```

Код выше написал на TypeScript поэтому нам нужно будет воспользоваться сборщиком Webpack, Rollup и т.д. для получения итогового `index.js` файла.

3. Примените готовый компонент внутри html документа.

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Demo</title>
  </head>
  <body>
    <script src="index.js"></script>
    <demo-lit-component data-demo="Current time is rendering with lit-html:"></demo-lit-component>
  </body>
</html>
```

По умолчанию `AbstractElement` и рендер функция импортируются как `esm2015` модули, но при необходимости, вы можете импортировать их из папки `es5` для использования `cjs` модулей с ECMAScript 5. В этом случае необходимо воспользоваться [специальными полифиллами](https://www.webcomponents.org/polyfills) так как спецификация Web components предполагает использовать компоненты только через классы (отсутствуют в ECMAScript 5).

## <a id="renders"></a>Рендеры

AbstractElement может поддерживать любой рендер, для которого создана соответствующая рендер-функция.

На данный момент, AbstractElement содержит "из коробки" следующие рендер функции:

1. 'abstract-element/render/lit' - [lit-html](https://github.com/Polymer/lit-html).
1. 'abstract-element/render/hyper' - [hyperHTML](https://github.com/WebReflection/hyperHTML).

## <a id="api"></a>API

### Декораторы TypeScript

| Декоратор               | Описание                                                                             |                                                                                                                                                   Аналог |
| ----------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Define(nameTag: string) | Инициализация пользовательского компонента и добавление в реестр браузера            |                                                                                                                                  `customElements.define` |
| state()                 | Свойства класса с этим декоратором будут вызывать функцию render при своем изменении |                                                                                                                                свойство с именем `state` |
| attr(name)              | Определяет наблюдаемый атрибут для компонента                                        | статическое свойство класса `static attributes` <br/> или `static get observedAttributes()` <br/> и `attributeChangedCallback(name, oldValue, newValue)` |

### Параметры класса AbstractElement

| Параметр   |                                                                                                                                 Описание |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------: |
| renderFunc | Рендер функция. Должна соответствовать рендеру, с помощью которого будет происходит создание DOM элемента для компонента и его изменение |
| shadow     |       Если `true`, то будет создан компонент с [Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow). <br/> `false` по умолчанию |
| mode       |                                                        Открытый или закрытый Shadow DOM ('open' или 'closed'). <br/> По умолчанию 'open' |

## <a id="motivation"></a>Мотивация

Развитие спецификации [Web components](https://github.com/w3c/webcomponents) дало возможность создавать собственные элементы для расширения базового набора. Это огромный шаг в развитии средств разработки UI компонентов.

Ещё одним значимым явлением стало появление рендеров, позволяющих быстро и эффективно манипулировать DOM. С помощью AbstractElement хотелось совместить их работу со Web components и добавить к этому несколько утилитарных функций и методов для более удобной работы.

AbstractElement не является ни библиотекой ни фреймворком. Кода в проекте не много и вы всегда сможете в нем при необходимости разобраться. Целью было не создание универсального инструмента, а скорее демонстрация подхода к созданию современных компонентов с минимальным количеством зависимостей и максимальной гибкостью в их выборе.

## <a id="diff_and_sim"></a>Отличия и сходства

Есть целый ряд проектов выполняющих схожие функции, к примеру, [hyperHTML-Element](https://github.com/WebReflection/hyperHTML-Element) и [LitElement](https://lit-element.polymer-project.org/).
Основным сходство является то, что при использовании определенного рендера AbstractElement будет для вас работать, как и любой другой базовый класс основанный на этом же рендере.

Отличия AbstractElement:

1. Приверженность спецификациям Web components. В AbstractElement есть ряд утилит упрощающих рутинные операции, но они не заменяют и уж точно не блокируют возможности заложенные в спецификациях Web components.
1. Зависимость только от рендера. Нет необходимости устанавливать специальные CLI или дополнительные утилиты, чтобы начать использовать. Но если они вам всё же нужны, то AbstractElement не будет мешать так как является обычным абстрактным классом и функцией по использованию определенного рендера.
1. Возможность использования различных рендеров. А если существующие рендеры не решают ваших задач, то всегда можно написать свой не отказываясь при этом от абстрактного класса и утилитарных функций.

## <a id="contributors"></a>Тем, кто хочет что-то изменить

Будем рады вашим PR, а также замечаниям и предложениям в issues.
