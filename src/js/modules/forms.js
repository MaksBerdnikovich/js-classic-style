import {postData} from "../services/requests";
import {checkTextInputs, phoneMask} from "../services/validation";
import dragAndDrop from "../services/drag-&-drop";

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');

    phoneMask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');
    dragAndDrop('[name="upload"]');

    const message = {
        loading: 'Loading...',
        success: 'Message successful send...',
        failure: 'Error! We\'ll fix it soon...',
        spinner: 'img/spinner.gif',
        ok: 'img/ok.gif',
        fail: 'img/fail.gif'
    };

    const path = {
        designer: 'server.php',
        question: 'question.php'
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.nextElementSibling.textContent = "Choose file";
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.');

            arr[0].length > 50 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 50) + dots + arr[1];
            item.nextElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('contact-form__status', 'animate__animated', 'animate__fadeIn');
            item.parentNode.appendChild(statusMessage);
            item.style.display = 'none';

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('h6');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            let api;
            item.closest('.modal') ? api = path.question : api = path.designer;
            console.log(api);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusMessage.classList.add('status--ok');
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.classList.add('status--fail');
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('animate__fadeOut');
                    }, 5000);
                });
        });
    });
};

export default forms;