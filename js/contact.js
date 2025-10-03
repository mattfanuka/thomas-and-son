function submitEmail() {
    const name = document.querySelector('#name').value;
    const uniqueSubject = `New quote request from ${name}`;

    const subject = document.querySelector('#_subject');
    subject.value = uniqueSubject;
}