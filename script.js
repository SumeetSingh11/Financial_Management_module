document.addEventListener('DOMContentLoaded', function() {
    loadDummyData();
});

function loadDummyData() {
    const projects = [
        {
            id: 1,
            updatedAt: '2022-01-01',
            funding: 'Funding 1',
            name: 'Construction of New Bridge...',
            district: 'Tawang',
            circle: 'Tawang',
            department: 'Department 1',
            type: 'Type 1',
            visits: 10,
            financialProgress: 50,
            physicalProgress: 75,
            status: 'Ongoing'
        },
        {
            id: 2,
            updatedAt: '2022-01-02',
            funding: 'Funding 2',
            name: 'Development of Smart City...',
            district: 'Papumpare',
            circle: 'Itanagar',
            department: 'Department 2',
            type: 'Type 2',
            visits: 20,
            financialProgress: 60,
            physicalProgress: 80,
            status: 'Ongoing'
        },
        {
            id: 3,
            updatedAt: '2022-01-03',
            funding: 'Funding 3',
            name: 'Upgradation of Road from I...',
            district: 'Papumpare',
            circle: 'Itanagar',
            department: 'Department 3',
            type: 'Type 3',
            visits: 30,
            financialProgress: 70,
            physicalProgress: 90,
            status: 'Completed'
        },
        {
            id: 4,
            updatedAt: '2022-01-04',
            funding: 'Funding 4',
            name: 'New Water Supply Project...',
            district: 'Lower Subansiri',
            circle: 'Ziro',
            department: 'Department 4',
            type: 'Type 4',
            visits: 15,
            financialProgress: 40,
            physicalProgress: 60,
            status: 'Pending'
        },
        {
            id: 5,
            updatedAt: '2022-01-05',
            funding: 'Funding 5',
            name: 'School Renovation...',
            district: 'Papumpare',
            circle: 'Itanagar',
            department: 'Department 5',
            type: 'Type 5',
            visits: 25,
            financialProgress: 20,
            physicalProgress: 30,
            status: 'Ongoing'
        },
        {
            id: 6,
            updatedAt: '2022-01-06',
            funding: 'Funding 6',
            name: 'Bridge Repair...',
            district: 'Tawang',
            circle: 'Tawang',
            department: 'Department 6',
            type: 'Type 6',
            visits: 5,
            financialProgress: 80,
            physicalProgress: 90,
            status: 'Completed'
        },
        {
            id: 7,
            updatedAt: '2022-01-07',
            funding: 'Funding 7',
            name: 'Road Construction...',
            district: 'Lower Subansiri',
            circle: 'Ziro',
            department: 'Department 7',
            type: 'Type 7',
            visits: 12,
            financialProgress: 55,
            physicalProgress: 65,
            status: 'Ongoing'
        },
        {
            id: 8,
            updatedAt: '2022-01-08',
            funding: 'Funding 8',
            name: 'Community Center...',
            district: 'Itanagar',
            circle: 'Itanagar',
            department: 'Department 8',
            type: 'Type 8',
            visits: 18,
            financialProgress: 70,
            physicalProgress: 80,
            status: 'Pending'
        },
        {
            id: 9,
            updatedAt: '2022-01-09',
            funding: 'Funding 9',
            name: 'Park Development...',
            district: 'Papumpare',
            circle: 'Itanagar',
            department: 'Department 9',
            type: 'Type 9',
            visits: 22,
            financialProgress: 45,
            physicalProgress: 55,
            status: 'Ongoing'
        },
        {
            id: 10,
            updatedAt: '2022-01-10',
            funding: 'Funding 10',
            name: 'Market Construction...',
            district: 'Ziro',
            circle: 'Lower Subansiri',
            department: 'Department 10',
            type: 'Type 10',
            visits: 30,
            financialProgress: 65,
            physicalProgress: 75,
            status: 'Completed'
        }
    ];

    const tableBody = document.getElementById('projectTableBody');
    tableBody.innerHTML = '';

    projects.forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.id}</td>
            <td>${project.name}</td>
            <td>${project.district}</td>
            <td>${project.circle}</td>
            <td>${project.department}</td>
            <td>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${project.financialProgress}%" 
                         aria-valuenow="${project.financialProgress}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small>${project.financialProgress}%</small>
            </td>
            <td>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${project.physicalProgress}%" 
                         aria-valuenow="${project.physicalProgress}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small>${project.physicalProgress}%</small>
            </td>
            <td><span class="badge badge-${project.status.toLowerCase()}">${project.status}</span></td>
            <td>
                <button class="btn btn-primary action-btn" title="View">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-info action-btn" title="Download">
                    <i class="bi bi-cloud-download"></i>
                </button>
                <button class="btn btn-warning action-btn" title="Edit" onclick="navigateToProjectDetails(${project.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger action-btn" title="Delete">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function navigateToProjectDetails(projectId) {
    // Navigate to the project details page
    window.location.href = 'project-details.html?projectId=' + projectId;
}

// Filter handling
document.querySelectorAll('.form-select, .form-control').forEach(element => {
    element.addEventListener('change', function() {
        // Implement filter logic here
        console.log('Filter changed:', this.value);
    });
});

// Button handlers
document.querySelector('.btn-primary').addEventListener('click', function() {
    console.log('Search clicked');
});

document.querySelector('.btn-secondary').addEventListener('click', function() {
    console.log('Reset clicked');
    document.querySelectorAll('.form-select, .form-control').forEach(element => {
        element.value = '';
    });
});

document.querySelector('.btn-success').addEventListener('click', function() {
    console.log('Export Excel clicked');
});
