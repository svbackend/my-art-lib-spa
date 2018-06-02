export default {
  message: {
    hello: 'Привіт, світ!'
  },
  validation: {
    required: 'Це поле є обов\'язковим!',
    minLength: 'Поле "{fieldName}" занадто коротке, мінімум {min, plural, =0{# символів} =1{1 символ} few{# символи} other{# символів}}!',
    email: 'Введіть коректний емейл адрес',
    validUsername: 'Логін повинен складатись лише з букв, цифр та символів: -, _',
    _incorrect: 'Невірний Логін або Пароль, попробуйте ще раз',
    _isUniqueError: 'Такий {fieldName} вже зареєстрований'
  },
  fields: {
    username: 'Логін',
    email: 'Email',
    usernamePlaceholder: 'Іван_Іванович-95',
    password: 'Пароль',
  },
  loginPage: {
    authorize: 'Авторизуватись',
  },
  registrationPage: {
    register: 'Зареєструватись',
  },
  movie: {
    addToWatchedMovies: 'Додати в колекцію',
    addedToWatchedMovies: 'Переглянуто',
  },
}