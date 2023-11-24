export const invoices = [
    {
        id: "432431",
        status: 2,
        billFrom: {
            address: "123 Main Street",
            city: "Cityville",
            postCode: "12345",
            country: "United States"
        },
        billTo: {
            client: {
                name: "Client A",
                email: "clientA@example.com",
                address: "456 Elm Avenue"
            },
            city: "Client City",
            postCode: "54321",
            country: "United States",
            date: "2023-11-08",
            terms: "NET 30",
            description: "Goods and Services"
        },
        itemList: [
            {
                name: "Product 1",
                quantity: 5,
                price: 20,
                total: 100
            },
            {
                name: "Service Fee",
                quantity: 1,
                price: 50,
                total: 50
            }
        ],
        totalPrice: 150
    },
    {
        id: "432432",
        status: 1,
        billFrom: {
            address: "789 Elm Road",
            city: "Townsville",
            postCode: "54321",
            country: "United States"
        },
        billTo: {
            client: {
                name: "Client B",
                email: "clientB@example.com",
                address: "987 Oak Lane"
            },
            city: "Client Town",
            postCode: "12345",
            country: "United States",
            date: "2023-11-10",
            terms: "NET 45",
            description: "Consulting Services"
        },
        itemList: [
            {
                name: "Consulting Hours",
                quantity: 10,
                price: 75,
                total: 750
            }
        ],
        totalPrice: 750
    },
    {
        id: "432433",
        status: 1,
        billFrom: {
            address: "789 Elm Road",
            city: "Townsville",
            postCode: "54321",
            country: "United States"
        },
        billTo: {
            client: {
                name: "Client B",
                email: "clientB@example.com",
                address: "987 Oak Lane"
            },
            city: "Client Town",
            postCode: "12345",
            country: "United States",
            date: "2023-11-10",
            terms: "NET 45",
            description: "Consulting Services"
        },
        itemList: [
            {
                name: "Consulting Hours",
                quantity: 10,
                price: 75,
                total: 750
            }
        ],
        totalPrice: 750
    },
    {
        id: "432434",
        status: 1,
        billFrom: {
            address: "321 Oak Avenue",
            city: "Groveville",
            postCode: "98765",
            country: "United States"
        },
        billTo: {
            client: {
                name: "Client D",
                email: "clientD@example.com",
                address: "654 Maple Street"
            },
            city: "Client Grove",
            postCode: "43210",
            country: "United States",
            date: "2023-11-15",
            terms: "NET 45",
            description: "Web Development Services"
        },
        itemList: [
            {
                name: "Website Development",
                quantity: 1,
                price: 2000,
                total: 2000
            },
            {
                name: "Hosting and Maintenance",
                quantity: 1,
                price: 500,
                total: 500
            }
        ],
        totalPrice: 2500
    }           
]