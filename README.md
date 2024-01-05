<h1 align="center"> Restowaves server </h1>

<h2>Виконані завдання</h2>
<ul>
  <li>Відповідно до завдання було створено сервер на платформі node.js</li>
  <li>Відповідно до завдання використовувалася архітектура RESTapi з використанням Express</li>
  <li>При запуску сервера виконується запит до Exel таблиці, отримані дані зберігаються в Postgres</li>
  <li>Для цього завдання було створено базу даних з окремою таблицею для розмірів товару, завдяки цьому можна легко додати нові розміри для товару</li>
  <li>Щогодини сервер робить запит до таблиці Exel, щоб перевірити наявність розмірів товару і появу нових товарів. </li>
</ul>

<h3>Clone repositorie</h3>
<div class="highlight highlight-source-shell notranslate position-relative overflow-auto" dir="auto">
  <pre>  git clone https://github.com/EraChanZ01/RestoWaves.git</pre>
</div>
<p>OR</p>
<div class="highlight highlight-source-shell notranslate position-relative overflow-auto" dir="auto">
  <pre> git clone git@github.com:EraChanZ01/RestoWaves.git</pre>
</div>

<h3>Створення Бази даних</h3>
<div class="highlight highlight-source-shell notranslate position-relative overflow-auto" dir="auto">
  pre>npm i</pre>
  <pre>npx sequelize-cli db:create</pre>
  <pre>npx sequelize-cli db:migrate</pre>
  <pre>npx sequelize-cli db:seed:all</pre>
</div>
