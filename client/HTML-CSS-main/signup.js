document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            await axios.post('http://localhost:8000/register', JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Data added successfully');
            form.reset();
        } catch (error) {
            console.log(error);
            alert('Error adding data');
        }
    });
});