let myForm = document.getElementById("myForm");
let formArr = [
    {
        typeElem: "input",
        type: "text",
        name: "firstName",
        placeholder: "Иван",
        required: true,
        className: "form-input",
        style: {
            width: "100%",
            padding: "12px 15px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
            transition: "border-color 0.3s",
            boxSizing: "border-box"
        }
    },
    {
        typeElem: "input",
        type: "text",
        name: "lastName",
        placeholder: "Иванов",
        required: true,
        className: "form-input",
        style: {
            width: "100%",
            padding: "12px 15px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
            transition: "border-color 0.3s",
            boxSizing: "border-box"
        }
    },
    {
        typeElem: "input",
        type: "tel",
        name: "phone",
        placeholder: "+7 (123) 456-7890",
        pattern: "[0-9]{10}",
        title: "10 цифр номера без пробелов",
        required: true,
        className: "form-input",
        style: {
            width: "100%",
            padding: "12px 15px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
            transition: "border-color 0.3s",
            boxSizing: "border-box"
        }
    },
    {
        typeElem: "input",
        type: "email",
        name: "email",
        placeholder: "ivan@example.com",
        required: true,
        className: "form-input",
        style: {
            width: "100%",
            padding: "12px 15px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
            transition: "border-color 0.3s",
            boxSizing: "border-box"
        }
    },
    {
        typeElem: "input",
        type: "password",
        name: "password",
        placeholder: "••••••••",
        minlength: "8",
        required: true,
        className: "form-input",
        style: {
            width: "100%",
            padding: "12px 15px",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
            transition: "border-color 0.3s",
            boxSizing: "border-box"
        }
    },
    {
        typeElem: "button",
        type: "submit",
        textContent: "Зарегистрироваться",
        className: "form-submit",
        style: {
            width: "100%",
            padding: "14px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.3s",
            boxSizing: "border-box"
        }
    },
];

function fuo(arr, form) {
    for (let i = 0; i < arr.length; i++) {
        let elem = document.createElement(arr[i].typeElem);

        for (let key in arr[i]) {
            if (key === "style") continue;
            if (key === "textContent") {
                elem.textContent = arr[i].textContent;
            } else if (key !== "typeElem") {
                elem.setAttribute(key, arr[i][key]);
            }
        }

        if (arr[i].style) {
            for (let styleProp in arr[i].style) {
                elem.style[styleProp] = arr[i].style[styleProp];
            }
        }

        form.appendChild(elem);
    }
}

fuo(formArr, myForm);

function validateForm(form) {
    const inputs = form.querySelectorAll('input');
    let isValid = true;

    inputs.forEach(input => {
        // Проверяем обязательные поля
        if (input.required && !input.value.trim()) {
            markAsInvalid(input, 'Это поле обязательно для заполнения');
            isValid = false;
        } else {
            markAsValid(input);
        }

        // Валидация email
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (input.value && !emailRegex.test(input.value)) {
                markAsInvalid(input, 'Введите корректный email');
                isValid = false;
            }
        }

        // Валидация телефона
        if (input.type === 'tel' && input.pattern) {
            const regex = new RegExp(input.pattern);
            const phoneDigits = input.value.replace(/\D/g, '');
            if (!regex.test(phoneDigits)) {
                markAsInvalid(input, input.title || 'Некорректный формат телефона');
                isValid = false;
            }
        }

        // Проверка минимальной длины
        if (input.minLength && input.value.length < input.minLength) {
            markAsInvalid(input, `Минимальная длина: ${input.minLength} символов`);
            isValid = false;
        }

        // Валидация пароля
        if (input.type === 'password' && input.value.length < 8) {
            markAsInvalid(input, 'Пароль должен содержать минимум 8 символов');
            isValid = false;
        }
    });

    return isValid;
}

function markAsInvalid(input, message) {
    input.style.borderColor = '#e74c3c';

    // Удаляем предыдущее сообщение об ошибке
    const existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }

    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#e74c3c';
    error.style.fontSize = '14px';
    error.style.marginTop = '-10px';
    error.style.marginBottom = '15px';

    input.parentNode.insertBefore(error, input.nextSibling);
}

function markAsValid(input) {
    input.style.borderColor = '#2ecc71';

    // Удаляем сообщение об ошибке, если есть
    const error = input.nextElementSibling;
    if (error && error.classList.contains('error-message')) {
        error.remove();
    }
}

myForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const isValid = validateForm(this);
    if (!isValid) {
        alert('Пожалуйста, исправьте ошибки в форме.');
    } else {
        alert('Форма успешно отправлена!');
    }
});

myForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function () {
        validateField(this);
    });

    input.addEventListener('blur', function () {
        validateField(this);
    });
});

function validateField(input) {
    // Проверяем обязательные поля
    if (input.required && !input.value.trim()) {
        markAsInvalid(input, 'Это поле обязательно для заполнения');
        return false;
    } else {
        markAsValid(input);
    }

    // Валидация email
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (input.value && !emailRegex.test(input.value)) {
            markAsInvalid(input, 'Введите корректный email');
            return false;
        }
    }

    // Валидация телефона
    if (input.type === 'tel' && input.pattern) {
        const regex = new RegExp(input.pattern);
        const phoneDigits = input.value.replace(/\D/g, '');
        if (!regex.test(phoneDigits)) {
            markAsInvalid(input, input.title || 'Некорректный формат телефона');
            return false;
        }
    }

    // Проверка минимальной длины
    if (input.minLength && input.value.length < input.minLength) {
        markAsInvalid(input, `Минимальная длина: ${input.minLength} символов`);
        return false;
    }

    // Валидация пароля
    if (input.type === 'password' && input.value.length < 8) {
        markAsInvalid(input, 'Пароль должен содержать минимум 8 символов');
        return false;
    }

    return true;
}
