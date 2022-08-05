const dragAndDrop = (selector) => {
    // drag *
    // dragend *
    // dragenter - объект над dropArea
    // dragexit *
    // dragleave - объект за пределами dropArea
    // dragover - объект зависает над dropArea
    // dragstart *
    // drop - объект отправлен в dropArea

    const fileInputs = document.querySelectorAll(selector);

    const events = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, events, false);
            input.addEventListener(eventName, input.focus(), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;

            let dots;
            const arr = input.files[0].name.split('.');

            arr[0].length > 50 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 50) + dots + arr[1];
            input.nextElementSibling.textContent = name;
        });
    });
};

export default dragAndDrop;