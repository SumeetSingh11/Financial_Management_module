document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    loadFinancialData();
    loadPhysicalProgressData();
    setupNotesSystem();
    setupCollapse();
    setupChat();
    loadPresetMessages();
});

function initializeTabs() {
    // Funding Overview Tabs
    document.querySelectorAll('.nav-tabs .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all tab panes
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show target tab pane
            document.getElementById(targetId).classList.add('active');
            
            // Update active tab
            document.querySelectorAll('.nav-tabs .nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Financial Overview Tabs
    document.querySelectorAll('.nav-pills .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-pills .nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            loadFinancialData(this.getAttribute('href').substring(1));
        });
    });

    // Collapsible sections
    document.querySelectorAll('.card-header .btn-icon').forEach(button => {
        button.addEventListener('click', function() {
            const cardBody = this.closest('.card').querySelector('.card-body');
            const icon = this.querySelector('i');
            
            if (cardBody.style.display === 'none') {
                cardBody.style.display = 'block';
                icon.classList.remove('bi-chevron-up');
                icon.classList.add('bi-chevron-down');
            } else {
                cardBody.style.display = 'none';
                icon.classList.remove('bi-chevron-down');
                icon.classList.add('bi-chevron-up');
            }
        });
    });
}

function loadFinancialData(fundType = 'central') {
    const dummyData = [
        {
            slNo: 1,
            instalment: 'First',
            amount: 1000000,
            utilisedFund: 800000,
            balancedFund: 200000,
            dateOfRelease: '2024-01-15',
            utilizationStatus: 'Pending',
            dateOfSubmission: '2024-01-20'
        },
        // Add more dummy data as needed
    ];

    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';

    dummyData.forEach(row => {
        tbody.innerHTML += `
            <tr>
                <td>${row.slNo}</td>
                <td>${row.instalment}</td>
                <td>${row.amount.toLocaleString()}</td>
                <td>${row.utilisedFund.toLocaleString()}</td>
                <td>${row.balancedFund.toLocaleString()}</td>
                <td>${row.dateOfRelease}</td>
                <td>${row.utilizationStatus}</td>
                <td>${row.dateOfSubmission}</td>
            </tr>
        `;
    });
}

function loadPhysicalProgressData() {
    // Sample data based on the image
    const physicalProgressData = [
        {
            slNo: 1,
            year: '2025',
            quarter: '4th quarter (Jan - March)',
            physicalProgress: 0,
            financialProgress: 0,
            status: 'Ongoing',
            photographs: [
                { url: 'path/to/image1.jpg', label: 'Image1' },
                { url: 'path/to/image2.jpg', label: 'Image2' },
                { url: 'path/to/image3.jpg', label: 'Image3' },
                { url: 'path/to/image4.jpg', label: 'Image4' }
            ],
            operators: ''
        }
    ];

    const tbody = document.getElementById('physicalProgressTable');
    tbody.innerHTML = '';

    physicalProgressData.forEach(row => {
        const photoHtml = row.photographs.map(photo => `
            <div class="photo-thumbnail">
                <img src="${photo.url}" alt="${photo.label}" class="img-thumbnail">
                <span>${photo.label}</span>
            </div>
        `).join('');

        tbody.innerHTML += `
            <tr>
                <td>${row.slNo}</td>
                <td>${row.year}</td>
                <td>${row.quarter}</td>
                <td>${row.physicalProgress}</td>
                <td>${row.financialProgress}</td>
                <td>${row.status}</td>
                <td>
                    <div class="photo-grid">
                        ${photoHtml}
                    </div>
                </td>
                <td>${row.operators}</td>
            </tr>
        `;
    });
}

function setupNotesSystem() {
    const notesList = document.querySelector('.notes-list');
    const noteInput = document.querySelector('.input-group input');
    const addNoteBtn = document.querySelector('.input-group button');

    const dummyNotes = [
        { text: 'First note with timestamp', timestamp: '2024-01-15 10:30 AM' },
        { text: 'Second note with timestamp', timestamp: '2024-01-15 11:45 AM' }
    ];

    function displayNotes() {
        notesList.innerHTML = dummyNotes.map(note => `
            <div class="note-item mb-2">
                <div class="d-flex align-items-center">
                    <div class="avatar me-2">
                        <i class="bi bi-person-circle"></i>
                    </div>
                    <div class="note-content">
                        <div class="note-text">${note.text}</div>
                        <small class="text-muted">${note.timestamp}</small>
                    </div>
                </div>
            </div>
        `).join('');
    }

    addNoteBtn.addEventListener('click', function() {
        const noteText = noteInput.value.trim();
        if (noteText) {
            const now = new Date();
            dummyNotes.push({
                text: noteText,
                timestamp: now.toLocaleString()
            });
            noteInput.value = '';
            displayNotes();
        }
    });

    displayNotes();
}

function setupCollapse() {
    const collapseButtons = document.querySelectorAll('.section-header .btn-icon');
    collapseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionContent = this.closest('.section-card').querySelector('.section-content');
            sectionContent.style.display = sectionContent.style.display === 'none' ? 'block' : 'none';
            this.querySelector('i').classList.toggle('bi-chevron-down');
            this.querySelector('i').classList.toggle('bi-chevron-up');
        });
    });
}

function setupChat() {
    const chatButton = document.querySelector('.notes-btn');
    const chatModal = new bootstrap.Modal(document.getElementById('chatModal'));

    chatButton.addEventListener('click', function() {
        chatModal.show();
        loadPresetMessages(); // Ensure messages are loaded when modal opens
    });

    document.querySelector('#chatModal .btn-primary').addEventListener('click', function() {
        const messageInput = document.querySelector('#chatModal .form-control');
        const messageText = messageInput.value.trim();
        if (messageText) {
            const chatHistory = document.querySelector('.chat-history');
            const newMessage = document.createElement('div');
            newMessage.classList.add('chat-message', 'sent');
            newMessage.innerHTML = `
                <div class="message-content">${messageText}<span class="timestamp">Now</span></div>
                <img src="avatar2.png" alt="Avatar" class="avatar">
            `;
            chatHistory.appendChild(newMessage);
            messageInput.value = '';
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    });
}

function loadPresetMessages() {
    const chatHistory = document.querySelector('.chat-history');
    chatHistory.innerHTML = ''; // Clear existing messages
    const messages = [
        { text: 'Hi David, have you got the project report pdf?', sender: 'received', timestamp: 'Yesterday' },
        { text: 'NO. I did not get it', sender: 'sent', timestamp: 'Yesterday' },
        { text: 'Ok, I will just send it here. Plz be sure to fill the details by today end of the day.', sender: 'received', timestamp: 'Yesterday' },
        { text: 'Ok. Should I send it over email as well after filling the details.', sender: 'sent', timestamp: 'Yesterday' },
        { text: 'Ya. I’ll be adding more team members to it.', sender: 'received', timestamp: 'Yesterday' },
        { text: 'OK', sender: 'sent', timestamp: 'Yesterday' }
    ];

    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', message.sender);
        messageDiv.innerHTML = `
            <div class="message-content">${message.text}<span class="timestamp">${message.timestamp}</span></div>
            <img src="avatar${message.sender === 'sent' ? '2' : '1'}.png" alt="Avatar" class="avatar">
        `;
        chatHistory.appendChild(messageDiv);
    });
}
