const size = 10; // Size of the hash table
let hashTable = Array(size).fill(0);
const prime = findNextPrime(size);

document.getElementById('addButton').addEventListener('click', addToHashTable);

function findNextPrime(n) {
    while (true) {
        n++;
        if (isPrime(n)) return n;
    }
}

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function addToHashTable() {
    const input = document.getElementById('numberInput').value;
    const number = parseInt(input);
    if (isNaN(number)) return;

    // Initial index calculated with prime
    let index = number % prime;
    if (index < 0) index += prime; // Handle negative indices
    index %= size;

    let count = 0;

    // Quadratic probing for collision resolution
    while (hashTable[index] !== 0 && count < size) {
        count++;
        index = (number % prime + count * count) % size;
    }

    if (count < size) {
        hashTable[index] = number;
        updateHashTableUI();
    } else {
        alert("HashTable is full!");
    }

    document.getElementById('numberInput').value = '';
}

function updateHashTableUI() {
    const hashTableDiv = document.getElementById('hashTable');
    hashTableDiv.innerHTML = '';

    hashTable.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (value !== 0) {
            cell.classList.add('filled');
            cell.textContent = value;
        }
        hashTableDiv.appendChild(cell);
    });
}
