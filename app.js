class Product {
    constructor(name, type, quantity) {
        this.name = name;
        this.quantity = quantity;
        this.type = type;
    }
}
class Room {
    constructor(name, products) {
        this.name = name;
        this.products = products;
    }
}
var rooms = [];

const products = [
    new Product("Carta Igienica", "C", ""),
    new Product("Shampoo", "U", ""),
    new Product("Sapone Mani", "U", ""),
    new Product("Balsamo", "U", ""),
    new Product("Crema Corpo", "U", ""),
    new Product("Cuffia Doccia", "C", ""),
    new Product("Vanity Kit", "C", ""),
    new Product("Sewing Kit", "C", ""),
    new Product("Dental Kit", "C", ""),
    new Product("Shaving Kit", "C", ""),
    new Product("Telo Viso", "C", ""),
    new Product("Tappeto Bagno", "C", ""),
    new Product("Telo Doccia", "C", ""),
    new Product("Lavette", "C", ""),
    new Product("Kleenex", "C", ""),
    new Product("Bustine di The", "C", ""),
    new Product("Block Notes", "C", ""),
    new Product("Matite", "C", ""),
    new Product("Biscotti", "C", ""),
    new Product("Ciabatte", "C", ""),
    new Product("Accappatoio", "C", ""),
    new Product("Lenz. Sot. Sing.", "C", ""),
    new Product("Lenz. Sot. Matr.", "C", ""),
    new Product("Lenz. Sop. Sing.", "C", ""),
    new Product("Lenz. Sop. Matr.", "C", ""),
    new Product("Federa Quad.", "C", ""),
    new Product("Federa Rett.", "C", ""),
    new Product("Copri Piumino", "C", ""),
    new Product("Bidet", "C", ""),
    new Product("Copriletto Matr.", "C", ""),
    new Product("Copriletto Sing.", "C", ""),
    new Product("Tappeto Notte.", "C", ""),
];

room_names.forEach(name => {
    let roomProducts = products.map(product => new Product(product.name, product.type, product.quantity));
    rooms.push(new Room(name, roomProducts));
});

let index = 0;

let room = document.querySelector('.room');
let title = document.querySelector('.title');
function initialize() {
    ;
    title.innerHTML = ""
    title.innerHTML = rooms[index].name;

    rooms[index].products.forEach((product, j) => {
        let qnt = document.createElement('div');
        qnt.classList.add('qnt-container');
        let product_name = document.createElement('p');
        product_name.innerHTML = product.name;
        qnt.appendChild(product_name);
        let input = document.createElement('input');
        if (product.type == "C") {
            input.type = 'number';
        } else {
            input.type = 'text';
        }
        input.value = product.quantity;
        input.setAttribute("onchange", "saveValues(" + j + ")")
        qnt.appendChild(input);
        room.appendChild(qnt);
    });

    document.querySelector('.date').innerHTML = new Date().toDateString();



    let inputs = document.querySelectorAll('input');

    inputs.forEach((input, index) =>{
        input.setAttribute("onfocus", "clear(" + index + ")");
    })
}

function clear(n) {
    console.log(n);
    inputs[n].value = "";
}

initialize();

function prev() {
    index--;
    if (index < 0) index = rooms.length - 1;
    while (room.childNodes.length > 2) {
        room.removeChild(room.lastChild);
    }
    initialize();
}

function next() {
    index++;
    if (index > rooms.length - 1) index = 0;
    while (room.childNodes.length > 2) {
        room.removeChild(room.lastChild);
    }
    initialize();
}

function saveValues(n) {
    let values = document.querySelectorAll('.qnt-container input');
    rooms[index].products[n].quantity = values[n].value;
    console.log(rooms[index].products[n]);
}

function generatePDF() {
    const { jsPDF } = window.jspdf;

const doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true
});
doc.text(new Date().toDateString().substring(4), 5, 20);

const fontSize = 12;
const rowHeight = 10;
const colWidth = 7;
const verticalLineOffset = 2; // Adjust this value to move the vertical lines to the left

let yPosition = 40;
let xPosition = 52;

// Header row
doc.setFontSize(fontSize);
doc.setFont('helvetica', 'bold'); // Set font and font style

rooms[0].products.forEach((product, columnIndex) => {
    // Rotate header row names by 90 degrees
    doc.text(product.name, xPosition + columnIndex * colWidth, yPosition - 7, null, 90);
});

xPosition = 10;
// Content rows
doc.setFont('helvetica', 'normal'); // Set font and font style

rooms.forEach((room, rowIndex) => {
    doc.text(room.name, xPosition, yPosition);

    // Draw horizontal line after each row
    if (rowIndex > 0) {
        doc.line(10, yPosition - 5, 400, yPosition - 5);
    }

    xPosition += 40;
    room.products.forEach((product, columnIndex) => {
        const matchingProduct = room.products.find(p => p.name === product.name);
        const quantity = matchingProduct ? matchingProduct.quantity.toString() : '-';
        doc.text(quantity, xPosition + columnIndex * colWidth, yPosition);

        // Draw vertical line after each column
        if (columnIndex > 0) {
            doc.line(xPosition + columnIndex * colWidth - verticalLineOffset, yPosition - 3, xPosition + columnIndex * colWidth - verticalLineOffset, yPosition + rowHeight - 3);
        }
    });

    yPosition += rowHeight; // Move to the next row
    xPosition = 10;
});

// Save the PDF
doc.save('report.pdf');

}