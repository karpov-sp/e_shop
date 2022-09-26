class Validator {
    constructor(form) {
        this.patterns = {  // правила заполнения полей
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
        };
        this.errors = {  //варианты вывода сообщений об ошибках
            name: 'Можно ввести только буквы',
            phone: 'Введите по шаблону +7(000)000-0000',
            email:'Примеры ввода: mymail@mail.ru (my-mail@mail.ru, my.mail@mail.ru)'
        };
        this.errorClass = 'error-msg'; //стиль текста ошибки (красный)
        this.form = form;
        this.valid = false;  //изначально форма не заполнена, поэтому не валидна
        this._validateForm();  // метод
    }

    validate(regexp, value) {
    regexp.test(value)
    }

    _validateForm() {
        let errors =
        [...document.getElementById(this.form).querySelectorAll(`${this.errorClass}`)];
        for (let error of errors) {
            error.remove();  //стираем старые ошибки от предыдущего ввода
        }

        let formFields = [...document.getElementById(this.form).getElementsByTagName('input')]; //получаем массив всех инпутов
        for (let field of formFields) {
            this._validate(field); //обходим вск инпуты и передаем в метод validate на проверку
        }

        if(![...document.getElementById(this.form).querySelectorAll('invalid')].length) {
            this.valid.true;  //проверяем форму целиком
        }
    }

    _validate(field) {
        if(this.patterns[field.name]) {  //проверяем наличие правила для инпута
            if(!this.patterns[field.name].test(field.value)) {
                field.classList.add('invalid');
                this._addErrorMsg(field); // вводим сообщение об ошибке
                this._watchField(field);
            }
        }
    }        

    _addErrorMsg(field) {  //готовится текст ошибки
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div>`;
        field.parentNode.insertAdjacentHTML('beforeend', error); //вывод ошибки
    }

    _watchField(field) {
        field.addEventListener('input', () => { //вводим инпут
            let error = field.parentNode.querySelector(`.${this.errorClass}`);
            if(this.patterns[field.name].test(field.value)) {
                field.classList.remove('invalid');
                field.classList.add('valid');
                if(error) {
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if(!error) {
                    this._addErrorMsg(field);
                }
            }
        })
    }

}