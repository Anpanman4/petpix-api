# **petpix-api**

## Роуты

Все роуты будут начинаться с `http://localhost:3000/api`

Для пользователей:</br>

<table>
<tr>
<td align="center"><strong>Запрос</strong></th>
<td align="center"><strong>Роут</strong></th>
<td align="center"> <strong>Описание</strong></th>
</tr>

<tr>
<td align="center">POST</td>
<td align="center">/register</td>
<td>Создаёт пользователя с переданными в теле email, password, username и firstName</td>
</tr>

<tr>
<td align="center">POST</td>
<td align="center">/login</td>
<td>Проверяет переданные в теле почту и пароль и возвращает JWT</td>
</tr>

<tr>
<td align="center">GET</td>
<td align="center">/users</td>
<td>Возвращает информацию о всех пользователях</td>
</tr>

<tr>
<td align="center">GET</td>
<td align="center">/users/:id</td>
<td>Возвращает информацию о выбраном пользователе</td>
</tr>

<tr>
<td align="center">GET</td>
<td align="center">/users/me</td>
<td>Возвращает информацию о текущем пользователе из токена</td>
</tr>

<tr>
<td align="center">PATCH</td>
<td align="center">/users/me</td>
<td>Обновляет информацию о пользователе, а именно имя</td>
</tr>
</table>

## Установка

Для запуска на локальной машине необходимо:

1. Установить npm зависимости:</br>

```sh
npm install
```

2. Запустить MongoDB:

```sh
npm run mongod
```

3. Запустить в режиме разработки:</br>

```sh
npm run start  — запускает сервер
npm run dev — запускает сервер с hot-reload
```

Если все прошло успешно, проект будет запущен на `http://localhost:3000`
