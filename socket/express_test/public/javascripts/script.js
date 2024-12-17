var socket = io();

        var form = document.getElementById('formChat');
        var input = document.getElementById('inputChat');
        var messages = document.getElementById('messages');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (input.value) {
                socket.emit('chat message', input.value);
                input.value = '';
            }
        });

        socket.on('chat message', function(msg) {
            var item = document.createElement('li');
            item.textContent = msg;
            messages.appendChild(item);
        });